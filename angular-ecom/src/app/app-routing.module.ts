import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ServicesComponent } from "./components/services/services.component";
import { SignupComponent } from "./components/signup/signup.component";


const routes:Routes=[

    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'user-profile',
        component:ProfileComponent
    },
    {
        path:'services',
        component:ServicesComponent
    },
    {
        path:'home',
        component:HomeComponent
    }
]



@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
   }
)
export class AppRoutingModule{

}