import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {

  newsDetail: any | undefined;
  totalNews: any;

  newsId: string = this.loadBlogIdFromRoute();

  constructor(private newsService: NewsService, private route: Router) {
    this.getNewsData();
   }

   getNewsData() {
    return this.newsService.loadNewsData(this.newsId).get().subscribe(news => {
      if(news.data() === undefined){
        this.route.navigateByUrl('not-found');
      }

      this.newsDetail = news.data();
      this.newsDetail.id = news.id;
      let date: number = this.newsDetail.createdOn.seconds + this.newsDetail.createdOn.nanoseconds;
      this.newsDetail.createdOn =new Date(date);
      // this.newsDetail.createdOn = new Date(this.newsDetail.createdOn)
    })
  }

  deleteNews(id) {
    this.newsService.deleteNews(id);
    this.route.navigateByUrl('');
  }

  private loadBlogIdFromRoute() {
    const index: number = this.route.url.lastIndexOf('/');
    return this.route.url.substring(index + 1);
  }
}
  
