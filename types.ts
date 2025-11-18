
export type Intent = 'informational' | 'navigational' | 'commercial' | 'transactional';

export type GroupedKeywords = {
  informational: string[];
  navigational: string[];
  commercial: string[];
  transactional: string[];
};
