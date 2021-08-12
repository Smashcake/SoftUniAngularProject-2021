import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.css']
})
export class RecentNewsComponent {

  allPages: number;
  itemsPerPage: number = 2;
  news: any[] | undefined;
  displayedData = [];

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
      })
      this.news.sort(x => x.data?.createdOn);
      this.onPageChange();
      this.allPages = Math.ceil(this.news.length / this.itemsPerPage);
    });
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.news.slice(startItem, endItem);
  }

}
