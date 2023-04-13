import { UserAddOutlined } from '@ant-design/icons/lib/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Messages from './Messages';
import { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFirebaseStore from '../../hooks/useFirebaseStore';

const HeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: rgb(247, 200, 224);
    border-bottom: 1px solid rgb(253, 235, 237);
    border-left: 1px solid rgb(253, 235, 237);
    .header {
        &__title {
            font-weight: bold;
            font-size: 16px;
        }
        &__header__description {
            font-size: 12px;
        }
    }
`;
const ButtonStyled = styled.div`
    display: flex;
    align-items: center;
`;
const WrapperStyled = styled.div`
    height: 100vh;
`;
const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 16px;
`;
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    padding: 2px 2px 2px 0px;
    border: 1px solid rgb(230, 230, 230);
    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;
const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;
export default function ChatWindow() {
    const [inputValue, setInputValue] = useState('');
    const { rooms, selectedRoomId, selectedRoom, members, setIsInviteVisible } =
        useContext(AppContext);
    const { uid, photoURL, displayName } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleOnSubmit = () => {
        addDocument('message', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });
        form.resetFields(['messagegit']);
    };
    const condition = React.useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id,
        }),
        [selectedRoom.id]
    );

    const message = useFirebaseStore('message', condition);

    return (
        <WrapperStyled>
            {selectedRoom.id ? (
                <>
                    {' '}
                    <HeaderStyle>
                        {selectedRoom && (
                            <div className="header__info">
                                <p className="header__title">
                                    {selectedRoom.name}
                                </p>
                                <span className="header__description">
                                    {selectedRoom.description}
                                </span>
                            </div>
                        )}
                        <ButtonStyled>
                            <Button
                                icon={<UserAddOutlined />}
                                type="text"
                                onClick={() => setIsInviteVisible(true)}
                            >
                                Mời
                            </Button>

                            <Avatar.Group size="small" maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip
                                        key={member.id}
                                        title={member.displayName}
                                    >
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL
                                                ? ''
                                                : member.displayName
                                                      ?.charAt(0)
                                                      .toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </ButtonStyled>
                    </HeaderStyle>
                    <ContentStyled>
                        <MessageListStyled>
                            {message.map((mes) => (
                                <Messages
                                    key={mes.id}
                                    text={mes.text}
                                    photoURL={mes.photoURL}
                                    displayName={mes.displayName}
                                    createAt={mes.createAt}
                                />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name="message">
                                <Input
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                    bordered={false}
                                    placeholder="Nhập tin nhắn ..."
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleOnSubmit}>
                                Gửi
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message="Hãy chọn phòng"
                    type="info"
                    showIcon
                    style={{ margin: 5 }}
                />
            )}
        </WrapperStyled>
    );
}
