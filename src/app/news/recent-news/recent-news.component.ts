import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.css']
})
export class RecentNewsComponent {

  news: object[] | undefined;
  test: object[] | undefined;

  constructor(private newsService: NewsService) {
    this.loadRecentNews();
  }

  loadRecentNews() {
    this.news = undefined;
    this.test = undefined;
    this.newsService.loadNews().subscribe(news => this.news = news);
    this.newsService.loadTest().subscribe(test => this.test = test);
  }
}
