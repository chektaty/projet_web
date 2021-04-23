import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm:FormGroup;
  errorMessage: string;
  imagePreview:string;
  loading:boolean;
  userId:string;

  constructor(private fromBuilder: FormBuilder,private auth:AuthService) {
    //intialisation du formulaire
    this.productForm=this.fromBuilder.group({
      titre:[null,[Validators.required]],
      description:[null,[Validators.required]],
      image:[null,[Validators.required]]
    });

    this.userId=this.auth.UserId;

  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

  onImagePick(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.get('image').patchValue(file);
    this.productForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload =()=>{
      if (this.productForm.get('image').valid) {
        this.imagePreview =reader.result as string;

      }else{
        this.imagePreview = null;
      }
    }
    reader.readAsDataURL(file);

  }

}
