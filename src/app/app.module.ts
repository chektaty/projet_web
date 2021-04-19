import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinginComponent } from './components/auth/singin/singin.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleProductComponent } from './components/shop/single-product/single-product.component';
import { EditProductComponent } from './components/shop/edit-product/edit-product.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { AddProductComponent } from './components/shop/add-product/add-product.component';
import { HeaderComponent } from './components/partiels/header/header.component';
import { FooterComponent } from './components/partiels/footer/footer.component';
import { NotFoundComponent } from './components/partiels/not-found/not-found.component';
import { HeaderPageComponent } from './components/partiels/header-page/header-page.component';
import { QuickViewModalComponent } from './components/partiels/modal/quick-view-modal/quick-view-modal.component';
import { AddToCartModalComponent } from './components/partiels/modal/add-to-cart-modal/add-to-cart-modal.component';
import { DeleteProductModalComponent } from './components/partiels/modal/delete-product-modal/delete-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    SingupComponent,
    ShopComponent,
    SingleProductComponent,
    EditProductComponent,
    CartComponent,
    AddProductComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HeaderPageComponent,
    QuickViewModalComponent,
    AddToCartModalComponent,
    DeleteProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
