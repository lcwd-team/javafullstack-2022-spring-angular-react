import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from 'src/app/services/auth-helper.service';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {


  isLogin = false;
  user: any = null

  constructor(
    private authHelper: AuthHelperService,

  ) { }

  ngOnInit(): void {

    this.updateLoginDetails()
    this.authHelper.loginLogoutEmitter.subscribe(value => {
      this.updateLoginDetails();
    })

  }
  updateLoginDetails() {
    this.isLogin = this.authHelper.checkLogin()
    this.user = this.isLogin ? this.authHelper.getCurrentUser() : null

  }


  logoutUser() {
    this.authHelper.logout()
  }

}
