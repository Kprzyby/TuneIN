import React from "react"
import * as Styled from "./styles"
import { Props } from "./types"

const Register: React.FC<Props> = ({ text }) => (
    <Styled.Button>
        <Styled.Text>{text}</Styled.Text>
    </Styled.Button>
)
export default Register;