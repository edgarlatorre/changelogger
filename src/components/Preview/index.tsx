import { toHTML } from 'slack-markdown'
import { Changelog } from '../../types/changelog'
import '../../styles/preview.css'
import Image from 'next/image'
import { PRSPreview } from '../PRSPreview'
import { Description } from './Description'
import { useSearchParams } from 'next/navigation'

interface PreviewProps {
  changelog: Changelog
  domains: any
}

export const Preview = (props: PreviewProps) => {
  const { changelog, domains } = props
  const searchParams = useSearchParams()

  console.log('domains', JSON.stringify(domains))

  const dev = searchParams !== null && searchParams.get('dev') === 'true'

  /**
   * TODO: Change this implementation to use navigator clipboard as
   * the execCommand is deprecated.
   * https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
   */
  const copyToClipboard = () => {
    if (window) {
      const selection = window.getSelection()
      const element = document.getElementById('preview')

      if (selection && element) {
        selection.removeAllRanges()
        const range = document.createRange()
        range.selectNode(element)
        selection.addRange(range)
        document.execCommand('copy')
        selection.removeAllRanges()
      }
    }
  }

  const saveChangelog = async (changelog: Changelog) => {
    const response = await fetch('/api/changelog', {
      method: 'POST',
      body: JSON.stringify(changelog),
    })
    return response.json()
  }

  return (
    <div className="flex flex-col w-full border-2 rounded px-2">
      <h5 className="self-center text-lg underline">Preview</h5>
      {changelog.title ? (
        <div className="flex justify-end gap-2">
          <button onClick={() => copyToClipboard()}>
            <Image priority src={'copy.svg'} alt="copy to clipboard" width={18} height={18} />
          </button>
          {dev && (
            <button onClick={() => saveChangelog(changelog)}>
              <Image priority src={'save.svg'} alt="publish changelog" width={18} height={18} />
            </button>
          )}
        </div>
      ) : null}
      <div id="preview" className="preview">
        {changelog.title ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>${toHTML(changelog.type)}: <strong>${changelog.title}</strong></p>`,
            }}
          ></div>
        ) : null}
        <br />
        {changelog.problem ? (
          <>
            <Description
              title="Problem"
              emoji="sweat_smile"
              content={changelog.problem}
              extraTitle="Before this"
            />
            <br />
          </>
        ) : null}
        {changelog.benefits ? (
          <>
            <Description
              title="Benefits"
              emoji="heart_eyes"
              content={changelog.benefits}
              extraTitle="After this"
            />
            <br />
          </>
        ) : null}
        {changelog.solution ? (
          <>
            <Description
              title="Solution"
              emoji="gear"
              content={changelog.solution}
              extraTitle="How it works"
            />
            <br />
          </>
        ) : null}
        {changelog.launchStrategy ? (
          <>
            <Description
              title="Go-to-market"
              emoji="earth_africa"
              content={changelog.launchStrategy}
              extraTitle="Launch strategy"
            />
            <br />
          </>
        ) : null}
        {changelog.kudos ? (
          <>
            <Description title="Kudos" emoji="raised_hands" content={changelog.kudos} />
            <br />
          </>
        ) : null}
        {changelog.taskLink ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `:link: ${toHTML(`<${changelog.taskLink}|Related Task>`)}`,
            }}
          ></div>
        ) : null}
        {<PRSPreview prs={changelog.prs} />}
      </div>
    </div>
  )
}
