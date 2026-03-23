type UserPublicFields = {
  id: number;
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
};

type UserPrivateFields = UserPublicFields & {
  email: string | null;
  role: string | null;
  createdAt?: Date | null;
};

export const sanitizeUserPublic = (user: UserPublicFields | null | undefined) => {
  if (!user) return user;

  return {
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
  };
};

export const sanitizeUserPrivate = (
  user: UserPrivateFields | null | undefined,
) => {
  if (!user) return user;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
  };
};
