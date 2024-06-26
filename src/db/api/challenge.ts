import { QueryData } from '@supabase/supabase-js'
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

  export const fetchChallenge = async (orderBy: string, ascending: boolean) => {
    try {
      const challengeWithUserQuery = supabase
        .from('challenge')
        .select('*, user(*), challenge_like(*)')
        .order(orderBy, { ascending });
  
      type ChallengeWithUser = QueryData<typeof challengeWithUserQuery>;
  
      const { data, error } = await challengeWithUserQuery;
  
      if (error) {
        console.log('Error :', error);
        return [];
      }
  
      const challengeWithUser: ChallengeWithUser = data;
      return challengeWithUser;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

  export const fetchTop3Challenge = async () => {
    try {
      const challengeWithUserQuery = supabase
        .from('challenge')
        .select(
          '*, user(*), challenge_like(*)'
        )
        .order('likes_count', { ascending : false })
        .range(0, 2);
  
      type ChallengeWithUser = QueryData<typeof challengeWithUserQuery>;
  
      const { data, error } = await challengeWithUserQuery;
  
      if (error) {
        console.log('Error :', error);
        return [];
      }
  
      const challengeWithUser: ChallengeWithUser = data;
      console.log(data);
      return challengeWithUser;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

   export const fetchChallengeByChallengeId = async (challengeId : number) => {
    try {
      const challengeWithUserQuery = supabase
        .from('challenge')
        .select('*, user(*), challenge_task(*)')
        .eq('challenge_id', challengeId)
        .single()
  
      type ChallengeWithUser = QueryData<typeof challengeWithUserQuery>;
  
      const { data, error } = await challengeWithUserQuery;
  
      if (error) {
        console.log('Error :', error);
        return null;
      }
  
      const challengeWithUser: ChallengeWithUser = data;
      return challengeWithUser;
    } catch (error) {
      console.log('Catch Error :', error);
      return null;
    }
   };

  export const fetchParticipationIdByUserIdAndChallengeId = async (userId : string, challengeId : number) => {
    try {
      const { data, error } = await supabase
        .from('challenge_participation')
        .select('*')
        .eq('user_id', userId)
        .eq('challenge_id', challengeId)
        .returns<Tables<'challenge_participation'>>()
        .single()

      if (error) {
        if(error.message !== "JSON object requested, multiple (or no) rows returned")
        console.log('Error :', error);
        return {};
      }

        return data;

    } catch (error) {
      console.log('Catch Error :', error);
      return {};
    }
  };

  export const fetchParticipationIdByUserId = async (userId : string) => {
    try {
      const { data, error } = await supabase
        .from('challenge_participation')
        .select('challenge(*)')
        .eq('user_id', userId)
        .returns<Tables<'challenge'>[]>()

      if (error) {
        console.log('Error :', error);
        return [];
      }
      console.log(data);
        return data;

    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

  export const createChallengeLike = async (userId : string, challengeId : number) => {
    try {
        const { data, error } = await supabase
        .from('challenge_like')
        .insert([
          { user_id: userId ,challenge_id: challengeId },
        ])
        .select('challenge_id')

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

  export const deleteChallengeLike = async (userId : string, challengeId : number) => {
    try {
        const { error } = await supabase
        .from('challenge_like')
        .delete()
        .eq('user_id', userId)
        .eq('challenge_id', challengeId)

      if (error) {
        console.log('Error :', error);
      }

    } catch (error) {
      console.log('Catch Error :', error);
    }
  };

  export const deleteChallenge = async (challengeId : number, userId : string) => {
    try {
      console.log(challengeId, userId);
      const { error } = await supabase
      .from('challenge')
      .delete()
      .eq('challenge_id', challengeId)
      .eq('user_id', userId)
    if (error) {
      console.log('Error :', error);
    }
  } catch (error) {
    console.log('Catch Error :', error);
  }
  }

  export const createChallengeRecord = async (date : string, isSuccess : boolean, participation_id : number) => {
    try {
        const { data, error } = await supabase
        .from('challenge_record')
        .insert([
          { date: date ,isSuccess: isSuccess, participation_id: participation_id },
        ])

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