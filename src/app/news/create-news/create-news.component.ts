import { Component, OnInit } from '@angular/core';
import { INewsArticle } from 'src/app/interfaces/news-article';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  newsCall = 'News';

  constructor(private newsService: NewsService, private route: Router) { }

  ngOnInit(): void {
  }

  createNews(newsData: INewsArticle){
    newsData.createdOn = new Date();
    this.newsService.createNews(newsData);
    this.route.navigateByUrl("");
  }
}
