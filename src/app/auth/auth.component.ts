import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onSwitch(): void {
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
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (res) => {
        // tslint:disable-next-line:no-console
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError(): void {
    this.error = null;
  }

  // ako želimo dodati kroz typscript dinamičku komponentu onda moramo
  // registrirati unutar app.module pod property entryComponents
  private showErrorAlert(message: string): void {
    const alertFactory = this.componentFactory.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // brišemo i čistimo sve za svaki slučaj da je nešto ostalo
    hostViewContainerRef.clear();
    // izrađujemo komponentu
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    // pristupamo propertijama kroz instancu
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeModal.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
