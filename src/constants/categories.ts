export const CATEGORIES = {
  TECH_NEWS: 'Tech Updates',
  OPPORTUNITIES: 'Tech Jobs',
  AI_TOOLS: 'AI & Tools',
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const VALID_CATEGORIES: Category[] = Object.values(CATEGORIES);

export const isValidCategory = (category: string): boolean => {
  return (VALID_CATEGORIES as string[]).includes(category);
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case CATEGORIES.TECH_NEWS:
      return 'from-blue-600 to-cyan-500';
    case CATEGORIES.OPPORTUNITIES:
      return 'from-green-600 to-emerald-500';
    case CATEGORIES.AI_TOOLS:
      return 'from-purple-600 to-pink-500';
    default:
      return 'from-slate-600 to-slate-500';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case CATEGORIES.TECH_NEWS:
      return '📰';
    case CATEGORIES.OPPORTUNITIES:
      return '💼';
    case CATEGORIES.AI_TOOLS:
      return '🤖';
    default:
      return '📝';
  }
};
