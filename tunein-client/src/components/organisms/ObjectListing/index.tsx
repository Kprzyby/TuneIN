import React, { useEffect } from 'react';
import * as Styled from './styles';
import { Props } from './types';

const ObjectListing: React.FC<Props<any>> = ({ objects, handleTextClick }) => {
  if (objects.length === 0) {
    return <p>No objects to display.</p>;
  }

  let columns = Object.keys(objects[0]);

  const handleHeaderClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const text = event.currentTarget.textContent;
    if (text) {
      handleTextClick(text);
    }
  };

  useEffect(() => {
    columns = Object.keys(objects[0]);
  }, [objects]);

  return (
    <Styled.Wrapper>
      <Styled.Table>
        <thead>
          <tr>
            {columns.map((column) => (
              <Styled.TableHeader key={column} onClick={handleHeaderClick}>
                {column}
              </Styled.TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {objects.map((object, index) => (
            <tr key={index}>
              {columns.map((column) => {
                const text = object[column] ? object[column].toString() : '';
                if (text.length < 50) {
                  return (
                    <Styled.TableData key={column}>{text}</Styled.TableData>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.Wrapper>
  );
};

export default ObjectListing;
