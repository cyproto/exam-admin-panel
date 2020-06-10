import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { QuestionsServiceService } from '../questions-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questionOperation: any;
  questionData: any;
  public questionForm: FormGroup;
  questionObject: any = {};
  options: any = {};
  questionCounterData: any = null;
  questionCounterDocId: any = null;
  editQuestionIndex: any;
  constructor( private questionsService: QuestionsServiceService, private formBuilder: FormBuilder, private firestore: AngularFirestore, public dialogRef: MatDialogRef<AddQuestionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog ) { 
      
      const questionCounterCollection = this.firestore.collection('questions_counter');
      questionCounterCollection.snapshotChanges().subscribe(result => {
        result.map(a => {
          this.questionCounterDocId = a.payload.doc.id;
          this.questionCounterData = a.payload.doc.data();
        });
      });

      this.questionOperation = data.operation == 'Add' ? 'Add' : 'Edit';
      this.questionData = data.operation == 'Add' ? null : data.info;
  }
  
  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      question: [null],
      option_1: [null],
      option_2: [null],
      option_3: [null],
      option_4: [null],
      correct_answer: null
    });
    this.options.option_1 = null;
    this.options.option_2 = null;
    this.options.option_3 = null;
    this.options.option_4 = null;
  }

  addQuestion(){
    let questionFormValue = this.questionForm.value;
    let questionId = this.questionOperation == 'Add' ? 'que' + ++this.questionCounterData.count : this.questionData.questionId;
    this.questionObject = {
      questionId: questionId,
      question: questionFormValue.question,
      option_1: questionFormValue.option_1,
      option_2: questionFormValue.option_2,
      option_3: questionFormValue.option_3,
      option_4: questionFormValue.option_4,
      correct_option: questionFormValue.correct_answer,
    }

    if( 'Add' == this.questionOperation ) {
      this.questionsService.addQuestion( this.questionObject.questionId, this.questionObject );
      this.questionsService.incrementCounter( this.questionCounterDocId, this.questionCounterData.count );
    } else if( 'Edit' == this.questionOperation ) {
      this.questionsService.updateQuestion( this.questionData.questionId, this.questionObject );
    }
    
    console.log(this.questionObject);
    this.dialogRef.close();
  }
}
