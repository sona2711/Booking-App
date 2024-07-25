import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AccountComponent } from './components/account/account.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ErrorComponent } from './components/error/error.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "search-list", component: SearchListComponent },
  { path: "contact-us", component: ContactUsComponent},
  { path: "login", component: AccountComponent },
  { path: "booking-form", component: BookingFormComponent },
  { path: "**", component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
