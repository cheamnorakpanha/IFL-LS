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

export const ContactSection = {
  FULLNAME: 'John Doe',
  EMAIL: 'john.doe.1821@rupp.edu',
  MESSAGE: 'How has this website helped you?',
  CONTACT: 'cheam.panha@gmail.com',
} as const;

export type ContactSection = (typeof ContactSection)[keyof typeof ContactSection];