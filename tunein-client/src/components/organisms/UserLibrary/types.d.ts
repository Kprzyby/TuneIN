export interface StyledProps {
  isHighlighted?: boolean;
}
export interface AuthorType {
  id: number;
  username: string;
}
export interface SongType {
  id: number;
  trackName: string;
  band: string;
  genre: string;
  linkToCover: string;
  linkToTabs: string;
  author: AuthorType;
}
export interface PlaylistType {
  id: number;
  name: string;
  userId: number;
  trackInfos: SongType[];
}
