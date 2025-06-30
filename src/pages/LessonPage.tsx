import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { Typography, Tag, Card, Button, Divider } from 'antd';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css'; // Import GitHub markdown styles

const { Title, Paragraph } = Typography;

const difficultyColor = {
  easy: 'green',
  medium: 'orange',
  hard: 'red',
} as const;

const LessonPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: lessons } = useAppSelector((state) => state.lessons);
  const lesson = lessons.find((l) => l.slug === slug);

  if (!lesson) return <div>Không tìm thấy bài học.</div>;

  return (
    <div className="p-6 bg-white">
      <Title level={2}>{lesson.title}</Title>
      <Paragraph type="secondary">{lesson.description}</Paragraph>

      <Divider />
      <div className="markdown-body">
        <ReactMarkdown>{lesson.theory}</ReactMarkdown>
      </div>

      {lesson.exercises && lesson.exercises.length > 0 && (
        <>
          <Divider />
          <Title level={4}>Bài tập</Title>
          {lesson.exercises.map((ex: any) => (
            <Card
              key={ex._id}
              style={{ marginBottom: 16 }}
              size="small"
              title={ex.description}
              extra={
                <Button type="primary" size="small" onClick={() => navigate(`/exercise/${ex._id}`)}>
                  Làm bài
                </Button>
              }
            >
              <div className="mt-2">
                <Tag color={difficultyColor[ex.difficulty as keyof typeof difficultyColor] || 'default'}>
                  {ex.difficulty}
                </Tag>
                {ex.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default LessonPage;