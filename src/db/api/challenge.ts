import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import { supabase } from '../supabase';
import { Tables } from '../types/supabase';

export const fetchChallengeById = async (userId : string) => {
    try {
      const { data, error } = await supabase
        .from('challenge')
        .select('*')
        .eq('user_id', userId)
        .returns<Tables<'challenge'>[]>();

      if (error) {
        console.log('Error :', error);
        return [];
      }

      return data;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

  export const fetchChallenge = async () => {
    try {
        const challengeWithUserQuery = supabase
        .from('challenge')
        .select('*,user(*)')
        type ChallengeWithUser = QueryData<typeof challengeWithUserQuery>

        const { data, error } = await challengeWithUserQuery

      if (error) {
        console.log('Error :', error);
        return [];
      }

      const challengeWithUser: ChallengeWithUser = data
      console.log(challengeWithUser);
      return challengeWithUser;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };