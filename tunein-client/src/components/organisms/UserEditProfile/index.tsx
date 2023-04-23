import React, { useContext, useState } from 'react';
import DarkButton from '@components/molecules/DarkButton';
import { UserData } from '@components/context/UserContext';
import Loader from '@components/atoms/Loader';
import * as Styled from './styles';
import { Musicians } from '../../../../public/assets/svg';
import RecoverPasswordForm from '../PasswordRecoveryForm';
import { createDBEndpoint } from '../../../api/endpoint';
import { getUserCookie, updateUserCookie } from '../../../api/cookie/userCookie';

const EditProfile = () => {
  const [toggleEmail, setToggleEmail] = useState(false);
  const { user, setUser } = useContext(UserData);
  const [currAPicked, setCurrAPicked] = useState(user?.avatarId);
  const [isLoading, setIsLoading] = useState(false);

  const handleAChange = () => {
    if (user === undefined) return;
    setIsLoading(true);
    const dbPath = `User/${user.id}/UpdateAvatarIdAsync/${currAPicked}`;
    createDBEndpoint(dbPath).patch().then(async () => {
      await updateUserCookie(user.id);
      setUser(getUserCookie());
      setIsLoading(false);
    });
  };
  return (
    <Styled.Wrapper>
      <Styled.Title variant="RegisterSuccess">Username</Styled.Title>
      <Styled.Title variant="RegisterSuccess">Email</Styled.Title>
      <Styled.Title variant="RegisterSuccess">Password</Styled.Title>
      <Styled.FormWrapper>
        <button
          type="button"
          style={{ border: 'unset', cursor: 'pointer', background: 'transparent' }}
          onClick={() => setToggleEmail(!toggleEmail)}
        >
          {toggleEmail ? <DarkButton text="Hide Form" /> : <DarkButton text="Show Form" />}
        </button>
        {toggleEmail && <RecoverPasswordForm />}
      </Styled.FormWrapper>
      <Styled.Title variant="RegisterSuccess">Profile Pricture</Styled.Title>
      <Styled.PPList>
        {Musicians.map((m, id) => {
          let isHighlited = false;
          let isLast = false;
          if (id === currAPicked) isHighlited = true;
          if (id === user?.avatarId) isLast = true;
          if (isLoading && isHighlited) {
            return <Loader borderColor="white transparent" key={m.Musician.toString()} />;
          }
          return (
            <li key={m.Musician.toString()}>
              <Styled.PPButton
                type="button"
                isCurr={isHighlited}
                isLast={isLast}
                onClick={() => setCurrAPicked(id)}
              >
                <m.Musician style={{ width: '8rem', height: '8rem' }} />
              </Styled.PPButton>
            </li>
          );
        })}
      </Styled.PPList>
      {currAPicked !== user?.avatarId
        && (
        <button
          type="button"
          style={{ border: 'unset', cursor: 'pointer', background: 'transparent' }}
          onClick={handleAChange}
        >
          <DarkButton text="Change Avatar" />
        </button>
        )}
    </Styled.Wrapper>
  );
};

export default EditProfile;
