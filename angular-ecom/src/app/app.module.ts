import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { StoreComponent } from './components/store/store.component';
import { ProductComponent } from './components/product/product.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CartComponent } from './components/cart/cart.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { NgProgressModule } from 'ngx-progressbar';
import {NgProgressHttpModule} from "ngx-progressbar/http";
import { OrdersComponent } from './components/orders/orders.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ViewProductsComponent } from './pages/admin/view-products/view-products.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ManageOrderComponent } from './pages/admin/manage-order/manage-order.component';
import {WindowRef} from "./services/WindowRef";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    CustomNavbarComponent,
    UserDashboardComponent,
    StoreComponent,
    ProductComponent,
    CartComponent,
    OrdersComponent,
    ViewProductComponent,
    AdminDashboardComponent,
    AddProductComponent,
    ViewProductsComponent,
    UpdateProductComponent,
    AdminHomeComponent,
    ManageOrderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-center'
    }),
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgProgressModule,
    NgProgressHttpModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    },
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
