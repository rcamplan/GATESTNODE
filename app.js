var json = require('./data');
const util = require('util');

const cmd = process.argv[2];
const data = json.data;


if (cmd.indexOf('--filter=') > -1) {
    const prefix = cmd.replace('--filter=', '');
    const newData = data.filter((v) => {
        v.people = v.people.filter(j => {
            j.animals = j.animals.filter(k => {
                const a = k.name.indexOf(prefix);
                if (a > -1) { return k }
            });
            if (j.animals && j.animals.length > 0) { return j }
        });
        if (v.people && v.people.length > 0) { return v }
    });
    console.log(util.inspect(newData, false, null, true));
}

if (cmd.indexOf('--count') > -1) {
    const newData = data.map((v) => {
        v.name = v.name + " [" + v.people.length + "]";
        v.people = v.people.map(j => {
            if (j.animals && j.animals.length > 0) {
                j.name = j.name + " [" + j.animals.length + "]";
            }
            return j;
        });
        return v;
    });
    console.log(util.inspect(newData, false, null, true));
}