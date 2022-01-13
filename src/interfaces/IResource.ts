export interface IResource {
  id?: number;
  author_id: number;
  title: string;
  description: string;
  recommended: string;
  url: string;
  date_added: number;
  content_type: string
}
