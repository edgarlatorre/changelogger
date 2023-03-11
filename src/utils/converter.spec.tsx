import { replaceUrl } from './converter'

describe('replaceUrl', () => {
  it('should convert [link](https://test.co)', () => {
    const expectedUrl = '<https://test.co|link>'

    expect(replaceUrl('[link](https://test.co)')).toBe(expectedUrl)
  })
})
