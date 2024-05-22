type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  profilePhoto?: string;
  lastName: string;
  password: string;
  profileImageKey: string;
  profileImageUrl: string;
  fullName: string;
};

type UserWithFollows = User & {
  /**
   * If both the current user and the user in question are following each other, this will be true.
   */
  areFriends: boolean;
};

export { User, UserWithFollows };
