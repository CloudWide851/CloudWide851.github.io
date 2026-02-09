import { Bot, Gamepad2, ScanFace } from 'lucide-react';

export interface Experiment {
  id: string;
  titleKey: string;
  descriptionKey: string;
  defaultTitle: string;
  defaultDescription: string;
  icon: any; // Using any for icon component type simplicity
  tags: string[];
  link: string;
}

export const labExperiments: Experiment[] = [
  {
    id: 'agent',
    titleKey: 'experiments.agent.title',
    descriptionKey: 'experiments.agent.description',
    defaultTitle: 'Web Search Agent',
    defaultDescription: 'Intelligent conversational agent powered by DeepSeek V3 with real-time web search capabilities.',
    icon: Bot,
    tags: ['AI', 'DeepSeek', 'Agent', 'Web Search'],
    link: '/lab/agent'
  },
  {
    id: 'snake',
    titleKey: 'experiments.snakeGame.title',
    descriptionKey: 'experiments.snakeGame.description',
    defaultTitle: 'Retro Snake',
    defaultDescription: 'Classic Snake game reimagined with React Canvas and retro aesthetics.',
    icon: Gamepad2,
    tags: ['Game', 'Canvas API', 'React Hooks', 'Retro'],
    link: '/lab/snake'
  },
  {
    id: 'face-3d',
    titleKey: 'experiments.face3d.title',
    descriptionKey: 'experiments.face3d.description',
    defaultTitle: '3D Face Lab',
    defaultDescription: 'Real-time 3D face tracking and reconstruction using MediaPipe and Three.js.',
    icon: ScanFace,
    tags: ['Computer Vision', '3D', 'Three.js', 'AI'],
    link: '/lab/face-3d'
  }
];
