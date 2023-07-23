import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ErrorMessageComponent } from './components/errorMessage/errorMessage.component'

@NgModule({
  imports: [CommonModule],
  exports: [ErrorMessageComponent],
  declarations: [ErrorMessageComponent],
})
export class ErrorMessageModule {}
