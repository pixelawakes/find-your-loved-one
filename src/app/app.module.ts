import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    provideRouter(routes) as any,
    provideFirebaseApp(() => initializeApp(environment.firebase)) as any,
    provideAuth(() => getAuth()) as any,
    provideDatabase(() => getDatabase()) as any
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
