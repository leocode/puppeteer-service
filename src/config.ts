export const config = () => ({
  port: 3000,
  chromeBinaryPath: process.env.CHROME_BINARY_PATH ?? '/usr/bin/google-chrome',
  isTestEnvironment: process.env.NODE_ENV === Environment.TEST,
});

export enum Environment {
  PRODUCTION = 'production',
  TEST = 'test',
}
