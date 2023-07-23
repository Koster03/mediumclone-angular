import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/popularTags.actions'
import { PopularTagsService } from '../../services/popular-tags.service'
import { IGetPopularTagsResponse } from '../../types/getPopularTagsResponse.interface'

@Injectable()
export class GetPopularTagsEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.ptService.getTags().pipe(
          map((tags: IGetPopularTagsResponse) => {
            return getPopularTagsSuccessAction({ tags })
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private ptService: PopularTagsService
  ) {}
}
