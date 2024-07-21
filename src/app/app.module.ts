import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule , provideHttpClient, withFetch} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ErrorComponent } from './components/error/error.component';
import { AccountComponent } from './components/account/account.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MapComponent } from './components/map/map.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';




 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchListComponent,
    BookingFormComponent,
    ErrorComponent,
    AccountComponent,
    ContactUsComponent,
    MapComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
