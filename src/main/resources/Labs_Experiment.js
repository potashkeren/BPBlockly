importPackage(Packages.il.ac.bgu.cs.bp.bpjs.context);
importPackage(Packages.il.ac.bgu.bp.cotextualBlockly.context.schema);

var member, lab, hour, tenMinBefore, labSchedule, e, tenMinAfter, amount, facultyMembers, schedule, i;

var timeEvents = bp.EventSet("", function(e) {
    return e.name.equals("Time");
});
bp.registerBThread('update time', function () {
    while(true) {
        var time = bp.sync({waitFor: timeEvents}).data;
        bp.sync({ request: CTX.UpdateEvent("UpdateTime", {"time":time})});
    }
});


bp.registerBThread('start after init ', function () {
    bp.sync({waitFor: bp.Event("Context Population Ended")});

// req 1.1
bp.registerBThread('At least one lab will be open for free learning', function () {
    while (true) {
        e = CTX.getContextInstances("FreeLearningOpenLab");
        if (e.length === 1) {
            bp.sync({
                waitFor: CTX.AnyNewContextEvent("FreeLearningOpenLab"),
                block: CTX.UpdateEvent("CloseTheLab", {lab: e.get(0)})
            });
        } else {
            bp.sync({waitFor: CTX.AnyContextEndedEvent("FreeLearningOpenLab")});
        }
    }

});
// req 1.3
CTX.subscribe('try to lock the Lab', "EmptyLab", function (c) {
    bp.sync({
        waitFor: CTX.AnyContextEndedEvent("EmptyLab", c),
        request: CTX.TransactionEvent(
            CTX.UpdateEvent("CloseTheLab", {lab: c}),
            CTX.UpdateEvent("NotFreeLearningLab", {lab: c}))
    });

});
// req 1.4
CTX.subscribe('do not close labs with students', "NonEmptyLab", function (c) {
    bp.sync({
        block: CTX.UpdateEvent("CloseTheLab", {lab: c}),
        interrupt: CTX.AnyContextEndedEvent("NonEmptyLab", c)
    });

});

// req 3.2
    CTX.subscribe('open lab before practice', "BeforePracticeFreeLearningLab", function (c) {
    bp.sync({
        waitFor: CTX.AnyContextEndedEvent("BeforePracticeFreeLearningLab", c),
        request: CTX.UpdateEvent("EvacuateTheLab", {lab: c})
    });

});
// req 3.3
CTX.subscribe('locked lab before practice', "BeforePracticeLockedLab", function (c) {
    tenMinBefore = c.StartDate() - 600000;
    bp.sync({
        waitFor: bp.Event('Time', tenMinBefore),
        block: CTX.UpdateEvent("OpenTheLab", {lab: c}),
        interrupt: CTX.AnyContextEndedEvent("BeforePracticeLockedLab", c)
    });

});
// req 3.4
CTX.subscribe('locked lab before practice', "BeforePractice", function (c) {
    tenMinBefore = c.StartDate() - 600000;
    bp.sync({waitFor: bp.Event('Time', tenMinBefore)});
    bp.sync({
        request: CTX.UpdateEvent("OpenTheLab", {lab: c}),
        block: CTX.UpdateEvent("CloseTheLab", {lab: c}),
        interrupt: CTX.AnyContextEndedEvent("BeforePractice", c)
    });

});

// req 4.2
CTX.subscribe('don\'t allow lab lock during practice', "TodaySchedules", function (c) {
    tenMinBefore = c.StartDate() - 600000;
    tenMinAfter = c.EndDate() + 600000;
    bp.sync({waitFor: bp.Event('Time', tenMinBefore)});
    bp.sync({
        waitFor: bp.Event('Time', tenMinAfter),
        block: [CTX.UpdateEvent("CloseTheLab", {lab: c}), CTX.UpdateEvent("EvacuateTheLab", {lab: c})],
        interrupt: CTX.AnyContextEndedEvent("TodaySchedules",c)
    });

});

// req 5
CTX.subscribe('after the practice', "AfterPracticeLab", function (c) {
    tenMinAfter = c.end_time + 600000;
    bp.sync({
        waitFor: bp.Event('Time', tenMinAfter),
        request: CTX.UpdateEvent("CloseTheLab", {lab: c})
    });
});

// req 7
CTX.subscribe('Lab need to be evacuated', "LabNeedToBeEvacuated", function (c) {
    e = CTX.getContextInstances("FreeLearningLab");
    if (e.length > 0) {
        bp.sync({
            request: CTX.TransactionEvent(
                CTX.UpdateEvent("OpenTheLab", {lab: c}),
                CTX.UpdateEvent("FreeLearningLab", {lab: c}))
        });
    }
    for (var count = 0; count < 3; count++) {
        bp.sync({waitFor: CTX.TickEvent((c.tick + 5))});
        window.alert('go to open lab:' + (CTX.getContextInstances("FreeLearningLab")[0]));
    }
    bp.sync({request: CTX.UpdateEvent("NotEvacuateTheLab", {lab: c})});
});
});


CTX.subscribe('Don\'t lock people', "Lab", function (lab) {
    while(true) {
        // wait lock lab
        //var realOccupancy = get...
        // bp.Assert(realOccupancy>0,"hey you locked someone");
    }
});