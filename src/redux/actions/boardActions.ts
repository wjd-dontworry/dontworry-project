import { Dispatch } from 'redux';
import { PostgrestError, QueryData } from '@supabase/supabase-js'
import { supabase } from '../../db/supabase';
import { Tables } from '../../db/types/supabase';
import { existBoardLikeId, getBoardLikeCount } from '../../db/api/board';
import { RootState } from '../store';

interface BoardWithLike extends Tables<'board'> {
  like_count: number;
  like_id: number | null;
}

type FetchBoardsSuccessAction = {
  type: 'FETCH_BOARDS_SUCCESS';
  payload: Tables<'board'>[];
};

type FetchBoardsFailureAction = {
  type: 'FETCH_BOARDS_FAILURE';
  payload: PostgrestError;
};

type CreateBoardSuccessAction = {
  type: 'CREATE_BOARD_SUCCESS';
  payload: Tables<'board'>[];
};

type CreateBoardFailureAction = {
  type: 'CREATE_BOARD_FAILURE';
  payload: PostgrestError;
};

type UpdateBoardSuccessAction = {
  type: 'UPDATE_BOARD_SUCCESS';
  payload: Tables<'board'>[];
};

type UpdateBoardFailureAction = {
  type: 'UPDATE_BOARD_FAILURE';
  payload: PostgrestError;
};

type DeleteBoardSuccessAction = {
  type: 'DELETE_BOARD_SUCCESS';
  payload: number;
};

type DeleteBoardFailureAction = {
  type: 'DELETE_BOARD_FAILURE';
  payload: PostgrestError;
};

export type BoardActions =
  | FetchBoardsSuccessAction
  | FetchBoardsFailureAction
  | CreateBoardSuccessAction
  | CreateBoardFailureAction
  | UpdateBoardSuccessAction
  | UpdateBoardFailureAction
  | DeleteBoardSuccessAction
  | DeleteBoardFailureAction;

  export const fetchBoards = () => {
    return async (dispatch: Dispatch<BoardActions>, getState: () => RootState) => {
      try {
        const { user } = getState().userReducer;
        const { data, error } = await supabase
          .from('board')
          .select('*, user(*)')
          .returns<BoardWithLike[]>();
        if (error) {
          dispatch(fetchBoardsFailure(error));
        } else {
          for (const board of data) {
            board.like_count = await getBoardLikeCount(board.board_id);
            board.like_id = await existBoardLikeId(board.board_id, user.id);
          }
          dispatch(fetchBoardsSuccess(data));
        }
      } catch (error) {
        console.log(error);
        dispatch(fetchBoardsFailure(error as PostgrestError));
      }
    };
  };

export const createBoard = (title: string, content: string, user_id: string) => {
  return async (dispatch: Dispatch<BoardActions>) => {
    try {
      const { data, error } = await supabase
      .from('board').
      insert({title: title, content: content, user_id: user_id})
      .select();
      if (error) {
        dispatch(createBoardFailure(error));
      } else {
        dispatch(createBoardSuccess(data));
      }
    } catch (error) {
      dispatch(createBoardFailure(error as PostgrestError));
    }
  };
};

export const updateBoard = (boardId : number , title: string, content: string) => {
  return async (dispatch: Dispatch<BoardActions>) => {
    try {
      const { data, error } = await supabase
        .from('board')
        .update({title: title, content: content})
        .eq('board_id', boardId)
        .select();
      if (error) {
        console.log(error);
        dispatch(updateBoardFailure(error));
      } else {
        console.log(data);
        dispatch(updateBoardSuccess(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateBoardFailure(error as PostgrestError));
    }
  };
};

export const deleteBoard = (boardId: number) => {
  return async (dispatch: Dispatch<BoardActions>) => {
    try {
      const { error } = await supabase.from('board').delete().eq('board_id', boardId);
      if (error) {
        dispatch(deleteBoardFailure(error));
      } else {
        dispatch(deleteBoardSuccess(boardId));
      }
    } catch (error) {
      dispatch(deleteBoardFailure(error as PostgrestError));
    }
  };
};

const fetchBoardsSuccess = (data: Tables<'board'>[]): FetchBoardsSuccessAction => ({
  type: 'FETCH_BOARDS_SUCCESS',
  payload: data,
});

const fetchBoardsFailure = (error: PostgrestError): FetchBoardsFailureAction => ({
  type: 'FETCH_BOARDS_FAILURE',
  payload: error,
});

const createBoardSuccess = (data: Tables<'board'>[]): CreateBoardSuccessAction => ({
  type: 'CREATE_BOARD_SUCCESS',
  payload: data,
});

const createBoardFailure = (error: PostgrestError): CreateBoardFailureAction => ({
  type: 'CREATE_BOARD_FAILURE',
  payload: error,
});

const updateBoardSuccess = (data: Tables<'board'>[]): UpdateBoardSuccessAction => ({
  type: 'UPDATE_BOARD_SUCCESS',
  payload: data,
});

const updateBoardFailure = (error: PostgrestError): UpdateBoardFailureAction => ({
  type: 'UPDATE_BOARD_FAILURE',
  payload: error,
});

const deleteBoardSuccess = (id: number): DeleteBoardSuccessAction => ({
  type: 'DELETE_BOARD_SUCCESS',
  payload: id,
});

const deleteBoardFailure = (error: PostgrestError): DeleteBoardFailureAction => ({
  type: 'DELETE_BOARD_FAILURE',
  payload: error,
});
