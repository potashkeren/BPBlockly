
function anyContextUpdateEvent(name) {
    return bp.EventSet("", function (e) {
        // bp.log.info("event is "+ e);
        if(e instanceof CTX.UpdateEvent && e.contextName.equals(name))
            return true;
        if(e instanceof CTX.TransactionEvent){
            for(var i = 0; i<e.commands.length; i++){
                var command = e.commands[i];
                if(command instanceof CTX.UpdateEvent && command.contextName.equals(name))
                    return true;
            }
        }
        return false;
    });
}

function anyContextUpdateEventWithParams(name, parameters) {
    return bp.EventSet("", function (e) {
        if(e instanceof CTX.UpdateEvent && e.contextName.equals(name) && e.parameters.equals(parameters))
            return true;
        if(e instanceof CTX.TransactionEvent){
            for(var i = 0; i<e.commands.length; i++){
                var command = e.commands[i];
                if(command instanceof CTX.UpdateEvent && command.contextName.equals(name) && e.parameters.equals(parameters))
                    return true;
            }
        }
        return false;
    });
}

/*function blockAnyContextUpdateEvent(name, parameters) {
    return bp.EventSet("", function (e) {
        return (e instanceof CTX.UpdateEvent && e.contextName.equals(name))
            || (e instanceof CTX.TransactionEvent && commands.);
    });
}*/

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
    bp.registerBThread('At least 20 places will be open for free learning', function () {
        // bp.sync({waitFor: [anyContextUpdateEvent("UpdateRealOccupancy"),anyContextUpdateEvent("OpenTheLab")]} );
        while (true) {
            var count = 0;
            var labs = CTX.getContextInstances("FreeLearningOpenLab");
            for(var i = 0; i<labs.size(); i++){
                count = count + (labs.get(i).capacity - labs.get(i).realOccupancy);
            }
            var blockList = [];
            for(var i = 0; i<labs.size(); i++){
                if(count - (labs.get(i).capacity - labs.get(i).realOccupancy) < 20)
                    blockList.push(anyContextUpdateEventWithParams("CloseTheLab", {lab: labs.get(i)}));
            };
            bp.sync({
                block: blockList,
                waitFor: [anyContextUpdateEvent("UpdateRealOccupancy"),anyContextUpdateEvent("OpenTheLab")]
            });
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
        bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: c}),
            waitFor: CTX.AnyContextEndedEvent("FreeLearningOpenLab", c)});
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
                bp.sync({waitFor: anyContextUpdateEvent("UpdateRealOccupancy")});
                var count = 0;
                var labs = CTX.getContextInstances("FreeLearningOpenLab");
                for(var i = 0; i<labs.size(); i++){
                    count = count + (labs.get(i).capacity-labs.get(i).realOccupancy);
                }
                bp.log.info("available places:" + count);
                if (count<20){
                    // bp.log.info("here");
                    var labs = CTX.getContextInstances("LockedLab");
                    // bp.log.info("labs: " + labs);
                    bp.sync({request: CTX.TransactionEvent(
                            CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)}),
                            CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)}))
                        , block: anyContextUpdateEventWithParams("CloseTheLab", {lab: labs.get(0)})
                    });
                }
            if (count > 50 && labs.size()>1 ){
                // ???
            }
        }
    });



    //req 17.1
/*    CTX.subscribe('Do not allow more students to enter', "FullCapacity", function (c) {
        bp.sync({block: CTX.UpdateEvent("UpdateRealOccupancy", {lab: c})});
    });*/



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
