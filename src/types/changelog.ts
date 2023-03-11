export type Changelog = {
  type: string
  title: string
  problem: string
  solution: string
  benefits: string
  launchStrategy: string
  kudos: string
  prs: { [key: string]: string }
  taskLink: string
}
