import { IGetFeedResponse } from './getFeedResponse'

export interface IFeedState {
  isLoading: boolean
  error: string | null
  data: IGetFeedResponse | null
}
