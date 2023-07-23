import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TagListComponent } from './components/tagList/tagList.component'

@NgModule({
  imports: [CommonModule],
  exports: [TagListComponent],
  declarations: [TagListComponent],
})
export class TagListModule {}
