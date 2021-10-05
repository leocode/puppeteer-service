import { config } from './config';

export const validateUrl = (url: string) => {
  const x = config();
  if (!x.rejectFileProtocolUrls) {
    return;
  }

  if (isLocalFile(url)) {
    throw new Error(CANNOT_REQUEST_URLS_USING_FILE_PROTOCOL);
  }
};

export const CANNOT_REQUEST_URLS_USING_FILE_PROTOCOL =
  'Cannot request urls using file protocol';

const FILE_PROTOCOL = 'file';
const isLocalFile = (url: string) => {
  const protocol = new URL(url).protocol;

  return protocol.includes(FILE_PROTOCOL);
};
