import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TabViewModule } from 'primeng/tabview';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { SplitButtonModule } from 'primeng/splitbutton';

import { AppComponent } from './app.component';
import { SignupComponent } from './component/header/signup/signup.component';
import { EditclientComponent } from './component/editclient/editclient.component';
import { EditmoviesComponent } from './component/editmovies/editmovies.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SliderComponent } from './component/home/slider/slider.component';
import { MovieselectComponent } from './component/registration/movieselect/movieselect.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { NotsComponent } from './component/registration/nots/nots.component';
import { HomeComponent } from './component/home/home.component';

import { environment } from '../environments/environment';
import { MoviesService } from './services/movies.service';
import { LoginComponent } from './component/header/login/login.component';
import { AddmovieComponent } from './component/editmovies/addmovie/addmovie.component';
import { InTheaterComponent } from './component/home/in-theater/in-theater.component';
import { ClientRegistrationComponent } from './component/client-registration/client-registration.component';
import { EditRegistartionComponent } from './component/edit-registartion/edit-registartion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    MovieselectComponent,
    RegistrationComponent,
    NotsComponent,
    HomeComponent,
    EditmoviesComponent,
    EditclientComponent,
    SignupComponent,
    LoginComponent,
    AddmovieComponent,
    InTheaterComponent,
    ClientRegistrationComponent,
    EditRegistartionComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(environment.routers),

    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSnackBarModule,
    NgxMatFileInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    CarouselModule,
    ButtonModule,
    RippleModule,
    ScrollTopModule,
    TabViewModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatRippleModule,
    SplitButtonModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [MoviesService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
