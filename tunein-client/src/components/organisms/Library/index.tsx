import React, { useEffect } from "react";
import * as Styled from "./styles";
import useSearchBar from "@components/molecules/SearchBar";
import DarkButton from "@components/molecules/DarkButton";
import useDarkButtonExpand from "@components/molecules/DarkButtonExpand";
// import { useWhatChanged } from '@simbathesailor/use-what-changed';

const Library: React.FC = () => {
    // test vales
    const headCollection = "Collection";
    const listCollection = [
        {title: "All",value: "all"}, 
        {title: "for School", value: "forschool"}, 
        {title: "cool", value: "cool"}];
    const headSort = "Sort by";
    const listSort = [
        {title: "By Title", value: "title"}, 
        {title: "By Band", value: "band"}, 
        {title: "By Genre", value: "genre"}];
    const {
        pickedItem: pickedCollection, 
        renederDBtnExp: renderCollectionBtn
    } = useDarkButtonExpand(listCollection, headCollection);
    const {
        pickedItem: pickedCategory, 
        renederDBtnExp: renderCategoryBtn
    } = useDarkButtonExpand(listSort, headSort);
    const {renderSearchBar, searchInput} = useSearchBar();
    const handleEditClick = () => {
        console.log("edit");
    }
    useEffect(() => {
        console.log(pickedCollection);
        console.log(pickedCategory);
        console.log(searchInput);
    }, [pickedCollection, pickedCategory, searchInput]);
    return (
        <Styled.Wrapper>
            <Styled.Content>
                <Styled.ToolBox>
                    <Styled.UpRow>{renderSearchBar}</Styled.UpRow>
                    <Styled.DownRow>
                        <Styled.DownRowSide>
                            {renderCollectionBtn}{renderCategoryBtn}
                        </Styled.DownRowSide>
                        <Styled.DownRowSide>
                            <button 
                                style={{backgroundColor: "transparent", border: "unset"}} 
                                onClick={handleEditClick}>
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
