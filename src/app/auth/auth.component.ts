import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AuthResponseData, AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitch(): void {
    this.isLoginMode = !this.isLoginMode;
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      authObs = this.authService.signup(email, password);
    }

    // authObs.subscribe(
    //   (res) => {
    //     // tslint:disable-next-line:no-console
    //     console.log(res);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  onHandleError(): void {
    this.store.dispatch(new AuthActions.ClearError());
  }

  // ako ??elimo dodati kroz typscript dinami??ku komponentu onda moramo
  // registrirati unutar app.module pod property entryComponents
  private showErrorAlert(message: string): void {
    const alertFactory = this.componentFactory.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // bri??emo i ??istimo sve za svaki slu??aj da je ne??to ostalo
    hostViewContainerRef.clear();
    // izra??ujemo komponentu
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    // pristupamo propertijama kroz instancu
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeModal.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
