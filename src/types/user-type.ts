
export interface Profile {
  fullName: string;
  avatar: string;
  bio?: string;
}

export interface UserStats {
  totalPoints: number;
  solvedExercises: number;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  profile: Profile;
  stats: UserStats;
  verified: boolean;
  createdAt: Date,
  joinedAt: Date,
  isVerified: boolean
}

export interface UserState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  updatingProfile: boolean;
  error: string | null;
  registerMessage: string | null;
}
