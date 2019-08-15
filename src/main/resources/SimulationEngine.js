//region Basic Behavior

//enter Lab
function enterALab(lab, amount) {
    bp.log.info("enterALab activation");
    bp.sync({request: bp.Event("TryToEnterLab", {lab: lab, amount: amount})});
    bp.sync({request: bp.Event("Sensor", {type: "RealOccupancy", lab: lab, amount: amount})});
}

CTX.subscribe('Handle door upon entrance', "Lab", function (lab) {
    while (true) {
        var e = bp.sync({waitFor: bp.EventSet("", function (e) {
                return e.name.equals("TryToEnterLab") && e.data.lab.id.equals(lab.id)})});
        bp.log.info("TryToEnterLab activation");
        bp.sync({request: bp.Event("Sensor", {type: "DoorOpened", id: lab.doorSensor.id, isClose: 1})});
        bp.sync({request: bp.Event("Sensor", {type: "DoorClosed", id: lab.doorSensor.id, isClose: 0})});
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
                return e.name.equals("TryToExitLab") && e.data.lab.id.equals(lab.id)})});
        bp.sync({request: bp.Event("Sensor", {type: "DoorOpened", id: lab.doorSensor.id, isClose: 1})});
        bp.sync({request: bp.Event("Sensor", {type: "DoorClosed", id: lab.doorSensor.id, isClose: 0})});
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
        bp.sync({ request: bp.Event("Sensor", {type: "Motion", id: lab.motionSensor.id, motionDetected: detected})});
        time += 60000;
    }
});
//endregion Basic Behavior


