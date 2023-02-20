import React from 'react';
import * as Styled from './styles';

function Heropage() {
    const wrapRef = React.useRef<HTMLDivElement>(null);
    const setScroll = (dY: number) => {
        // for up scroll
        // if (dY < 0) {
        //     if(wrapRef.current){
        //         window.scrollTo({
        //             top: wrapRef.current?.offsetTop,
        //             behavior: 'smooth'
        //         });
        //     }
        // }
        if (dY > 0) {
            if(wrapRef.current){
                window.scrollTo({
                    top: wrapRef.current?.offsetHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
  return (
    <Styled.Wrapper ref={wrapRef} onWheel={(e)=>setScroll(e.deltaY)}>
        <Styled.Content>
            <Styled.Title variant="Logo">TuenIN</Styled.Title>
            <Styled.Discription variant="Logo">Objectively your best place to learn and teach music</Styled.Discription>
        </Styled.Content>
    </Styled.Wrapper>
  )
}

export default Heropage;
