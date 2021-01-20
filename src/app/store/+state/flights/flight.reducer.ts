import * as FlightActions from './flight.actions';
import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

export interface UserData {
  user: {
    userDetails: UserDetailsModel
  };
}

export interface FlightState {
  flight: UserData;
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

export function FlightReducer(
  state = initialState,
  action: FlightActions.FlightActions
): any {
  switch (action.type) {
    case FlightActions.FlightActionTypes.GET_USER_DETAILS_SUCCESS: {
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
            createdDate: userDetailsResp.createdDate,
            lastUpdateDateTime: userDetailsResp.lastUpdateDateTime,
            userType: userDetailsResp.userType
          },
        },
      };
    }
    default:
      return state;
  }
}

export const getUserDetails = (state: FlightState) => {
  console.log(state);
  return state.flight.user.userDetails;
};
