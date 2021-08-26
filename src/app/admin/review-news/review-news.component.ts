import { Component } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IMessage } from 'src/app/interfaces/message';

import { UserService } from 'src/app/user/user.service';
import { NewsService } from 'src/app/news/news.service';

import { IRegisterUser } from 'src/app/interfaces/register-user';
import { IReviewNews } from 'src/app/interfaces/review-news';

@Component({
  selector: 'app-review-news',
  templateUrl: './review-news.component.html',
  styleUrls: ['./review-news.component.css']
})
export class ReviewNewsComponent {

  newsToReview: IReviewNews[] | undefined;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private route: Router) {
    this.newsToReview = this.newsToBeReviewed();
  }

  private bindUserNameAndSurname(document: AngularFirestoreDocument, newsReview: IReviewNews) {
    document.get().subscribe(userData => {
      newsReview.createdBy.name = userData.data()?.name;
      newsReview.createdBy.surname = userData.data()?.surname;
    });
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

        this.bindUserNameAndSurname((this.userService.getUserData(newsReviewData.createdById)), newsReviewData);

        if (newsReviewData.approved == false) {
          reviewedNews.push(newsReviewData);
        }
      })
    })

    return reviewedNews;
  }

  newsAcceptionHandler(verdict: boolean, newsId: string, creatorId: string) {
    let message: IMessage = {
      sender: 'Automated',
      date: new Date(),
      content: '',
      read: false,
      id: ''
    }

    if (verdict) {
      this.newsService.loadNewsData(newsId).update({ approved: true });
      this.newsService.loadNewsData(newsId).update({ reports: [] }).then(() => this.newsToReview = this.newsToBeReviewed());
      message.content = 'Your news article has been approved.';
      this.userService.addMessageToUserAndDB(creatorId, message);
    }
    else {
      message.content = 'Your news article has been deemed inappropriate/harmful and will be removed.';
      this.userService.addMessageToUserAndDB(creatorId, message);
      this.newsService.deleteNews(newsId, creatorId)
        .then(() => this.newsToReview = this.newsToBeReviewed());
    }

  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

}
