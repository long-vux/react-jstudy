import React, { useState } from 'react';
import { useAppSelector } from '@/hooks';
import BackHomeButton from '@components/ui/BackHomeButton'
import ProfileUpdateModal from '@/components/model/ProfileUpdateModal';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Tag,
} from 'antd';
import {
  EditOutlined,
  MailOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
} from '@ant-design/icons';

const ProfilePage: React.FC = () => {
  const { user, updatingProfile } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!user || updatingProfile) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Đang tải hồ sơ người dùng...
      </div>
    );
  }

  const {
    username,
    email,
    joinedAt,
    isVerified,
    profile,
    stats,
  } = user;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <BackHomeButton />
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md ">
        {/* Avatar + Info */}
        <div className="absolute left-6 bottom-[-48px] flex items-center gap-4">
          <Avatar
            src={profile?.avatar}
            size={120}
            className="border-4 border-white shadow-md"
          />
          <div className="text-white mb-10">
            <h2 className="text-xl font-semibold">{profile?.fullName}</h2>
            <p className="text-sm text-gray-200">@{username}</p>
          </div>
        </div>
      </div>


      {/* Main Card */}
      <Card className="mt-20 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Thông tin cơ bản */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin cá nhân
            </h3>
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="Email">
                <span className="flex items-center gap-2">
                  <MailOutlined /> {email}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tham gia">
                {new Date(joinedAt).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {isVerified ? (
                  <Tag icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} color="success">
                    Đã xác thực
                  </Tag>
                ) : (
                  <Tag icon={<ClockCircleTwoTone twoToneColor="#faad14" />} color="warning">
                    Chưa xác thực
                  </Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
            <div className="mt-4">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Cập nhật hồ sơ
              </Button>
            </div>
          </div>

          {/* Right Column - Thống kê */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thành tích học tập
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center border border-gray-200">
                <p className="text-sm text-gray-500">Tổng điểm</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats?.totalPoints ?? 0}
                </p>
              </Card>
              <Card className="text-center border border-gray-200">
                <p className="text-sm text-gray-500">Bài đã giải</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.solvedExercises ?? 0}
                </p>
              </Card>
            </div>
          </div>
        </div>
        <Divider className="mt-8" />
        <p className="text-center text-gray-500 text-sm">
          JStudy • Cùng bạn chinh phục JavaScript ✨
        </p>
      </Card>

      <ProfileUpdateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfilePage;
