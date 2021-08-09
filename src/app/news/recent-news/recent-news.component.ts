import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.css']
})
export class RecentNewsComponent {

  news: any[] | undefined;

  constructor(private newsService: NewsService) {
    this.loadRecentNews();
  }

  loadRecentNews() {
    this.news = undefined;
    this.newsService.loadNews().get().subscribe(n => {

      this.news = n.docs.map(n => { 
        return { 
          data: n.data(),
          id: n.id
        }
      });
    });
  }
  
}
