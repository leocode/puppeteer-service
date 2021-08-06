import { htmlToPng, urlToPng } from './puppeteer';
import Jimp from 'jimp';
import path from 'path';

process.env.CHROME_BINARY_PATH = require('chromium-binary').path;

const TEST_HTML = '<html><div>Test</div></html>';
const TEST_HTML_URL = 'test/resources/test.html';
const EXPECTED_PNG_FROM_TEST_HTML = 'test/resources/expected-html.png';

const COMPARISON_THRESHOLD = 0.1;

describe('Puppeteer Service', () => {
  it('should convert html to png', async () => {
    const convertedPng = (await htmlToPng(TEST_HTML, {
      height: 200,
      width: 200,
    })) as Buffer;

    const expectedImage = await Jimp.read(EXPECTED_PNG_FROM_TEST_HTML);
    const actualImage = await Jimp.read(convertedPng);
    expect(Jimp.distance(expectedImage, actualImage)).toBeLessThan(
      COMPARISON_THRESHOLD,
    );
  });

  it('should convert url to png', async () => {
    const url = `file://${path.resolve(TEST_HTML_URL)}`;

    const convertedPng = (await urlToPng(url, {
      height: 200,
      width: 200,
    })) as Buffer;

    const expectedImage = await Jimp.read(EXPECTED_PNG_FROM_TEST_HTML);
    const actualImage = await Jimp.read(convertedPng);
    expect(Jimp.distance(expectedImage, actualImage)).toBeLessThan(
      COMPARISON_THRESHOLD,
    );
  });
});

const getBufferDimensions = (bufferLength: number) =>
  Math.round(Math.sqrt(bufferLength / 4));
