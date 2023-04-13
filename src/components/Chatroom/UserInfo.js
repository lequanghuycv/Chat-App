import { Avatar, Button, Typography } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase/config';
import { AuthContext } from '../Context/AuthProvider';
const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #fdebed;

    .username {
        margin-left: 10px;
    }
`;
export default function UserInfo() {
    const { displayName, photoURL } = useContext(AuthContext);

    // React.useEffect(() => {
    //     db.collection('users').onSnapshot((snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         console.log({ data, snapshot, docs: snapshot.docs });
    //     });
    // }, []);
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="username">
                    {displayName}
                </Typography.Text>
            </div>
            <Button onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WrapperStyled>
    );
}
