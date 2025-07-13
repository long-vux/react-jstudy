import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changePassword } from '@/features/user/user-thunks'; // cần tạo thunk này

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { updatingProfile } = useAppSelector((state) => state.user);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { currentPassword, newPassword } = values;

      await dispatch(
        changePassword({ 
            currentPassword, 
            newPassword 
        })
      ).unwrap();

      message.success('Đổi mật khẩu thành công!');
      form.resetFields();
      onClose();
    } catch (error) {
      if (typeof error === 'string') message.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title="Đổi mật khẩu"
      onCancel={onClose}
      footer={null}
      destroyOnHidden={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="pt-2"
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updatingProfile}
            className="w-full"
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
