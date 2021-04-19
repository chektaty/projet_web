import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinginComponent } from './components/auth/singin/singin.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { NotFoundComponent } from './components/partiels/not-found/not-found.component';
import { AddProductComponent } from './components/shop/add-product/add-product.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { EditProductComponent } from './components/shop/edit-product/edit-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleProductComponent } from './components/shop/single-product/single-product.component';

const routes: Routes = [
  {path:'singup', component: SingupComponent},
  {path:'singin', component: SinginComponent},
  {path:'shop', component: ShopComponent},
  {path:'add-product', component: AddProductComponent},
  {path:'single-product/:id', component: SingleProductComponent},
  {path:'edit-product/:id', component: EditProductComponent},
  {path:'cart', component: CartComponent},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
