import React, { useEffect } from "react";
import * as Styled from "./styles";
import useSearchBar from "@components/molecules/SearchBar";
import DarkButton from "@components/molecules/DarkButton";
// import { useWhatChanged } from '@simbathesailor/use-what-changed';

const Library: React.FC = () => {
    const {renderSearchBar, searchInput} = useSearchBar();
    const handleEditClick = () => {
        console.log("edit");
    }
    useEffect(() => {
        console.log(searchInput);
    }, [searchInput]);
    return (
        <Styled.Wrapper>
            <Styled.Content>
                <Styled.ToolBox>
                    <Styled.UpRow>{renderSearchBar}</Styled.UpRow>
                    <Styled.DownRow>
                        <Styled.DownRowSide>

                        </Styled.DownRowSide>
                        <Styled.DownRowSide>
                            <button style={{backgroundColor: "transparent", border: "unset"}} onClick={handleEditClick}>
                                <DarkButton text="Edit"/>
                            </button>
                        </Styled.DownRowSide>
                    </Styled.DownRow>
                </Styled.ToolBox>
                <Styled.List>

                </Styled.List>
            </Styled.Content>
        </Styled.Wrapper>
    )
}

export default Library;
