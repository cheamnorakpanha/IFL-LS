export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  content?: string;
  isAiGenerated?: boolean;
}

export interface AboutSection {
  title: string;
  content: string;
}

export const LoadingState = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type LoadingState = (typeof LoadingState)[keyof typeof LoadingState];