'use client'
import { Suspense, useState } from 'react'
import { Preview } from '../components/Preview'
import { ChangelogForm } from '../components/ChangelogForm'
import { typeOptions } from '../utils/options'
import { Analytics } from '@vercel/analytics/react'
import { getDomains } from '@/lib/domains'

async function Home() {
  const [changelog, setChangelog] = useState({
    type: typeOptions[0].value,
    title: '',
    problem: '',
    benefits: '',
    solution: '',
    launchStrategy: '',
    kudos: '',
    prs: {},
    taskLink: '',
  })

  const domains = getDomains()

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold underline text-red-500 p-5">ChangeLogger</h1>
      <div className="w-full flex flex-col md:flex-row gap-1 md:px-2">
        <div className="w-full overflow-auto h-screen">
          <ChangelogForm changelog={changelog} setChangelogFn={setChangelog} />
        </div>
        <div className="w-full">
          <Analytics />
          <Suspense fallback={<div>Loading...</div>}>
            <Preview changelog={changelog} domains={domains} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home
