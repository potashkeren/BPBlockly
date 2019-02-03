importPackage(Packages.il.ac.bgu.cs.bp.bpjs.context);
importPackage(Packages.il.ac.bgu.bp.cotextualBlockly.context.schema);

bp.log.info('Tic-Tac-Toe - Let the game begin!');

//#region HELP FUNCTIONS
function createEvent(name, c) {
    return bp.Event(name,"{_row:"+c.i+",_col:"+c.j+"}")
}
//#endregion HELP FUNCTIONS

//#region EventSets
// Represents Enforce Turns
var move = bp.EventSet("Move events", function(e) {
    return e.name === 'O' || e.name === 'X';
});
var XEvents = bp.EventSet("XEvents", function(e) {
    return e.name == 'X';
});
var OEvents = bp.EventSet("OEvents", function(e) {
    return e.name == 'O' ;
});
var EndGame = bp.EventSet("EndGame", function(e) {
    return e.name == 'OWin' || e.name == 'XWin' || e.name == 'Draw';
});
//#endregion EventSets

//#region CEll BEHAVIORS
CTX.subscribe("ClickHandler","Cell", function(c) {
    while (true) {
        bp.sync({ waitFor: createEvent('Click', c) });
        bp.sync({ request: createEvent('X', c) });
    }
});

//detect black cell , white cell - query name
CTX.subscribe("Update cell upon X or O", "EmptyCell", function(c) {
    var e = bp.sync({ waitFor:[ createEvent('X', c), createEvent('O',c)] });
    bp.sync({ request: CTX.UpdateEvent("UpdateCell", {cell: c, val: e.name}) });
});

//block X,O on nonempty cell
CTX.subscribe("block X,O on nonempty cell","NonEmptyCell",function(c) {
    bp.sync({ block:[ createEvent('X', c), createEvent('O',c) ] });
});
//endregion CEll BEHAVIORS

//#region GAME RULES
bp.registerBThread("EnforceTurns", function() {
    while (true) {
        bp.sync({
            waitFor: XEvents,
            block: OEvents
        });
        bp.sync({
            waitFor: CTX.AnyUpdateContextDBEvent("UpdateCell"),
            block: [OEvents, XEvents]
        });
        bp.sync({
            waitFor: OEvents,
            block: XEvents
        });
        bp.sync({
            waitFor: CTX.AnyUpdateContextDBEvent("UpdateCell"),
            block: [OEvents, XEvents]
        });
    }
});

// Represents when the game ends
bp.registerBThread("block X or O on endgame", function() {
    bp.sync({ waitFor: EndGame });
    bp.sync({ block: move });
});

// Represents when it is a draw
bp.registerBThread("DetectDraw", function() {
    // For debug
    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });

    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });

    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });
    bp.sync({ waitFor: move });
    /*
     * for (var i=0; i< 9; i++) { bp.sync({ waitFor:[ move ] }); }
     */
    bp.sync({ request: bp.Event('Draw') }, 90);
});

//#endregion GAME RULES

//#region TRIPLE BEHAVIORS
// Represents when X wins
CTX.subscribe("DetectXWin", "Triple", function(t) {
    for (var c = 0; c < 3; c++) {
        bp.sync({ waitFor:[ createEvent('X', t.cell0), createEvent('X', t.cell1), createEvent('X', t.cell2) ] });
    }
    bp.sync({ request:[ bp.Event('XWin') ] }, 100);
});

// Represents when O wins
CTX.subscribe("DetectOWin", "Triple", function(t) {
    for (var c = 0; c < 3; c++) {
        bp.sync({ waitFor:[ createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2) ] });
    }
    bp.sync({ request:[ bp.Event('OWin') ] }, 100);
});

// Player O strategy to add a the third O to win
CTX.subscribe("AddThirdO", "Triple", function(t) {
    bp.sync({ waitFor:[ createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2) ] });
    bp.sync({ waitFor:[ createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2) ] });
    bp.sync({ request: [ createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2) ] }, 50);
});

// Player O strategy to prevent the third X of player X
CTX.subscribe("PreventThirdX", "Triple", function(t) {
    bp.sync({ waitFor:[ createEvent('X', t.cell0), createEvent('X', t.cell1), createEvent('X', t.cell2) ] });
    bp.sync({ waitFor:[ createEvent('X', t.cell0), createEvent('X', t.cell1), createEvent('X', t.cell2) ] });
    bp.sync({ request: [ createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2) ] }, 40);
});
//#endregion TRIPLE BEHAVIORS

//#region PLAYER O STRATEGY
// Player O strategy to prevent the Fork22 of player X
function addFork22PermutationBthreads(c1,c2){ //
    bp.registerBThread("PreventFork22X", function() {
        bp.sync({ waitFor:[ createEvent('X',c1) ] });
        bp.sync({ waitFor:[ createEvent('X',c2) ] });
        bp.sync({ request:[ createEvent('O',board[2][2]),createEvent('O',board[0,2]), createEvent('O',board[2,0])]}, 30);
    });
}

// Player O strategy to prevent the Fork02 of player X
function addFork02PermutationBthreads(c1,c2){ //
    bp.registerBThread("PreventFork02X", function() {
        bp.sync({ waitFor:[ createEvent('X',c1) ] });
        bp.sync({ waitFor:[ createEvent('X',c2) ] });
        bp.sync({ request:[ createEvent('O',board[0,2]),createEvent('O',board[0,0]), createEvent('O',board[2,2])]}, 30);
    });
}

// Player O strategy to prevent the Fork20 of player X
function addFork20PermutationBthreads(c1,c2){ //
    bp.registerBThread("PreventFork20X", function() {
        bp.sync({ waitFor:[ createEvent('X',c1) ] });
        bp.sync({ waitFor:[ createEvent('X',c2) ] });
        bp.sync({ request:[ createEvent('O',board[2,0]),createEvent('O',board[0,0]), createEvent('O',board[2,2])] }, 30);
    });
}

// Player O strategy to prevent the Fork00 of player X
function addFork00PermutationBthreads(c1,c2){ //
    bp.registerBThread("PreventFork20X", function() {
        bp.sync({ waitFor:[ createEvent('X',c1) ] });
        bp.sync({ waitFor:[ createEvent('X',c2) ] });
        bp.sync({ request:[ createEvent('O',board[0,0]),createEvent('O', board[0,2]), createEvent('O',board[2,0])] }, 30);
    });
}

// Player O strategy to prevent the Forkdiagonal of player X
function addForkdiagPermutationBthreads(c1,c2){ //
    bp.registerBThread("PreventForkdiagX", function() {
        bp.sync({ waitFor:[ createEvent('X',c1) ] });
        bp.sync({ waitFor:[ createEvent('X',c2) ] });
        bp.sync({ request:[ createEvent('O', board[0,1]),createEvent('O',board[1,0]), reateEvent('O', board[2,1]), createEvent('O', board[1,2]) ] }, 30);
    });
}

bp.registerBThread("PLAYER O STRATEGIES", function() {
    bp.sync({waitFor: bp.Event("Context Population Ended")});
    // Preference to put O on the center
    bp.registerBThread("Center", function () {
        while (true) {
            bp.sync({request: [createEvent('O', board[1][1])]}, 35);
        }
    });

    // Preference to put O on the corners
    bp.registerBThread("Corners", function () {
        while (true) {
            bp.sync({
                request: [createEvent('O', board[0][0]), createEvent('O', board[0][2]),
                    createEvent('O', board[2][0]), createEvent('O', board[2][2])]
            }, 20);
        }
    });

    // Preference to put O on the sides
    bp.registerBThread("Sides", function () {
        while (true) {
            bp.sync({
                request: [createEvent('O', board[0][1]), createEvent('O', board[1][0]),
                    createEvent('O', board[2][1]), createEvent('O', board[1][2])]
            }, 10);
        }
    });

    var forks22 = [[{x: 1, y: 2}, {x: 2, y: 0}], [{x: 2, y: 1}, {x: 0, y: 2}], [{x: 1, y: 2}, {x: 2, y: 1}]];
    var forks02 = [[{x: 1, y: 2}, {x: 0, y: 0}], [{x: 0, y: 1}, {x: 2, y: 2}], [{x: 1, y: 2}, {x: 0, y: 1}]];
    var forks20 = [[{x: 1, y: 0}, {x: 2, y: 2}], [{x: 2, y: 1}, {x: 0, y: 0}], [{x: 2, y: 1}, {x: 1, y: 0}]];
    var forks00 = [[{x: 0, y: 1}, {x: 2, y: 0}], [{x: 1, y: 0}, {x: 0, y: 2}], [{x: 0, y: 1}, {x: 1, y: 0}]];

    var forksdiag = [[{x: 0, y: 2}, {x: 2, y: 0}]];

    var permsforks = [[0, 1], [1, 0]];

    forks22.forEach(function (f) {
        permsforks.forEach(function (p) {
            addFork22PermutationBthreads(f[p[0]], f[p[1]]);
        });
    });

    forks02.forEach(function (f) {
        permsforks.forEach(function (p) {
            addFork02PermutationBthreads(f[p[0]], f[p[1]]);
        });
    });

    forks20.forEach(function (f) {
        permsforks.forEach(function (p) {
            addFork20PermutationBthreads(f[p[0]], f[p[1]]);
        });
    });

    forks00.forEach(function (f) {
        permsforks.forEach(function (p) {
            addFork00PermutationBthreads(f[p[0]], f[p[1]]);
        });
    });

    forksdiag.forEach(function (f) {
        permsforks.forEach(function (p) {
            addForkdiagPermutationBthreads(f[p[0]], f[p[1]]);
        });
    });
});
//#endregion PLAYER O STRATEGY