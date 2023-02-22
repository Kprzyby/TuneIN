import React from "react"
import * as Styled from "./styles"
import { Props } from "./types"

const Register: React.FC<Props> = ({ text, boxSize, textSize, borderSize }) => (
    <Styled.Button borderSize={borderSize}>
        <Styled.Text boxSize={boxSize} textSize={textSize}>
            {text}
        </Styled.Text>
    </Styled.Button>
)
export default Register;