import {Component, OnInit} from '@angular/core';
import {AuthHelperService} from 'src/app/services/auth-helper.service';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {


  isLogin = false;
  user: any = null
  cart: any
  adminUser = false

  constructor(
    private authHelper: AuthHelperService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {


    this.cartService.cartEmitter.subscribe((cart: any) => {
      console.log(cart);
      this.cart = cart

    })

    this.updateLoginDetails()
    this.authHelper.loginLogoutEmitter.subscribe(value => {
      this.updateLoginDetails();
    })

  }

  updateLoginDetails() {
    this.adminUser = this.authHelper.checkAdminUser()
    this.isLogin = this.authHelper.checkLogin()
    this.user = this.isLogin ? this.authHelper.getCurrentUser() : null

  }


  logoutUser() {
    this.authHelper.logout()
  }

}
