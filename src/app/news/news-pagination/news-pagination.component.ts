import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './news-pagination.component.html',
  styleUrls: ['./news-pagination.component.css']
})
export class NewsPaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() itemsNumber: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}
