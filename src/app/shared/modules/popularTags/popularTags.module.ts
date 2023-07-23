import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/reducers'
import { EffectsModule } from '@ngrx/effects'
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect'
import { PopularTagsService } from './services/popular-tags.service'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', reducers),
    RouterModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule {}
