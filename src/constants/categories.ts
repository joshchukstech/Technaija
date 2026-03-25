export const CATEGORIES = {
  TECH_UPDATES: 'Tech Updates',
  RENEWABLE_ENERGY: 'Renewable Energy',
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const VALID_CATEGORIES: Category[] = Object.values(CATEGORIES);

export const isValidCategory = (category: string): boolean => {
  return (VALID_CATEGORIES as string[]).includes(category);
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case CATEGORIES.TECH_UPDATES:
      return 'from-blue-600 to-cyan-500';
    case CATEGORIES.RENEWABLE_ENERGY:
      return 'from-yellow-500 to-orange-500';
    default:
      return 'from-slate-600 to-slate-500';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case CATEGORIES.TECH_UPDATES:
      return '💻';
    case CATEGORIES.RENEWABLE_ENERGY:
      return '⚡';
    default:
      return '📝';
  }
};
