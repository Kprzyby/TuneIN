import React, { useEffect, useRef } from "react"
import Announcement from '@components/organisms/Announcement';
import * as Endpoint from '../../../api/endpoint'
import * as Styled from "./styles"

const Announcements: React.FC = () => {

    // announcementsList : [] = [];
    // Endpoint.createDBEndpoint(Endpoint.BASE_URL + Endpoint.ENDPOINTS.)

    return (
        <Styled.AnnouncementsPage>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
            <Announcement title='Some Title' interested={3}/>
        </Styled.AnnouncementsPage>
    )
}

export default Announcements;