import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // API path
   base_path = environment.api;
   private headers= new HttpHeaders()
         .set('content-type', 'application/x-www-form-urlencoded')
         .set('ProjectID', environment.api_key);

   token:string;
   UserId:string;
   datas:any
   //observable
   isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {
    this.iniAuth();
  }
  iniAuth(){
    if (typeof localStorage !== "undefined") {
      const data = JSON.parse(localStorage.getItem('auth'));

       if (data) {
         if (data.UserId && data.token) {
          this.UserId=data.UserId;
          this.token=data.token;
          this.isAuth$.next(true);
        }
      }
    }
  }

  login(email:string, password:string)  {
    const params= new HttpParams()
    .set("email", email)
    .set("password", password);


      return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'login/user',params.toString(), {'headers':this.headers}).subscribe(
        (data)=>{
            // authification
            console.log(data);
            if (data["success"]) {
            this.UserId =data["user"]["id"];
            this.token=data["token"];
            this.isAuth$.next(true);

            //save  data users in local
            if (typeof localStorage !== "undefined") {
              localStorage.setItem('auth',JSON.stringify({UserId:data["user"]["id"], token: data["token"]}))
            }
            resolve(true);
            } else {
              reject(data["message"])
            }
        },(err)=>{

            reject(err.error.message)
        })
  })
  }

  register(email:string, password:string)  {

    const params= new HttpParams()
          .set("email", email)
          .set("password", password);

          console.log(params.toString());

    return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'register/user',params.toString(), {'headers':this.headers}).subscribe(
        (data)=>{
        if (data["success"]) {
            this.login(email,password).then(() =>{
              resolve(true);
            }).catch((err)=>{
              reject(err.error.message);
            })
        }else{
          reject(data["message"])
        }
      },(err)=>{
          reject(err.error.message)
      })
    })
  }

  logout() {
    this.isAuth$.next(false);
    this.UserId=null;
    this.token=null;

    if (typeof localStorage !== "undefined") {
      localStorage.setItem('auth',null);
    }

  }


}
