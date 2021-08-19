import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegisterUser } from 'src/app/interfaces/register-user';
import { IReviewNews } from 'src/app/interfaces/review-news';
import { NewsService } from 'src/app/news/news.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-review-news',
  templateUrl: './review-news.component.html',
  styleUrls: ['./review-news.component.css']
})
export class ReviewNewsComponent {

  newsToReview: IReviewNews[] | undefined;

  constructor(private newsService: NewsService, private userService: UserService, private route: Router) {
    this.newsToReview = this.newsToBeReviewed();
  }

  newsToBeReviewed(): IReviewNews[] {
    let reviewedNews: IReviewNews[] = [];
    this.newsService.loadNews().get().subscribe(reviewedNewsCollection => {
      reviewedNewsCollection.docs.map(reviewedNewsData => {
        let newsReviewData: IReviewNews = {
          title: reviewedNewsData?.data()?.title,
          createdBy: {
            name: '',
            surname: ""
          } as IRegisterUser,
          createdById: reviewedNewsData?.data()?.createdById,
          content: reviewedNewsData?.data()?.content,
          createdOn: reviewedNewsData?.data()?.createdOn,
          id: reviewedNewsData?.id,
          category: reviewedNewsData?.data()?.category,
          approved: reviewedNewsData?.data()?.approved
        };

        this.userService.getUserData(newsReviewData.createdById).get().subscribe(userData => {
          newsReviewData.createdBy.name = userData.data()?.name;
          newsReviewData.createdBy.surname = userData.data()?.surname;
        });
        if (newsReviewData.approved == false) {
          reviewedNews.push(newsReviewData);
        }
      })
    })

    return reviewedNews;
  }

  newsAcceptionHandler(verdict: boolean, newsId: string, creatorId: string) {
    if (verdict) {
      this.newsService.loadNewsData(newsId).update({ approved: true });
    }
    else {
      this.newsService.deleteNews(newsId, creatorId);
    }
    setTimeout(() => this.redirectTo(`review-news`), 200);
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
