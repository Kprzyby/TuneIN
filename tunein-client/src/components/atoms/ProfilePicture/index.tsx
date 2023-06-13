import React, { useState } from "react";

import { Musicians } from "../../../../public/assets/svg";

import { Props } from "./types";

const ProfilePicture: React.FC<Props> = ({ id, width, height }) => {
  const [Icon] = useState(() => {
    if ((id || 0) > Musicians.length - 1) {
      return Musicians[0];
    }

    return Musicians[id || 0];
  });

  return <Icon.Musician width={`${width}rem`} height={`${height}rem`} />;
};

export default ProfilePicture;
