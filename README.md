# token-substitute

[![Build Status](https://travis-ci.org/trustpilot/node-token-substitute.svg?branch=master)](https://travis-ci.org/trustpilot/node-token-substitute) [![npm](https://img.shields.io/npm/v/token-substitute.svg)](https://www.npmjs.com/package/token-substitute)

Substitute tokens in an object.

## Installation

``` javascript
npm install token-substitute --save
```

## Getting Started

``` javascript
var substitute = require('token-substitute');

var configObject = { key: '#{config.key}', url: '#{host.url}' }; // Can also just be a string value

var options = {
  tokens: {
    'config.key': 'abcd1234',
    host: {
      url: 'https://api.trustpilot.com'
    }
  }
};

var config = substitute(configObject, options);

console.log(config);

// outputs
// { key: 'abcd1234', url: 'https://api.trustpilot.com' }
```

## API

<a name="function-substitute"></a>
### substitute(_object_ config [, _object_ options])

#### parameters

 - _object_ **config**: The object with values that should be substituted
 - _object_ **options** _[optional]_: object with configurable parameters
 [[connect|Client#wiki-method-connect]]

#### returns

 - _object_: object with substituted variables

### Options
 - **prefix**: _string (default `#{`)_
 - **suffix**: _string (default `}`)_
 - **configFile**: Default path to a json file with key and values - _string (default `./config.json`)_
 - **tokens**: A object of string:value pairs. Will be overritten with values from **configFile** if file exists - _object_
 - **preserveUnknownTokens**: _bool (default `false`)_
 - **delimiter**: Tokens delimeter to match target object _string (default `.`)_
 - **extractToken**: Override's the default token extraction method _func(tokens, tokenName, delimiter)

___
> Modified from [Pictela/gulp-token-replace](https://github.com/Pictela/gulp-token-replace)
