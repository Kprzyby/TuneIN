import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { Typography } from "@components/styles/typography";

import DarkButton from "../DarkButton";

import { Props } from "./types";
import * as Styled from "./styles";

const useDarkButtonExpand = (items: Props["items"], head: Props["head"]) => {
  const [isCollapsed, setIsCollapse] = useState(false);
  const [pickedItem, setPickedItem] = useState(items[0].value);
  const handleClick = () => {
    setIsCollapse(!isCollapsed);
  };
  const handleItemPick = (item: string) => {
    setPickedItem(item);
  };

  return {
    pickedItem,
    renederDBtnExp: (
      <Styled.Wrapper isCollapsed={isCollapsed}>
        <Styled.Button onClick={handleClick}>
          <DarkButton text={head} />
        </Styled.Button>
        <Styled.ListWrapper>
          <Collapse isOpened={isCollapsed}>
            <ul>
              {items.map((i) => (
                <li key={i.title}>
                  <Styled.Item
                    ishighlighted={pickedItem === i.value}
                    onClick={() => handleItemPick(i.value.toString())}
                  >
                    <Typography variant="Buttons">{i.title}</Typography>
                  </Styled.Item>
                </li>
              ))}
            </ul>
          </Collapse>
        </Styled.ListWrapper>
      </Styled.Wrapper>
    ),
  };
};

export default useDarkButtonExpand;
