import { v4 } from "node-uuid";
import bigInt from "big-integer";

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


/**
 * Clones an array and applies properties from another object into an object in it.
 */
export function cloneExtend(arr, index, props) {
    let newArr = deepCopy(arr);
    let item = newArr[index];
    newArr[index] = { ...item, ...props };
    return newArr;
}


export function required(fn, param) {
    throw `${fn}: required parameter ${param} missing`;
}


export function nullify(value, nullValue) {
    return value === nullValue ? null : value;
}


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function niceTime(epoch) {
    let d = new Date(+epoch);

    let month = d.getMonth();
    let day = d.getDate();

    let hour = d.getHours();
    let ampm;
    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    } else {
        ampm = "AM";
    }
    if (hour == 0)
        hour = 12;
    let minute = d.getMinutes();
    if (minute < 10)
        minute = "0" + minute;
    
    return `${months[month]} ${day}, ${hour}:${minute} ${ampm}`;
}


export function uniqueIdentifier() {
    let id = v4();
    let bgid = bigInt(id.replace(/-/g, ""), 16);
    let answer = "";

    while (bgid.greater(0)) {
        let qr = bgid.divmod(62);
        let r = qr.remainder.valueOf();
        let char = "";

        if (r < 10) {
            char = String(r);
        }
        else if (r < 36) {
            char = String.fromCharCode(65 + r - 10);
        }
        else {
            char = String.fromCharCode(97 + r - 36);
        }

        answer += char;
        bgid = qr.quotient;
    }

    return answer;
}
