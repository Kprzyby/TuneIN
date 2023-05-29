export interface Props {
  playlist: PlaylistType;
}
export interface AuthorType {
  id: number;
  username: string;
}
export interface SongType {
  id: number
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
export type StyledProps = {
  isLast: boolean;
};
export type SearchSongType = {
  name: string;
  artist: string;
  url: string;
};
export type SearchSongDetailsType = {
  band: string;
  genre: string;
  linkToCover: string;
  trackName: string;
};
