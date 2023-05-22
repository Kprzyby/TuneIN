import React from 'react';
import CountUp from 'react-countup';
import * as Styled from './styles';

const HomeCounter: React.FC = () => {
  // test values
  const counterList = [
    {
      number: 20,
      title: 'Created accounts',
    },
    {
      number: 20,
      title: 'Created courses',
    },
    {
      number: 20,
      title: 'Registered musicians',
    },
    {
      number: 100,
      title: 'Satisfied users',
    },
  ];
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Text variant="HomepageText">
          We are trying to create safe and intuitive
          place for learning and teaching music
        </Styled.Text>
        <Styled.CounterWrapper>
          {counterList.map((list) => (
            <Styled.CounterItem key={list.title}>
              <Styled.CounterNumber>
                <CountUp
                  end={list.number}
                  duration={1}
                  enableScrollSpy
                />
                {list.title === 'Satisfied users' ? <span>%</span> : <span />}
              </Styled.CounterNumber>
              <Styled.CounterLabel>{list.title}</Styled.CounterLabel>
            </Styled.CounterItem>
          ))}
        </Styled.CounterWrapper>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
export default HomeCounter;
