import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private meta: Meta,  private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('About Us - GYM Planet | Fitness for Everyone');
    this.meta.updateTag({ name: 'description', content: 'Specific description for the About Us page' });
    this.meta.updateTag({ property: 'og:title', content: 'About Us - GYM Planet' });
  }

}
