# puppeteer-service

Containerized Puppeteer which allows to render images and PDFs of given webpage or HTML code

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

`yarn start` - start container with API. Wait until logs from server appear (due to one-line command `docker build` output is muted). It may take up to few minutes. Consecutive starts (after code change) should be faster.
