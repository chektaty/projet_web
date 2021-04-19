import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '../models/data';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // API path
  base_path = environment.api;
  private headers= new HttpHeaders()
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('ProjectID', environment.api_key);

  product:Product[];
  product$=new Subject<Product[]>();

  constructor(private http:HttpClient) { }
  emitProduct(){
    this.product$.next(this.product);
  }

  getProduct(){

      this.http.get(this.base_path + 'list/produits', {'headers':this.headers}).subscribe(
        (data:Data)=>{
            if (data.success) {
              this.product=data.data;
              this.emitProduct();
            } else {

            }
        },(err)=>{
            console.log(err.error.message)
        })
  }

  getProductByID(id:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'list/produits',id, {'headers':this.headers}).subscribe(
        (data:Data)=>{
            // authification
            console.log(data);
            if (data["success"]) {

            resolve(data.data);
            } else {
              reject(data["message"])
            }
        },(err)=>{

            reject(err.error.message)
        })
    })
  }

  createNewProduct(product:Product,image:File){


    let params =  "titre="+product.titre+"&code_ref="+product.code_ref+"&description="+product.description+"&images="+image;


    return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'post/produits',params, {'headers':this.headers}).subscribe(
        (data)=>{
            if (data["success"]) {
              this.getProduct();
            resolve(data);
            } else {
              reject(data["message"])
            }
        },(err)=>{

            reject(err.error.message)
        })
    })

  }

  updateProduct(id:string,product:Product,image:File | string){
    let images;
    if (typeof image=== "string") {
      images=image;
    } else {
      images=image;
    }
    let params =  "titre="+product.titre+"&code_ref="+product.code_ref+"&description="+product.description+"&images="+images;

    return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'post/produits',params, {'headers':this.headers}).subscribe(
        (data)=>{
            if (data["success"]) {
              this.getProduct();
            resolve(data);
            } else {
              reject(data["message"])
            }
        },(err)=>{

            reject(err.error.message)
        })
    })
  }

  DeleteProduct(id:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.base_path + 'delete/produits',id, {'headers':this.headers}).subscribe(
        (data)=>{
            // authification
            console.log(data);
            if (data["success"]) {
            resolve(true);
            } else {
              reject(data["message"])
            }
        },(err)=>{

            reject(err.error.message)
        })
    })
  }
}
