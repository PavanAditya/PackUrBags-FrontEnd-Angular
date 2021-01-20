export interface UserDetailsModel {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  picture: string;
  tokens: string[];
  verifiedPhNum: boolean;
  createdDate: Date;
  lastUpdateDateTime: Date;
  userType: string;
};
