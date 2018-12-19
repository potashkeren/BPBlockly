bp.log.info('Tic-Tac-Toe - Let the game begin!');

function createEvent(name, row, col) {
    return bp.Event(name,"{_row:"+row+",_col:"+col+"}")
}

// GameRules:

// This BThreads are on each square of the grid
function addSquareBThreads(row, col) {
    // Detects mouse click
    bp.registerBThread("ClickHandler(" + row + "," + col + ")", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('Click', row, col) ] });
            bp.sync({ request:[ createEvent('X', row, col) ] });
        }
    });

    // Blocks further marking of a square already marked by X or O.
    bp.registerBThread("SquareTaken(" + row + "," + col + ")", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', row, col), createEvent('O', row, col)] });
            bp.sync({ block:[ createEvent('X', row, col), createEvent('O', row, col) ] });
        }
    });
}

for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
        addSquareBThreads(r, c);
    }
}

// Represents Enforce Turns
bp.registerBThread("EnforceTurns", function() {
    while (true) {
        bp.sync({
            waitFor:[
                createEvent('X', 0, 0), createEvent('X', 0, 1), createEvent('X', 0, 2),
                createEvent('X', 1, 0), createEvent('X', 1, 1), createEvent('X', 1, 2),
                createEvent('X', 2, 0), createEvent('X', 2, 1), createEvent('X', 2, 2) ],
            block:[
                createEvent('O', 0, 0), createEvent('O', 0, 1), createEvent('O', 0, 2),
                createEvent('O', 1, 0), createEvent('O', 1, 1), createEvent('O', 1, 2),
                createEvent('O', 2, 0), createEvent('O', 2, 1), createEvent('O', 2, 2) ] });

        bp.sync({
            waitFor:[
                createEvent('O', 0, 0), createEvent('O', 0, 1), createEvent('O', 0, 2),
                createEvent('O', 1, 0), createEvent('O', 1, 1), createEvent('O', 1, 2),
                createEvent('O', 2, 0), createEvent('O', 2, 1), createEvent('O', 2, 2) ],
            block:[
                createEvent('X', 0, 0), createEvent('X', 0, 1), createEvent('X', 0, 2),
                createEvent('X', 1, 0), createEvent('X', 1, 1), createEvent('X', 1, 2),
                createEvent('X', 2, 0), createEvent('X', 2, 1), createEvent('X', 2, 2)] });
    }
});

// Represents when the game ends
bp.registerBThread("EndOfGame", function() {
    bp.sync({ waitFor:[ bp.Event('OWin'), bp.Event('XWin'), bp.Event('Draw') ] });
    bp.sync({ block:[
            createEvent('X', 0, 0), createEvent('X', 0, 1), createEvent('X', 0, 2),
            createEvent('X', 1, 0), createEvent('X', 1, 1), createEvent('X', 1, 2),
            createEvent('X', 2, 0), createEvent('X', 2, 1), createEvent('X', 2, 2),
            createEvent('O', 0, 0), createEvent('O', 0, 1), createEvent('O', 0, 2),
            createEvent('O', 1, 0), createEvent('O', 1, 1), createEvent('O', 1, 2),
            createEvent('O', 2, 0), createEvent('O', 2, 1), createEvent('O', 2, 2)
        ] });
});

var move = bp.EventSet("Move events", function(e) {
    return e.name == 'O' || e.name == 'X';
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
    bp.sync({ request:[ bp.Event('Draw') ] }, 90);
});

function addLinePermutationBthreads(l, p) {
    // Represents when X wins
    bp.registerBThread("DetectXWin(<" + l[p[0]].x + "," + l[p[0]].y + ">," + "<" + l[p[1]].x + "," + l[p[1]].y + ">," + "<" + l[p[2]].x + "," + l[p[2]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', l[p[0]].x, l[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', l[p[1]].x, l[p[1]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', l[p[2]].x, l[p[2]].y) ] });
            bp.sync({ request:[ bp.Event('XWin') ] }, 100);
        }
    });

    // Represents when O wins
    bp.registerBThread("DetectOWin(<" + l[p[0]].x + "," + l[p[0]].y + ">," + "<" + l[p[1]].x + "," + l[p[1]].y + ">," + "<" + l[p[2]].x + "," + l[p[2]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('O', l[p[0]].x, l[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('O', l[p[1]].x, l[p[1]].y) ] });
            bp.sync({ waitFor:[ createEvent('O', l[p[2]].x, l[p[2]].y) ] });
            bp.sync({ request:[ bp.Event('OWin') ] }, 100);
        }
    });

    // Player O strategy to add a the third O to win
    bp.registerBThread("AddThirdO(<" + l[p[0]].x + "," + l[p[0]].y + ">," + "<" + l[p[1]].x + "," + l[p[1]].y + ">," + "<" + l[p[2]].x + "," + l[p[2]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('O', l[p[0]].x, l[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('O', l[p[1]].x, l[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', l[p[2]].x, l[p[2]].y) ] }, 50);
        }
    });

    // Player O strategy to prevent the third X of player X
    bp.registerBThread("PreventThirdX(<" + l[p[0]].x + "," + l[p[0]].y + ">," + "<" + l[p[1]].x + "," + l[p[1]].y + ">," + "<" + l[p[2]].x + "," + l[p[2]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', l[p[0]].x, l[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', l[p[1]].x, l[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', l[p[2]].x, l[p[2]].y) ] }, 40);
        }
    });
}

// Player O strategy:

var lines = [ [ { x:0, y:0 }, { x:0, y:1 }, { x:0, y:2 } ],
    [ { x:1, y:0 }, { x:1, y:1 }, { x:1, y:2 } ],
    [ { x:2, y:0 }, { x:2, y:1 }, { x:2, y:2 } ],
    [ { x:0, y:0 }, { x:1, y:0 }, { x:2, y:0 } ],
    [ { x:0, y:1 }, { x:1, y:1 }, { x:2, y:1 } ],
    [ { x:0, y:2 }, { x:1, y:2 }, { x:2, y:2 } ],
    [ { x:0, y:0 }, { x:1, y:1 }, { x:2, y:2 } ],
    [ { x:0, y:2 }, { x:1, y:1 }, { x:2, y:0 } ] ];
var perms = [ [ 0, 1, 2 ], [ 0, 2, 1 ], [ 1, 0, 2 ],
    [ 1, 2, 0 ], [ 2, 0, 1 ], [ 2, 1, 0 ] ];

lines.forEach(function(l) {
    perms.forEach(function(p) {
        addLinePermutationBthreads(l, p);
    });
});

function addFork22PermutationBthreads(f, p) {
    // Player O strategy to prevent the Fork22 of player X
    bp.registerBThread("PreventFork22X(<" + f[p[0]].x + "," + f[p[0]].y + ">," + "<" + f[p[1]].x + "," + f[p[1]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', f[p[0]].x, f[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', f[p[1]].x, f[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', 2, 2),createEvent('O', 0, 2),
                    createEvent('O', 2, 0)] }, 30);
//			bp.sync({ block:[ O(0,0), O(0,1), O(1,0) ] },30); // Problematic - stays all the time
        }
    });
}

function addFork02PermutationBthreads(f, p) {
    // Player O strategy to prevent the Fork02 of player X
    bp.registerBThread("PreventFork02X(<" + f[p[0]].x + "," + f[p[0]].y + ">," + "<" + f[p[1]].x + "," + f[p[1]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', f[p[0]].x, f[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', f[p[1]].x, f[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', 0, 2),createEvent('O', 0, 0),
                    createEvent('O', 2, 2)] }, 30);
        }
    });
}

function addFork20PermutationBthreads(f, p) {
    // Player O strategy to prevent the Fork20 of player X
    bp.registerBThread("PreventFork20X(<" + f[p[0]].x + "," + f[p[0]].y + ">," + "<" + f[p[1]].x + "," + f[p[1]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', f[p[0]].x, f[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', f[p[1]].x, f[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', 2, 0),createEvent('O', 0, 0),
                    createEvent('O', 2, 2)] }, 30);
        }
    });
}

function addFork00PermutationBthreads(f, p) {
    // Player O strategy to prevent the Fork00 of player X
    bp.registerBThread("PreventFork00X(<" + f[p[0]].x + "," + f[p[0]].y + ">," + "<" + f[p[1]].x + "," + f[p[1]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[ createEvent('X', f[p[0]].x, f[p[0]].y) ] });
            bp.sync({ waitFor:[ createEvent('X', f[p[1]].x, f[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', 0, 0),createEvent('O', 0, 2),
                    createEvent('O', 2, 0)] }, 30);
        }
    });
}

function addForkdiagPermutationBthreads(f, p) {
    // Player O strategy to prevent the Forkdiagonal of player X
    bp.registerBThread("PreventForkdiagX(<" + f[p[0]].x + "," + f[p[0]].y + ">," + "<" + f[p[1]].x + "," + f[p[1]].y + ">)", function() {
        while (true) {
            bp.sync({ waitFor:[createEvent('X', f[p[0]].x, f[p[0]].y)] });
            bp.sync({ waitFor:[ createEvent('X', f[p[1]].x, f[p[1]].y) ] });
            bp.sync({ request:[ createEvent('O', 0, 1),createEvent('O', 1, 0),
                    createEvent('O', 2, 1), createEvent('O', 1, 2) ] }, 30);
        }
    });
}

var forks22 = [ [ { x:1, y:2 }, { x:2, y:0 } ], [ { x:2, y:1 }, { x:0, y:2 } ], [ { x:1, y:2 }, { x:2, y:1 } ] ];
var forks02 = [ [ { x:1, y:2 }, { x:0, y:0 } ], [ { x:0, y:1 }, { x:2, y:2 } ], [ { x:1, y:2 }, { x:0, y:1 } ] ];
var forks20 = [ [ { x:1, y:0 }, { x:2, y:2 } ], [ { x:2, y:1 }, { x:0, y:0 } ], [ { x:2, y:1 }, { x:1, y:0 } ] ];
var forks00 = [ [ { x:0, y:1 }, { x:2, y:0 } ], [ { x:1, y:0 }, { x:0, y:2 } ], [ { x:0, y:1 }, { x:1, y:0 } ] ];

var forksdiag = [ [ { x:0, y:2 }, { x:2, y:0 } ]
    //,[ { x:0, y:0 },{ x:2, y:2 }] // <--- Intentional BUG
];

var permsforks = [ [ 0, 1 ], [ 1, 0 ] ];

forks22.forEach(function(f) {
    permsforks.forEach(function(p) {
        addFork22PermutationBthreads(f, p);
    });
});

forks02.forEach(function(f) {
    permsforks.forEach(function(p) {
        addFork02PermutationBthreads(f, p);
    });
});

forks20.forEach(function(f) {
    permsforks.forEach(function(p) {
        addFork20PermutationBthreads(f, p);
    });
});

forks00.forEach(function(f) {
    permsforks.forEach(function(p) {
        addFork00PermutationBthreads(f, p);
    });
});

forksdiag.forEach(function(f) {
    permsforks.forEach(function(p) {
        addForkdiagPermutationBthreads(f, p);
    });
});

// Preference to put O on the center

bp.registerBThread("Center", function() {
    while (true) {
        bp.sync({ request:[ createEvent('O', 1, 1) ] }, 35);
    }
});

// Preference to put O on the corners
bp.registerBThread("Corners", function() {
    while (true) {
        bp.sync({ request:[ createEvent('O', 0, 0),createEvent('O', 0, 2),
                createEvent('O', 2, 0), createEvent('O', 2, 2) ] }, 20);
    }
});

// Preference to put O on the sides
bp.registerBThread("Sides", function() {
    while (true) {
        bp.sync({ request:[ createEvent('O', 0, 1),createEvent('O', 1, 0),
                createEvent('O', 2, 1), createEvent('O', 1, 2) ] }, 10);
    }
});