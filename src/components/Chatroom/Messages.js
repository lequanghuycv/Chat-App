import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
    margin-bottom: 10px;
    .author {
        margin-left: 6px;
        font-weight: bold;
    }
    .date{
        margin-left: 6px
        font-size: 12px;
        color: #a7a7a7;
    }
    .content{
        margin-left: 30px
    }
`;
function formatDate(seconds) {
    let formatDate = '';
    if (seconds) {
        formatDate = formatRelative(new Date(seconds * 1000), new Date());
        formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
    }
    return formatDate;
}
export default function Messages({ text, displayName, createAt, photoURL }) {
    return (
        <div>
            <WrapperStyled>
                <Avatar src={photoURL} size="small">
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="author">
                    {displayName}
                </Typography.Text>
                <Typography.Text className="date">
                    {formatDate(createAt?.seconds)}
                </Typography.Text>
                <div>
                    <Typography.Text className="content">
                        {text}
                    </Typography.Text>
                </div>
            </WrapperStyled>
        </div>
    );
}
