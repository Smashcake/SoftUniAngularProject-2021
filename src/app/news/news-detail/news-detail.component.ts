import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsDetail: any | undefined;
  totalNews: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService:NewsService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(() => this.newsDetail = undefined),
      switchMap(({ id }) => this.newsService.loadNewsDetail(id))
    ).subscribe(newsDetail => this.newsDetail = newsDetail);

    this.totalNews = this.newsService.loadNews().subscribe(news => this.totalNews = news.length )
  }
  
}
