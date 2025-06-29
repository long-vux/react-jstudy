import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <header className="bg-white shadow px-4 py-2">Main Header</header>
    <div className="flex flex-1">
      {/* Navbar bên trái */}
      <nav className="w-56 bg-gray-200 p-4 min-h-full">
        <ul className="space-y-2">
          <li><a href="/" className="text-gray-700 hover:text-blue-600">Trang chủ</a></li>
          <li><a href="/exercises" className="text-gray-700 hover:text-blue-600">Bài tập</a></li>
          <li><a href="/profile" className="text-gray-700 hover:text-blue-600">Cá nhân</a></li>
        </ul>
      </nav>
      {/* Nội dung chính */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
    {/* Footer */}
    <footer className="bg-gray-100 text-center py-2">Main Footer</footer>
  </div>
);

export default MainLayout;