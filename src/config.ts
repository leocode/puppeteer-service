export const config = () => ({
  port: 3000,
  chromeBinaryPath: process.env.CHROME_BINARY_PATH ?? '/usr/bin/google-chrome',
});
