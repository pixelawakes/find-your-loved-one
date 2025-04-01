import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, onValue } from '@angular/fire/database';
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
  selector: 'app-view-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-container">
      <h2>Missing Persons Reports</h2>
      <div class="reports-grid">
        <div *ngFor="let report of reports" class="report-card">
          <h3>{{ report.name }}</h3>
          <div class="report-details">
            <p><strong>Age:</strong> {{ report.age }}</p>
            <p><strong>Height:</strong> {{ report.height }}</p>
            <p><strong>Last Seen:</strong> {{ report.lastSeen }}</p>
            <p><strong>Location:</strong> {{ report.location }}</p>
            <p><strong>Description:</strong> {{ report.description }}</p>
            <p class="timestamp">Reported on: {{ report.timestamp | date:'medium' }}</p>
          </div>
        </div>
      </div>
      <div *ngIf="reports.length === 0" class="no-reports">
        <p>No reports available at the moment.</p>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .report-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      transition: transform 0.2s;
    }

    .report-card:hover {
      transform: translateY(-2px);
    }

    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .report-details {
      color: #666;
    }

    .report-details p {
      margin: 0.5rem 0;
    }

    .timestamp {
      font-size: 0.9rem;
      color: #999;
      margin-top: 1rem;
      border-top: 1px solid #eee;
      padding-top: 0.5rem;
    }

    .no-reports {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class ViewReportsComponent implements OnInit {
  private database = inject(Database);
  reports: MissingPerson[] = [];

  ngOnInit() {
    const reportsRef = ref(this.database, 'missing-persons');
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by timestamp (newest first)
        this.reports = Object.values(data)
          .map(item => item as MissingPerson)
          .sort((a, b) => b.timestamp - a.timestamp);
      } else {
        this.reports = [];
      }
    });
  }
}
