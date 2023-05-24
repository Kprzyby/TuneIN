import React from 'react';
import * as Styled from './styles';
import { Props } from './types';

const ObjectListing: React.FC<Props<any>> = ({ objects }) => {

    if (objects.length === 0) {
        return <div>No objects to display.</div>;
    }

    const columns = Object.keys(objects[0]);

    return (
        <Styled.Wrapper>
            <Styled.Table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <Styled.TableHeader key={column}>{column}</Styled.TableHeader>
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
