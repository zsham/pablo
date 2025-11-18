
import React, { useState } from 'react';
import { Icon } from './Icon';

interface KeywordInputProps {
  onGenerate: (keyword: string) => void;
  isLoading: boolean;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({ onGenerate, isLoading }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="e.g., react component library"
        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none"
        rows={2}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !keyword.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Icon name="loader" className="h-6 w-6 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Icon name="magic" className="h-6 w-6" />
            <span>Generate & Group Keywords</span>
          </>
        )}
      </button>
    </form>
  );
};
