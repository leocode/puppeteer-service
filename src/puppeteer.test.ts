import { htmlToPng, urlToPng } from './puppeteer';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import path from 'path';

process.env.CHROME_BINARY_PATH = require('chromium-binary').path;

const TEST_HTML = '<html><div>Test</div></html>';
const TEST_HTML_URL = 'test/test.html';

const COMPARISON_THRESHOLD = 0.1;

describe('Puppeteer Service', () => {
  it('should convert html to png', async () => {
    const result = (await htmlToPng(TEST_HTML, {
      height: 200,
      width: 200,
    })) as Buffer;

    const differentPixels = pixelmatch(
      await getExpectedImage(),
      result,
      null,
      getBufferDimensions(result.length),
      getBufferDimensions(result.length),
      {
        threshold: COMPARISON_THRESHOLD,
      },
    );

    expect(differentPixels).toEqual(0);
  });

  it('should convert url to png', async () => {
    const url = `file://${path.resolve(TEST_HTML_URL)}`;
    const result = (await urlToPng(url, {
      height: 200,
      width: 200,
    })) as Buffer;

    const differentPixels = pixelmatch(
      await getExpectedImage(),
      result,
      null,
      getBufferDimensions(result.length),
      getBufferDimensions(result.length),
      {
        threshold: COMPARISON_THRESHOLD,
      },
    );

    expect(differentPixels).toEqual(0);
  });
});

const getBufferDimensions = (bufferLength: number) =>
  Math.sqrt(bufferLength / 4);

async function getExpectedImage() {
  const EXPECTED_PNG_FROM_TEST_HTML = 'test/expected-html.png';

  return await fs.promises.readFile(EXPECTED_PNG_FROM_TEST_HTML);
}
