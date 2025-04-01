import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    provideFirebaseApp(() => initializeApp(environment.firebase)) as any,
    provideDatabase(() => getDatabase(initializeApp(environment.firebase))) as any
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
