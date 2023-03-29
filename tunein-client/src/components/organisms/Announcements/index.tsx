import React, { useEffect, useRef } from "react"
import Announcement from '@components/organisms/Announcement';
import * as Endpoint from '../../../api/endpoint'
import * as Styled from "./styles"

const Announcements: React.FC = () => {

    // announcementsList : [] = [];
    // Endpoint.createDBEndpoint(Endpoint.BASE_URL + Endpoint.ENDPOINTS.)

    return (
        <Styled.AnnouncementsPage>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
            <Announcement title="Title" interested={100} img="https://images.unsplash.com/photo-1593642532979-7c1a43b0b6ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"/>
        </Styled.AnnouncementsPage>
    )
}

export default Announcements;