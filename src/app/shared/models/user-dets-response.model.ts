import { UserDetailsModel } from './user-details.model';

export interface UserDetsRespModel {
  status: number;
  message: string;
  dataObject: {
    appName: string;
    routeName: string;
    data: UserDetailsModel[];
  };
}
