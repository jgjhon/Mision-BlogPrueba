import { User } from "./user.model";

export interface Post{
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
}
