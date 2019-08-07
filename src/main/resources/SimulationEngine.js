
bp.registerBThread('start after db pop ', function () {
    bp.sync({waitFor: bp.Event("a")});

    var labs = CTX.getContextInstances("Lab");
    bp.log.info("lab: " + labs);

    var sensors = CTX.getContextInstances("Sensor");
    bp.log.info("sensors: " + sensors);
});

bp.registerBThread('start after init ', function () {
    bp.sync({waitFor: bp.Event("Context Population Ended")});

    //region Basic Behavior

    //enter Lab
    function enterALab(lab, amount) {
        bp.sync({request: bp.Event("TryToEnterLab", {lab: lab, amount: amount})});
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

    //exit lab
    function exitALab(lab, amount) {
        bp.sync({request: bp.Event("TryToExitLab", {lab: lab, amount: amount})});
        // if (lab's door is close)
        //     bp.sync({waitFor: bp.Event("Sensor", {type: "DoorOpened", id: door.id, isClose: 1})});
        bp.sync({request: bp.Event("Sensor", {type: "RealOccupancy", lab: lab, amount: e.amount})});
    }

    CTX.subscribe('Handle door upon exit', "Lab", function (lab) {
        while (true) {
            var e = bp.sync({waitFor: bp.EventSet("", function (e) {
                    return e.name.equals("TryToExitLab") && e.data.lab.id(lab.id)})});
            bp.sync({request: bp.Event("Sensor", {type: "DoorOpened", id: door.id, isClose: 1})});
            bp.sync({request: bp.Event("Sensor", {type: "DoorClosed", id: door.id, isClose: 0})});
        }
    });

    //handle motion
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
            bp.sync({ request: bp.Event("Sensor", {type: "Motion", id: lab.motionSensor.id, motionDetected: detected})});
            time += 60000;
        }
    });
//endregion Basic Behavior

});
