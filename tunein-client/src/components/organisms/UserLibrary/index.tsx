import React, { useEffect, useState } from 'react';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import Playlist from '../Playlist';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { PlaylistType } from './types';
import { getLastViewPlaylist, setLastViewPlaylist } from '../../../api/cookie/localStorageHandler';

const UserLibrary: React.FC = () => {
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);
  const [pPlaylistID, setPPlaylistID] = useState<undefined | number>(undefined);
  const [pPlaylist, setPPlaylist] = useState<undefined | PlaylistType>(undefined);
  const [playlists, setPlaylists] = useState<undefined | PlaylistType[]>(undefined);

  const getPlaylists = async () => {
    await createDBEndpoint(ENDPOINTS.playlists.getUserPlaylists)
      .post({
        pageSize: 100,
        pageNumber: 1,
        playlistNameFilterValue: '',
        trackNameFilterValue: '',
        descriptionTagsFilterValue: '',
      })
      .then((res) => {
        const tempData: PlaylistType[] = res.data.playlists;
        setPlaylists(tempData);
        setPPlaylistID(getLastViewPlaylist() || tempData[0].id);
      });
  };
  const getPlaylistByID = (inID: number) => {
    if (!playlists) return;
    const p = playlists.find(({ id }) => id === inID);
    setPPlaylist(p);
  };

  useEffect(() => {
    if (!pPlaylistID) return;
    setLastViewPlaylist(pPlaylistID);
    getPlaylistByID(pPlaylistID);
  }, [pPlaylistID]);
  useEffect(() => {
    getPlaylists();
    setIsPlaylistsLoading(false);
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.PlaylistList>
          {isPlaylistsLoading
            ? <Loader borderColor="white transparent" />
            : playlists && playlists.length > 0 && playlists.map((i) => {
              const isHighlighted = i.id === pPlaylistID;
              return (
                <button
                  style={{ border: 'unset', backgroundColor: 'transparent', cursor: 'pointer' }}
                  type="button"
                  key={i.id}
                  onClick={() => setPPlaylistID(i.id)}
                >
                  <Styled.NavigationItem variant="ProfileNavbar" {...{ isHighlighted }}>
                    {i.name}
                  </Styled.NavigationItem>
                </button>
              );
            })}
        </Styled.PlaylistList>
        <Styled.PlaylistWrapper>
          {pPlaylist && <Playlist playlist={pPlaylist} />}
        </Styled.PlaylistWrapper>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default UserLibrary;
