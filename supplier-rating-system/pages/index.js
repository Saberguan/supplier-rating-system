
import Head from 'next/head';
import { useState } from 'react';

const suppliers = ['供应商A', '供应商B', '供应商C'];
const criteria = ['执行力', '责任心', '理解力', '设计质量', '沟通'];

export default function Home() {
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleScoreChange = (supplier, criterion, value) => {
    const newScores = { ...scores };
    if (!newScores[supplier]) newScores[supplier] = {};
    newScores[supplier][criterion] = parseInt(value);
    setScores(newScores);
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <Head><title>供应商评分系统</title></Head>
      <h1>供应商评分系统</h1>
      {!submitted ? (
        <>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>评分项</th>
                {suppliers.map(supplier => <th key={supplier}>{supplier}</th>)}
              </tr>
            </thead>
            <tbody>
              {criteria.map(criterion => (
                <tr key={criterion}>
                  <td>{criterion}</td>
                  {suppliers.map(supplier => (
                    <td key={supplier}>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={scores[supplier]?.[criterion] || ''}
                        onChange={(e) => handleScoreChange(supplier, criterion, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button onClick={handleSubmit}>提交评分</button>
        </>
      ) : (
        <div>
          <h2>评分结果</h2>
          {suppliers.map(supplier => {
            const total = Object.values(scores[supplier] || {}).reduce((a, b) => a + b, 0);
            return (
              <p key={supplier}>
                <strong>{supplier}</strong>：总分 {total} 分
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
