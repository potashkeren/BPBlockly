bp.log.info('Tic-Tac-Toe - Let the game begin!');

function createEvent(name, row, col) {
    return bp.Event(name,"{_row:"+row+",_col:"+col+"}")
}

// GameRules:

// ------------ START CEll BEHAVIORS ------------
// Detects mouse click
bp.registerBThread("ClickHandler(" + row + "," + col + ")", function() {
    while (true) {
        bp.sync({ waitFor:[ createEvent('Click', row, col) ] });
        bp.sync({ request:[ createEvent('X', row, col) ] });
    }
});

//detect black cell , white cell - query name
bp.registerBThread("detect black cell","white cell", function(c) { //select * from cell where value == null
        bp.sync({ waitFor:[ createEvent('X', c.row, c.col), createEvent('O',c.row, c.col)] });
        ctx.excuteCommand("mark cell  as black",c);
});

//block X,O on black cell
bp.registerBThread("block X,O on black cell","black cell", function(c) { //select * from cell where value != null
    bp.sync({ block:[ createEvent('X', c.row, c.col), createEvent('O', c.row, c.col) ] });
});

// ------------ END CEll BEHAVIORS ------------


// Represents Enforce Turns
bp.registerBThread("detect X turn","O turn", function() { //select * from turns where value == O or value == start
        bp.sync({
            waitFor: [
                createEvent('X', 0, 0), createEvent('X', 0, 1), createEvent('X', 0, 2),
                createEvent('X', 1, 0), createEvent('X', 1, 1), createEvent('X', 1, 2),
                createEvent('X', 2, 0), createEvent('X', 2, 1), createEvent('X', 2, 2)]
        });
    bp.sync({ request:UpdateContexDBEvent("Mark turn").parameters({value: 'X'}) });
});

bp.registerBThread("block O","X turn", function() { //select * from turns where value == X
        bp.sync({
            block: [
                createEvent('O', 0, 0), createEvent('O', 0, 1), createEvent('O', 0, 2),
                createEvent('O', 1, 0), createEvent('O', 1, 1), createEvent('O', 1, 2),
                createEvent('O', 2, 0), createEvent('O', 2, 1), createEvent('O', 2, 2)]
        });
});

bp.registerBThread("detect O turn","X turn", function() { //select * from turns where value == X
    bp.sync({
        waitFor: [
            createEvent('X', 0, 0), createEvent('X', 0, 1), createEvent('X', 0, 2),
            createEvent('X', 1, 0), createEvent('X', 1, 1), createEvent('X', 1, 2),
            createEvent('X', 2, 0), createEvent('X', 2, 1), createEvent('X', 2, 2)]
    });
    ctx.excuteCommand("O turn");
});

bp.registerBThread("block X","O turn", function() { //select * from turns where value == O
    bp.sync({
        block: [
            createEvent('O', 0, 0), createEvent('O', 0, 1), createEvent('O', 0, 2),
            createEvent('O', 1, 0), createEvent('O', 1, 1), createEvent('O', 1, 2),
            createEvent('O', 2, 0), createEvent('O', 2, 1), createEvent('O', 2, 2)]
    });
});



// Represents when the game ends
bp.registerBThread("win or draw","playing", function() { //select * from playing where value == true
    bp.sync({ waitFor:[ bp.Event('OWin'), bp.Event('XWin'), bp.Event('Draw') ] });
    ctx.excuteCommand("game ended");
});

bp.registerBThread("block all cells","end of game", function() { //select * from playing where value == false
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
    return e.name === 'O' || e.name === 'X';
});

// Represents when it is a draw
bp.registerBThread("DetectDraw", function() {
    // For debug
    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });

    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });

    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });
    bp.sync({ waitFor:[ move ] });
    /*
     * for (var i=0; i< 9; i++) { bp.sync({ waitFor:[ move ] }); }
     */
    bp.sync({ request:[ bp.Event('Draw') ] }, 90);
});



bp.registerBThread("Game","Playing",function (p) {
  breakUpon("owin|xwin|draw"){
        //register all game bthreads
    }
    // stop all game bthreads
});

// ------------ START TRIPLE BEHAVIORS ------------
    // Represents when X wins
    //bp.registerBThread("DetectXWin","Triple",interrupt:endgame, function(t) {
    //bp.registerBThread("DetectXWin",["Triple","Playing"], function(t) {
    bp.registerBThread("DetectXWin","Triple", function(t) {
        for (var c = 0; c < 3; c++) {
            bp.sync({ waitFor:[ createEvent('X', t.0), createEvent('X', t.1), createEvent('X', t.2) ] });
        }
        bp.sync({ request:[ bp.Event('XWin') ] }, 100);
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
bp.registerBThread("AddThirdO","Tripe", function(t) {
    bp.sync({ waitFor:[ createEvent('O', t.0), createEvent('O', t.1), createEvent('O', t.2) ] });
    bp.sync({ waitFor:[ createEvent('O', t.0), createEvent('O', t.1), createEvent('O', t.2) ] });
    bp.sync({ request: [ createEvent('O', t.0), createEvent('O', t.1), createEvent('O', t.2) ] }, 100);
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

var context = {
    cell: ['i','j','value'], // null or !null
    turns: ['value'], // X, O, start
    playing: ['value'] //true or false
};


// CONTEXT POPULATION
// ADD CELLS
for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
        //ctx.update('Add Cell', {i: r, j: c, value:null});
        bp.sync({ request:UpdateContexDBEvent("Add Cell").parameters({i: r, j: c, value:null}) });
    }
}

// ADD TRIPLE
for (var c = 0; c < 3; c++) {
    //ctx.update('Add Cell', {i: r, j: c, value:null});
    bp.sync({ request:UpdateContexDBEvent("Add Triplw").parameters({0: {c,0}, 1: {c,1}, 2:{c,2}}) });
    bp.sync({ request:UpdateContexDBEvent("Add Triplw").parameters({0: {0,c}, 1: {1,c}, 2:{2,c}}) });
}
bp.sync({ request:UpdateContexDBEvent("Add Triplw").parameters({0: {0,0}, 1: {1,1}, 2:{2,2}}) });
bp.sync({ request:UpdateContexDBEvent("Add Triplw").parameters({0: {2,0}, 1: {1,1}, 2:{0,2}}) });