import { Layout, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { fetchLessons } from '@/features/lesson/lesson-slice';
import LessonSidebar from './LessonSidebar';
import Header from '../main/Header';
import Footer from '../main/Footer';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const LessonLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Layout style={{ padding: '24px 0', background: '#fff', position: 'relative' }}>
          <Sider
            width={250}
            collapsedWidth={80}
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: '#fff', paddingTop: 16, borderRight: '1px solid #eee' }}
          >
            <LessonSidebar />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -16,
                transform: 'translateY(-50%)',
                display: 'none',
              }}
              className="collapse-toggle"
            >
              <Tooltip title={collapsed ? 'Mở rộng' : 'Thu gọn'} placement="right">
                <div
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#001529',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </div>
              </Tooltip>
            </div>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default LessonLayout;
