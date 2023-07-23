import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IGetPopularTagsResponse } from '../../types/getPopularTagsResponse.interface'
import { Store, select } from '@ngrx/store'
import { isLoadingSelector, tagsSelector } from '../../store/selectors'
import { getPopularTagsAction } from '../../store/actions/popularTags.actions'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  public isLoading$!: Observable<boolean>
  public popularTags$!: Observable<IGetPopularTagsResponse | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.store.dispatch(getPopularTagsAction())
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.popularTags$ = this.store.pipe(select(tagsSelector))
  }
}
