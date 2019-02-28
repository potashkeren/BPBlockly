importPackage(Packages.il.ac.bgu.cs.bp.bpjs.context);
importPackage(Packages.il.ac.bgu.bp.cotextualBlockly.context.schema);


var name2, cell, i, j, move, c1, c2, XEvents, c, t, OEvents, e, EndGame, forks22, forks02, forks20, forks00, forksdiag, permsforks, f, p;

/**
 * Describe this function...
 */
function createEvent(name2, cell) {
    return bp.Event(name2,cell);
}

/**
 * Describe this function...
 */
function getCell(i, j) {
    return CTX.getContextsOfType((['Cell[',i,',',j,']'].join(''))).get(0);
}

/**
 * Describe this function...
 */
function addFork22PermutationBthreads(c1, c2) {
    bp.registerBThread('PreventFork22X', function(){
        bp.sync({waitFor: (createEvent('X', c1))});
        bp.sync({waitFor: (createEvent('X', c2))});
        bp.sync({request: [createEvent('O', getCell(2, 2)), createEvent('O', getCell(0, 2)), createEvent('O', getCell(2, 0))]},30);

    });
}

/**
 * Describe this function...
 */
function addFork02PermutationBthreads(c1, c2) {
    bp.registerBThread('PreventFork02X', function(){
        bp.sync({waitFor: (createEvent('X', c1))});
        bp.sync({waitFor: (createEvent('X', c2))});
        bp.sync({request: [createEvent('O', getCell(0, 2)), createEvent('O', getCell(0, 0)), createEvent('O', getCell(2, 2))]},30);

    });
}

/**
 * Describe this function...
 */
function addFork20PermutationBthreads(c1, c2) {
    bp.registerBThread('PreventFork20X', function(){
        bp.sync({waitFor: (createEvent('X', c1))});
        bp.sync({waitFor: (createEvent('X', c2))});
        bp.sync({request: [createEvent('O', getCell(2, 0)), createEvent('O', getCell(0, 0)), createEvent('O', getCell(2, 2))]},30);

    });
}

/**
 * Describe this function...
 */
function addFork00PermutationBthreads(c1, c2) {
    bp.registerBThread('PreventFork00X', function(){
        bp.sync({waitFor: (createEvent('X', c1))});
        bp.sync({waitFor: (createEvent('X', c2))});
        bp.sync({request: [createEvent('O', getCell(0, 0)), createEvent('O', getCell(0, 2)), createEvent('O', getCell(2, 0))]},30);

    });
}

/**
 * Describe this function...
 */
function addForkdiagPermutationBthreads(c1, c2) {
    bp.registerBThread('PreventForkdiagX', function(){
        bp.sync({waitFor: (createEvent('X', c1))});
        bp.sync({waitFor: (createEvent('X', c2))});
        bp.sync({request: [createEvent('O', getCell(0, 1)), createEvent('O', getCell(1, 0)), createEvent('O', getCell(2, 1)), createEvent('O', getCell(1, 2))]},30);

    });
}


move = bp.EventSet('MoveEvents', function(e) {
    return ((e.name).equals('X') || (e.name).equals('O'));
});
XEvents = bp.EventSet('XEvents', function(e) {
    return (e.name).equals('X');
});
OEvents = bp.EventSet('OEvents', function(e) {
    return (e.name).equals('O');
});
EndGame = bp.EventSet('EndGame', function(e) {
    return ((e.name).equals('OWin') || (e.name).equals('XWin') || (e.name).equals('Draw'));
});

CTX.subscribe('ClickHandler',"Cell",function(c){
    bp.sync({waitFor: (createEvent('Click', c))});
    bp.sync({request: (createEvent('X', c))});

});
CTX.subscribe('Update cell upon X or O',"EmptyCell",function(c){
    e = bp.sync({waitFor: [createEvent('X', c), createEvent('O', c)]});
    bp.sync({request: CTX.UpdateEvent("UpdateCell",{   cell:c, val:(e.name)})});

});
CTX.subscribe('block X,O on nonempty cell',"NonEmptyCell",function(c){
    bp.sync({block: [createEvent('X', c), createEvent('O', c)]});

});

bp.registerBThread('EnforceTurnsXO', function(){
    while (true) {
        bp.sync({waitFor: XEvents,
            block: OEvents});
        bp.sync({waitFor: OEvents,
            block: XEvents});
    }

});
bp.registerBThread('EnforceMoveAfterNonEmptyCell', function(){
    while (true) {
        c = bp.sync({waitFor: move});
        bp.sync({waitFor: CTX.NewContextEvent("NonEmptyCell",c.data),
            block: move});
    }

});
bp.registerBThread('block X or O on endgame', function(){
    bp.sync({waitFor: EndGame});
    bp.sync({block: move});

});
bp.registerBThread('DetectDraw', function(){
    for (i = 0; i <= 8; i++) {
        bp.sync({waitFor: move});
    }
    bp.sync({request: bp.Event('Draw')},90);

});

CTX.subscribe('DetectXWin',"Triple",function(t){
    bp.sync({waitFor: (createEvent('X', t.cell0))});
    bp.sync({waitFor: (createEvent('X', t.cell1))});
    bp.sync({waitFor: (createEvent('X', t.cell2))});
    bp.sync({request: bp.Event('XWin')},100);

});
CTX.subscribe('DetectOWin',"Triple",function(t){
    bp.sync({waitFor: (createEvent('O', t.cell0))});
    bp.sync({waitFor: (createEvent('O', t.cell1))});
    bp.sync({waitFor: (createEvent('O', t.cell2))});
    bp.sync({request: bp.Event('OWin')},100);

});
CTX.subscribe('AddThirdO',"Triple",function(t){
    bp.sync({waitFor: [createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2)]});
    bp.sync({waitFor: [createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2)]});
    bp.sync({request: [createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2)]},50);

});
CTX.subscribe('PreventThirdX',"Triple",function(t){
    bp.sync({waitFor: [createEvent('X', t.cell0), createEvent('X', t.cell1), createEvent('X', t.cell2)]});
    bp.sync({waitFor: [createEvent('X', t.cell0), createEvent('X', t.cell1), createEvent('X', t.cell2)]});
    bp.sync({request: [createEvent('O', t.cell0), createEvent('O', t.cell1), createEvent('O', t.cell2)]},40);

});

bp.registerBThread('Center', function(){
    bp.sync({waitFor: bp.Event('Context Population Ended')});
    bp.sync({request: (createEvent('O', getCell(1, 1)))},35);

});
CTX.subscribe('Corner',"CornerCell",function(c){
    bp.sync({request: (createEvent('O', c))},20);

});

bp.registerBThread('PLAYER O STRATEGIES', function(){
    bp.sync({waitFor: bp.Event('Context Population Ended')});
    bp.registerBThread('Sides', function(){
        while (true) {
            bp.sync({request: [createEvent('O', getCell(0, 1)), createEvent('O', getCell(1, 0)), createEvent('O', getCell(2, 1)), createEvent('O', getCell(1, 2))]},10);
        }

    });
    forks22 = [[getCell(1, 2), getCell(2, 0)], [getCell(2, 1), getCell(0, 2)], [getCell(1, 2), getCell(2, 1)]];
    forks02 = [[getCell(1, 2), getCell(0, 0)], [getCell(0, 1), getCell(2, 2)], [getCell(1, 2), getCell(0, 1)]];
    forks20 = [[getCell(1, 0), getCell(2, 2)], [getCell(2, 1), getCell(0, 0)], [getCell(2, 1), getCell(1, 0)]];
    forks00 = [[getCell(0, 1), getCell(2, 0)], [getCell(1, 0), getCell(0, 2)], [getCell(0, 1), getCell(1, 0)]];
    forksdiag = [[getCell(0, 2), getCell(2, 0)]];
    permsforks = [[0, 1], [1, 0]];
    for (var f_index in forks22) {
        f = forks22[f_index];
        for (var p_index in permsforks) {
            p = permsforks[p_index];
            addFork22PermutationBthreads(f[p[0]], f[p[1]]);
        }
    }
    for (var f_index2 in forks02) {
        f = forks02[f_index2];
        for (var p_index2 in permsforks) {
            p = permsforks[p_index2];
            addFork22PermutationBthreads(f[p[0]], f[p[1]]);
        }
    }
    for (var f_index3 in forks20) {
        f = forks20[f_index3];
        for (var p_index3 in permsforks) {
            p = permsforks[p_index3];
            addFork22PermutationBthreads(f[p[0]], f[p[1]]);
        }
    }
for (var f_index4 in forks00) {
    f = forks00[f_index4];
    for (var p_index4 in permsforks) {
        p = permsforks[p_index4];
        addFork22PermutationBthreads(f[p[0]], f[p[1]]);
    }
}
for (var f_index5 in forksdiag) {
    f = forksdiag[f_index5];
    for (var p_index5 in permsforks) {
        p = permsforks[p_index5];
        addFork22PermutationBthreads(f[p[0]], f[p[1]]);
    }
}

});