'use strict';

function injectDefaultOptions(options) {
  options = options || {};
  options.prefix = options.prefix || '#{';
  options.suffix = options.suffix || '}';
  options.configFile = options.configFile || process.cwd() + '/config.json';
  options.preserveUnknownTokens = options.preserveUnknownTokens || false;
  options.delimiter = options.delimiter || '.';

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

function getTokenValue(tokens, tokenName, delimiter) {
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

  var includeRegExp = new RegExp(escapeRegExp(options.prefix) + '(.+?)' + escapeRegExp(options.suffix), 'g');
  var text, isObject = false;
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
    var tokenValue = getTokenValue(options.tokens, tokenName, options.delimiter);
    if (tokenValue === null && !options.preserveUnknownTokens) {
      tokenValue = '';
    }
    if (tokenValue !== null) {
      if (typeof tokenValue == 'object') {
        tokenValue = JSON.stringify(tokenValue);
      }
      retVal = retVal.replace(fullMatch, tokenValue);
    }
  }
  return isObject ? JSON.parse(retVal) : retVal;
}

module.exports = replace;
