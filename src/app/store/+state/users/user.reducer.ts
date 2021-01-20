import * as UserActions from './user.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

export interface UserData {
  user: {
    userDetails: UserDetailsModel
  };
}

export interface UserState {
  user: UserData;
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
      createdDate: null,
      lastUpdateDateTime: null,
      userType: ''
    }
  }
};

export function UserReducer(
  state = initialState,
  action: UserActions.UserActions
): any {
  switch (action.type) {
    case UserActions.UserActionTypes.GET_USER_DETAILS_SUCCESS: {
      const userResp = action.payload;
      const userDetailsResp = userResp.dataObject.data[0];
      return {
        ...state,
        user: {
          ...state.user,
          userDetails: {
            ...state.user.userDetails,
            firstName: userDetailsResp.firstName,
            lastName: userDetailsResp.lastName,
            email: userDetailsResp.email,
            mobileNumber: userDetailsResp.mobileNumber,
            picture: userDetailsResp.picture,
            tokens: userDetailsResp.tokens,
            verifiedPhNum: userDetailsResp.verifiedPhNum,
            createdDate: new Date(userDetailsResp.createdDate),
            lastUpdateDateTime: new Date(userDetailsResp.lastUpdateDateTime),
            userType: userDetailsResp.userType
          },
        },
      };
    }
    default:
      return state;
  }
}

export const getUserDetails = (state: UserState) => {
  return state.user.user.userDetails;
};
