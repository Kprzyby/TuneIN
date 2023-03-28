import styled from "styled-components";
import { AnnouncementProperties } from "./types";

export const Announcement = styled.div<AnnouncementProperties>`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ img }) => img ? `url(${img}) no-repeat center/cover` : '#ccc'};
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
