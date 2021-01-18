import { UserDetailsModel } from 'src/app/shared/models/user-details.model';

export interface UserDetsRespModel {
  status: number;
  message: string;
  dataObject: {
    appName: string;
    routeName: string;
    data: UserDetailsModel[];
  };
}
