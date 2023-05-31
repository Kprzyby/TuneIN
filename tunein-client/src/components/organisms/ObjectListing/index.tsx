import React from 'react';
import * as Styled from './styles';
import { Props } from './types';

const ObjectListing: React.FC<Props<any>> = ({ objects, handleTextClick }) => {

    if (objects.length === 0) {
        return <div>No objects to display.</div>;
    }

    const columns = Object.keys(objects[0]);

    const handleHeaderClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
        const text = event.currentTarget.textContent;
        if (text) {
          handleTextClick(text);
        }
      };

    return (
        <Styled.Wrapper>
            <Styled.Table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <Styled.TableHeader key={column} onClick={handleHeaderClick}>{column}</Styled.TableHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {objects.map((object, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <Styled.TableData key={column}>{object[column]}</Styled.TableData>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Styled.Table>
        </Styled.Wrapper>
    );
};

export default ObjectListing;
