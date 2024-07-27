import React from "react"
import { Input } from "antd"
import styled from "styled-components"

const DetailDiv = styled.div`
  div {
    width: 200px;
    margin-top: 20px;
  }
`

const { TextArea } = Input

const DetailList = (props) => {

    return (
        <DetailDiv>
            {props.countList && props.countList.map((item, i) => (
                <div key={i}>
                    <div>
                        <TextArea
                            autoSize={{ minRows: 6, maxRows: 6 }}
                        />
                    </div>
                </div>
            ))}
        </DetailDiv>
    )
}

export default DetailList