import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // posto jos nemam UserComponent stavio sam AppComponent,
  // ako neko unese /user u url redirektovace ga na login stranicu
  { path: 'user', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
