const parseConfig = () => ({
  port: 3000,
  chromeBinaryPath: process.env.CHROME_BINARY_PATH ?? '/usr/bin/google-chrome',
  rejectFileProtocolUrls: Boolean(Number(
    process.env.REJECT_FILE_PROTOCOL_URLS ?? RejectingFileProtocolUrls.Enabled,
  )),
});

enum RejectingFileProtocolUrls {
  Enabled = '1',
  Disabled = '0',
}

export const config = parseConfig();
