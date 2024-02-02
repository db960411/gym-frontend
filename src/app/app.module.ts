import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginComponent } from './pages/login/login.component';
import { NewsSidebarComponent } from './components/news-sidebar/news-sidebar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountComponent } from './components/settings/account/account.component';
import { SubscriptionComponent } from './components/settings/subscription/subscription.component';
import { LanguageComponent } from './components/settings/language/language.component';
import { LanguageModal } from './components/modal/modal-items/account/language/language.component';
import { CommunicationComponent } from './components/settings/communication/communication.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModalComponent } from './components/modal/modal.component';
import { EmailComponent } from './components/modal/modal-items/account/email/email.component';
import { PasswordComponent } from './components/modal/modal-items/account/password/password.component';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileModalComponent } from "./components/modal/modal-items/profile/profile.component";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { PlansComponent } from './pages/plans/plans.component'; 
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutFormComponent } from './pages/checkout/checkout-form/checkout-form.component'; 
import { StripeModule } from 'stripe-angular';
import { FadeInTextAnimationComponent } from './components/animations/fade-in-animation/fade-in-animation.component';
import { SlideInAnimationComponent } from './components/animations/slide-in-animation/slide-in-animation.component';
import { ScaleAnimationComponent } from './components/animations/scale-animation/scale-animation.component';
import { RotateAnimationComponent } from './components/animations/rotate-animation/rotate-animation.component';
import { InViewDirective } from './in-view.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StrengthModalComponent } from './components/modal/modal-items/plans/strength/strength.component';
import { MixModalComponent } from './components/modal/modal-items/plans/mix/mix.component';
import { LoseWeightModalComponent } from './components/modal/modal-items/plans/lose-weight/lose-weight.component';
import { PlanIdComponent } from './pages/plans/userPlan/plan-id/plan-id.component';
import { SocialComponent } from './pages/social/social.component';
import { PlanProgressionSettingsComponent } from './components/settings/plan-progression/plan-progression.component';
import { PlanProgressionComponent } from './components/modal/modal-items/account/plan-progression/plan-progression.component';
import { VerifyComponent } from './pages/verify/token-id/verify.component';
import { ProgressComponent } from './components/progress/progress.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogIdComponent } from './pages/blog/blog-id/blog-id.component';
import { NotesComponent } from './pages/notes/notes.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NotificationsComponent } from './components/settings/notifications/notifications.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { SliderComponent } from './components/slider/slider.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SignupComponent,
    LoginComponent,
    NewsSidebarComponent,
    SettingsComponent,
    AccountComponent,
    SubscriptionComponent,
    LanguageComponent,
    CommunicationComponent,
    NotificationsComponent,
    ModalComponent,
    EmailComponent,
    PasswordComponent,
    ProfileComponent,
    ProfileModalComponent,
    LanguageModal,
    PlansComponent,
    CheckoutComponent,
    CheckoutFormComponent,
    FadeInTextAnimationComponent,
    SlideInAnimationComponent,
    ScaleAnimationComponent,
    RotateAnimationComponent,
    InViewDirective,
    StrengthModalComponent,
    MixModalComponent,
    LoseWeightModalComponent,
    PlanIdComponent,
    SocialComponent,
    PlanProgressionSettingsComponent,
    PlanProgressionComponent,
    VerifyComponent,
    ProgressComponent,
    AboutComponent,
    BlogComponent,
    BlogIdComponent,
    NotesComponent,
    AnalyticsComponent,
    SliderComponent
  ],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    LazyLoadImageModule,
    ToastrModule.forRoot(
      { positionClass: 'toast-bottom-left'}
    ),
    StripeModule.forRoot('pk_test_51NeitKEQK2sno4Ko7HcDd2VflFfJXXz7cjFFiSdvSzzDAXIQ236lvXySM0PTdcoBj2WGeJEc3HCj6UCatGkOLgwH00F29Jdl69'),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
