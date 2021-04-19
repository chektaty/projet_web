import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  signinForm:FormGroup;
  errorMessage: string;

  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    //intialisation du formulaire
    this.signinForm=this.fromBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }
  onSubmit(){
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.auth.login(email,password)
    .then(()=>{
      this.router.navigate(['/shop'])
    })
    .catch((err)=>{
      this.errorMessage=err;
    })
  }


}
