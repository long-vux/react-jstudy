import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 transition-all duration-300">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          className={`transition-all duration-300 p-4 ${
            collapsed ? 'ml-16' : 'ml-56'
          } w-full`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
