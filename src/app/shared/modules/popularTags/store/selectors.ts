import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPopularTagsState } from '../types/popularTagsState.interface'

export const popualrTagsFeatureSelector =
  createFeatureSelector<IPopularTagsState>('popularTags')

export const isLoadingSelector = createSelector(
  popualrTagsFeatureSelector,
  (feedState: IPopularTagsState) => feedState.isLoading
)

export const errorSelector = createSelector(
  popualrTagsFeatureSelector,
  (feedState: IPopularTagsState) => feedState.error
)

export const tagsSelector = createSelector(
  popualrTagsFeatureSelector,
  (feedState: IPopularTagsState) => feedState.tags
)
