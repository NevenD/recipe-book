import { User } from '../user.model';
import * as AuthActions from './auth.actions';

// nazvali smo ga isto state kao i kod shopping list iz razloga što su to dva odvojena fajla
export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, authError: null, user, loading: false };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        user: null,
        loading: true,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        authError: action.payload,
        user: null,
      };
    default:
      return state;
  }
}
