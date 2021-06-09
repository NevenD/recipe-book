import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

export class AuthEffects {
  // konvekcija dodavanja $ je oznaka za observable, možemo i bez oga
  constructor(private actions$: Actions) {}

  // nastavi s ovim observabl chainom ako je akcija LOGIN_START, ostale akcije neće triggerirati taj effekt
  // mogu se dodavati multiple akcije ako želimo samo odvojimo zarezom
  authLoginEffect = this.actions$.pipe(ofType(AuthActions.LOGIN_START));
}
