import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-news-sidebar',
  templateUrl: './news-sidebar.component.html',
  styleUrls: ['./news-sidebar.component.scss']
})
export class NewsSidebarComponent {
  loading$: Observable<boolean>;
  news$: Observable<any>;


  constructor(private newsService: NewsService) {
    this.news$ = this.newsService.getNews(0, 3, "");
    this.loading$ = this.newsService.loading$;
  }

}
