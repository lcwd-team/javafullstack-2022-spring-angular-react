import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  @Output()
  public loginLogoutEmitter: EventEmitter<Boolean> = new EventEmitter()


  constructor() {
  }

  //login
  login(data: any) {
    localStorage.setItem("data", JSON.stringify(data))
    this.loginLogoutEmitter.emit(true)
  }

  //logout
  logout() {
    localStorage.removeItem("data")
    this.loginLogoutEmitter.emit(false)
  }

  //checkLogin
  checkLogin() {
    let data = localStorage.getItem("data")
    if (data) {
      let ob = JSON.parse(data)
      if (ob.token && ob.user)
        return true
    }
    return false
  }


  //getToken

  getToken() {
    if (this.checkLogin()) {
      let data = localStorage.getItem("data");
      return data ? JSON.parse(data).token : null
    }
    return null;
  }

  //getCurrentUser
  getCurrentUser() {
    if (this.checkLogin()) {
      let data = localStorage.getItem("data");
      return data ? JSON.parse(data).user : null
    }
    return null;
  }

  //check admin user
  checkAdminUser(): boolean {
    let user = this.getCurrentUser()
    let flag = null
    if (this.checkLogin()) {
      flag = user.roles.find((r: any) => r.id === 5245)
    }
    return flag ? true : false
  }


}
