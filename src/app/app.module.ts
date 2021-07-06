import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';

const routes: Routes = [
  { path: '', component: RegistrationComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
