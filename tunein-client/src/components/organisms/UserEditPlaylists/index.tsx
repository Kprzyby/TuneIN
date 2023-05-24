import React, { useEffect, useState } from 'react';
import useInputBar from '@components/molecules/InputBar';
import { Typography } from '@components/styles/typography';
import PlaylistCard from '@components/molecules/PlaylistCard';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';
import { PlaylistType } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import Router from 'next/router';

const EditPlaylists: React.FC = () => {
  const [playlists, setPlaylists]=useState([
    {
      id:0,
      name:'',
      trackAmount:0
    }
  ]);
  const [isNewPlaylist, setIsNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { renderInputBar, barInput } = useInputBar({});

  const handlePlaylistClick = (name: string) => {
    Router.push('/library');
    console.log(name);
  };
  const handleAddPlaylist = () => {
    if(newPlaylistName!=''){
      createDBEndpoint(ENDPOINTS.library.addPlaylist+newPlaylistName)
      .post({playlistName:newPlaylistName})
      .then(()=>{
        loadPlaylists();
      });
    }

    setIsNewPlaylist(false);
    if (!newPlaylistName) return;
    console.log(`new Playlist with name: ${newPlaylistName}`);
    setNewPlaylistName('');
  };

  useEffect(() => {
    loadPlaylists();
    console.log(barInput);
  }, [barInput]);

  const loadPlaylists=()=>{
    createDBEndpoint(ENDPOINTS.library.getPlaylistsData)
    .get({playlistName:barInput})
    .then((res)=>{
      const tmpData=res.data;
      setPlaylists(tmpData);
    })
  }

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
        {playlists.map((playlist: PlaylistType, index) => {
          let isLast = false;
          if (index === playlists.length - 1) isLast = true;
          return (
            <li style={{ display: 'flex' }} key={playlist.id}>
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
