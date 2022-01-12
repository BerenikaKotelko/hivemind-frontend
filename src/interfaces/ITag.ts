export interface ITag {
  tag_id: number;
  tag_name: string;
}

export interface ITagResource extends ITag {
  resource_id: number;
}
