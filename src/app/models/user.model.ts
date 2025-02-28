export interface User {
  avatar: string;
  name: string | null;
  username: string;
  email: string | null;
  bio: string | null;
  githubUrl: string;
  blogUrl: string | null;
  company: string | null;
  location: string | null;
  publicRepositories: number;
  followers: number;
  followings: number;
}
