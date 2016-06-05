var rnd = function (arr) {
    return typeof arr == 'number' ?
        Math.floor(Math.random() * arr) :
        arr[Math.floor(Math.random() * arr.length)];
};

var debug = function(m) {
    for (let i = 0; i < m.length; i++) {
        console.info(m[i].join('').replace(/1/g, '⊠').replace(/0/g, '·'));
    }
    console.info('');
};
