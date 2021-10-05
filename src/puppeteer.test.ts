import { htmlToPdf, htmlToPng, urlToPdf, urlToPng } from './puppeteer';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';
import pdf from 'pdf-parse';

process.env.CHROME_BINARY_PATH = require('chromium-binary').path;

const TEST_HTML = '<html><div>Test</div></html>';
const TEST_HTML_URL = 'test/resources/test.html';
const EXPECTED_PNG_FROM_TEST_HTML = 'test/resources/expected-html.png';
const EXPECTED_PDF_FROM_TEST_HTML = 'test/resources/expected.pdf';

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

  it('should convert html to pdf', async () => {
    const expectedPdfFile = await fs.promises.readFile(
      EXPECTED_PDF_FROM_TEST_HTML,
    );
    const expectedPdfContent = await pdf(expectedPdfFile);

    const result = await htmlToPdf(TEST_HTML);

    const actualPdfContent = await pdf(result);
    expect(actualPdfContent.text).toEqual(expectedPdfContent.text);
  });

  it('should convert url to pdf', async () => {
    const url = `file://${path.resolve(TEST_HTML_URL)}`;
    const expectedPdfFile = await fs.promises.readFile(
      EXPECTED_PDF_FROM_TEST_HTML,
    );
    const expectedPdfContent = await pdf(expectedPdfFile);

    const result = await urlToPdf(url);

    const actualPdfContent = await pdf(result);
    expect(actualPdfContent.text).toEqual(expectedPdfContent.text);
  });
});
