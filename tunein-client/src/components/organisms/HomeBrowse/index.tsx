import RgbButton from "@components/molecules/RgbButton";
import { useRouter } from "next/router";
import React, { cloneElement, useEffect, useState } from "react";

import * as Styled from "./styles";

const HomeBrowse: React.FC = () => {
  const [boxSize, setBoxSize] = useState(0.4);
  const [textSize, setTextSize] = useState(1);
  const [borderSize, setBorderSize] = useState(0.1);
  const breakpoints = {
    xxxlarge: {
      width: 3000,
      boxSize: 0.8,
      textSize: 2.0,
      borderSize: 0.2,
    },
    xxlarge: {
      width: 900,
      boxSize: 0.5,
      textSize: 0.9,
      borderSize: 0.118,
    },
    xlarge: {
      width: 720,
      boxSize: 0.5,
      textSize: 0.6,
      borderSize: 0.07,
    },
    large: {
      width: 600,
      boxSize: 0.5,
      textSize: 0.5,
      borderSize: 0.07,
    },
    medium: {
      width: 370,
      boxSize: 0.25,
      textSize: 0.45,
      borderSize: 0.07,
    },
    small: {
      width: 220,
      boxSize: 0.2,
      textSize: 0.45,
      borderSize: 0.06,
    },
  };
  const handleResize = () => {
    const currentSize = window.outerWidth;

    Object.values(breakpoints).map((e) => {
      if (currentSize >= e.width) return 0;
      setBoxSize(e.boxSize);
      setTextSize(e.textSize);
      setBorderSize(e.borderSize);

      return 1;
    });
  };
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Icon />
        <Styled.RightSide>
          <Styled.Text variant="HomepageText">
            Browse for your desired lessons and achieve your goals
          </Styled.Text>
          <div onClick={(e) => handleClick(e)}>
            {cloneElement(
              <RgbButton
                text="Browse"
                boxSize={boxSize}
                textSize={textSize}
                borderSize={borderSize}
              />
            )}
          </div>
        </Styled.RightSide>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default HomeBrowse;
