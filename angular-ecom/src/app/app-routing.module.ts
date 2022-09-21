import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent} from "./components/about/about.component";
import {CartComponent} from "./components/cart/cart.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ServicesComponent} from "./components/services/services.component";
import {SignupComponent} from "./components/signup/signup.component";
import {StoreComponent} from "./components/store/store.component";
import {UserDashboardComponent} from "./components/user-dashboard/user-dashboard.component";
import {ViewProductComponent} from "./components/view-product/view-product.component";
import {UserDashboardGuard} from "./guards/user-dashboard.guard";
import {AddProductComponent} from "./pages/admin/add-product/add-product.component";
import {AdminDashboardComponent} from "./pages/admin/admin-dashboard/admin-dashboard.component";
import {AdminHomeComponent} from "./pages/admin/admin-home/admin-home.component";
import {UpdateProductComponent} from "./pages/admin/update-product/update-product.component";
import {ViewProductsComponent} from "./pages/admin/view-products/view-products.component";
import {ManageOrderComponent} from "./pages/admin/manage-order/manage-order.component";
import {AdminGuard} from "./guards/admin.guard";


const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'user-profile',
    component: ProfileComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [UserDashboardGuard]
  },
  {
    path: 'store/:categoryId',
    component: StoreComponent
  }
  , {
    path: 'view-product/:productId',
    component: ViewProductComponent
  }
  ,
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UserDashboardGuard]
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [UserDashboardGuard]
  }, {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        pathMatch: 'full'

      },
      {
        path: 'add-product',
        component: AddProductComponent,

      },
      {
        path: 'products',
        component: ViewProductsComponent,

      },
      {
        path: 'update-product/:productIds',
        component: UpdateProductComponent
      }, {
        path: 'manage-orders',
        component: ManageOrderComponent
      }

    ]
  }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }
)
export class AppRoutingModule {

}
