import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddQuestionComponent } from './add-question/add-question.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class QuestionsServiceService {

  questionCounterCollection: any = null;
  questionsCollection: any = null;
  constructor( private firestore: AngularFirestore ) { 
    this.questionCounterCollection = this.firestore.collection('questions_counter');
    this.questionsCollection = this.firestore.collection('questions');
  }
  
  addQuestion( questionId, question ){
    this.questionsCollection.doc( questionId ).set( question );
  }

  updateQuestion( questionId, question ){
    this.questionsCollection.doc( questionId ).update( question );
  }

  deleteQuestion( questionId ) {
    this.questionsCollection.doc( questionId ).delete();
  }

  incrementCounter( docId, counter ){
    this.questionCounterCollection.doc( docId ).update( {'count': counter} );
  }
}
