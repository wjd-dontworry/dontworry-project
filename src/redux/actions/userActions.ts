import { Dispatch } from 'redux';
import { supabase } from '../../db/supabase';

export type User = {
    id: string;
    email: string;
    [key: string]: any;
  };

  export interface SetUserAction {
    type: 'SET_USER';
    payload: User;
  }
  
  export const setUser = (user: User): SetUserAction => ({
    type: 'SET_USER',
    payload: user,
  });

  export interface SetGuestAction {
    type: 'SET_GUEST';
  }
  
  export const setGuest = (): SetGuestAction => ({
    type: 'SET_GUEST',
  });

  export type UserAction = SetUserAction | SetGuestAction;

  export const fetchUser = () => async (dispatch: Dispatch<UserAction>) => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        dispatch(setGuest());
      } else if (data && data.user) {
        dispatch(setUser(data.user as User));
      } else {
        dispatch(setGuest());
      }
    } catch (error) {
      dispatch(setGuest());
    }
  };
  
  export const logout = () => async (dispatch: Dispatch<UserAction>) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('로그아웃 중 오류 발생:', error.message);
      } else {
        dispatch(setGuest());
      }
    } catch (error) {
      console.error('로그아웃 중 예기치 않은 오류 발생:', error);
    }
  };