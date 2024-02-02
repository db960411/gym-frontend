import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'gym_planet';
  notifications!: any;

  @ViewChild('elementToAnimate') elementToAnimate!: ElementRef;
  authenticated = false;

  constructor( private authService: AuthService){
    this.authService.isAuthenticated$.subscribe(resp => {
      this.authenticated = resp
    })
  }

  ngOnInit(): void {
      this.authService.checkIfAuthenticated().subscribe();
  }
}

