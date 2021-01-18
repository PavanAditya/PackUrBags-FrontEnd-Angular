import * as AuthActions from './auth.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

export interface UserData {
  user: {
    userDetails: UserDetailsModel
  };
}

export interface AuthState {
  auth: UserData;
}

export const initialState: UserData = {
  user: {
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      picture: '',
      tokens: [],
      verifiedPhNum: null,
      createdDate: null
    }
  }
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
): any {
  switch (action.type) {
    case AuthActions.AuthActionTypes.GET_USER_DETAILS_SUCCESS: {
      const userResp = action.payload;
      const userDetailsResp = userResp.dataObject.data[0];
      console.log(userDetailsResp, 'dets');
      return {
        ...state,
        user: {
          ...state.user,
          userDetails: {
            ...state.user.userDetails,
            firstName: userDetailsResp.firstName,
            lastName: userDetailsResp.lastName,
            email: userDetailsResp.email,
            mobileNumber: userDetailsResp.mobileNumber ? userDetailsResp.mobileNumber : null,
            picture: userDetailsResp.picture ? userDetailsResp.picture : null,
            tokens: userDetailsResp.tokens,
            verifiedPhNum: userDetailsResp.verifiedPhNum,
            createdDate: userDetailsResp.createdDate
          },
        },
      };
    }
    default:
      return state;
  }
}

export const getUserDetails = (state: AuthState) => {
  console.log(state);
  return state.auth.user.userDetails;
};
