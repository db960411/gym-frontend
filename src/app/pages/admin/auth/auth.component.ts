import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  isApproved$!: Observable<boolean>;
  loading$!: Observable<boolean>;
  authenticationForm: FormGroup;
  error = false;
  showDeniedMessage$!: Observable<boolean>;
  loadingAuthenticationSubmission$!: Observable<boolean>;

  constructor(private dashboardService: DashboardService, private router: Router) {
    this.authenticationForm = new FormGroup({
      authenticationCode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.dashboardService.sendAdminApprovalLink().subscribe();
    this.isApproved$ = this.dashboardService.accessApproved$;
    this.loading$ = this.dashboardService.loading$;
    this.showDeniedMessage$ = this.dashboardService.showDeniedMessage$;
    this.loadingAuthenticationSubmission$ = this.dashboardService.loadingAuthenticationSubmittion$;
  }

  authenticateApprovalCode() {
    const code = this.authenticationForm.get('authenticationCode')?.value;
    this.dashboardService.authenticateApprovalCode(code).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.log("ERR", err);
        this.error = true;
      }
    });
  }
}
