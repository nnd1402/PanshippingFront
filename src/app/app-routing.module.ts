import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
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
