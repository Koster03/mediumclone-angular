import { Component, Input, OnInit } from '@angular/core'
import { UtilService } from 'src/app/shared/services/utils.service'

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps!: number
  @Input('limit') limitProps!: number
  @Input('currentPage') currentPageProps!: number
  @Input('url') urlProps!: string

  public pagesCount!: number
  public pages!: number[]

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
    this.pages = this.utilService.range(1, this.pagesCount);
  }
}
