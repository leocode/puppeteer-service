# puppeteer-service

Containerized Puppeteer which allows to render images and PDFs of given webpage or HTML code

## Quick start - start container, convert HTML to PDF

For production: **Remember to select precise version tag for the image (e.g. leocode/puppeteer-service:1.1.0)**

```sh
docker build -t pup-test leocode/puppeteer-service

docker run -it --rm -p 3000:3000 pup-test

curl -d '{"html":"<strong>Hello world</strong>"}' -H "Content-Type: application/json" -X POST http://localhost:3000/html/pdf > hello-world.pdf
```

## Container installation

**Remember to select precise version tag for the image (e.g. leocode/puppeteer-service:1.1.0)**

```
docker run leocode/puppeteer-service
```

The same can be used for docker-compose:

```yaml
services:
  puppeteer:
    image: leocode/puppeteer-service
```

## Documentation

Starting container automatically starts API server.

It listens on port 3000.

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

### HTML to PNG

**Method**: `POST`

**URL**: `/html/png`

**Body**

```json
{
  "html": "<html><head><style></style></head><body>Content</body></html>",
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

### URL to PDF

**Method**: `POST`

**URL**: `/url/pdf`

**Body**

```json
{
  "url": "https://www.wikipedia.org/"
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
yarn start:dev
```

Start container with API. Wait until logs from server appear (due to one-line command `docker build` output is muted). It may take up to few minutes. Consecutive starts (after code change) should be faster.

You can test production build using

```
yarn start:prod
```

### Versioning

We use semver for versioning. Release should be tagged with vX.Y.Z, so the version is picked up by Docker Hub autobuild.
