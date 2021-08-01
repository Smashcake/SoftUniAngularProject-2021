import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { NewsService } from '../app/news/news.service';
import { RecentNewsComponent } from './news/recent-news/recent-news.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { environment } from 'src/environments/environment';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    RecentNewsComponent,
    NewsDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    NewsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    NewsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
