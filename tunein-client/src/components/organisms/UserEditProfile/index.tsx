import React, { useState } from 'react';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';
import { Musicians } from '../../../../public/assets/svg';
import RecoverPasswordForm from '../PasswordRecoveryForm';

const EditProfile = () => {
  const [pickedPP, setPickedPP] = useState<number | undefined>(undefined);
  const [toggleEmail, setToggleEmail] = useState(false);
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
          if (id === pickedPP) {
            isHighlited = true;
          }
          return (
            <li key={m.Musician.toString()}>
              <Styled.PPButton
                type="button"
                isPHighlighted={isHighlited}
                onClick={() => setPickedPP(id)}
              >
                <m.Musician style={{ width: '8rem', height: '8rem' }} />
              </Styled.PPButton>
            </li>
          );
        })}
      </Styled.PPList>
    </Styled.Wrapper>
  );
};

export default EditProfile;
