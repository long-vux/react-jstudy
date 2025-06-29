import { HomeFilled, BookFilled, TrophyFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: <HomeFilled className="text-2xl" />, label: 'Trang chủ' },
    { path: '/ranking', icon: <TrophyFilled className="text-2xl" />, label: 'Xếp hạng' },
    { path: '/lessons', icon: <BookFilled className="text-2xl" />, label: 'Bài học' },
  ];

  return (
    <aside className={`h-full transition-all duration-300`}>
      <ul className="space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <li
              key={item.path}
              className={
                isActive
                  ? 'p-4 py-4 text-center rounded-3xl bg-gray-200'
                  : 'p-4 py-4 text-center rounded-3xl bg-transparent hover:bg-gray-100 group transition'
              }
            >
              <a
                href={item.path}
                className={
                  isActive
                    ? 'flex flex-col items-center gap-2 text-black'
                    : 'flex flex-col items-center gap-2 text-gray-500 group-hover:text-black transition'
                }
              >
                {/* Icon */}
                <span
                  className={
                    isActive
                      ? 'text-2xl text-black'
                      : 'text-2xl text-gray-500 group-hover:text-black transition'
                  }
                >
                  {item.icon}
                </span>
                <span className="text-sm font-semibold">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
