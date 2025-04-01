import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';
import { inject } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h2>Firebase Connection Test</h2>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">
        Error: {{ error }}
      </div>
      <div *ngIf="data" class="success">
        <h3>Connection Successful!</h3>
        <pre>{{ data | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .error {
      color: red;
      padding: 10px;
      border: 1px solid red;
      border-radius: 4px;
    }
    .success {
      color: green;
      padding: 10px;
      border: 1px solid green;
      border-radius: 4px;
    }
    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class TestComponent implements OnInit {
  private database: Database = inject(Database);
  loading = true;
  error: string | null = null;
  data: any = null;

  async ngOnInit() {
    try {
      const dbRef = ref(this.database, 'missing-persons');
      const snapshot = await get(dbRef);
      
      if (snapshot.exists()) {
        this.data = snapshot.val();
      } else {
        this.data = { message: 'No data found in missing-persons node' };
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      this.loading = false;
    }
  }
} 