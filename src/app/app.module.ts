// _____________ Modules _____________
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
// _____________ Components _____________
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductAddModalComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditModalComponent } from './components/product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './components/product-delete-modal/product-delete-modal.component';
import { UserComponent } from './components/user/user.component';
import { UserEditModalComponent } from './components/user-edit-modal/user-edit-modal.component';
import { ProductOrderModalComponent } from './components/product-order-modal/product-order-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    ProductComponent,
    ProductAddComponent,
    ProductAddModalComponent,
    ProductListComponent,
    ProductEditModalComponent,
    ProductDeleteModalComponent,
    UserComponent,
    UserEditModalComponent,
    ProductOrderModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

