importPackage(Packages.il.ac.bgu.cs.bp.bpjs.context);
importPackage(Packages.il.ac.bgu.bp.cotextualBlockly.context.schema);
importPackage(Packages.java.time);


var finishDay = "2019-08-29";

var date = new Date();
var tomorrowDate = new Date();
var today =  date.toJSON().slice(0,10);
tomorrowDate.setDate(tomorrowDate.getDate()+1);
var tomorrow = tomorrowDate.toJSON().slice(0,10);
var curr_date = new Date();
var times = [];
var test_times = [];
var Labs = [], Schedules = [], Sensors = [], SoundSensors = [],
    TemperatureSensors = [], MotionSensors = [], DoorSensors = [], VolumeSensors = [];;

bp.registerBThread('test-db population', function(){

    //create first time - 50 min before
    date.setHours(date.getHours() - 1);
    date.setMinutes(date.getMinutes() + 10);
    var time = ("0" + (date.getHours())).slice(-2) + ":" +(date.getMinutes()<10?'0':'')+ date.getMinutes() + ":00" ;
    var curr = today.concat('T').concat(time);
    times.push(curr);
    date.setMinutes(date.getMinutes() - 10);

    //create more times in hour hops
    for (var i = 0; i < 10; i++) {
        date.setHours(date.getHours() + 1);
        time =("0" + (date.getHours())).slice(-2) + ":" + (date.getMinutes()<10?'0':'')+date.getMinutes() + ":00";
        if (i<4){
            curr = today.concat('T').concat(time);
        }
        else{
            curr = tomorrow.concat('T').concat(time);
        }
        times.push(curr);
    }
    bp.log.info("times: " + times);

    // create end_repeat
    var end_repeat =finishDay.concat('T08:00:00');
    bp.log.info("end_repeat: " + end_repeat);

    //create test times
    var check_times = [2,2,2,2,2,52,58];
    for (i = 0; i < check_times.length; i++) {
        curr_date.setMinutes(curr_date.getMinutes() + check_times[i]);
        time = ("0" + (curr_date.getHours())).slice(-2) + ":" + (curr_date.getMinutes()<10?'0':'')+curr_date.getMinutes() + ":00";
        curr = today.concat('T').concat(time);
        test_times.push(curr);
    }
    bp.log.info("test times: " + test_times);


    // add Sensors
    var motionSens1 = new MotionSensor('1'), motionSens2 =new MotionSensor('2'),
        motionSens3 = new MotionSensor('3'), motionSens4 =new MotionSensor('4');
    MotionSensors.push(motionSens1, motionSens2, motionSens3, motionSens4);

    var doorSens1 = new DoorSensor('1'), doorSens2 = new DoorSensor('2'),
        doorSens3 = new DoorSensor('3'), doorSens4 = new DoorSensor('4');
    DoorSensors.push(doorSens1,doorSens2,doorSens3,doorSens4);

    var soundSens1 = new SoundSensor('1', 1, 10, 11, 20, 21, 30),
        soundSens2 = new SoundSensor('2', 1, 5, 6, 10, 11, 15),
        soundSens3 = new SoundSensor('3', 1, 3, 4, 7, 8, 10),
        soundSens4 = new SoundSensor('4', 1, 2, 3, 4, 5, 6);
    SoundSensors.push(soundSens1, soundSens2, soundSens3, soundSens4);

    var tempSens1 = new TemperatureSensor('1', 1, 10, 11, 20, 21, 30),
        tempSens2 = new TemperatureSensor('2', 1, 5, 6, 10, 11, 15),
        tempSens3 = new TemperatureSensor('3', 1, 3, 4, 7, 8, 10),
        tempSens4 = new TemperatureSensor('4', 1, 2, 3, 4, 5, 6);
    TemperatureSensors.push(tempSens1, tempSens2, tempSens3, tempSens4);

    var volSens1 = new VolumeSensor('1', 1, 10, 11, 20, 21, 30),
        volSens2 = new VolumeSensor('2', 1, 5, 6, 10, 11, 15),
        volSens3 = new VolumeSensor('3', 1, 3, 4, 7, 8, 10),
        volSens4 = new VolumeSensor('4', 1, 2, 3, 4, 5, 6);
    VolumeSensors.push(volSens1, volSens2, volSens3, volSens4);

    // add Labs
    var lab1 = new Lab('1', 50, 0, 0, doorSens1, motionSens1, tempSens1, soundSens1, volSens1);
    var lab2 = new Lab('2', 30, 0, 0, doorSens2, motionSens2, tempSens2, soundSens2, volSens2);
    var lab3 = new Lab('3', 32, 0, 0, doorSens3, motionSens3, tempSens3, soundSens3, volSens3);
    var lab4 = new Lab('4', 35, 0, 0, doorSens4, motionSens4, tempSens4, soundSens4, volSens4);
    Labs.push(lab1, lab2, lab3, lab4);

    // add Schedules
/*    Schedules.push(new Schedule('1', 'NLP',times[1],times[2],end_repeat , lab1));
    Schedules.push(new Schedule('2', 'ML1',times[2],times[3], end_repeat, lab1));
    Schedules.push(new Schedule('3', 'ML2',times[3],times[4], end_repeat, lab1));
    Schedules.push(new Schedule('4', 'NLP2',times[3],times[4], end_repeat, lab2));
    Schedules.push(new Schedule('5', 'NLP3',times[0],times[1],end_repeat , lab1));*/


    //add finished event
    bp.sync({ request: CTX.InsertEvent(System()) });
    bp.sync({ request: CTX.InsertEvent(Labs) });
/*
    bp.sync({ request: CTX.InsertEvent(Schedules) });
*/
    bp.sync({ request: CTX.InsertEvent(SoundSensors) });
    bp.sync({ request: CTX.InsertEvent(TemperatureSensors) });
    bp.sync({ request: CTX.InsertEvent(MotionSensors) });
    bp.sync({ request: CTX.InsertEvent(DoorSensors) });
    bp.sync({ request: CTX.InsertEvent(VolumeSensors) });

    Labs.forEach(function (l) {
        CTX.registerParameterizedContextQuery("SpecificLab", "SpecificLab_" + l.id, {lab:l});
    });

    bp.sync({ request: bp.Event("Context Population Ended") });

});
