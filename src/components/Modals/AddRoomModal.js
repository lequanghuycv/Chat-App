import { Form, Input, Modal } from 'antd';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../Context/AuthProvider';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { uid } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        form.resetFields();
        setIsAddRoomVisible(false);
    };
    const handleCancel = () => {
        setIsAddRoomVisible(false);
    };
    return (
        <div>
            <Modal
                title="Tạo phòng"
                open={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên Phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả " />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
