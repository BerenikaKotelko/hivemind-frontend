import { ITag } from "./ITag";

export interface IResource {
  id: number;
  author_id: number;
  title: string;
  description: string;
  type: string;
  recommended: string;
  url: string;
  week: string;
  date_added: number;
  name: string;
  is_faculty: boolean;
  likes: number;
  dislikes: number;
  tags: ITag[];
}

export interface IStudyListResource extends IResource {
  studied: boolean;
}
