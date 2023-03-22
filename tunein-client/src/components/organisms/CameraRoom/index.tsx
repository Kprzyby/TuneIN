import React, { useEffect, useRef } from "react"
import LocalCamera from "../LocalCamera"
import RemoteCamera from "../RemoteCamera"
import * as Styled from "./styles"

const CameraRoom: React.FC = () => {

    //var testStream: MediaStream = new MediaStream();

    return (
        <Styled.CameraRoom>
            <LocalCamera />
            <Styled.RemoteCameras>
                <Styled.TestItem/>
                <Styled.TestItem/>
                <Styled.TestItem/>
                <Styled.TestItem/>
            </Styled.RemoteCameras>
            {/* <RemoteCamera remoteStream={} /> */}
        </Styled.CameraRoom>
    )
}

export default CameraRoom;