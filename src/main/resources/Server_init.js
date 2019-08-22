
// Init experiment
bp.registerBThread('init', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    //req 1.1 -  At least one laboratory will be open free for students to learn independently.
    var labs = CTX.getContextInstances("Lab");

    bp.log.info("change lab to FreeLearningOpenLab:" + labs.get(0));

    bp.sync({request: CTX.TransactionEvent(
            CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)}),
            CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)}))
    });

    bp.log.info("req 1.1 -  At least one laboratory will be open free for students to learn independently");

    bp.sync({ request: bp.Event("Finish server init") });
    bp.log.info("request Finish server init");

});