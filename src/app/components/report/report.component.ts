import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, push } from '@angular/fire/database';
import { inject } from '@angular/core';

interface MissingPerson {
  name: string;
  age: number;
  height: string;
  lastSeen: string;
  location: string;
  description: string;
  timestamp: number;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  private database = inject(Database);
  
  person: MissingPerson = {
    name: '',
    age: 0,
    height: '',
    lastSeen: '',
    location: '',
    description: '',
    timestamp: 0
  };

  isSubmitting = false;
  submitSuccess = false;

  async onSubmit() {
    if (!this.person.name || !this.person.age || !this.person.height) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;

    try {
      const reportRef = ref(this.database, 'missing-persons');
      await push(reportRef, {
        ...this.person,
        timestamp: Date.now()
      });

      this.submitSuccess = true;
      this.person = {
        name: '',
        age: 0,
        height: '',
        lastSeen: '',
        location: '',
        description: '',
        timestamp: 0
      };
    } catch (error) {
      console.error('Error submitting report:', error);
      // You might want to show an error message to the user here
    } finally {
      this.isSubmitting = false;
    }
  }
} 