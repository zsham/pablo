
import React from 'react';
import type { GroupedKeywords, Intent } from '../types';
import { Loader } from './Loader';
import { Icon } from './Icon';

interface ResultsDisplayProps {
  groupedKeywords: GroupedKeywords | null;
  isLoading: boolean;
  error: string | null;
  headKeyword: string;
}

const intentConfig: Record<Intent, { title: string; icon: React.ComponentProps<typeof Icon>['name']; color: string; description: string; }> = {
  informational: {
    title: 'Informational',
    icon: 'info',
    color: 'border-blue-500',
    description: 'Users seeking knowledge or answers.'
  },
  commercial: {
    title: 'Commercial Investigation',
    icon: 'cart',
    color: 'border-yellow-500',
    description: 'Users comparing options before a purchase.'
  },
  transactional: {
    title: 'Transactional',
    icon: 'dollar',
    color: 'border-green-500',
    description: 'Users ready to make a purchase or take action.'
  },
  navigational: {
    title: 'Navigational',
    icon: 'compass',
    color: 'border-purple-500',
    description: 'Users looking for a specific site or brand.'
  },
};

const IntentCard: React.FC<{ intent: Intent; keywords: string[]; }> = ({ intent, keywords }) => {
  const config = intentConfig[intent];
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border-l-4 p-6 shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:border-cyan-400 ${config.color}`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon name={config.icon} className="h-8 w-8 text-cyan-400" />
        <div>
            <h3 className="text-2xl font-bold text-gray-100">{config.title}</h3>
            <p className="text-sm text-gray-400">{config.description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {keywords.map((kw, index) => (
          <li key={index} className="flex items-start gap-3">
            <Icon name="check" className="h-5 w-5 text-teal-400 flex-shrink-0 mt-1" />
            <span className="text-gray-300">{kw}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ groupedKeywords, isLoading, error, headKeyword }) => {
  if (isLoading) {
    return <Loader message="Analyzing intent and generating keywords... this may take a moment." />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg max-w-2xl mx-auto">
        <Icon name="error" className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-300 mb-2">An Error Occurred</h3>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!groupedKeywords) {
    return (
       <div className="text-center p-8 bg-gray-800/50 border border-gray-700 rounded-lg max-w-3xl mx-auto">
        <Icon name="lightbulb" className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Ready to Uncover Insights</h3>
        <p className="text-gray-400">Your keyword analysis results will appear here once generated.</p>
      </div>
    );
  }
  
  const intents = Object.keys(groupedKeywords) as Intent[];

  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-8">
            Keyword Intent Analysis for <span className="text-cyan-400">"{headKeyword}"</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {intents.map((intent) => (
                <IntentCard key={intent} intent={intent} keywords={groupedKeywords[intent]} />
            ))}
        </div>
    </div>
  );
};
