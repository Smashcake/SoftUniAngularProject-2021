import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';

import { NewsService } from '../app/news/news.service';
import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    NewsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SharedModule,
    AdminModule
  ],
  providers: [
    NewsService,
    UserService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
