"use strict";
var chai = require('chai'),
    assert = chai.assert,
    sortData = require('../node_modules/obfuscation/sortData'),
    namesGenerator = require('../node_modules/obfuscation/namesGenerator'),
    obf = require('obfuscation');

describe('Obfuscation', function () {
    describe('#sortData', function () {
        describe('Is array', function () {
            it('should return array ', function () {
                var data = ['sadfja', 'jfsajfs', 'jsdaijfjd'],
                    result = sortData(data);
                assert.isArray(result);
            });
        });
        describe('Sorted data', function () {
            it('must return the data sorted in descending order for one copy', function () {
                var data = ['ter', 'ter', 'asdafsd', 'asdafsd', 'asdafsd', 'lkj', 'asdafsd', 'jjjj', 'jjjj', 'jjjj'],
                    needs_result = ['asdafsd', 'jjjj', 'ter', 'lkj'],
                    result = sortData(data);
                assert.deepEqual(needs_result, result);
            })
        })
    });

    describe('#namesGenerator', function () {
        describe('Is object', function () {
            it('must return object', function () {
                var name = namesGenerator();
                assert.isObject(name);
            })
        });
        describe('First letter', function () {
            it('first char must be only letter', function () {
                var name = namesGenerator();
                for (var i = 0; i < 10000; i++) {
                    var result = name.generate();
                    assert.match(result.charAt(0), /[a-z]/);
                }
            })
        });

        describe('Unique value', function () {
            it('each call \'generate\' must create unique value', function () {
                var name = namesGenerator(),
                    uniques_values = [];
                for (var i = 0; i < 10000; i++) {
                    var unique_name = name.generate();
                    assert.equal(-1, uniques_values.indexOf(unique_name));
                    uniques_values.push(unique_name);
                }
            })
        });

        describe('Reset generator', function () {
            it('after cell \'reset\' must clear generator', function () {
                var name = namesGenerator();
                for (var i = 0; i < 10000; i++) {
                    name.generate();
                }
                name.reset();
                assert.equal('a', name.generate());
            })
        });

        describe('Is string', function () {
            it('each call to the generator must return \'string\' value', function () {
                var name = namesGenerator();
                for (var i = 0; i < 10000; i++) {
                    assert.isString(name.generate());
                }
            })
        })
    });

    describe('#functionality', function () {
        describe('Generate new name', function () {
            it('must sorted data and create new value', function () {
                var data = ['asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf',
                        'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer',
                        'qwe', 'qwe', 'qwe', 'qwe', 'qwe',
                        'qwewrqwtrqrqr', 'qwewrqwtrqrqr', 'qwewrqwtrqrqr',
                        'qqqqqqqqqqqqqqq', 'qqqqqqqqqqqqqqq'
                    ],
                    sort_data = sortData(data),
                    needs_result = {
                        'asdetfsaf': 'a',
                        'qwerqwer': 'b',
                        'qwe': 'c',
                        'qwewrqwtrqrqr': 'd',
                        'qqqqqqqqqqqqqqq': 'e'
                    },
                    result = {},
                    name = namesGenerator();

                for (var key in sort_data) {
                    result[sort_data[key]] = name.generate();
                }
                assert.deepEqual(needs_result, result);
            })
        });
        describe('Is object', function () {
            it('must return type object', function () {
                var data = ['asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf', 'asdetfsaf',
                        'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer', 'qwerqwer',
                        'qwe', 'qwe', 'qwe', 'qwe', 'qwe',
                        'qwewrqwtrqrqr', 'qwewrqwtrqrqr', 'qwewrqwtrqrqr',
                        'qqqqqqqqqqqqqqq', 'qqqqqqqqqqqqqqq'
                    ],
                    result = obf(data);
                assert.isObject(result);
            })
        })
    })
});