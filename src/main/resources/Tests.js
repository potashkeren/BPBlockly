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

bp.registerBThread('test-db population', function(){
    var Labs = [], Schedules =[], Sensors=[];

    //create first time
    date.setHours(date.getHours() - 1);
    date.setMinutes(date.getMinutes() + 10);
    var time = ("0" + (date.getHours()-3)).slice(-2) + ":" +(date.getMinutes()<10?'0':'')+ date.getMinutes() + ":00" ;
    var curr = today.concat('T').concat(time);
    times.push(curr);
    date.setMinutes(date.getMinutes() - 10);

    //create more times in hour hops
    for (var i = 0; i < 6; i++) {
        date.setHours(date.getHours() + 1);
        time =("0" + (date.getHours()-3)).slice(-2) + ":" + (date.getMinutes()<10?'0':'')+date.getMinutes() + ":00";
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
    var check_times = [2,2,2,2,2,52];
    for (i = 0; i < check_times.length; i++) {
        curr_date.setMinutes(curr_date.getMinutes() + check_times[i]);
        time = ("0" + (curr_date.getHours()-3)).slice(-2) + ":" + (curr_date.getMinutes()<10?'0':'')+curr_date.getMinutes() + ":00";
        curr = today.concat('T').concat(time);
        test_times.push(curr);
    }
    bp.log.info("test times: " + test_times);


    // add Labs
    var lab1 = new Lab('1', 50, 48);
    var lab2 = new Lab('2', 30, 3);
    var lab3 = new Lab('3', 32, 0);
    var lab4 = new Lab('4', 35, 0);
    Labs.push(lab1);
    Labs.push(lab2);
    Labs.push(lab3);
    Labs.push(lab4);

    // add Schedules
    Schedules.push(new Schedule('1', 'NLP',times[1],times[2],end_repeat , lab1));
    Schedules.push(new Schedule('2', 'ML1',times[2],times[3], end_repeat, lab1));
    Schedules.push(new Schedule('3', 'ML2',times[3],times[4], end_repeat, lab1));
    Schedules.push(new Schedule('4', 'NLP2',times[5],times[6], end_repeat, lab2));
    Schedules.push(new Schedule('5', 'NLP3',times[0],times[1],end_repeat , lab1));

    // add Sensors
    Sensors.push(new Sensor('1', 1, 10, 11, 20, 21, 30));
    Sensors.push(new Sensor('2', 1, 5, 6, 10, 11, 15));
    Sensors.push(new Sensor('3', 1, 3, 4, 7, 8, 10));
    /*
    Schedules.push(new Schedule('5','ML3','2019-06-29 09:00:00','2019-06-29 10:00:00', '2019-07-01', 'lab_1'));
    Schedules.push(new Schedule('6','DB1','2019-06-29 13:00:00','2019-06-29 14:00:00', '2019-07-01', 'lab_1'));
    Schedules.push(new Schedule('7','ML4','2019-06-29 14:00:00','2019-06-29 15:00:00', '2019-07-01', 'lab_1'));
    Schedules.push(new Schedule('8','NLP3','2019-06-02 10:00:00','2019-06-02 11:00:00', '2019-07-01', 'lab_1'));
    Schedules.push(new Schedule('9','ML5','2019-06-02 08:00:00','2019-06-02 09:00:00', '2019-07-01', 'lab_1'));
    Schedules.push(new Schedule('10','ML6','2019-06-02 14:00:00','2019-06-02 15:00:00', '2019-07-01', 'lab_2'));
    Schedules.push(new Schedule('11','ML7','2019-06-02 12:00:00','2019-06-02 15:00:00', '2019-07-01', 'lab_2'));
    Schedules.push(new Schedule('12','ML8','2019-06-02 14:00:00','2019-06-02 015:00:00', '2019-07-01', 'lab_3'));
*/

    //add finished event
    bp.sync({ request: CTX.InsertEvent(System()) });
    bp.sync({ request: CTX.InsertEvent(Labs) });
    bp.sync({ request: CTX.InsertEvent(Schedules) });
    bp.sync({ request: CTX.InsertEvent(Sensors) });

    bp.sync({ request: bp.Event("Context Population Ended") });

});


//#region Context Tests
// test_1 - check Lab context
/*bp.registerBThread('test - Lab context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - Lab context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        labs = CTX.getContextInstances("Lab");
         bp.log.info("lab: " + labs);
         for(var i = 0; i<labs.size(); i++) {
             bp.log.info("lab: "+labs.get(i));
         }
         if(labs.size() !==4) {
             bp.ASSERT(false, "didn't get all labs ");
         }
    });
});*/

// test_2 - check OpenLab + LockedLab context
/*bp.registerBThread('test - OpenLab + LockedLab context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var b = LocalDateTime.parse(test_times[1]);
    CTX.subscribeWithParameters("test - OpenLab + LockedLab context","SpecificTime", "Time_"+b, {"time": b},function(t) {
        var labs = CTX.getContextInstances("OpenLab");
        bp.log.info("labs size should be 0: " + labs.size());
        if (labs.size() !== 0) {
            bp.ASSERT(false, "all labs should be closed ");
        }
        labs = CTX.getContextInstances("LockedLab");
        bp.log.info("labs size should be 4: " + labs.size());
        if (labs.size() !== 4) {
            bp.ASSERT(false, "all labs should be closed ");
        }
    });
});*/

// test_3 - check OpenTheLab command
/*bp.registerBThread('test - OpenTheLab command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("LockedLab");
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - OpenTheLab command","SpecificTime", "Time_"+a, {"time": a},function(a) {
        labs = CTX.getContextInstances("OpenLab");
        bp.log.info("labs size should be 1: " + labs.size());
        if(labs.size() !==1) {
            bp.ASSERT(false, "one lab should be open ");
        }
        labs = CTX.getContextInstances("LockedLab");
        bp.log.info("labs size should be 3: " + labs.size());
        if(labs.size() !==3) {
            bp.ASSERT(false, "3 labs should be closed ");
        }
    });
});*/

// test_4 - check CloseTheLab command
/*bp.registerBThread('test - CloseTheLab command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("LockedLab");
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});
    labs = CTX.getContextInstances("OpenLab");
    bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - CloseTheLab command","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var labs = CTX.getContextInstances("OpenLab");
        bp.log.info("labs size should be 0: " + labs.size());
        if (labs.size() !== 0) {
            bp.ASSERT(false, "all labs should be closed ");
        }
        labs = CTX.getContextInstances("LockedLab");
        bp.log.info("labs size should be 4: " + labs.size());
        if (labs.size() !== 4) {
            bp.ASSERT(false, "all labs should be closed ");
        }
    });
});*/

// test_5 - check NonEmptyLab + EmptyLab context
/*bp.registerBThread('test - NonEmptyLab + EmptyLab context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - NonEmptyLab + EmptyLab context","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var labs = CTX.getContextInstances("NonEmptyLab");
        bp.log.info("labs size should be 2: " + labs.size());
        if(labs.size() !==2) {
            bp.ASSERT(false, "2 labs should be non empty ");
        }
        labs = CTX.getContextInstances("EmptyLab");
        bp.log.info("labs size should be 2: " + labs.size());
        if(labs.size() !==2) {
            bp.ASSERT(false, "2 labs should be empty");
        }
    });
});*/

// test_6 - check FreeLearningLab command + FreeLearningOpenLab + FreeLearningEmptyLab context
/*bp.registerBThread('test - FreeLearningLab command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(2)})});
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(2)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - FreeLearningLab command","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("labs size should be 1: " + labs.size());
        if (labs.size() !== 1) {
            bp.ASSERT(false, "1 lab should be FreeLearningOpenLab ");
        }
        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.log.info("labs size should be 1: " + labs.size());
        if (labs.size() !== 1) {
            bp.ASSERT(false, "1 lab should be FreeLearningEmptyLab ");
        }
    });
});*/

// test_7 - check NotFreeLearningLab command
/*bp.registerBThread('test - NotFreeLearningLab command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(2)})});
    bp.sync({request: CTX.UpdateEvent("NotFreeLearningLab", {lab: labs.get(2)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - NotFreeLearningLab command","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("labs size should be 0: " + labs.size());
        if (labs.size() !== 0) {
            bp.ASSERT(false, "no labs should be FreeLearningOpenLab ");
        }
        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.log.info("labs size should be 0: " + labs.size());
        if (labs.size() !== 0) {
            bp.ASSERT(false, "no labs should be FreeLearningEmptyLab ");
        }
    });
});*/

// test_8 - check EvacuateTheLab command + LabNeedToBeEvacuated context
/*bp.registerBThread('test - EvacuateTheLab + LabNeedToBeEvacuated', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("EvacuateTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - EvacuateTheLab + LabNeedToBeEvacuated","SpecificTime", "Time_"+a, {"time": a},function(a) {
        labs = CTX.getContextInstances("LabNeedToBeEvacuated");
        bp.log.info("labs size should be 1: " + labs.size());
        if(labs.size() !==1) {
            bp.ASSERT(false, "one lab should be evacuated");
        }
    });
});*/

// test_9 - check NotEvacuateTheLab command
/*bp.registerBThread('test - NotEvacuateTheLab', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("EvacuateTheLab", {lab: labs.get(0)})});
    bp.sync({request: CTX.UpdateEvent("NotEvacuateTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - NotEvacuateTheLab","SpecificTime", "Time_"+a, {"time": a},function(a) {
        labs = CTX.getContextInstances("LabNeedToBeEvacuated");
        bp.log.info("labs size should be 0: " + labs.size());
        if(labs.size() !==0) {
            bp.ASSERT(false, "no lab should be evacuated");
        }
    });
});*/

// test_10 - check IsOccupied + NotOccupied context
/*bp.registerBThread('test - IsOccupied + NotOccupied context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - IsOccupied + NotOccupied context","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var labs = CTX.getContextInstances("IsOccupied");
        bp.log.info("labs size should be 1: " + labs.size());
        if(labs.size() !==1) {
            bp.ASSERT(false, "1 labs should be occupied");
        }
        labs = CTX.getContextInstances("NotOccupied");
        bp.log.info("labs size should be 3: " + labs.size());
        if(labs.size() !==3) {
            bp.ASSERT(false, "3 labs should be not occupied");
        }
    });
});*/


// test_11 - check Schedule context
/*bp.registerBThread('test - schedule context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - schedule context","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var schedules = CTX.getContextInstances("Schedule");
        bp.log.info("schedules size should be 5: " + schedules.size());
        if(schedules.size() !==5 ) {
            bp.ASSERT(false, "didn't get all schedules ");
        }
    });
});*/

// test_12 - check TodaySchedules context
/*bp.registerBThread('test - TodaySchedules context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - TodaySchedules context","SpecificTime", "Time_"+a, {"time": a},function(a) {
        var schedules = CTX.getContextInstances("TodaySchedules");
        bp.log.info("schedules: " + schedules);
        for(var i = 0; i<schedules.size(); i++) {
            bp.log.info("schedule: "+schedules.get(i));
        }
        bp.log.info("schedules size should be 4: " + schedules.size());
        if(schedules.size() !==4 ) {
            bp.ASSERT(false, "4 schedules should be TodaySchedules ");
        }
    });
});*/

//test_13 - check BeforePractice context
/*bp.registerBThread('test - BeforePractice context', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - BeforePractice context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        var schedules = CTX.getContextInstances("BeforePractice");
        bp.log.info("found schedules: "+schedules);

        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabBeforePractice");
        }
        if (!schedules.get(0).course.equals("ML1"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//test_14 - check BeforePractice context one hour later (1 minutes after class starts)
/*bp.registerBThread('test - before practice', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    //check 2 minutes after class starts
    var t =LocalDateTime.parse(test_times[5]);
    bp.log.info(t);
    CTX.subscribeWithParameters("check before practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        var schedules = CTX.getContextInstances("BeforePractice");
        bp.log.info(schedules);

        if(schedules.size() !== 1) {
            bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
        }
        if (schedules.get(0).course.equals("ML1"))
            bp.ASSERT(false, "the context does not match the right lab");
        if (!schedules.get(0).course.equals("ML2"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//test_15 - check AfterPractice context
/*bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[1]);
    CTX.subscribeWithParameters("check after practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        schedules = CTX.getContextInstances("AfterPractice");
        bp.log.info("found schedules: "+schedules);

        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabAfterPractice");
        }
        if (!schedules.get(0).course.equals("NLP3"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//test_16 - check AfterPractice context one hour later
/*bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[5]);
    CTX.subscribeWithParameters("check after practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        schedules = CTX.getContextInstances("AfterPractice");
        bp.log.info("found schedules: "+schedules);

        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabAfterPractice");
        }
        if (!schedules.get(0).course.equals("NLP"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//test_17 - check BeforePracticeFreeLearningLab context
/*bp.registerBThread('test - before practice locked lab', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check before practice and locked lab","SpecificTime", "Time_"+t, {"time": t},function(t) {
        var schedules = CTX.getContextInstances("BeforePracticeFreeLearningLab");
        bp.log.info("found schedules - BeforePracticeFreeLearningLab: "+schedules);

        if(schedules.size() !==0 ) {
            bp.ASSERT(false, "no lab's context should be BeforePracticeFreeLearningLab");
        }
    });
});*/

//test_18 - check BeforePracticeFreeLearningLab context
/*bp.registerBThread('test - before practice locked lab', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)})});
    bp.log.info("labs "+labs);

    var t = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check before practice and locked lab","SpecificTime", "Time_"+t, {"time": t},function(t) {
        var schedules = CTX.getContextInstances("BeforePracticeFreeLearningLab");
        bp.log.info("found schedules - BeforePracticeFreeLearningLab: "+schedules);

        if(schedules.size() !==1 )
            bp.ASSERT(false, "the lab's context is not BeforePracticeFreeLearningLab");
        if (!schedules.get(0).course.equals("ML1"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//test_19 - check BeforePracticeLockedLab context
/*bp.registerBThread('test - before practice locked lab', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check before practice and locked lab","SpecificTime", "Time_"+t, {"time": t},function(t) {
        var schedules = CTX.getContextInstances("BeforePracticeLockedLab");
        bp.log.info("found schedules - BeforePracticeLockedLab: "+schedules);

        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not BeforePracticeLockedLab");
        }
        if (!schedules.get(0).course.equals("ML1"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/


// test_20 - check Sensor context
bp.registerBThread('test - Sensor context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - Sensor context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        sensors = CTX.getContextInstances("Sensor");
         bp.log.info("Sensors: " + sensors);
         for(var i = 0; i<sensors.size(); i++) {
             bp.log.info("Sensor: "+sensors.get(i));
         }
         if(sensors.size() !==3) {
             bp.ASSERT(false, "didn't get all sensors ");
         }
    });
});

// test_21 - check UpdateLevel command
/*bp.registerBThread('test - IncreaseStatus command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var sensors = CTX.getContextInstances("Sensor");
    bp.sync({request: CTX.UpdateEvent("UpdateLevel", {level: 4, sensor: sensors.get(0)})});

    var a = LocalDateTime.parse(test_times[2]);
    CTX.subscribeWithParameters("test - UpdateLevel command","SpecificTime", "Time_"+a, {"time": a},function(a) {
        sensors = CTX.getContextInstances("Sensor");

        for(var i = 0; i<sensors.size(); i++) {
            bp.log.info("Sensor currentStatus: "+sensors.get(i).currentStatus);
        }

        if(sensors.get(0).currentStatus !== 4) {
            bp.ASSERT(false, "currentStatus should be 4 ");
        }
    });
});*/

// test_22 - check LowLevelSensors context
/*bp.registerBThread('test - LowLevelSensors context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var sensors = CTX.getContextInstances("Sensor");
    bp.sync({request: CTX.UpdateEvent("UpdateLevel", {level: 4, sensor: sensors.get(0)})});

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - LowLevelSensors context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        sensors = CTX.getContextInstances("LowLevelSensors");
         bp.log.info("Sensors: " + sensors);
         for(var i = 0; i<sensors.size(); i++) {
             bp.log.info("Sensor: "+sensors.get(i));
         }
         if(sensors.size() !==1) {
             bp.ASSERT(false, "didn't get all sensors ");
         }
    });
});*/

// test_23 - check MediumLevelSensors context
/*bp.registerBThread('test - MediumLevelSensors context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var sensors = CTX.getContextInstances("Sensor");
    bp.sync({request: CTX.UpdateEvent("UpdateLevel", {level: 15, sensor: sensors.get(0)})});
    bp.sync({request: CTX.UpdateEvent("UpdateLevel", {level: (-2), sensor: sensors.get(0)})});

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - MediumLevelSensors context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        sensors = CTX.getContextInstances("MediumLevelSensors");
        bp.log.info("Sensors: " + sensors);
        for(var i = 0; i<sensors.size(); i++) {
            bp.log.info("Sensor: "+sensors.get(i));
        }
        if(sensors.size() !==1) {
            bp.ASSERT(false, "didn't get all sensors ");
        }
    });
});*/

// test_24 - check HighLevelSensors context
/*bp.registerBThread('test - HighLevelSensors context', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var sensors = CTX.getContextInstances("Sensor");
    bp.sync({request: CTX.UpdateEvent("UpdateLevel", {level: 25, sensor: sensors.get(0)})});

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - HighLevelSensors context","SpecificTime", "Time_"+a, {"time": a},function(t) {
        sensors = CTX.getContextInstances("HighLevelSensors");
        bp.log.info("Sensors: " + sensors);
        for(var i = 0; i<sensors.size(); i++) {
            bp.log.info("Sensor: "+sensors.get(i));
        }
        if(sensors.size() !==1) {
            bp.ASSERT(false, "didn't get all sensors ");
        }
    });
});*/



//endregion Context Tests


// Init experiment
/*bp.registerBThread('init', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    //req 1.1 -  At least one laboratory will be open free for students to learn independently.
    labs = CTX.getContextInstances("Lab");
    bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(0)})});
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("test - Lab context","SpecificTime", "Time_"+a, {"time": a},function(t) {


    });
});*/

