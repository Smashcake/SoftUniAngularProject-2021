import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';



@NgModule({
  declarations: [
    ShortenPipe,
    LocalDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenPipe,
    LocalDatePipe
  ]
})
export class SharedModule { }
