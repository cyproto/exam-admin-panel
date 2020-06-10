import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionsServiceService } from './questions-service.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-module',
  templateUrl: './questions-module.component.html',
  styleUrls: ['./questions-module.component.scss']
})
export class QuestionsModuleComponent implements OnInit {

  public questionForm: FormGroup;
  questionArray: any = [];
  options: any = {};
  filteredQuestionArray: any = [];
  questionCounterData: any = null;
  questionCounterDocId: any = null;
  areQuestionsPulled: boolean = false;
  constructor( private router: Router, public dialog: MatDialog, private questionsService: QuestionsServiceService, private firestore: AngularFirestore ) { 
    const questionCounterCollection = this.firestore.collection('questions');
    questionCounterCollection.valueChanges().subscribe(result => {
      console.log( result );
      this.questionArray = result;
      this.filteredQuestionArray = this.questionArray;
      this.areQuestionsPulled = true;
    }); 
  }

  ngOnInit() {
    
  }
  
  onSearchChange( searchElement ){
    const filterValue = searchElement.toLowerCase();
    this.filteredQuestionArray = this.questionArray.filter( question => 
      question.question.toLowerCase().includes( filterValue )  || 
      question.option_1.toLowerCase().includes( filterValue )  ||
      question.option_2.toLowerCase().includes( filterValue )  ||
      question.option_3.toLowerCase().includes( filterValue )  ||
      question.option_4.toLowerCase().includes( filterValue )
    );
  }

  addQuestion(): void {
    const dialogRef = this.dialog.open( AddQuestionComponent, {
      width: '90%',
      height: '90%',
      data: { operation: 'Add', info: '' }
    });
  }

  editQuestion( question ){
    const dialogRef = this.dialog.open( AddQuestionComponent, {
      width: '90%',
      height: '90%',
      data: { operation: 'Edit', info: question }
    })
  }

  deleteQuestion( questionId ){
    if(confirm('Delete question?')){
      this.questionsService.deleteQuestion( questionId );
    }
    this.ngOnInit();
  }
  
  logout() {
    sessionStorage.setItem( 'userEmail', null );
    this.router.navigate(['../../login']);
  }
}
