import React, { useEffect, useState } from 'react';
import useInputBar from '@components/molecules/InputBar';
import { Typography } from '@components/styles/typography';
import PlaylistCard from '@components/molecules/PlaylistCard';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';
import { PlaylistType } from './types';
import { Playlists } from './consts';

const EditPlaylists: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const { renderInputBar, barInput } = useInputBar({});

  const handlePlaylistClick = (name: string) => {
    // TODO: handle route change
    console.log(name);
  };
  const handleAddPlaylist = () => {
    // TODO: handle new playlist
    console.log('new Playlist');
  };

  useEffect(() => {
    // TODO: handle filtr playlists
    console.log(barInput);
  }, [barInput]);
  useEffect(() => {
    setIsEmpty(false);
    if (Playlists.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.Header>
        <div style={{ marginLeft: '-50%', width: 'inherit' }}>{renderInputBar}</div>
        <div style={{ paddingRight: '2rem', display: 'flex', alignItems: 'center' }}>
          <Styled.ClearBtn type="button" onClick={handleAddPlaylist}>
            <DarkButton>
              <Typography variant="EditorList">Add New</Typography>
            </DarkButton>
          </Styled.ClearBtn>
        </div>
      </Styled.Header>
      {isEmpty
        ? (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <div>
              <Styled.ClearBtn type="button" onClick={handleAddPlaylist}>
                <DarkButton>
                  <Typography variant="RegisterSuccess">Add New Playlist</Typography>
                </DarkButton>
              </Styled.ClearBtn>
            </div>
          </div>
        )
        : (
          <ul style={{ width: '100%', maxHeight: '100%', overflow: 'auto' }}>
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
        )}
    </Styled.Wrapper>
  );
};

export default EditPlaylists;
