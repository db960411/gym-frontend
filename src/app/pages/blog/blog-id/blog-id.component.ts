import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interface/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blog-id',
  templateUrl: './blog-id.component.html',
  styleUrls: ['./blog-id.component.scss']
})
export class BlogIdComponent {
  blogId!: string | null;
  blogData!: News;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('blogId');
      console.log(this.blogId);
    });

    if (this.blogId == null) return;

    this.newsService.getNewsInformationForSpecificBlog(this.blogId).subscribe({
      next: (response) => {
        this.blogData = response;
      },
      error: (error) => {
        console.log(error);
        
      }
    })
    
  }

}
