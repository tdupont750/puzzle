const Helpers = function createHelpers() {
    "use strict";

    return makeConst({
        rand,
        addConst,
        makeConst,
        makeEnum,
        indexOf,
        all
    });

    function rand(max) {
        let r = Math.random();
        return Math.floor(r * max);
    }

    function addConst(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            writable: false,
            enumerable: true,
            configurable: true
        });
    }

    function makeConst(obj) {
        let r = {};
        for(let p in obj) {
            addConst(r, p, obj[p])
        }
        return r;
    }

    function makeEnum(name, obj) {
        let e = makeConst(obj);
        addOfFuncs(name, e);
        return e;
    }

    function indexOf(array, el) {
        for(let i=0; i<array.length; i++) {
            if (array[i] === el) {
                return i;
            }
        }

        return -1;
    }

    function all(array, func) {
        for(let i=0; i<array.length; i++) {
            if (func(array[i]) !== true) {
                return false;
            }
        }

        return true;
    }

    function addOfFuncs(name, obj) {
        addConst(obj, 'nameOf', nameOf);
        addConst(obj, 'valueOf', valueOf);

        function nameOf(v) {
            for(let p in obj) {
                if (obj[p] == v) {
                    return p;
                }
            }

            throw 'Invalid ' + name + ' Value: ' + v;
        }

        function valueOf(n) {
            for(let p in obj) {
                if (p == n) {
                    return obj[p];
                }
            }

            throw 'Invalid ' + name + ' Value: ' + obj[p];
        }
    }

};