bp.registerBThread("bt-hi", function(){
  bsync({request:bp.Event("hello")});
  bsync({waitFor:bp.Event("world")});
});

bp.registerBThread("bt-world",function(){
  bsync({waitFor:bp.Event("hello")});
  bsync({request:bp.Event("world")});
});

bp.registerBThread("bpjs addition", function(){
  bsync({waitFor:bp.Event("hello")});
  bsync({request:bp.Event("BPjs"), block:bp.Event("world")});
  bsync({waitFor:bp.Event("world")});
});

//1
bp.registerBThread(function(){
    bp.sync({request:bp.Event("hello")});
    bp.sync({request:bp.Event("world")});
})


//2
bp.registerBThread(function(){
    bp.sync({request:bp.Event("hello")});
})

bp.registerBThread(function(){
    bp.sync({request:bp.Event("world")});
})

//3
bp.registerBThread(function(){
    bp.sync({request:bp.Event("hello")});
})

bp.registerBThread(function(){
    bp.sync({waitFor:bp.Event("hello")});
    bp.sync({request:bp.Event("world")});
})

//4
bp.registerBThread( function(){
    bp.sync({waitFor:bp.Event("hello"), block:bp.Event("world")});
})

