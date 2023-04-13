import React, { useContext } from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../Context/AppProvider';
const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: #000;
        }
        .ant-collapse-content-box {
            padding: 0 60px;
        }
        .add-room {
            margin-bottom: 6px;
        }
    }
`;
const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 6px;

    &&&.ant-typography {
        color: #000;
    }
`;
export default function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
        useContext(AppContext);
    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };
    return (
        <div>
            <Collapse defaultActiveKey={['1']} ghost>
                <PanelStyled header="Danh sách các phòng" key="1">
                    {rooms?.map((room) => (
                        <LinkStyled
                            key={room.id}
                            onClick={() => setSelectedRoomId(room.id)}
                        >
                            {room.name}
                        </LinkStyled>
                    ))}
                    <Button
                        className="add-room"
                        type="text"
                        icon={<PlusSquareOutlined />}
                        onClick={handleAddRoom}
                    >
                        Thêm Phòng
                    </Button>
                </PanelStyled>
            </Collapse>
        </div>
    );
}
