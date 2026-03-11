export type StackCategory =
  | 'frontend'
  | 'backend'
  | 'tooling'
  | 'security'
  | 'languages';

export type TechStack = {
  name: string;
  iconPublicId: string;
  category: StackCategory;
};
