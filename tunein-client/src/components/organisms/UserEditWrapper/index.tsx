import React, { useEffect, useState } from "react";

import EditTuitions from "../UserEditTuitions";
import EditProfile from "../UserEditProfile";
import EditPlaylists from "../UserEditPlaylists";
import {
  getLastViewUserEdit,
  setLastViewUserEdit,
} from "../../../api/cookie/localStorageHandler";

import * as Styled from "./styles";

const EditCnt: React.FC = () => {
  const nList = [
    { label: "Profile" },
    { label: "Playlists" },
    { label: "Tutorships" },
  ];
  const [pNaviagtion, setPNavigation] = useState<undefined | string>(undefined);
  const getEComponent = () => {
    let component;

    switch (pNaviagtion) {
      case "Profile":
        component = <EditProfile />;
        setLastViewUserEdit("Profile");
        break;
      case "Playlists":
        component = <EditPlaylists />;
        setLastViewUserEdit("Playlists");
        break;
      case "Tutorships":
        component = <EditTuitions />;
        setLastViewUserEdit("Tutorships");
        break;
      default:
        component = <EditProfile />;
        break;
    }

    return component;
  };

  useEffect(() => {
    setPNavigation(getLastViewUserEdit() || nList[0].label);
  }, []);

  return (
    <Styled.LWrapper>
      <Styled.LContent>
        <Styled.Wrapper>
          <Styled.NList>
            {nList.map((i) => {
              const isHighlighted = i.label === pNaviagtion;

              return (
                <li key={i.label}>
                  <button
                    style={{
                      border: "unset",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setPNavigation(i.label)}
                  >
                    <Styled.NItem
                      variant="ProfileNavbar"
                      {...{ isHighlighted }}
                    >
                      {i.label}
                    </Styled.NItem>
                  </button>
                </li>
              );
            })}
          </Styled.NList>
          <Styled.CWrapper>{getEComponent()}</Styled.CWrapper>
        </Styled.Wrapper>
      </Styled.LContent>
    </Styled.LWrapper>
  );
};

export default EditCnt;
