import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IGetPopularTagsResponse } from '../types/getPopularTagsResponse.interface'

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<IGetPopularTagsResponse> {
    const url = environment.apiUrl + '/tags'
    return this.http.get<IGetPopularTagsResponse>(url)
  }
}
