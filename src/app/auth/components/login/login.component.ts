import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { BackendErrorsInterface } from '../../types/backendErrors.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import {
  isSubmitingSelector,
  validationErrorsSelector,
} from '../../store/selectors'
import { LoginRequestInterface } from '../../types/loginRequest.interface'
import { loginAction } from '../../store/actions/login.action'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public backendErrors$!: Observable<BackendErrorsInterface | null>
  form!: FormGroup
  public isSubmitting$!: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmitingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: '',
    })
  }

  onSubmit(): void {
    console.log(this.form.value)
    const request: LoginRequestInterface = {
      user: this.form.value,
    }
    this.store.dispatch(loginAction({ request }))
  }
}
