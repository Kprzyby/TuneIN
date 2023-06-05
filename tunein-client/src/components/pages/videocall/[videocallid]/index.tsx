import { GetStaticProps, NextPage } from "next";
import React from "react";
import VideoCall from "@components/organisms/VideoCall";

import { activeVideoCalls, activeVideoCallsID } from "./consts";
import { Props, VideoCallType } from "./types";

const VideoCallPage: NextPage<Props> = ({ videocall }: Props) => (
  <VideoCall {...{ videocall }} />
);

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { params } = context;
  const pickedVideoCall = activeVideoCalls.find(
    (x: VideoCallType) => x.id === params?.videocallid
  );

  if (pickedVideoCall === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      videocall: pickedVideoCall || {},
    },
    revalidate: 20,
  };
};
export const getStaticPaths = async () => {
  const videoCallsID = activeVideoCallsID;

  return {
    paths: videoCallsID.map((id: string) => ({
      params: { videocallid: id },
    })),
    fallback: true,
  };
};
export default VideoCallPage;
