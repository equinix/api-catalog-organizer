'use strict';

module.exports = {
    isEqualsIgnoreCase: function (string1, string2) {
        return string1.toUpperCase() === string2.toUpperCase();
    },

    getKeys: function (obj) {
        var keys = [];
        for (key in obj) keys.push(key);
        return keys;
    },

    camelize: function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    },

    findProp: findProp,

    filterObject: filterObject,

    removeFromArray: removeFromArray
};

function filterObject(obj, key) {
    var proto = Object.prototype,
        ts = proto.toString;
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (i == 'tags' && '[object Array]' === ts.call(obj[i])) {
            removeFromArray(obj[i], key);
        }
        if (typeof obj[i] == 'object') {
            filterObject(obj[i], key);
        }
    }
    return obj;
};

function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function findProp(obj, key, out) {
    var i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(obj);

    if ('[object Object]' !== ts.call(out)) out = {};

    for (i in obj) {
        if (hasOwn(i)) {
            if (i === key) {
                out[obj[i]] = true;
            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                findProp(obj[i], key, out);
            }
        }
    }
    return out;
}