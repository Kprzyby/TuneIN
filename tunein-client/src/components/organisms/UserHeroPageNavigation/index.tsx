import React, { useState } from "react";

import * as Styled from "./styles";
import { Props } from "./types";

const useNavigation = ({ items }: Props) => {
  const [pickedNavigation, setPickedNavigation] = useState(items[0].label);

  return {
    pickedNavigation,
    renderNavigation: (
      <Styled.Wrapper>
        <Styled.Content>
          <Styled.List>
            {items.map((i) => {
              const isHighlighted = i.label === pickedNavigation;

              return (
                <li key={i.label}>
                  <button
                    style={{
                      border: "unset",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={() => setPickedNavigation(i.label)}
                  >
                    <Styled.Item variant="ProfileNavbar" {...{ isHighlighted }}>
                      {i.label}
                    </Styled.Item>
                  </button>
                </li>
              );
            })}
          </Styled.List>
        </Styled.Content>
      </Styled.Wrapper>
    ),
  };
};

export default useNavigation;
