import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { id } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { SubscriptionSummary } from 'src/app/interface/SubscriptionSummary';
import { UserRegistrationSummary } from 'src/app/interface/UserRegistrationSummary';
import { BlogService } from 'src/app/services/blog.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeBlogPostCreation = false;
  activeNotificationCreation = false;
  blogPostImg!: string;
  blogPostForm: FormGroup;
  notificationForm: FormGroup
  imageUrl = "";
  blogTitle = "";
  blogBody!: any;
  newUsersGraphData!: UserRegistrationSummary[];
  newSubscriptionsGraphData!: SubscriptionSummary[];
  allUsersGraphData!: SubscriptionSummary[];
  subscriptionDataLoading: Observable<boolean>;
  userRegistrationDataLoading: Observable<boolean>;
  submittingNotificationForm = false;
  submittedNotificationForm = false;
  submittedBlogPostForm = false;
  submittingBlogPostForm = false;

  constructor(private dashboardService: DashboardService, private blogService: BlogService, private sanitizer: DomSanitizer, private notificationsService: NotificationsService){
    this.subscriptionDataLoading = this.dashboardService.subscriptionDataLoading;
    this.userRegistrationDataLoading = this.dashboardService.userRegistrationDataLoading;

    this.blogPostForm = new FormGroup({
      imageUrl:  new FormControl('', [Validators.required]),
      blogBody:  new FormControl('', [Validators.required]),
      blogTitle:  new FormControl('', [Validators.required]),
    });

    this.notificationForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    })

    this.blogPostForm.valueChanges.subscribe((value) => {
      this.imageUrl = value?.imageUrl;
      this.blogTitle = value?.blogTitle;
      this.blogBody = this.sanitizer.bypassSecurityTrustHtml(value?.blogBody.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'));
  });
  }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getAllUserRegistrationsWeekly().subscribe({
      next: (res: any) => {
        this.newSubscriptionsGraphData = [{
          name: "New Users",
          series: res.map((summary: UserRegistrationSummary) => ({
            name: "Week: " + summary.week,
            value: summary.amount
          }))
        }];
        this.combineGraphData();
      }
    });

    this.dashboardService.getAllSubscriptionsWeekly().subscribe({
      next: (res: any) => {
        const updatedSeries = res.map((summary: any) => ({
          name: "Week: " + summary.name,
          value: summary.value
        }));

        this.newSubscriptionsGraphData.push({
          name: "New Subscriptions",
          series: updatedSeries
        });

        this.combineGraphData();
      }
    });

    this.dashboardService.getAllUsersCount().subscribe({
      next: (res: any) => {
        this.allUsersGraphData = res.map((summary: UserRegistrationSummary) => ({
          id: summary.id,
          createdAt: summary.createdAt,
          value: summary.amount,
          name: "Week: " + summary.week
        }));
        console.log("this.allUsersGraphData: ", this.allUsersGraphData);
      }
    })
  }

  combineGraphData(): void {
    const newSubscriptionGraphData: SubscriptionSummary[] = [];

    this.newSubscriptionsGraphData.forEach(subscription => {
      newSubscriptionGraphData.push({
        name: subscription.name,
        series: subscription.series
      });
    });

    this.newSubscriptionsGraphData = newSubscriptionGraphData;
  }


  submitNewBlogPost(): void {
    this.submittingBlogPostForm  = true;
    const imageUrl = this.blogPostForm.get('imageUrl')?.value;
    const body = this.blogPostForm.get('blogBody')?.value;
    const title = this.blogPostForm.get('blogTitle')?.value;
  
    this.blogService.createNewBlogPost(imageUrl, body, title).subscribe({
      next: () => {
        this.submittedBlogPostForm = true;
        this.submittingBlogPostForm  = false;
        this.blogBody = "";
        this.blogTitle = "";
        this.imageUrl = "";
        this.blogPostForm.reset();
      }
    });
  }

  activateCreateNewBlogPost() {
    this.activeNotificationCreation = false;
    this.submittedBlogPostForm = false;
    this.activeBlogPostCreation = !this.activeBlogPostCreation;
  }


  activateCreateNewNotification() {
    this.activeBlogPostCreation = false;
    this.submittedNotificationForm = false;
    this.activeNotificationCreation = !this.activeNotificationCreation;
  }

  submitNewNotification(): void {
    this.submittingNotificationForm = true;
    this.notificationsService.createNewNotification(this.notificationForm.value).subscribe({
        next: (res) => {
          this.submittingNotificationForm = false;
          this.notificationForm.reset();
         this.submittedNotificationForm = true;
        }
      }
    );
  }
}
