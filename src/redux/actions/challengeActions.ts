import { Dispatch } from 'redux';
import { QueryData } from '@supabase/supabase-js'
import { supabase } from '../../db/supabase';
import { Tables } from '../../db/types/supabase';

type FetchChallengeSuccessAction = {
  type: 'FETCH_CHALLENGE_SUCCESS';
  payload: any;
};

type FetchChallengeFailureAction = {
  type: 'FETCH_CHALLENGE_FAILURE';
  payload: Error;
};

export type ChallengeActions = FetchChallengeSuccessAction | FetchChallengeFailureAction;

export type ChallengeWithUser = {
  challenge_id: number;
  created_at: string | null;
  title: string | null;
  user_id: string | null;
  user: {
    email: string | null;
    profile_image: string | null;
    user_id: string;
    username: string | null;
  } | null;
  challenge_like: {
    like_id: number;
    user_id: string | null;
    challenge_id: number;
  }[];
}

const challengeWithUserQuery = (orderBy: string, ascending: boolean) => supabase
        .from('challenge')
        .select('*, user(*), challenge_like(*)')
        .order(orderBy, { ascending })
        .returns<ChallengeWithUser[]>();

export const fetchChallenge = (orderBy: string, ascending: boolean) => {
  return async (dispatch: Dispatch<ChallengeActions>) => {
    try {
      const { data, error } = await challengeWithUserQuery(orderBy, ascending);

      if (error) {
        console.log('Error :', error);
        dispatch(fetchChallengeFailure(error as any));
      } else {
        const challengeWithUser: ChallengeWithUser[] = data;
        dispatch(fetchChallengeSuccess(challengeWithUser));
      }
    } catch (error) {
      console.log('Catch Error :', error);
      dispatch(fetchChallengeFailure(error as Error));
    }
  };
};

const fetchChallengeSuccess = (data: ChallengeWithUser[]): FetchChallengeSuccessAction => ({
  type: 'FETCH_CHALLENGE_SUCCESS',
  payload: data,
});

const fetchChallengeFailure = (error: Error): FetchChallengeFailureAction => ({
  type: 'FETCH_CHALLENGE_FAILURE',
  payload: error,
});