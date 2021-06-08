import { User } from '../user.model';

// nazvali smo ga isto state kao i kod shopping list iz razloga što su to dva odvojena fajla
export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action) {
  return state;
}
