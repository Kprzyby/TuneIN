import React, { useContext, useEffect, useState } from 'react';
import useInputBar, {} from '@components/molecules/InputBar';
import DarkButton from '@components/molecules/DarkButton';
import useDarkButtonExpand from '@components/molecules/DarkButtonExpand';
import SongCard from '@components/molecules/SongCard';
import { useRouter } from 'next/router';
import { UserData } from '@components/context/UserContext';
import * as Styled from './styles';
import { PlaylistType, Props } from './types';
import { setLastViewUserEdit } from '../../../api/cookie/localStorageHandler';

const Playlist: React.FC<Props> = ({ playlist }) => {
  const router = useRouter();
  const { user } = useContext(UserData);
  const [pPlaylist, setPPlaylist] = useState<undefined | PlaylistType>(undefined);
  const headSort = 'Sort by';
  const listSort = [
    { title: 'By Title', value: 'title' },
    { title: 'By Band', value: 'band' },
    { title: 'By Genre', value: 'genre' }];
  const {
    pickedItem: pickedCategory,
    renederDBtnExp: renderCategoryBtn,
  } = useDarkButtonExpand(listSort, headSort);
  const { renderInputBar, barInput } = useInputBar({ type: 'search' });

  const handleEditClick = () => {
    setLastViewUserEdit('Playlists');
    router.push({
      pathname: '/user/[username]/edit',
      query: { username: user?.userName },
    });
  };
  const handleSongClicked = (id: number) => {
    // TODO: add single song view
    console.log(`Song clicked: ${id}`);
  };

  useEffect(() => {
    setPPlaylist(playlist);
  }, [playlist]);
  return (
    <Styled.Wrapper>
      <Styled.ToolBox>
        <Styled.UpRow>{renderInputBar}</Styled.UpRow>
        <Styled.DownRow>
          <Styled.DownRowSide>
            {renderCategoryBtn}
          </Styled.DownRowSide>
          <Styled.DownRowSide>
            <button
              type="button"
              style={{ backgroundColor: 'transparent', border: 'unset' }}
              onClick={handleEditClick}
            >
              <DarkButton text="Edit" />
            </button>
          </Styled.DownRowSide>
        </Styled.DownRow>
      </Styled.ToolBox>
      <Styled.List>
        {pPlaylist && pPlaylist.trackInfos.map((i, index) => {
          let isLast = false;
          if (index === pPlaylist.trackInfos.length - 1) isLast = true;
          return (
            <Styled.ItemWrapper
              key={i.id}
              onClick={() => handleSongClicked(i.id)}
              {...{ isLast }}
            >
              <SongCard
                name={i.trackName}
                band={i.band}
                genre={i.genre}
              />
            </Styled.ItemWrapper>
          );
        })}
      </Styled.List>
    </Styled.Wrapper>
  );
};

export default Playlist;
