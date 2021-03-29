FROM buildkite/puppeteer

EXPOSE 3000

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

CMD node api/index.js