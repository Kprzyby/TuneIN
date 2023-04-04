import React, { useEffect, useRef } from "react"
import Announcement from '@components/organisms/Announcement';
import {createDBEndpoint, ENDPOINTS} from '../../../api/endpoint'
import * as Styled from "./styles"

const Announcements: React.FC = () => {

    // announcementsList : [] = [];
    // Endpoint.createDBEndpoint(Endpoint.BASE_URL + Endpoint.ENDPOINTS.)

    createDBEndpoint(ENDPOINTS.tutorship.getusertutorships)

    return (
        <Styled.AnnouncementsPage>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
            <Announcement title="Title" interested={100} img="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"/>
        </Styled.AnnouncementsPage>
    )
}

export default Announcements;