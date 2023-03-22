import React, { useRef, useEffect } from 'react';
import * as Styled from './styles';

interface ToggleButtonProperties {
  text: string;
  toggleState: boolean;
  onClick: (Event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToggleButton: React.FC<ToggleButtonProperties> = ({ text, toggleState, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = toggleState ? (
        'green'
      ) : (
        'red'
      );
    }
  }, [toggleState]);

  return (
    <Styled.ToggleButton ref={buttonRef} onClick={onClick}>
      {text}
    </Styled.ToggleButton>
  );
};

export default ToggleButton;
