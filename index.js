'use strict';

function injectDefaultOptions(options) {
  options = options || {};
  options.prefix = options.prefix || '#{';
  options.suffix = options.suffix || '}';
  options.configFile = options.configFile || process.cwd() + '/config.json';
  options.preserveUnknownTokens = options.preserveUnknownTokens || false;
  options.delimiter = options.delimiter || '.';
  options.extractToken = options.extractToken || getTokenValue;

  if (options.configFile) {
    try {
      options.tokens = require(options.configFile);
    } catch (e) { }
  }
  options.tokens = options.tokens || options.global || {};

  return options;
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function getTokenValue(tokenName, tokens, delimiter) {
  var tmpTokens = tokens;

  if (tokens.hasOwnProperty(tokenName)) {
    return tokens[tokenName];
  }

  var tokenNameParts = tokenName.split(delimiter);

  for (var i = 0; i < tokenNameParts.length; i++) {
    if (tmpTokens.hasOwnProperty(tokenNameParts[i])) {
      tmpTokens = tmpTokens[tokenNameParts[i]];
    } else {
      return null;
    }
  }

  return tmpTokens;
}


function replace(target, options) {
  options = injectDefaultOptions(options);

  var regexPattern = `${ escapeRegExp(options.prefix) }(.+?)${ escapeRegExp(options.suffix)}`;
  var includeRegExp = new RegExp(regexPattern, 'g');
  var isObject = false;
  var text;

  if (typeof target === 'object') {
    text = JSON.stringify(target);
    isObject = true;
  } else if ( typeof target === 'string') {
    text = target;
  } else {
    text = target.toString();
  }

  var retVal = text;
  var regExpResult;

  while (regExpResult = includeRegExp.exec(text)) {
    var fullMatch = regExpResult[0];
    var tokenName = regExpResult[1];
    var tokenValue = options.extractToken(tokenName, options.tokens, options.delimiter);

    if (tokenValue === null && !options.preserveUnknownTokens) {
      tokenValue = '';
    }

    if (tokenValue !== null) {
      if (typeof tokenValue === 'object') {
        tokenValue = JSON.stringify(tokenValue);
      } else if (typeof tokenValue === 'string') {
        if (tokenValue.indexOf('"') > -1) {
          tokenValue = tokenValue.replace(/"/g, '\\"');
        }
      }

      retVal = retVal.replace(fullMatch, tokenValue);
    }
  }

  return isObject ? JSON.parse(retVal) : retVal;
}

module.exports = replace;
