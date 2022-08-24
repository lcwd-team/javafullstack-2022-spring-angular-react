import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  status={
    errorStatus:false,
    errorMessage:{
      name:null,
      email:null,
      password:'',
      about:'',
      phone:''
      
    }
  }

  user = {
    name: '',
    email: '',
    password: '',
    address: '',
    about: '',
    phone: '',
    gender: ''
  }

  constructor(private userService: UserService,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  //submit the form
  submitForm(event: any) {

    event.preventDefault();
    console.log(this.user);
    if (this.user.name.trim() === '') {
      this.toast.error("username is blank!!")
      return;
    } else if (this.user.email.trim() === '') {
      this.toast.error("email is blank !!")
      return;

    }

    //form submit
    this.userService.createUser(this.user).subscribe(
      (success) => {
        console.log(success);
        this.toast.success("user is registered successfully !! ")

      }, (error) => {
        console.log(error);
        if(error.status==400){

          console.log(error.error)
          
          this.status.errorMessage=error.error
          this.status.errorStatus=true
        
          // let message=``
          // for(let i in error.error){
          //   message=message+ ` ${error.error[i]} <br> `
          // }

          // this.toast.error(message,'',{
          //   enableHtml:true
          // })
        }

      }
      , () => {
        console.log("completed ");
        
      }
    )

  }

}
