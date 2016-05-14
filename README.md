[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]
# node-token-substitute

> Substitute variables in object in nodejs projects

## Installation

``` javascript
npm install token-substitute
```

## How to use

``` javascript
var substitute = require('token-substitute');

var configObject = { key: '#{config.key}', url: '#{host.url}' };

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

___
> Modified from [Pictela/gulp-token-replace](https://github.com:Pictela/gulp-token-replace)


[npm-url]: https://npmjs.org/package/token-substitute
[downloads-image]: http://img.shields.io/npm/dm/token-substitute.svg
[npm-image]: http://img.shields.io/npm/v/token-substitute.svg
[travis-url]: https://travis-ci.org/trustpilot/node-token-substitute
[travis-image]: http://img.shields.io/travis/trustpilot/node-token-substitute.svg
[david-dm-url]:https://david-dm.org/trustpilot/node-token-substitute
[david-dm-image]:https://david-dm.org/trustpilot/node-token-substitute.svg
[david-dm-dev-url]:https://david-dm.org/trustpilot/node-token-substitute#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/trustpilot/node-token-substitute/dev-status.svg
