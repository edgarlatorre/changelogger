export type Changelog = {
  type: string;
  title: string;
  description: string;
  prs: {[key: string]: string},
  taskLink: string;
};