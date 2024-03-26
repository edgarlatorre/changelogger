import { Client } from '@notionhq/client'
import { Changelog } from '../types/changelog'

const notion = new Client({ auth: process.env.NOTION_API_SECRET })
const database_id = process.env.DATABASE_ID || ''

export interface NotionChangelog {
  type: string
  data: Date
  title: string
  problem: string
}

export async function fetchDatabase() {
  const items = await notion.databases.query({ database_id: database_id })

  console.log('items', items)
}

export async function saveChangelog(changelog: Changelog) {
  const properties = changelogToNotionProperties(changelog)

  const response = await notion.pages.create({
    parent: { database_id: database_id },
    properties: properties,
  })

  console.log('creating database', response)
}

const changelogToNotionProperties = (changelog: Changelog): any => {
  return {
    Title: {
      type: 'title',
      title: [{ type: 'text', text: { content: changelog.title } }],
    },
    Type: {
      type: 'rich_text',
      rich_text: [{ type: 'text', text: { content: changelog.type } }],
    },
    Problem: {
      type: 'rich_text',
      rich_text: [{ type: 'text', text: { content: changelog.problem } }],
    },
  }
}
