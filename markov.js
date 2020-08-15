const _ = require("lodash");
const indexOf = (arr, toFind) => arr.findIndex((x, i, a) => toFind.every((item, index) => a[i + index] === item));
const exists = (arr, toFind) => indexOf(arr, toFind) !== -1;
module.exports = class Markov {
    constructor(strings, mode = "word", order = 2) {
        this.mode = mode;
        this.order = order;
        this.START = String.fromCharCode(0xEDAD);
        this.END = String.fromCharCode(0xEF00);
        this.strings = strings.map(x => [this.START, ...x.toLowerCase().split(mode === "word" ? /\s+/ : ""), this.END]);
    }
    generate(start = [], maxLength = 160) {
        const starting = start.length ? start : _.sampleSize(this.strings.map(x => x[x.indexOf(this.START) + 1]), 1);
        const str = [this.START, ...starting];
        while (true) {
			const lastArr = str.slice(-this.order);
			const all = this.strings.filter(x => exists(x, lastArr)).map(x => x[indexOf(x, lastArr) + this.order]);
            const toAdd = _.sample(all);
            str.push(toAdd);
            if (toAdd === this.END || str.length >= maxLength)
                break;
        }
        return str.slice(1, -1).join(this.mode === "word" ? " " : "");
    }
}
 