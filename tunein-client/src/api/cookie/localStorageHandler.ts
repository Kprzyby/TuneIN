const lvPlaylistKey = 'lvP';
const lvUserEditKey = 'lvuEit';
type LVUserEditValues = 'Profile' | 'Playlists' | 'Tutorships';

export const setLastViewPlaylist = (id: number) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(lvPlaylistKey, id.toString());
};
export function getLastViewPlaylist() {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(lvPlaylistKey);
  return !value ? null : Number.parseInt(value, 10);
}
export const setLastViewUserEdit = (label: LVUserEditValues) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(lvUserEditKey, label);
};
export function getLastViewUserEdit() {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(lvUserEditKey);
  return value;
}
