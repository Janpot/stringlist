'use strict';

var DEFAULT_DELIMITER = ',';

function unescape(string) {
  return string
    .replace(/\\(.)/g, function (match, character) {
      switch (character) {
        case 'n': return '\n';
        case 't': return '\t';
        case 'r': return '\r';
        case 'f': return '\f';
        case 'b': return '\b';
        default: return character;
      }
    });
}

function parse(string, config) {
  config = config || {};
  var delimiter = config.delimiter || DEFAULT_DELIMITER;

  if (delimiter.length !== 1) {
    throw new Error('Invalid delimiter "' + delimiter + '"');
  }

  var type = typeof string;
  if (type !== 'string') {
    throw new Error('Expected a string instead of ' + type);
  }

  string = string.trim();
  if (string === '') {
    return [];
  }

  var idx = 0;

  function skipWhitespace() {
    while (idx < string.length && /\s/.test(string[idx])) {
      idx += 1;
    }
  }

  function readLiteral() {
    var quote = string[idx];
    idx += 1; // skip quote
    var start = idx;
    while (idx < string.length && string[idx] !== quote) {
      idx += string[idx] === '\\' ? 2 : 1;
    }
    var result = string.substring(start, idx);
    if (string[idx] !== quote) {
      throw new Error('Unclosed literal "' + result + '"');
    }
    idx += 1; // skip quote
    return unescape(result);
  }

  function readVerbatim() {
    var start = idx;
    while (idx < string.length && string[idx] !== delimiter) {
      idx += 1;
    }
    return string.substring(start, idx).trim();
  }

  var values = [];
  while (idx < string.length) {
    skipWhitespace();
    var character = string[idx];
    var value = null;
    if (/["']/.test(character)) {
      value = readLiteral();
    } else {
      value = readVerbatim();
    }
    values.push(value);
    skipWhitespace();
    idx += 1; // skip delimiter
  }

  return values;
}

exports.parse = parse;
