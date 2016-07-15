function splitJoin(str, splitChar, joinChar, fun) {
    return str.split(splitChar)
	      .map(fun)
	      .join(joinChar);
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function snakeCase(str) {
    return splitJoin(str, " ", "_", capitalize);
}

export function spaceCase(str) {
    return splitJoin(str, "_", " ", capitalize);
}

export function titleCase(str) {
    return splitJoin(str, " ", " ", capitalize);
}

export function deepCopy(arr) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var obj = {};
        for (var k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
}

export function cloneExtend(arr, index, props) {
    let newArr = deepCopy(arr);
    let item = newArr[index];
    newArr[index] = { ...item, ...props };
    return newArr;
}

export function required(fn, param) {
    throw `${fn}: required parameter ${param} missing`;
}
