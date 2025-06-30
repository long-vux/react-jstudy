// === src/pages/ProfilePage.tsx ===
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays } from 'date-fns';
import axios from 'axios';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [activityData, setActivityData] = useState<{ date: string; count: number }[]>([]);

  const endDate = new Date();
  const startDate = subDays(endDate, 365);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${user._id}/learning-activity`);
        setActivityData(res.data); // giả sử backend trả về [{ date: '2025-06-25', count: 2 }, ...]
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu hoạt động:', err);
      }
    };

    fetchActivity();
  }, [user?._id]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar + basic info */}
        <div className="text-center">
          <img
            src={user?.profile?.avatar || 'https://via.placeholder.com/120'}
            alt="avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">{user?.profile?.fullName}</h2>
          <p className="text-gray-500">@{user?.username}</p>
        </div>

        {/* Heatmap */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Hoạt động học tập trong 12 tháng qua</h2>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={activityData}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              if (value.count >= 3) return 'color-scale-4';
              if (value.count === 2) return 'color-scale-3';
              if (value.count === 1) return 'color-scale-2';
              return 'color-scale-1';
            }}
            tooltipDataAttrs={(value) => ({
              ['data-tip']: value && value.date
                ? `${value.date}: ${value.count} bài học`
                : ''
            })}
            showWeekdayLabels
          />
        </div>
      </div>

      {/* Thống kê cá nhân */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Thống kê cá nhân</h2>
        <p className="text-red-600 text-xl">Bạn đã học được 120 bài</p>
        <p className="text-red-600 text-xl">Bài học hiện tại là: Promise</p>
        <p className="text-red-600 text-xl">Tổng số điểm: 1000</p>
        <p className="text-red-600 text-xl">Xếp hạng cộng đồng: 2</p>
      </div>
    </div>
  );
};

export default ProfilePage;