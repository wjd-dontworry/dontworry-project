import { ChallengeActions, ChallengeWithUser } from "../../actions/challengeActions";

const initialState = {
  data: [] as ChallengeWithUser[],
  error: null as Error | null,
};

export const challengeReducer = (
  state = initialState,
  action: ChallengeActions
): typeof initialState => {
  switch (action.type) {
    case 'FETCH_CHALLENGE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_CHALLENGE_FAILURE':
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;