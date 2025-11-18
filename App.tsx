
import React, { useState, useCallback } from 'react';
import { KeywordInput } from './components/KeywordInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateAndGroupKeywords } from './services/geminiService';
import type { GroupedKeywords } from './types';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [headKeyword, setHeadKeyword] = useState<string>('');
  const [groupedKeywords, setGroupedKeywords] = useState<GroupedKeywords | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (keyword: string) => {
    if (!keyword.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGroupedKeywords(null);
    setHeadKeyword(keyword);

    try {
      const result = await generateAndGroupKeywords(keyword);
      setGroupedKeywords(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate keywords. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Icon name="search" className="h-10 w-10 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text">
                SEO Keyword Intent Analyzer
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enter a head keyword to discover long-tail variations and automatically group them by user intent.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <KeywordInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        <ResultsDisplay
          groupedKeywords={groupedKeywords}
          isLoading={isLoading}
          error={error}
          headKeyword={headKeyword}
        />
      </main>
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
