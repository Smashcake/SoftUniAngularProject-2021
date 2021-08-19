import { Component, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.css']
})
export class RecentNewsComponent {

  @ViewChild('option') option: ElementRef<HTMLOptionElement>;

  allPages: number;
  itemsPerPage: number = 2;
  news: any[] | undefined;
  filteredNews: any[];
  displayedData = [];
  categories = [];

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
      this.newsService.loadCategories().get().subscribe(category => {
        this.categories = category.docs.map(category => {
          return {
            name: category.data().name
          };
        })
      });
      this.news = this.news.filter(x => x?.data.approved === true);
      this.news.sort((x, y) => y?.data.createdOn.seconds - x?.data.createdOn.seconds);
      this.onPageChange(1,false);
      this.allPages = Math.ceil(this.news.length / this.itemsPerPage);
    });
  }

  onPageChange(page: number = 1,isFiltered: boolean): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    if (isFiltered){
      this.displayedData = this.filteredNews.slice(startItem, endItem);
      return;
    }
    this.displayedData = this.news.slice(startItem, endItem);
  }

  addFilter() {
    let filterValue = this.option.nativeElement.value;
    this.filteredNews = [];
    this.filteredNews = this.news.filter((x) => x?.data.category.includes(filterValue));
    this.onPageChange(1,true);
    this.allPages = Math.ceil(this.filteredNews.length / this.itemsPerPage);
  }

  clearFilter() {
    this.loadRecentNews();
  }
}
