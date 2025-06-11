import React, { useState } from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import axios from 'axios';
import './index.css';

function App() {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  const handleAnalyze = async () => {
    setError('');
    setLoading(true);
    setAnalysis(null);

    try {
      const response = await axios.post('http://localhost:5000/analyze', { text });
      setAnalysis(response.data);
    } catch (err) {
      console.error('Error analyzing SEO:', err);
      setError('Failed to fetch SEO analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const insertKeyword = (keyword) => {
    const newText = `${text.trim()} ${keyword}`;
    setText(newText);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <Search className="text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">SEO Analyzer Pro</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Advanced Content Optimization</p>
            </div>
          </div>
          <button onClick={toggleTheme}>
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
          </button>
        </header>

        {/* Hero Section */}
        <section className="text-center py-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Optimize Your Content for <span className="text-blue-600 dark:text-blue-400">Maximum Impact</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant SEO insights, keyword suggestions, and readability scores to make your content rank higher and engage better.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">⚡ AI-Powered Analysis</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Professional Insights</span>
          </div>
        </section>

        {/* Content Input */}
        <section className="px-4 md:px-10 max-w-4xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-1">📘 Content Input</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Paste your content below for analysis</p>
            <textarea
              className="w-full p-4 rounded-lg text-gray-800 dark:text-white dark:bg-gray-700 outline-none"
              rows="6"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {charCount} characters • {wordCount} words
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAnalyze}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
              >
                Analyze SEO
              </button>
            </div>
            {loading && <p className="text-blue-500 mt-2 text-right">⏳ Analyzing...</p>}
            {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}
          </div>
        </section>

        {/* SEO Results */}
        {analysis && (
          <section className="px-4 md:px-10 mt-10 max-w-5xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-1">🏆 SEO Analysis Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive insights and optimization recommendations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{analysis.readability}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Readability Score</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-300">{analysis.keywordDensity || 'N/A'}%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Keyword Density</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{analysis.seoScore || 'N/A'}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall SEO Score</p>
                </div>
              </div>

              {/* Keyword Suggestions */}
              <h4 className="text-lg font-semibold mb-2">🔑 Suggested Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords?.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => insertKeyword(keyword)}
                    className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-300 border border-blue-300 dark:border-blue-500 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-gray-600 transition"
                  >
                    + {keyword}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
