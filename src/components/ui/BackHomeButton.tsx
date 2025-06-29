import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const BackHomeButton = () => (
  <Link
    to="/"
    className="absolute top-8 left-8 z-50 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-200 ease-in-out"
  >
    <ArrowLeftOutlined className="text-base" />
    <span className="font-medium">Quay lại trang chủ</span>
  </Link>
);

export default BackHomeButton;
