

bp.registerBThread('start after init ', function () {
    bp.sync({waitFor: bp.Event("Context Population Ended")});

// region sensor to context
    bp.registerBThread('handle external door events', function () {
        const doorEventSet = bp.EventSet("", function (e) {
            return e.name.equals("Sensor") && (e.data.type.equals("DoorOpened") || e.data.type.equals("DoorClosed"));
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
//endregion sensor to context

// region context to highlevel

// endregion context to highlevel

// region high level stories
//lab_experiment.js
// endregion high level stories

});