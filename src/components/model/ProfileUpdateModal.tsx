import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { updateUserProfile } from "@/features/user/user-thunks";

const ProfileUpdateModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            if (!user) {
                message.error('Không tìm thấy thông tin người dùng.');
                return;
            }
            await dispatch(updateUserProfile({
                userId: user._id,
                username: values.username,
                fullName: values.fullName
            })).unwrap();
            message.success('Cập nhật hồ sơ thành công!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onClose();
        } catch (err) {
            message.error('Cập nhật thất bại');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            title="Cập nhật hồ sơ"
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            okText="Lưu thay đổi"
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical" initialValues={{
                username: user?.username,
                fullName: user?.profile?.fullName,
            }}>
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProfileUpdateModal;
