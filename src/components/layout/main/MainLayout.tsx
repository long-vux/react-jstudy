import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex flex-1 transition-all duration-300">
        <Sidebar />
        <main     >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
