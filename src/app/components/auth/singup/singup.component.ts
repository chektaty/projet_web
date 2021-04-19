import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm:FormGroup;
  errorMessage: string;

  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    //intialisation du formulaire
    this.signupForm=this.fromBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }

  onSubmit(){
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;


    this.auth.register(email,password)
    .then(()=>{
      this.router.navigate(['/shop'])
    })
    .catch((err)=>{
      this.errorMessage=err;
    })
  }
}
