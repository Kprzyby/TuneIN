import styled from "styled-components";

export const Announcement = styled.div<{ imageURL: string }>`
  position: relative;
  aspect-ratio: 16 / 9;
  /* background-image: url(${(props) => props.imageUrl}); */
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SeeTrough = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  opacity: 50%;
`;

export const Title = styled.p``;

export const Interested = styled.p``;
