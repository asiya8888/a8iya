import type { VisitorKind } from './visitors';

export type VisitorMemory = {
  choice: 'allow' | 'refuse';
  kind: VisitorKind;
  name: string;
};
