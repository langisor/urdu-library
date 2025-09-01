export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  score: number;
}

export interface UserState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}