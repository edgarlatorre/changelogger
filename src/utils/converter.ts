export const replaceUrl = (content: string): string => {
  const URL_REGEX = /\[(?<label>(.*?))]\((?<url>(.*?))\)/g

  return content.replace(URL_REGEX, '<$<url>|$<label>>')
}
