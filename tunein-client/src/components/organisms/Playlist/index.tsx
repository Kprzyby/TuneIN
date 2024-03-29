import React, { useContext, useEffect, useState } from "react";
import useInputBar from "@components/molecules/InputBar";
import DarkButton from "@components/molecules/DarkButton";
import useDarkButtonExpand from "@components/molecules/DarkButtonExpand";
import SongCard from "@components/molecules/SongCard";
import { useRouter } from "next/navigation";
import { UserData } from "@components/context/UserContext";
import { Typography } from "@components/styles/typography";

import { setLastViewUserEdit } from "../../../api/cookie/localStorageHandler";
import { ENDPOINTS, createDBEndpoint } from "../../../api/endpoint";

import * as Styled from "./styles";
import {
  PlaylistType,
  Props,
  SearchSongDetailsType,
  SearchSongType,
} from "./types";
import { headSort, listSort } from "./consts";

const Playlist: React.FC<Props> = ({ playlist }) => {
  const { user } = useContext(UserData);
  const router = useRouter();
  const [isFindMore, setIsFindMore] = useState(false);
  const [searchSongs, setSearchSongs] = useState<undefined | SearchSongType[]>(
    undefined
  );
  const [pPlaylist, setPPlaylist] = useState<undefined | PlaylistType>(
    undefined
  );
  const { pickedItem: pickedCategory, renederDBtnExp: renderCategoryBtn } =
    useDarkButtonExpand(listSort, headSort);
  const searchInputBar = useInputBar({ type: "search" });
  const fmInputBar = useInputBar({});

  const handleEditClick = () => {
    setLastViewUserEdit("Playlists");
    router.replace(`/user/${user?.userName}/edit`);
  };
  const handleSongClicked = (id: number) => {
    // TODO: add single song view
  };
  const getSongSerch = async (input: string) => {
    await createDBEndpoint(ENDPOINTS.songs.getSongSearch)
      .get({ name: input })
      .then((res: any) => {
        const array: SearchSongType[] = res.data;

        setSearchSongs(array);
      });
  };
  const getSongDetails = async (name: string, band: string) => {
    let details: SearchSongDetailsType | undefined;

    await createDBEndpoint(ENDPOINTS.songs.getTrackInfo)
      .get({ artist: band, trackName: name })
      .then((res: any) => {
        details = res.data;
      })
      .catch();

    return details;
  };
  const addSongToPlaylist = async (id: string) => {
    await createDBEndpoint(ENDPOINTS.playlists.addSong + playlist.id)
      .put({ trackId: id })
      .then(() => {
        // TODO: idk make it less idiotic
        router.refresh();
      })
      .catch((err: any) => {
        if (err.response.status === 404) {
          // TODO: handle already exists in playlist
        }
      });
  };
  const removeSongFromPlaylist = async (id: number) => {
    await createDBEndpoint(ENDPOINTS.playlists.removeSong + playlist.id)
      .delete({ trackId: id })
      .then(() => {
        // TODO: idk make it less idiotic
        router.refresh();
      })
      .catch((err: any) => {
        // TODO: handle this err
      });
  };
  const addSongToDB = async (details: SearchSongDetailsType) => {
    let songId: string | undefined;

    await createDBEndpoint(ENDPOINTS.songs.addSong)
      .post(details)
      .then((res: any) => {
        songId = res.data.id;
      })
      .catch((err: any) => {
        if (err.response.status === 409) {
          const { id } = err.response.data;

          addSongToPlaylist(id);
        }
      });

    return songId;
  };
  const handleAddSong = async (name: string, band: string) => {
    let details: SearchSongDetailsType | undefined;

    await getSongDetails(name, band).then((res) => {
      details = res;
    });
    if (!details) return;
    let id: string | undefined;

    await addSongToDB(details).then((res) => {
      id = res;
    });
    if (!id) return;
    addSongToPlaylist(id);
  };

  useEffect(() => {
    setPPlaylist(playlist);
  }, [playlist]);
  useEffect(() => {
    if (fmInputBar.barInput === "") {
      setSearchSongs(undefined);

      return;
    }
    getSongSerch(fmInputBar.barInput);
  }, [fmInputBar.barInput]);

  return (
    <Styled.Wrapper>
      <Styled.ToolBox>
        <Styled.UpRow>{searchInputBar.renderInputBar}</Styled.UpRow>
        <Styled.DownRow>
          <Styled.DownRowSide>{renderCategoryBtn}</Styled.DownRowSide>
          <Styled.DownRowSide>
            <button
              type="button"
              style={{ backgroundColor: "transparent", border: "unset" }}
              onClick={handleEditClick}
            >
              <DarkButton text="Edit" />
            </button>
          </Styled.DownRowSide>
        </Styled.DownRow>
      </Styled.ToolBox>
      <Styled.List>
        {pPlaylist &&
          pPlaylist.trackInfos.map((i, index) => {
            let isLast = false;

            if (index === pPlaylist.trackInfos.length - 1) isLast = true;

            return (
              <Styled.ItemWrapper
                key={i.id}
                onClick={() => handleSongClicked(i.id)}
                {...{ isLast }}
              >
                <div style={{ flex: "auto" }}>
                  <SongCard name={i.trackName} band={i.band} genre={i.genre} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Styled.ClearBtn
                    type="button"
                    onClick={() => removeSongFromPlaylist(i.id)}
                  >
                    <DarkButton>
                      <Typography variant="EditorList">Remove</Typography>
                    </DarkButton>
                  </Styled.ClearBtn>
                </div>
              </Styled.ItemWrapper>
            );
          })}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          {!isFindMore ? (
            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "unset",
                width: "auto",
              }}
              onClick={() => setIsFindMore(true)}
            >
              <DarkButton text="Find more" />
            </button>
          ) : (
            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "unset",
                width: "auto",
              }}
              onClick={() => setIsFindMore(false)}
            >
              <DarkButton text="Exit" />
            </button>
          )}
        </div>
      </Styled.List>
      {isFindMore && (
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingBottom: "1rem",
            }}
          >
            <Typography variant="PasswordTileTitle">
              Find and add songs
            </Typography>
          </div>
          {fmInputBar.renderInputBar}
          <Styled.List>
            {searchSongs &&
              searchSongs.map((i, index) => {
                let isLast = false;

                if (index === searchSongs.length - 1) isLast = true;

                return (
                  <Styled.ItemWrapper key={i.url} {...{ isLast }}>
                    <div style={{ flex: "auto" }}>
                      <SongCard name={i.name} band={i.artist} genre="temp" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Styled.ClearBtn
                        type="button"
                        onClick={() => handleAddSong(i.name, i.artist)}
                      >
                        <DarkButton>
                          <Typography variant="EditorList">Add</Typography>
                        </DarkButton>
                      </Styled.ClearBtn>
                    </div>
                  </Styled.ItemWrapper>
                );
              })}
          </Styled.List>
        </div>
      )}
    </Styled.Wrapper>
  );
};

export default Playlist;
