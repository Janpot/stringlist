/* global describe, it */

'use strict';

var assert = require('chai').assert;
var stringlist = require('..');

describe('parse', function () {

  it('parses the empty string', function () {
    var parsed = stringlist.parse('');
    assert.deepEqual(parsed, []);
  });

  it('only whitespace results in empty list', function () {
    var parsed = stringlist.parse('  ');
    assert.deepEqual(parsed, []);
  });

  it('throws on non string', function () {
    assert.throws(function () {
      stringlist.parse();
    });
    assert.throws(function () {
      stringlist.parse({});
    });
    assert.throws(function () {
      stringlist.parse(true);
    });
    assert.throws(function () {
      stringlist.parse(null);
    });
  });

  it('parses single item string', function () {
    var parsed = stringlist.parse('item');
    assert.deepEqual(parsed, [ 'item' ]);
  });

  it('parses multiple verbatim items', function () {
    var parsed = stringlist.parse('item1,item2,item3');
    assert.deepEqual(parsed, [ 'item1', 'item2', 'item3' ]);
  });

  it('parse items with whitespace', function () {
    var parsed = stringlist.parse('item 1 ,item 2, item 3');
    assert.deepEqual(parsed, [ 'item 1', 'item 2', 'item 3' ]);
  });

  it('parse quoted items', function () {
    var parsed = stringlist.parse('"item 1",\'item 2\'');
    assert.deepEqual(parsed, [ 'item 1', 'item 2' ]);
  });

  it('doesn\'t trim quoted items', function () {
    var parsed = stringlist.parse('"  item 1",\'item 2  \'');
    assert.deepEqual(parsed, [ '  item 1', 'item 2  ' ]);
  });

  it('quoted items understand escaped quotes', function () {
    var parsed = stringlist.parse('"\\"",\'\\\'\'');
    assert.deepEqual(parsed, [ '"', '\'' ]);
  });

  it('quoted items understand escaped characters', function () {
    var parsed = stringlist.parse('"\\t \\\\ \\n \\r \\b \\f \\r"');
    assert.deepEqual(parsed, [ '\t \\ \n \r \b \f \r' ]);
  });

  it('verbatim items ignore escaped characters', function () {
    var parsed = stringlist.parse('\\t \\\\ \\n \\r \\b \\f \\r');
    assert.deepEqual(parsed, [ '\\t \\\\ \\n \\r \\b \\f \\r' ]);
  });

  it('handles whitespace correctly', function () {
    var parsed = stringlist.parse(' x y , " x y " , \' x y \' ');
    assert.deepEqual(parsed, [ 'x y', ' x y ', ' x y ' ]);
  });

  it('accept custom a delimiter', function () {
    var parsed = stringlist.parse('a; b, c; d', {
      delimiter: ';'
    });
    assert.deepEqual(parsed, [ 'a', 'b, c', 'd' ]);
  });

  it('throws on invalid delimiter', function () {
    assert.throws(function () {
      stringlist.parse('a; b; c; d', {
        delimiter: 'invalid'
      });
    });
  });


});
