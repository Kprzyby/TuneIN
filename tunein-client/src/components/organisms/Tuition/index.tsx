import React, { useContext } from 'react';
import { Typography } from '@components/styles/typography';
import useRichText from '@components/molecules/RichText';
import Link from 'next/link';
import { UserData } from '@components/context/UserContext';
import { useRouter } from 'next/router';
import { Props } from './types';
import * as Styled from './styles';
import { Message } from '../../../../public/assets/svg';
import { ENDPOINTS, createDBEndpoint } from '../../../api/endpoint';
import { error } from 'console';

const Tuition: React.FC<Props> = ({ tuition }) => {
  const { renderDraftDisplay, editorState } = useRichText({ tuition });
  const isTextEmpty = !editorState.getCurrentContent().hasText();
  const router = useRouter();
  const { user } = useContext(UserData);
  const handleSendMessage = () => {
    createDBEndpoint(ENDPOINTS.chat.createChat)
      .post({ topic:'Tutorship offer', participantsIds:[tuition?.author.id] }, false)
      .catch((error)=>{
        if(error.response.status===409){
          console.log("Chat already exists");
        }
        else{
          console.log(error.response.data);
        }
      })
      .finally(() => {
        router.push(`/user/${user?.userName}/messages`);
      });
  };
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Typography variant="RegisterSuccess">{tuition?.title}</Typography>
        <Styled.TopBarWrapper>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            { user && (
            <button
              style={{
                background: 'transparent',
                border: 'unset',
                cursor: 'pointer',
                width: '3rem',
              }}
              type="button"
              onClick={handleSendMessage}
              hidden={user.id===tuition?.author.id?true:false}
            >
              <Message />
            </button>
            )}
            <Link href={`/user/${tuition?.author.username}`}>
              <Typography variant="TuitionTopBarItem">{tuition?.author.username}</Typography>
            </Link>
          </div>
          <Styled.TopBarRight>
            <Styled.TopBarItem>
              <Typography variant="TuitionTopBarItem">Category: </Typography>
              <Typography variant="EditorList">{tuition?.category}</Typography>
            </Styled.TopBarItem>
            <Styled.TopBarItem>
              <Typography variant="TuitionTopBarItem">Price:</Typography>
              <Typography variant="EditorList">{tuition?.price}</Typography>
            </Styled.TopBarItem>
          </Styled.TopBarRight>
        </Styled.TopBarWrapper>
        <div style={{ maxWidth: '50%' }}>
          {isTextEmpty
            ? (<Typography variant="PasswordTileTitle">No Description</Typography>)
            : renderDraftDisplay}
        </div>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Tuition;
