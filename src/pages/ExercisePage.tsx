import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getExerciseById, submitCode } from '@/features/exercise/exerciseSlice';
import CommentSection from '@/components/ui/CommentSection';
import Editor from '@monaco-editor/react';
import { Button, Card, Spin } from 'antd';

const ExercisePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current, loading } = useAppSelector((state) => state.exercise);

  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(getExerciseById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (current?.starterCode) setCode(current.starterCode);
  }, [current]);

  const handleSubmit = async () => {
    if (!id || !code) return;
    setSubmitting(true);
    const res = await dispatch(submitCode({ exerciseId: id, userCode: code }));
    setResults(res.payload.results);
    setSubmitting(false);
  };

  if (loading || !current) return <Spin className="mt-10" />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{current.title}</h1>
      <p className="text-gray-600 mb-4">{current.description}</p>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">📊 {current.difficulty}</span>
          {current.tags.map((tag: string) => (
            <span key={tag} className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">🏷️ {tag}</span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Editor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
        />
      </div>

      <Button type="primary" loading={submitting} onClick={handleSubmit}>
        Nộp bài
      </Button>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Kết quả:</h3>
          {results.map((r, idx) => (
            <Card
              key={idx}
              type="inner"
              title={`Test case ${idx + 1}`}
              className="mb-3"
              style={{ borderColor: r.passed ? '#52c41a' : '#ff4d4f' }}
            >
              <p className="mb-1">✅ Passed: {r.passed ? 'Yes' : 'No'}</p>
              <p className="mb-1">Input: {JSON.stringify(r.input)}</p>
              <p className="mb-1">Expected: {JSON.stringify(r.expected)}</p>
              <p className="mb-1">Output: {JSON.stringify(r.actual)}</p>
            </Card>
          ))}
        </div>
      )}

      <CommentSection exerciseId={id || ''} />
    </div>
  );
};

export default ExercisePage;
