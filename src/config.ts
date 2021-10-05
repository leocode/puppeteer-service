export const config = () => ({
  port: 3000,
  chromeBinaryPath: process.env.CHROME_BINARY_PATH ?? '/usr/bin/google-chrome',
  rejectFileProtocolUrls: !!(parseInt(
    process.env.REJECT_FILE_PROTOCOL_URLS ?? RejectingFileProtocolUrls.Enabled,
    10,
  )),
});

export enum RejectingFileProtocolUrls {
  Enabled = '1',
  Disabled = '0',
}
