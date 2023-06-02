import React, { useContext, useEffect, useState } from 'react';
import useInputBar from '@components/molecules/InputBar';
import { Typography } from '@components/styles/typography';
import PlaylistCard from '@components/molecules/PlaylistCard';
import DarkButton from '@components/molecules/DarkButton';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import * as Styled from './styles';
import { PlaylistType } from './types';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { setLastViewPlaylist } from '../../../api/cookie/localStorageHandler';

const EditPlaylists: React.FC = () => {
  const router = useRouter();
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [isNewPlaylist, setIsNewPlaylist] = useState(false);
  const [isRenamePlaylist, setIsRenamePlaylist] = useState(false);
  const [renamePlaylistID, setRenamePlaylistID] = useState<undefined | number>(undefined);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { renderInputBar, barInput } = useInputBar({});
  const { user } = useContext(UserData);

  const handlePlaylistClick = (id: number) => {
    setLastViewPlaylist(id);
    router.push({
      pathname: '/user/[username]/library',
      query: { username: user?.userName },
    });
  };
  const loadPlaylists = async () => {
    await createDBEndpoint(ENDPOINTS.playlists.getPlaylistsData)
      .get({ playlistName: barInput })
      .then((res) => {
        const tmpData: PlaylistType[] = res.data;
        if (!tmpData || tmpData.length < 0) return;
        setPlaylists(tmpData);
      });
  };
  const handleDeletePlaylist = async (id: number) => {
    await createDBEndpoint(ENDPOINTS.playlists.deletePlaylist + id)
      .delete()
      .then(() => {
        loadPlaylists();
      });
  };
  const handleRenamePlaylist = async () => {
    await createDBEndpoint(ENDPOINTS.playlists.renamePlaylist + renamePlaylistID)
      .put({ newName: newPlaylistName })
      .then(() => {
        loadPlaylists();
        setIsRenamePlaylist(false);
        setNewPlaylistName('');
      });
  };
  const handleAddPlaylist = async () => {
    if (!newPlaylistName) return;
    await createDBEndpoint(ENDPOINTS.playlists.addPlaylist + newPlaylistName)
      .post({ playlistName: newPlaylistName })
      .then(() => {
        loadPlaylists();
      });
    setIsNewPlaylist(false);
    setNewPlaylistName('');
  };

  useEffect(() => {
    loadPlaylists();
    // TODO: handle sorting
    console.log(barInput);
  }, [barInput]);
  return (
    <Styled.Wrapper>
      {(isNewPlaylist || isRenamePlaylist) && (
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
            {isNewPlaylist ? (
              <>
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
              </>
            )
              : (
                <>
                  <input
                    style={{ borderRadius: '0.5rem', padding: '0.3rem 0.5rem' }}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New Name"
                  />
                  <div style={{ display: 'flex', flexFlow: 'row' }}>
                    <Styled.ClearBtn type="button" onClick={handleRenamePlaylist}>
                      <DarkButton text="Rename" />
                    </Styled.ClearBtn>
                    <Styled.ClearBtn type="button" onClick={() => setIsRenamePlaylist(false)}>
                      <DarkButton text="Cancel" />
                    </Styled.ClearBtn>
                  </div>
                </>
              )}
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
        width: '100%', height: '100%', overflow: 'auto', position: 'relative',
      }}
      >
        {playlists.length > 0 && playlists.map((playlist: PlaylistType, index) => {
          let isLast = false;
          if (index === playlists.length - 1) isLast = true;
          return (
            <li style={{ display: 'flex', flexFlow: 'row nowrap' }} key={playlist.id}>
              <Styled.ClearBtn type="button" onClick={() => handlePlaylistClick(playlist.id)}>
                <PlaylistCard
                  {...playlist}
                  {...{ styled: { isLast } }}
                />
              </Styled.ClearBtn>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100%',
                flex: '1',
              }}
              >
                <Styled.ClearBtn
                  type="button"
                  onClick={() => {
                    setRenamePlaylistID(playlist.id);
                    setIsRenamePlaylist(true);
                  }}
                >
                  <DarkButton>
                    <Typography variant="EditorList">Rename</Typography>
                  </DarkButton>
                </Styled.ClearBtn>
                <Styled.ClearBtn type="button" onClick={() => handleDeletePlaylist(playlist.id)}>
                  <DarkButton>
                    <Typography variant="EditorList">Delete</Typography>
                  </DarkButton>
                </Styled.ClearBtn>
              </div>
            </li>
          );
        })}
      </ul>
    </Styled.Wrapper>
  );
};

export default EditPlaylists;
