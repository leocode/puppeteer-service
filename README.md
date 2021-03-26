# puppeteer-service

Containerized Puppeteer which allows to render images and PDFs of given webpage or HTML code

## Installation

We don't have Docker public repository, however image can be build locally using git url.

**Remember to change tag `main` to a version tag to lock the version**

```
docker build https://github.com/leocode/puppeteer-service.git#main
```

The same can be used for docker-compose:

```yaml
services:
  puppeteer:
    build: https://github.com/leocode/puppeteer-service.git#main
```

## Documentation

Starting container automatically starts API server.

It listens on `PORT` env variable (default 3000).

### HTML to PDF

**Method**: `POST`

**URL**: `/html/pdf`

**Body**

```json
{
  "html": "<html><head><style></style></head><body>Content</body></html>"
}
```

**Response**

```
HTTP/1.1 200 OK
content-type: application/octet-stream

<binary>
```

## Development

Dependencies:
- Docker

```
yarn start
```

Start container with API. Wait until logs from server appear (due to one-line command `docker build` output is muted). It may take up to few minutes. Consecutive starts (after code change) should be faster.
