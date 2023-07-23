import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { Store, select } from '@ngrx/store'
import { getFeedAction } from '../../store/actions/getFeed.action'
import { Observable, Subscription } from 'rxjs'
import { IGetFeedResponse } from '../../types/getFeedResponse'
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors'
import { environment } from 'src/environments/environment'
import { ActivatedRoute, Params, Router } from '@angular/router'
import queryString from 'query-string'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps!: string

  public isLoading$!: Observable<boolean>
  public error$!: Observable<string | null>
  public feed$!: Observable<IGetFeedResponse | null>
  public limit = environment.limit
  public baseUrl!: string
  public currentPage!: number

  private queryParamsSubscription!: Subscription
  private routeSubscription!: Subscription

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanges =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !==
        changes['apiUrlProps'].previousValue

    if (isApiUrlChanges) {
      this.fetchFeed()
    }
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListners()
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }

  initializeListners(): void {
    this.routeSubscription = this.route.url.subscribe(() => {
      this.initializeValues()
    })
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = +params['page'] || 1
        this.fetchFeed()
      }
    )
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query,
    })

    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }))
  }
}
