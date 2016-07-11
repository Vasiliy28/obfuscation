"use strict";

var data = require('./classes.json'),
    obf = require('obfuscation'),
    new_classes_names = obf(data);

console.log(new_classes_names);