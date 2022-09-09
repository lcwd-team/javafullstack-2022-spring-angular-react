import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelperService } from './services/auth-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-ecom';

   constructor(private authService:AuthHelperService,private route:Router){

   }
  ngOnInit(): void {
   
    this.authService.loginLogoutEmitter.subscribe((value:any)=>{
      if(!value){
        console.log("Logout");
        this.route.navigate(["/home"])
      }else{
        console.log("logged in");

        
      }
    })
    
  }

}
