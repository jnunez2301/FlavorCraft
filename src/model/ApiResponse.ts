import User from "./User";

type ApiResponse = {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
  session: User;
  token?: string;
}

export default ApiResponse;