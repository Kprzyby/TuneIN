import React, { useState } from 'react';
import * as Styled from './styles';
import EditTuitions from '../UserEditTuitions';
import EditProfile from '../UserEditProfile';

const EditCnt: React.FC = () => {
  const nList = [{ label: 'Profile' }, { label: 'Playlists' }, { label: 'Tuitions' }];
  const [pNaviagtion, setPNavigation] = useState(nList[0].label);
  const getEComponent = () => {
    let component;
    switch (pNaviagtion) {
      case 'Profile':
        component = <EditProfile />;
        break;
      case 'Playlists':
        component = 'temp';
        break;
      case 'Tuitions':
        component = <EditTuitions />;
        break;
      default:
        component = 'temp';
        break;
    }
    return component;
  };
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
                    style={{ border: 'unset', backgroundColor: 'transparent', cursor: 'pointer' }}
                    type="button"
                    onClick={() => setPNavigation(i.label)}
                  >
                    <Styled.NItem variant="ProfileNavbar" {...{ isHighlighted }}>
                      {i.label}
                    </Styled.NItem>
                  </button>
                </li>
              );
            })}
          </Styled.NList>
          <Styled.CWrapper>
            {getEComponent()}
          </Styled.CWrapper>
        </Styled.Wrapper>
      </Styled.LContent>
    </Styled.LWrapper>
  );
};

export default EditCnt;
