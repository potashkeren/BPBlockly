var board = [];

bp.registerBThread("PopulateDB", function() {
    var triples = [], diag1 = [], diag2 = [],
        row, col, i, j, cell, cells;

    for(i=0; i<3; i++){
        row = [];
        for(j=0; j<3; j++){
            cell = new Cell(i,j);
            row.push(cell);
        }
        board.push(row);
    }

    for(i=0; i<3; i++) {
        diag1.push(board[i][i]);
        diag2.push(board[i][2-i]);
        row = [];
        col = [];
        for (j = 0; j < 3; j++) {
            row.push(board[i][j]);
            col.push(board[j][i]);
        }
        triples.push(new Triple("row_"+i, row));
        triples.push(new Triple("col_"+i, col));
    }
    triples.push(new Triple("diag_1", diag1));
    triples.push(new Triple("diag_2", diag2));

    // flattening board
    cells = [].concat.apply([], board);

    bp.sync({ request: CTX.InsertEvent(cells) });
    bp.sync({ request: CTX.InsertEvent(triples) });

    bp.sync({ request: bp.Event("Context Population Ended")})
});