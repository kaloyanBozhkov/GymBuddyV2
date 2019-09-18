export function doesNotExist(item, checkIfEmptyObject = true) {
    return (item === null || typeof item == "undefined" || (checkIfEmptyObject && item.length <= 2));//null is primitive type but typeof returns Object (a JS unsolvable bug)
}

export function addIteratorToObject(obj) {
    Object.defineProperty(obj, Symbol.iterator, {
        enumerable: false,
        configurable: false,
        value: function () {
            var o = this;
            var id = 0;
            var keys = Object.keys(o);
            return {
                next: function () {
                    let key = keys[id++];
                    return {
                        value: {
                            obj: o[key],
                            relativeKey: key
                        },
                        done: (id > keys.length)
                    }
                }
            }
        }
    });
}

export function mixinCopyObj(obj) {
    var newObj = Object.create(null);
    for (let property of Object.keys(obj))
        newObj[property] = obj[property];

    return newObj;
}

export function round(n) { //round to one decimal place
    return (Math.round(n * 10) / 10);
}

export function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function replaceArrays(string, arrayOne, arrayTwo) {
    for (let j in arrayOne)
        string = string.replace(arrayOne[j], arrayTwo[j]);

    return string;
}

export function calculatePercentage(current, total) {
    return round(current == 0 || total == 0 ? 0 : 100 * current / total);
}

export function camelCaseInput(string) {
    var camel = "";
    var lastLetter = string.substr(string.length - 1) == " " ? " " : "";
    var x = string.trim().split(" ");
    var tmpSpace = "";
    for (var i = 0; i <= x.length - 1; i++) {
        if (i > 0) {
            tmpSpace = " ";
        }
        camel += tmpSpace + x[i].substr(0, 1).toUpperCase() + x[i].substr(1).toLowerCase();
    }
    return camel + lastLetter;
}//Instead of CSS's text-transform: capitalize; JUST BECAUSE JS IS DOPER.

export function getClassMethods(theClass){
    return Object.getOwnPropertyNames(theClass.prototype).filter(x => x != "constructor").map(x => x);
}   

export function copyMethodsFromBaseClass(obj, forEachProperty = false, ...objsToCopyFrom){
    for(let objToCopyFrom of objsToCopyFrom){
        var funcs = getClassMethods(objToCopyFrom);
        for(let func of funcs)
            if(forEachProperty)
                for(let key of Object.keys(obj))
                    obj[key][func] = objToCopyFrom.prototype[func];//since JSON ignores functions, re-add them all
            else
                obj[func] = objToCopyFrom.prototype[func];
    }
}