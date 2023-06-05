import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  margin: 2em 0;
  width: 100%;
`;

export const Table = styled.table`
  width: 60%;
  height: fit-content;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.darkMainL};
  border: 0.1rem solid black;
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: center;
  font-weight: bold;
  border: 0.1rem solid black;
`;

export const TableData = styled.td`
  padding: 8px;
  text-align: center;
  border: 0.1rem solid black;
`;
