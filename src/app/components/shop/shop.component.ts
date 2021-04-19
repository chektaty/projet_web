import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:Product[];
  productSub:Subscription;
  UserId;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productSub = this.productService.product$.subscribe(
      (products:Product[])=>{
          this.products =products;
          console.log(this.products );
      },(err)=>{
        console.log(err)
      }
    )
    this.productService.getProduct();
  }
  OnDestroy(): void{
    this.productSub.unsubscribe();
  }

}
