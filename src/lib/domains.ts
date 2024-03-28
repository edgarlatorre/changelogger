export async function getDomains() {
  const response = await fetch('/api/domains', {
    method: 'GET',
  })

  return {
    props: {
      domains: response.json(),
    },
  }
}
