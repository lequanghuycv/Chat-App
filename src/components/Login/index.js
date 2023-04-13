import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import firebase, { auth, db } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function Login() {
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            fbProvider
        );
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };
    return (
        <div>
            <Row justify={'center'} style={{ height: 800, background: '#ccc' }}>
                <Col span={8}>
                    <Typography.Title style={{ textAlign: 'center' }}>
                        Fun Chat
                    </Typography.Title>
                    <Button style={{ width: '100%', marginBottom: 6 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button style={{ width: '100%' }} onClick={handleFbLogin}>
                        Đăng nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
