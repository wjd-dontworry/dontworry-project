import { QueryData } from '@supabase/supabase-js'
import { supabase } from '../supabase';
import { Tables } from '../types/supabase';

export const fetchBoard = async (orderBy: string, ascending: boolean) => {
    try {
      const boardWithUserQuery = supabase
        .from('board')
        .select('*, user(*), board_like(*)')
        .order(orderBy, { ascending });
  
      type BoardWithUser = QueryData<typeof boardWithUserQuery>;
  
      const { data, error } = await boardWithUserQuery;
  
      if (error) {
        console.log('Error :', error);
        return [];
      }
  
      const boardWithUser: BoardWithUser = data;
      return boardWithUser;
    } catch (error) {
      console.log('Catch Error :', error);
      return [];
    }
  };

// board 테이블의 boardId로 board_like 테이블의 count를 가져오는 함수
export const getBoardLikeCount = async (boardId: number) => {
  try {
    const { error, count } = await supabase
      .from('board_like')
      .select('*', { count: 'exact', head: true })
      .eq('board_id', boardId);

    if (error) {
      console.log('Error :', error);
      return 0;
    }

    return typeof count === 'number' ? count : 0;
  } catch (error) {
    console.log('Catch Error :', error);
    return 0;
  }
};

// board 테이블의 boardId와 userId로 board_like 테이블에 행이 존재하는지 가져오는 함수
export const existBoardLikeId = async (boardId: number, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('board_like')
      .select('like_id')
      .eq('board_id', boardId)
      .eq('user_id', userId);

    if (error) {
        console.log('Error :', error);
        return null;
      }

    if(data.length > 0){
      return data[0].like_id;
    }
      return null;
    
  } catch (error) {
    console.log('Catch Error :', error);
    return null;
  }
};

// export const createBoard = async (board : Tables<'board'>) => {
//   try {
//       const { data, error } = await supabase
//       .from('board')
//       .insert([
//         board,
//       ])
//       .select('*')

//     if (error) {
//       console.log('Error :', error);
//       return [];
//     }

//     return data;
//   } catch (error) {
//     console.log('Catch Error :', error);
//     return [];
//   }
// };