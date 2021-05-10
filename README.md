# puppeteer-service

Containerized Puppeteer which allows to render images and PDFs of given webpage or HTML code

## Quick start - start container, convert HTML to PDF

For production: **Remember to change tag `main` to a version tag to lock the version**

```sh
docker build -t pup-test https://github.com/leocode/puppeteer-service.git#main

docker run -it --rm -p 3000:3000 pup-test

curl -d '{"html":"<strong>Hello world</strong>"}' -H "Content-Type: application/json" -X POST http://localhost:3000/html/pdf > hello-world.pdf
```

## Container installation

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

It listens on port 3000

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

### URL to PNG

**Method**: `POST`

**URL**: `/url/png`

**Body**

```json
{
  "url": "https://www.wikipedia.org/",
  "viewport": {
    "width": 1024,
    "height": 768
  }
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

### Versioning

We use semver for versioning. Release should be tagged, so it can be installed with URL.

