FROM buildkite/puppeteer

EXPOSE 3000

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

CMD node api/index.js