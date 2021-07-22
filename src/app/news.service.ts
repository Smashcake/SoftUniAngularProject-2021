import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  loadNews(){
    return this.http.get<object[]>("https://jsonplaceholder.typicode.com/users");
  }

  loadTest(){
    return this.http.get<object[]>("https://softuniangularproject-2021-default-rtdb.europe-west1.firebasedatabase.app/.json");
  }
}
