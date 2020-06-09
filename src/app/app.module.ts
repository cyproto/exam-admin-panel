import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuard } from './shared/guard/auth.guard';

const firebaseConfig = {
  apiKey: "AIzaSyBEOi6n55MMh52mQEvGZuindi2BD18jsn0",
  authDomain: "e-assessment-using-blockchain.firebaseapp.com",
  databaseURL: "https://e-assessment-using-blockchain.firebaseio.com",
  projectId: "e-assessment-using-blockchain",
  storageBucket: "e-assessment-using-blockchain.appspot.com",
  messagingSenderId: "198687170091",
  appId: "1:198687170091:web:c627e5c8b505301515146e",
  measurementId: "G-GMVZP94GG0"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      LayoutModule,
      OverlayModule,
      HttpClientModule,
      AngularFireModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireStorageModule,
  ],
  providers: [AngularFirestore, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

