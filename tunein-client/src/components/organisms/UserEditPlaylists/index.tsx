import React, { useEffect, useState } from 'react';
import useInputBar from '@components/molecules/InputBar';
import { Typography } from '@components/styles/typography';
import PlaylistCard from '@components/molecules/PlaylistCard';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';
import { PlaylistType } from './types';
import { Playlists } from './consts';

const EditPlaylists: React.FC = () => {
  const [isNewPlaylist, setIsNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { renderInputBar, barInput } = useInputBar({});

  const handlePlaylistClick = (name: string) => {
    // TODO: handle route change to picked playlist
    console.log(name);
  };
  const handleAddPlaylist = () => {
    // TODO: handle add new playlist
    setIsNewPlaylist(false);
    if (!newPlaylistName) return;
    console.log(`new Playlist with name: ${newPlaylistName}`);
    setNewPlaylistName('');
  };

  useEffect(() => {
    // TODO: handle filter playlists
    console.log(barInput);
  }, [barInput]);

  return (
    <Styled.Wrapper>
      {isNewPlaylist && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '1',
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <div style={{ display: 'flex', flexFlow: 'column wrap', gap: '0.5rem' }}>
            <input
              style={{ borderRadius: '0.5rem', padding: '0.3rem 0.5rem' }}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist's Name"
            />
            <div style={{ display: 'flex', flexFlow: 'row' }}>
              <Styled.ClearBtn type="button" onClick={handleAddPlaylist}>
                <DarkButton text="Add" />
              </Styled.ClearBtn>
              <Styled.ClearBtn type="button" onClick={() => setIsNewPlaylist(false)}>
                <DarkButton text="Cancel" />
              </Styled.ClearBtn>
            </div>
          </div>
        </div>
      )}
      <Styled.Header>
        <div style={{ marginLeft: '-50%', width: 'inherit' }}>{renderInputBar}</div>
        <div style={{ paddingRight: '2rem', display: 'flex', alignItems: 'center' }}>
          <Styled.ClearBtn type="button" onClick={() => setIsNewPlaylist(true)}>
            <DarkButton>
              <Typography variant="EditorList">Add New</Typography>
            </DarkButton>
          </Styled.ClearBtn>
        </div>
      </Styled.Header>
      <ul style={{
        width: '100%', maxHeight: '100%', overflow: 'auto', position: 'relative',
      }}
      >
        {Playlists.map((playlist: PlaylistType, id) => {
          let isLast = false;
          if (id === Playlists.length - 1) isLast = true;
          return (
            <li style={{ display: 'flex' }}>
              <Styled.ClearBtn type="button" onClick={() => handlePlaylistClick(playlist.name)}>
                <PlaylistCard
                  {...playlist}
                  {...{ styled: { isLast } }}
                />
              </Styled.ClearBtn>
            </li>
          );
        })}
      </ul>
    </Styled.Wrapper>
  );
};

export default EditPlaylists;
