import React, { useEffect, useRef, useState } from "react";

import { Props } from "./types";

const Camera: React.FC<Props> = ({ stream, size }: Props) => {
  const cameraRef = useRef<HTMLVideoElement>(null);
  const [videoWidth, setVideoWidth] = useState("");

  useEffect(() => {
    if (!cameraRef.current) return undefined;
    cameraRef.current.srcObject = stream;
    if (size) {
      setVideoWidth(`${size}rem`);
    } else {
      setVideoWidth("100%");
    }

    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream]);

  return (
    <div style={{ backgroundColor: "black", width: "fit-content" }}>
      <video
        ref={cameraRef}
        autoPlay
        style={{
          objectFit: "contain",
          width: videoWidth,
          aspectRatio: `${cameraRef.current?.width}/${cameraRef.current?.height}`,
        }}
      />
    </div>
  );
};

export default Camera;
