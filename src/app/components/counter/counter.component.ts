import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Database, ref, onValue, set, push } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Person {
  id?: string;
  name: string;
  age: number;
  lastSeen: string;
  location: string;
  description: string;
  imageUrl: string;
  timestamp: number;
  matchCode?: string;
}

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="upload-section" *ngIf="!newPerson.imageUrl">
        <h2>Upload Photo</h2>
        <div class="upload-box">
          <input 
            type="file" 
            id="fileInput"
            (change)="onFileSelected($event)"
            accept="image/*"
            class="file-input"
            #fileInput
          >
          <label for="fileInput" class="upload-button">
            <span class="upload-icon">📷</span>
            <span>Choose Photo</span>
          </label>
          <p class="upload-hint">Supported formats: JPG, PNG</p>
        </div>
      </div>

      <div *ngIf="newPerson.imageUrl" class="form-section">
        <div class="preview-section">
          <img [src]="newPerson.imageUrl" alt="Preview" class="preview-image">
          <button class="change-photo-btn" (click)="fileInput.nativeElement.click()">
            Change Photo
          </button>
        </div>

        <div class="form-fields">
          <h2>Enter Details</h2>
          
          <div class="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              [(ngModel)]="newPerson.name" 
              placeholder="Enter full name"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Age</label>
            <input 
              type="number" 
              [(ngModel)]="newPerson.age" 
              placeholder="Enter age"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Last Seen</label>
            <input 
              type="date" 
              [(ngModel)]="newPerson.lastSeen" 
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Last Known Location</label>
            <input 
              type="text" 
              [(ngModel)]="newPerson.location" 
              placeholder="Enter location"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea 
              [(ngModel)]="newPerson.description" 
              placeholder="Enter physical description"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <button 
            (click)="addPerson()" 
            [disabled]="!isFormValid()"
            class="submit-btn"
          >
            Continue
          </button>
        </div>
      </div>

      <div *ngIf="newPerson.matchCode" class="match-result">
        <h3>Match Result</h3>
        <p>Match Code: {{ newPerson.matchCode }}</p>
        <p class="match-status" [class.match-found]="newPerson.matchCode === 'MATCH_FOUND'">
          {{ newPerson.matchCode === 'MATCH_FOUND' ? 'Match Found!' : 'No Match Found' }}
        </p>
      </div>

      <div class="recent-reports">
        <h3>Recent Reports</h3>
        <div class="people-list">
          <div *ngFor="let person of people" class="person-card">
            <img [src]="person.imageUrl" alt="Person image" class="person-image">
            <div class="person-info">
              <h4>{{ person.name }}</h4>
              <p>Age: {{ person.age }}</p>
              <p>Last Seen: {{ person.lastSeen | date }}</p>
              <p>Location: {{ person.location }}</p>
              <p class="description">{{ person.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .upload-section {
      text-align: center;
      padding: 3rem 2rem;
      border: 2px dashed #ddd;
      border-radius: 8px;
      background: #f8f9fa;
    }
    .upload-box {
      margin-top: 2rem;
    }
    .file-input {
      display: none;
    }
    .upload-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #3498db;
      color: white;
      padding: 1rem 2rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
      transition: background-color 0.3s;
    }
    .upload-button:hover {
      background-color: #2980b9;
    }
    .upload-icon {
      font-size: 1.5rem;
    }
    .upload-hint {
      margin-top: 1rem;
      color: #666;
      font-size: 0.9rem;
    }
    .preview-section {
      text-align: center;
      margin-bottom: 2rem;
    }
    .preview-image {
      max-width: 300px;
      max-height: 300px;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .change-photo-btn {
      background: none;
      border: none;
      color: #3498db;
      cursor: pointer;
      font-size: 1rem;
      text-decoration: underline;
    }
    .form-fields {
      max-width: 600px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    .submit-btn {
      background-color: #2ecc71;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
      width: 100%;
      margin-top: 1rem;
    }
    .submit-btn:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
    .match-result {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 4px;
      text-align: center;
    }
    .match-status {
      font-weight: bold;
      color: #e74c3c;
    }
    .match-status.match-found {
      color: #2ecc71;
    }
    .recent-reports {
      margin-top: 3rem;
    }
    .people-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .person-card {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }
    .person-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .person-info {
      padding: 1rem;
    }
    .person-info h4 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }
    .person-info p {
      margin: 0.25rem 0;
      color: #666;
    }
    .description {
      font-style: italic;
      margin-top: 0.5rem;
    }
  `]
})
export class CounterComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  people: Person[] = [];
  newPerson: Person = {
    name: '',
    age: 0,
    lastSeen: '',
    location: '',
    description: '',
    imageUrl: '',
    timestamp: Date.now()
  };

  constructor(private database: Database) {}

  ngOnInit() {
    const peopleRef = ref(this.database, 'people');
    onValue(peopleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.people = Object.entries(data).map(([id, person]: [string, any]) => ({
          id,
          ...person
        }));
      } else {
        this.people = [];
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newPerson.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.newPerson.name &&
      this.newPerson.age > 0 &&
      this.newPerson.lastSeen &&
      this.newPerson.location &&
      this.newPerson.description &&
      this.newPerson.imageUrl
    );
  }

  addPerson() {
    if (!this.isFormValid()) return;

    const peopleRef = ref(this.database, 'people');
    const newPersonRef = push(peopleRef);
    
    // Simulate image matching (replace with actual matching logic)
    const matchCode = this.simulateImageMatching();
    
    const personData = {
      ...this.newPerson,
      matchCode,
      timestamp: Date.now()
    };
    
    set(newPersonRef, personData);

    // Reset form
    this.newPerson = {
      name: '',
      age: 0,
      lastSeen: '',
      location: '',
      description: '',
      imageUrl: '',
      timestamp: Date.now()
    };
  }

  private simulateImageMatching(): string {
    // Simulate matching logic (replace with actual image matching)
    return Math.random() > 0.5 ? 'MATCH_FOUND' : 'NO_MATCH';
  }
} 