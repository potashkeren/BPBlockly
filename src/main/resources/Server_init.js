
// Init experiment
bp.registerBThread('init', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    //req 1.1 -  At least one laboratory will be open free for students to learn independently.
    var labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)})});
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});

});