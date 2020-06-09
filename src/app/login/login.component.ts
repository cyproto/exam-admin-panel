import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  userExistsFlag: boolean = true;
  wrongPasswordFlag: boolean = false;
  public loginForm: FormGroup;
  usersCollection: any;
  autoFillEmail: string = '';
  constructor(public activatedRoute: ActivatedRoute, private router: Router, public angularFirestore: AngularFirestore, private formBuilder: FormBuilder) {
    this.usersCollection = this.angularFirestore.collection('admin');
    sessionStorage.setItem('isLoggedIn',JSON.stringify('false'));
  }

  ngOnInit() {
    sessionStorage.clear();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.autoFillEmail = params["email"];
      console.log(this.autoFillEmail);
    });
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.pattern(emailRegex)]],
        password: [null, Validators.required]
      });
  }
  
  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;
    if ( this.loginForm.invalid ) {
        return;
    }

    const userRef = this.usersCollection.doc(this.loginForm.value.email);
    userRef.get().toPromise().then((docSnapshot) => {
      if ( !docSnapshot.exists ) {
          this.userExistsFlag = false;
          return;
      } else {
        this.userExistsFlag = true;
        this.usersCollection.doc(this.loginForm.value.email).valueChanges().subscribe( result => {
            if( bcrypt.compareSync( this.loginForm.value.password, result.password ) ) {
              console.log('login');
              this.wrongPasswordFlag = false;
              sessionStorage.setItem('isLoggedIn',JSON.stringify('true'));
              this.router.navigate(['/questions-module']);
              this.loginForm.reset();
            } else {
              console.log('wrong pass');
              this.wrongPasswordFlag = true;
              sessionStorage.setItem('isLoggedIn',JSON.stringify('false'));
            }
          });
      }
    });
  }

}
