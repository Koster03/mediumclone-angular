import { IGetPopularTagsResponse } from "./getPopularTagsResponse.interface"

export interface IPopularTagsState {
  isLoading: boolean
  error: string | null
  tags: IGetPopularTagsResponse | null
}
