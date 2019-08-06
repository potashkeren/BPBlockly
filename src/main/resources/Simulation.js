
bp.registerBThread('start after init ', function () {
    bp.sync({waitFor: bp.Event("Context Population Ended")});

    //region Basic Behavior
    function enterALab(lab, amount) {
        bp.sync({request: bp.Event("TryToEnterLab", {lab: lab, amount: amount})});
        bp.sync({request: bp.Event("EnteredLab", {lab: lab, amount: amount})});
    }

    CTX.subscribe('Handle door upon entrance', "Lab", function (lab) {
        while (true) {
            var e = bp.sync({waitFor: bp.EventSet("", function (e) {
                    return e.name.equals("TryToEnterLab") && e.data.lab.id(lab.id)})});
            bp.sync({request: CTX.UpdateEvent("OpenTheDoor", {lab: lab})});
            bp.sync({request: CTX.TransactionEvent(
                    CTX.UpdateEvent("CloseTheDoor", {sensor: lab.doorSensor}),
                    CTX.UpdateEvent("UpdateOccupancy", {lab: lab, amount: e.amount}))});
        }
    });

    bp.registerBThread('people\'s lab income', function () {
        var labAmount = [[1,2],[1,3],[1,4], [1,5]];
        var time = bp.sync({ waitFor: bp.EventSet('', function (e) {return e.name.equals('Time')})}).data;

        for (var i=0; i<labAmount.size(); i++){
            bp.sync({waitFor: bp.Event('Time', time)});
            enterALab(labAmount[i][0], labAmount[i][1]);
            time += 60000;
        }
    });


    function motionDistribution(occupancy) {
        return Math.min(1, occupancy * 0.1);
    }

    CTX.subscribe('Handle motion upon entrance', "Lab", function (lab) {
        var time = bp.sync({ waitFor: bp.EventSet('', function (e) {return e.name.equals('Time')})}).data;

        while (true) {
            bp.sync({waitFor: bp.Event('Time', time)});
            lab = CTX.getContextInstances("SpecificLab_" + lab.id);
            var detected = Math.random() < motionDistribution(lab.occupancy) ? 1 : 0;
            bp.sync({request: CTX.UpdateEvent("UpdateMotion", {sensor: lab.motionSensor, motionDetected: detected})});
            time += 60000;
        }
    });
//endregion Basic Behavior

//region export events
    CTX.subscribe('export open door events', "OpenDoor", function (door) {
        bp.sync({request: bp.Event("Sensor", {type: "DoorOpened", id: door.id, isClose: 1})})
    });

    CTX.subscribe('export open door events', "CloseDoor", function (door) {
        bp.sync({request: bp.Event("Sensor", {type: "DoorClosed", id: door.id, isClose: 0})})
    });

    bp.registerBThread('export motion sensor events', function () {
        while (true) {
            var e = bp.sync({waitFor: bp.EventSet('', function (e) {
                    return (e instanceof CTX.UpdateEvent) && e.contextName.equals("UpdateMotion");})
            });
            bp.sync({ request: bp.Event("Sensor", {type: "Motion", id: e.parameters.sensor.id, motionDetected: e.parameters.motionDetected})})
        }
    });

    bp.registerBThread('export real occupancy events', function () {
        while (true) {
            var e = bp.sync({waitFor: bp.EventSet('', function (e) {
                return (e instanceof CTX.UpdateEvent) && e.contextName.equals("UpdateOccupancy");
            })});
            //TODO retrieve occupancy from ctx lab
            bp.sync({request: bp.Event("Sensor", {type: "RealOccupancy", id: e.parameters.lab.id, amount: e.parameters.amount})});
        }
    });
//endregion export events
});
