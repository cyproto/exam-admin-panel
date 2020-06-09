import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, } from '@angular/fire/firestore';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
      CommonModule,
      LoginRoutingModule,
      CommonModule,
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [LoginComponent],
    providers: [AngularFirestore,],
})
export class LoginModule {}
