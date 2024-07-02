import { PostgrestError } from '@supabase/supabase-js';
import { Tables } from '../../../db/types/supabase';
import { BoardActions } from '../../actions/boardActions';

const initialState = {
  data: [] as Tables<'board'>[],
  error: null as PostgrestError | null,
};

const boardReducer = (
  state = initialState,
  action: BoardActions
): typeof initialState => {
  switch (action.type) {
    case 'FETCH_BOARDS_SUCCESS':
      return { ...state, data: action.payload, error: null };
    case 'CREATE_BOARD_SUCCESS':
        return {
          ...state,
          data: [...state.data, ...action.payload],
          error: null,
        };
      case 'CREATE_BOARD_FAILURE':
        return {
          ...state,
          error: action.payload,
        };  
        case 'UPDATE_BOARD_SUCCESS':
          return {
            ...state,
            data: [...state.data, ...action.payload],
            error: null,
          };
        case 'UPDATE_BOARD_FAILURE':
          return {
            ...state,
            error: action.payload,
          };  
    default:
      return state;
  }
};

export default boardReducer;
