import React, { useEffect, useState } from 'react';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import { Playlists } from './consts';

const UserLibrary: React.FC = () => {
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(true);
  const [pPlaylist, setPPlaylist] = useState(0);
  const [playlists, setPlaylists] = useState(Playlists);

  useEffect(() => {
    setIsPlaylistsLoading(false);
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.PlaylistList>
          {isPlaylistsLoading
            ? <Loader borderColor="white transparent" />
            : playlists.map((i) => {
              const isHighlighted = i.id === pPlaylist;
              return (
                <button
                  style={{ border: 'unset', backgroundColor: 'transparent', cursor: 'pointer' }}
                  type="button"
                  onClick={() => setPPlaylist(i.id)}
                >
                  <Styled.NavigationItem variant="ProfileNavbar" {...{ isHighlighted }}>
                    {i.name}
                  </Styled.NavigationItem>
                </button>
              );
            })}
        </Styled.PlaylistList>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default UserLibrary;
