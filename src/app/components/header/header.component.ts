import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/interface/Notification';
import { User } from 'src/app/interface/User';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo$!: Observable<User>;
  dropdownActive = false;
  profileContainerActive$!: Observable<boolean>;
  isMobile = false;
  hamburgerActive = false;
  notificationsActive = false;
  notificationItems: Notification[] = [];
  notificationsCount!: number;
  
  constructor(private authService: AuthService, private elementRef: ElementRef,private renderer: Renderer2, private notificationService: NotificationsService, private router: Router) {}

  ngOnInit(): void {
    this.profileContainerActive$ = this.authService.isAuthenticated$;
    this.userInfo$ = this.authService.userInfo$;
    this.authService.fetchUserInfo().subscribe()
    this.checkWindowSize();

    this.notificationService.getAllNotificationsByUser().subscribe({
      next: (response) => {
        if (response) {
          this.notificationItems = response;
          this.notificationsCount = response.filter((x: Notification) => x.seen === false).length;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  logoutUser(): void {
    this.authService.clearCookieAndNavigateToLogin();
  }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.dropdownActive = false;
      this.notificationsActive = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    const width = window.innerWidth;
    this.isMobile = width <= 1100;

    const navElement = this.elementRef.nativeElement.querySelector('nav');

    if (this.isMobile) {
      this.renderer.addClass(navElement, 'mobile');
    } else {
      this.renderer.removeClass(navElement, 'mobile');
    }
  }

  toggleMobileMenu() {
    const navElement = this.elementRef.nativeElement.querySelector('nav');
    const active = "active";
    if (this.isMobile && !navElement.classList.contains(active)) {
      this.renderer.addClass(navElement, active);
      this.hamburgerActive = true;
    } else if(this.isMobile && navElement.classList.contains(active)) {
      this.renderer.removeClass(navElement, active);
      this.hamburgerActive = false;
    } 
  }

  onNavClick(): void {
    if (this.hamburgerActive) {
      this.toggleMobileMenu();
    }
  }

  closeNotifications(): void {
    this.notificationsActive = false;
  }

  viewNotification(clickedNotification: Notification): void {
    this.notificationsActive = !this.notificationsActive;

    const index =  this.notificationItems.findIndex(notification => notification === clickedNotification);
    this.notificationItems[index].seen = true;

    this.router.navigate(['/social']);
  }

  toggleNotifications(): void {
    this.notificationsActive = !this.notificationsActive;

    if (this.notificationsActive === true && this.notificationsCount > 0) {
      const filteredNotifications = this.notificationItems.filter(notification => notification.seen === false);
      this.notificationService.updateVisibility(filteredNotifications).subscribe({
        next: () => {
          this.notificationsCount = 0;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    
  }
}
