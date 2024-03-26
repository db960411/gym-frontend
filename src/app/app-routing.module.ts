import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainComponent } from './pages/main/main.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { PlansComponent } from './pages/plans/plans.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PlanIdComponent } from './pages/plans/userPlan/plan-id/plan-id.component';
import { SocialComponent } from './pages/social/social.component';
import { VerifyComponent } from './pages/verify/token-id/verify.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogIdComponent } from './pages/blog/blog-id/blog-id.component';
import { NotesComponent } from './pages/notes/notes.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AuthComponent } from './pages/admin/auth/auth.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuardService] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuardService]  },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuardService]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]  },
  { path: 'plans', component: PlansComponent, canActivate: [AuthGuardService]  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]  },
  { path: 'social', component: SocialComponent, canActivate: [AuthGuardService]  },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuardService]  },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuardService]  },
  { path: 'plans/:planId', component: PlanIdComponent, canActivate: [AuthGuardService] },
  { path: 'verify/:tokenId', component: VerifyComponent, canActivate: [AuthGuardService] },
  { path: 'blog/:blogId', component: BlogIdComponent, canActivate: [AuthGuardService] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardService] },
  { path: 'dashboard/authenticate', component: AuthComponent, canActivate: [AuthGuardService] },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
