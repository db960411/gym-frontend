import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() sliderContent: any[] = []; 
  slideConfig: any;
  currentIndex = 0;

  ngOnInit() {
    console.log(this.sliderContent);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.sliderContent.length - 1
      : this.currentIndex - 1;
  
    this.currentIndex = newIndex;
  }
  
  goToNext(): void {
    const isLastSlide = this.currentIndex === this.sliderContent.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
  
    this.currentIndex = newIndex;
    
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }
}
