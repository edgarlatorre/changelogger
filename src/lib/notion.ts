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

  console.log('heeere', items)
}

export async function saveChangelog(changelog: Changelog) {
  console.log('before creating database', changelog)
  const properties = changelogToNotionProperties(changelog)
  console.log('properties', properties)

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
  }
}
