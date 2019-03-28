# webpage-capture-cli

> Capture the web in many ways from the command line

[![NPM version][npm-image]][npm-url]

This package provide the command line utility for [webpage-capture]() module.


## Installation

Install it globally with your favourite package manager:

```
npm install -g webpage-capture-cli
```

Now you have the __webcapture__ command ready on your machine, you can start playing around with the options using the built-in help typing: `--help`.

## Usage

For the full usage message and the list of all the available options type `--help`, below are shown __some of the available options__, the objective is to let you capture webpages or webpage sections with custom logic in seconds.

```bash
# Capture a website to file
$ webcapture "http://google.com"

# Capture multiple websites to file
$ webcapture "http://google.com" "http://github.com"

# Capture a website to file in pdf format
$ webcapture -f pdf "http://google.com"

# Capture files to a custom output directory
$ webcapture -o output "http://google.com"
```

---

## License

MIT © [Filippo Conti](LICENSE)


[npm-image]: https://badge.fury.io/js/webpage-capture-cli.svg

[npm-url]: https://npmjs.org/package/webpage-capture-cli

[travis-image]: https://travis-ci.org/b4dnewz/webpage-capture-cli.svg?branch=master

[travis-url]: https://travis-ci.org/b4dnewz/webpage-capture-cli
