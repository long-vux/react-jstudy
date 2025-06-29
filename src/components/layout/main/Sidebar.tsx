import { HomeOutlined, BookOutlined, TrophyOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) => {
  return (
    <aside
      className={`bg-gray-100 h-full transition-all duration-300 shadow-inner ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="font-bold">Menu</span>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      <ul className="space-y-2 px-2">
        <li>
          <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <HomeOutlined />
            {!collapsed && 'Trang chủ'}
          </a>
        </li>
        <li>
          <a href="/ranking" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <TrophyOutlined />
            {!collapsed && 'Xếp hạng'}
          </a>
        </li>
        <li>
          <a href="/lessons" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <BookOutlined />
            {!collapsed && 'Bài học'}
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
