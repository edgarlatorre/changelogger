export type Changelog = {
  type: string;
  title: string;
  problem: string;
  solution: string;
  benefits: string;
  launchStrategy: string;
  prs: { [key: string]: string },
  taskLink: string;
};