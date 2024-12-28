# Passive Subdomain Finder

This script uses web scraping to find subdomains passively.
It uses Puppeteer for scraping.

## Installation

```sh
git clone https://github.com/satyamkale27/Subdomain-Finder.git
```

```sh
cd Subdomain-Finder
```

```sh
npm install
```

```sh
npm run start
```

# API

### POST /domains

This endpoint allows you to submit a domain for subdomain finding.

#### Request

```http
POST /domains HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
    "domain": "example"
}
```

#### Response

A JSON object containing the found subdomains.

```json
[
  {
    "title": "Example Domain",
    "domain": "https://example.com/"
  }
]
```
