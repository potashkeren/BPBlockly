var beforeSeven = bp.EventSet( "got7", function(evt) {
    var nxt = ""+ (parseInt(evt.name) + 1);
    return (parseInt(nxt) % 7 === 0 || nxt.include("7"))
});

var number = bp.EventSet( "num", function(evt) {
    return isNumber(evt.name)
});

var boom = bp.Event("booom");


bp.registerBThread("7boom", function(){
    for(i=1; i<=100; i++) {
        bp.sync({request:bp.Event(i), waitFor: boom})
    }
});

bp.registerBThread("counter", function(){
    while(true){
        bp.sync({waitFor: beforeSeven});
        bp.sync({request: boom , block: number});
    }
});