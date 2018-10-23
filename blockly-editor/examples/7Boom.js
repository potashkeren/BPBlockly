function beforeSevenFunction (evt) {
    var nxt = (parseInt(evt.name) + 1);
    return (nxt % 7 === 0 || nxt.toString().includes("7"))
};

var beforeSeven = bp.EventSet("got7", beforeSevenFunction);

var number = bp.EventSet("num", function (evt) {
    //return /^\d+$/.test(evt.name)
    return !isNaN(evt.name)
});

var boom = bp.Event("booom");

bp.registerBThread("7boom", function () {
    for (i = 1; i <= 100; i++) {
        bsync({request: bp.Event(i), waitFor: boom})
    }
});

bp.registerBThread("counter", function () {
        while (true) {
            var num = bsync({waitFor: beforeSeven});
            while (true) {
                bsync({request: boom, block: number});
                num = {name: (Number(num.name) + 1).toString()};
                if (!beforeSevenFunction(num)){break; }
            }
        }
    }
);

