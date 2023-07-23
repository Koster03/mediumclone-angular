import { Component, Input } from '@angular/core'
import { PopulatTagType } from 'src/app/shared/types/populatTag.type'

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
})
export class TagListComponent {
  @Input('tags') tagsProps!: PopulatTagType[]
}
