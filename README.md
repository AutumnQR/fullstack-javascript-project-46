### Hexlet tests and linter status:
[![Actions Status](https://github.com/AutumnQR/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AutumnQR/fullstack-javascript-project-46/actions)
![Github Action Status](https://github.com/AutumnQR/fullstack-javascript-project-46/actions/workflows/node.js.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/4bd168311b87623461cf/maintainability)](https://codeclimate.com/github/AutumnQR/fullstack-javascript-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4bd168311b87623461cf/test_coverage)](https://codeclimate.com/github/AutumnQR/fullstack-javascript-project-46/test_coverage)
# Project: Difference Calculator

Difference Calculator is my second project on the Hexlet learning platform, it can be used to learn the differences of data in files.

## Installation

1. Clone repo: `git@github.com:AutumnQR/fullstack-javascript-project-46.git`
2. Install dependencies: `npm i`
3. Use command `gendiff -h` to get information about further steps

## Minimum requirements
- OS: Windows 10 and above 
- NodeJS LTS version

## Work example

Command: `gendiff <file1> <file2>` will show you the differences between the two files with the default "stylish" formatter, example:

```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

You can use any of the three formatters:
- json
- stylish
- plain

The operation of each of the formatters is specified in the asciiinemas below

## Asciinemas

### Stylish formatter and "help" command
[![asciicast](https://asciinema.org/a/VtdCNzuxnIVkcTds73gVsrSu4.svg)](https://asciinema.org/a/VtdCNzuxnIVkcTds73gVsrSu4)

### Plain formatter
[![asciicast](https://asciinema.org/a/8Zmpk7k6zAhw1xUvsajzq3dJo.svg)](https://asciinema.org/a/8Zmpk7k6zAhw1xUvsajzq3dJo)

### JSON formatter
[![asciicast](https://asciinema.org/a/xareByKZji5OPOEe0qBVZcSmr.svg)](https://asciinema.org/a/xareByKZji5OPOEe0qBVZcSmr)
