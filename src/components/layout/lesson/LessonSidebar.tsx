import { Menu } from 'antd';
import { useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const LessonSidebar = () => {
  const { data: lessons } = useAppSelector((state) => state.lessons);
  const navigate = useNavigate();

  // Dùng map để ghi nhớ group đã render
  const topicMap = new Map<string, { key: string; label: string; children: any[] }>();
  const menuItems: any[] = [];

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  for (const lesson of sortedLessons) {
    if (lesson.topic && lesson.topic.title) {
      const topicTitle = lesson.topic.title;

      if (!topicMap.has(topicTitle)) {
        const group = {
          key: topicTitle,
          label: topicTitle,
          children: [],
        };
        topicMap.set(topicTitle, group);
        menuItems.push(group); // đảm bảo đúng vị trí
      }

      topicMap.get(topicTitle)!.children.push({
        key: lesson.slug,
        label: lesson.title,
      });
    } else {
      menuItems.push({
        key: lesson.slug,
        label: lesson.title,
      });
    }
  }

  return (
    <Menu
      mode="inline"
      items={menuItems}
      onClick={({ key }) => navigate(`/learn/${key}`)}
      style={{ height: '100%' }}
    />
  );
};

export default LessonSidebar;