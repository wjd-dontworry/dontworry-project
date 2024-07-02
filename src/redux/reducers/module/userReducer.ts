import { User, UserActions } from '../../actions/userActions';

const initialState: { user: User | 'guest' | null } = {
  user: null,
};

const userReducer = (state = initialState, action: UserActions): { user: User | 'guest' | null } => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_GUEST':
      return {
        ...state,
        user: 'guest',
      };
    default:
      return state;
  }
};

export default userReducer;