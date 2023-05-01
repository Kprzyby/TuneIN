import React from 'react';
import { Typography } from '@components/styles/typography';
import useRichText from '@components/molecules/RichText';
import Link from 'next/link';
import { Props } from './types';
import * as Styled from './styles';

const Tuition: React.FC<Props> = ({ tuition }) => {
  const { renderDraftDisplay, editorState } = useRichText({ tuition });
  const isTextEmpty = !editorState.getCurrentContent().hasText();
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Typography variant="PasswordTitile">{tuition?.title}</Typography>
        <Styled.TopBarWrapper>
          <Link href={`/user/${tuition?.author.username}`}>
            <Typography variant="TuitionTopBarItem">{tuition?.author.username}</Typography>
          </Link>
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
