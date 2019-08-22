

// region sensor to context
bp.registerBThread('handle external doorOpened events', function () {
    const doorEventSet = bp.EventSet("", function (e) {
        return e.name.equals("Sensor") && (e.data.type.equals("DoorOpened"));
    });

    while (true) {
        var e = bp.sync({waitFor: doorEventSet});
        bp.sync({request: CTX.UpdateEvent("UpdateDoorById", {id: e.data.id, isClose: e.data.isClose})});
    }
});

bp.registerBThread('handle external doorClosed events', function () {
    const doorEventSet = bp.EventSet("", function (e) {
        return e.name.equals("Sensor") &&  (e.data.type.equals("DoorClosed"));
    });

    while (true) {
        var e = bp.sync({waitFor: doorEventSet});
        bp.sync({request: CTX.UpdateEvent("UpdateDoorById", {id: e.data.id, isClose: e.data.isClose})});
    }
});

bp.registerBThread('handle external motion sensor events', function () {
    const eventSet = bp.EventSet("", function (e) {
        return e.name.equals("Sensor") && e.data.type.equals("Motion");
    });

    while (true) {
        var e = bp.sync({waitFor: eventSet});
        bp.sync({request: CTX.UpdateEvent("UpdateMotionById", {id: e.data.id, motionDetected: e.data.motionDetected})
        });
    }
});

bp.registerBThread('handle external real occupancy events', function () {
    const eventSet = bp.EventSet("", function (e) {
        return e.name.equals("Sensor") && e.data.type.equals("RealOccupancy");
    });

    while (true) {
        var e = bp.sync({waitFor: eventSet});
        bp.sync({request: CTX.UpdateEvent("UpdateRealOccupancy", {lab: e.data.lab, amount: e.data.amount})});
        bp.sync({request: bp.Event("People came/leave the lab")});
    }
});


//endregion sensor to context

// region context to highlevel

// endregion context to highlevel

// region high level stories
bp.registerBThread('start after server init ', function () {
    bp.sync({waitFor: bp.Event("Finish server init")});
    bp.log.info("load lab's Requirements");

// req 1.1
    bp.registerBThread('At least one lab will be open for free learning', function () {
        while (true) {
            e = CTX.getContextInstances("FreeLearningOpenLab");
            if (e.size() > 0) {
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
/*    bp.registerBThread('try to reduce the amount of free learning open Labs', function () {
        while (true) {
            var labs = CTX.getContextInstances("FreeLearningEmptyLab");
            if (labs.size() > 1) {
                bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(1)})});
            }
            else {
                bp.sync({waitFor: CTX.AnyNewContextEvent("FreeLearningEmptyLab")});
            }
        }
    });*/
    CTX.subscribe('try to reduce the amount of free learning open Labs', "FreeLearningOpenLab", function (c) {
        bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: c})});
    });
// req 1.4
        CTX.subscribe('do not close labs with students', "NonEmptyLab", function (c) {
            bp.sync({
                block: CTX.UpdateEvent("CloseTheLab", {lab: c}),
                interrupt: CTX.AnyContextEndedEvent("NonEmptyLab", c)
            });
        });

// req 1.5
    bp.registerBThread('Update the amount of available places in the labs ', function () {
        while (true) {
            bp.sync({waitFor: bp.Event("People came/leave the lab")});
            var count = 0;
            var labs = CTX.getContextInstances("FreeLearningOpenLab");
            for(var i = 0; i<labs.size(); i++){
                count = count + (labs.get(i).capacity-labs.get(0).realOccupancy);
            }
            bp.log.info("available places:" + count);
            if (count<20){
                bp.sync({request: bp.Event("open another FreeLearningLab")});
            }
            if (count > 50 && labs.size()>1 ){
                // ???
            }
        }
    });

// req 7.1
    bp.registerBThread('open another FreeLearningLab  ', function () {
        while (true) {
            bp.sync({waitFor: bp.Event("open another FreeLearningLab")});
            var labs = CTX.getContextInstances("LockedLab");

            bp.sync({request: CTX.TransactionEvent(
                        CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)}),
                        CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)}))
                , block: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)})
            });
            bp.log.info(labs.get(0) + " was opened");
            bp.sync({request: bp.Event("another FreeLearningLab was opened")});
        }
    });

    //req 17.1
    CTX.subscribe('Do not allow more students to enter', "FullCapacity", function (c) {
        bp.sync({block: CTX.UpdateEvent("UpdateRealOccupancy", {lab: c})});
    });



    bp.sync({request: bp.Event("Finish loading lab requirements")});
});



// req 6
/*CTX.subscribe('Lab need to be evacuated', "LabNeedToBeEvacuated", function (c) {

//how to decide which lab to open

    bp.sync({
        request: CTX.TransactionEvent(
            CTX.UpdateEvent("OpenTheLab", {lab: c}),
            CTX.UpdateEvent("FreeLearningLab", {lab: c}))
    });

    for (var count = 0; count < 3; count++) {
        bp.sync({waitFor: CTX.TickEvent((c.tick + 5))});
        window.alert('go to open lab:' + (CTX.getContextInstances("FreeLearningLab")[0]));
    }
    bp.sync({request: CTX.UpdateEvent("NotEvacuateTheLab", {lab: c})});
});*/

// req 16
/*CTX.subscribe('Lab is occupied, evacuate student to another lab', "IsOccupied", function (c) {
    e = CTX.getContextInstances("FreeLearningOpenLab");
    if (e.length > 0) {
        bp.sync({request: CTX.UpdateEvent("EvacuateTheLab", {lab: c})});
    }
});

CTX.subscribe('Lab is not occupied, evacuate student to another lab', "NotOccupied", function (c) {
    e = CTX.getContextInstances("FreeLearningOpenLab");
    if (e.length > 1) {
        bp.sync({request: CTX.UpdateEvent("EvacuateTheLab", {lab: c})});
    }
});*/


// endregion high level stories
