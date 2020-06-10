import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsModuleComponent } from './questions-module.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule,
  MatDialogModule,
  MatDialogRef,
  MatProgressSpinnerModule,
} from '@angular/material';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  {
      path: '',
      component: QuestionsModuleComponent
  }
];

@NgModule({
  declarations: [QuestionsModuleComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule],
  entryComponents: [AddQuestionComponent]
})
export class QuestionsModuleModule { }