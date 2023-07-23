import { Action, createReducer, on } from '@ngrx/store'
import { IPopularTagsState } from '../types/popularTagsState.interface'
import {
  getPopularTagsFailureAction,
  getPopularTagsAction,
  getPopularTagsSuccessAction,
} from './actions/popularTags.actions'

const initialState: IPopularTagsState = {
  isLoading: false,
  tags: null,
  error: null
}

const feedReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): IPopularTagsState => ({
      ...state,
      isLoading: false,
      tags: action.tags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): IPopularTagsState => ({
      ...state,
      isLoading: false,
      tags: null
    })
  )
)

export function reducers(state: IPopularTagsState, action: Action) {
  return feedReducer(state, action)
}
