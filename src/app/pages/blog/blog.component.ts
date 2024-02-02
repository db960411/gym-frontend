import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime, of } from 'rxjs';
import { News } from 'src/app/interface/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  newsList: any;
  loading: boolean;
  newsLength!: number;
  pageSize = 5;
  pageIndex = 0;
  category = "";
  private categoryChanged: Subject<string> = new Subject<string>();
  private categorySubscription: Subscription;
  blogFilterForm: FormGroup;

  constructor(private newsService: NewsService, private formBuilder: FormBuilder) {
    this.loading = false;

    this.categorySubscription = this.categoryChanged.pipe(debounceTime(900))
    .subscribe(() => {
      this.getNews(this.pageIndex, this.pageSize, this.category);
    });

    this.blogFilterForm = this.formBuilder.group({
      blogFilterCtrl: [''],
    })
  }

  ngOnInit(): void {
    this.loading = true;
      this.getNews(0, this.pageSize, this.category);
  }

  ngOnDestroy(): void {
      this.categorySubscription.unsubscribe();
  }

  truncateText(text: string, limit: number): string {
    if (text.split(' ').length > limit) {
        return text.split(' ').slice(0, limit).join(' ') + '...';
    }
    return text;
  }

  getNews(page: number, size: number, category: string): void {
    this.newsService.getNews(page, size, category).subscribe({
      next: (response: any) => {
          this.newsList = response.newsList?.content;
          this.newsLength = response.totalNews;
          this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    })
  }

  pageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.getNews(this.pageIndex, event.pageSize, this.category);
  }

  pageSizeEvent(event: any): void {
    this.getNews(0, event.pageSize, this.category);
  }

  onCategoryChange(): void {
    this.category = this.blogFilterForm.controls['blogFilterCtrl'].value;
    this.categoryChanged.next(this.category);
  }

}
