
import React from 'react';
import { Icon } from './Icon';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="text-center p-8">
      <Icon name="loader" className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
      <p className="text-lg text-gray-400">{message}</p>
    </div>
  );
};
