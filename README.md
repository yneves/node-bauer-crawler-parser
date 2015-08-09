# bauer-crawler-scrape

Plugin for `bauer-crawler` to make http requests.

## Installation

```
npm install bauer-crawler-scrape
```

## Usage

```js
module.exports = function(promise) {
  return promise.scrape("/path/to/html/input",{
    "a[href]": {
      "url": "attr:href"
    }
  }).then(function(outputFile) {
    // outputFile contains scraped data
  });
};
```

```js
module.exports = function(promise) {
  return promise.return("/path/to/html/input")
    .scrape({
      "a[href]": {
        "url": "attr:href"
      }
    }).then(function(outputFile) {
    // outputFile contains scraped data
  });
};
```

## Configuration

```js
{
  workers: 1,
  slots: 1,
  delay: 0,
  cache: { // default options for bauer-cache
    json: false,
    expires: "1d",
    file: {
      dir: ".",
      ext: "txt"
    }
  }
}
```


## API Summary

  * `Promise`
    * `.scrape(scrape Object) :Promise`
    * `.scrape(source String, scrape Object) :Promise`

## License

[MIT](./LICENSE)
