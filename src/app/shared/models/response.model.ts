export interface Response {
  message: string;
  status: number;
  dataObject: {
    appName: string;
    routeName: string;
    data: any;
  };
}
