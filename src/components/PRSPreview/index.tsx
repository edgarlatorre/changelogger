import { toHTML } from 'slack-markdown'

export const PRSPreview = (props: { prs: { [key: string]: string } }) => {
  const prs = props.prs
  const links: any[] = []

  for (const label in prs) {
    links.push(
      <div
        key={label}
        dangerouslySetInnerHTML={{
          __html: `:github: ${toHTML(`<${prs[label]}|${label}>`)}`,
        }}
      ></div>
    )
  }

  return <>{links}</>
}
