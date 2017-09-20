'use strict';

const assert = require('chai').assert;
const substitute = require('../index');

describe('Default option value tests', () => {
  const config = {
    test1: '#{key1}',
    test2: '{{key2}}',
    test3: '#{key3-1}',
    test4: '#{key4.1}',
    test5: {
      test51: '#{key5.1}'
    }
  };

  it('Test default options', () => {
    const actual = substitute(config);
    assert.isObject(actual);
    assert.notStrictEqual(actual, config);
    assert.equal(actual.test1, '');
    assert.equal(actual.test2, '{{key2}}');
    assert.equal(actual.test5.test51, '');
  });

  it('Test preserveUnknownTokens set to true', () => {
    const options = { preserveUnknownTokens: true };
    const actual = substitute(config, options);
    assert.notEqual(actual.test1, '', 'Expected to preserve value');
    assert.equal(actual.test2, '{{key2}}');
    assert.notEqual(actual.test5.test51, '');
  });

  it('Test tokens is set', () => {
    const options = { tokens: { key1: 'expectedValue', key2: 'unexpectedValue' } };
    const actual = substitute(config, options);

    assert.equal(actual.test1, 'expectedValue', 'Expected different value');
    assert.notEqual(actual.test2, 'unexpectedValue', 'Expected unchanged value');
  });

  it('Testing prefix and suffix', () => {
    const tokens = { key1: 'unexpectedValue', key2: 'expectedValue' };
    const options = { prefix: '{{', suffix: '}}', tokens: tokens };
    const actual = substitute(config, options);

    assert.notEqual(actual.test1, 'unexpectedValue', 'Expected value to be unchanged');
    assert.equal(actual.test2, 'expectedValue', 'Expected value to be changed');
  });

  it('Testing substitute values from json file', () => {
    const options = { configFile: './test/test.json' };
    const actual = substitute(config, options);

    assert.equal(actual.test1, 'value1');
    assert.equal(actual.test3, 'value3.1');
    assert.equal(actual.test4, 'value4.1');
    assert.equal(actual.test5.test51, 'value5.1');
  });

  it('Testing that the target can be string value', () => {
    const options = {configFile: './test/test.json' };
    const configvalue = JSON.stringify(config);
    const actual = substitute(configvalue, options);

    assert.isNotObject(actual);
    assert.notInclude(configvalue, 'value1');
    assert.include(actual, 'value1');
    assert.include(actual, 'value3.1');
    assert.include(actual, 'value4.1');
    assert.include(actual, 'value5.1');
    assert.notInclude(actual, '#{key1}');
  });
});
