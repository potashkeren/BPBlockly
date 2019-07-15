importPackage(Packages.java.time);


var finishDay = "2019-07-29";

var date = new Date();
var today =  date.toJSON().slice(0,10);
var curr_date = new Date();
var times = [];
var test_times = [];

bp.registerBThread('test-db population', function(){
    var Labs = [], Schedules =[];

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
        curr = today.concat('T').concat(time);
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
    var lab1 = new Lab('1', 50, 4);
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
    Schedules.push(new Schedule('4', 'NLP2',times[4],times[5], end_repeat, lab2));
    Schedules.push(new Schedule('5', 'NLP3',times[1],times[0],end_repeat , lab1));

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

    bp.sync({ request: bp.Event("Context Population Ended") });

});

// check Lab context
bp.registerBThread('test - Lab activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check lab1","SpecificTime", "Time_"+a, {"time": a},function(t) {
        bp.log.info("HERE");
        labs = CTX.getContextInstances("Lab");
         bp.log.info("lab: " + labs);
         for(var i = 0; i<labs.size(); i++) {
             bp.log.info("lab: "+labs.get(i));
         }
         if(labs.size() !==4) {
             bp.ASSERT(false, "didn't get all labs ");
         }
    });

});

// check OpenLab + LockedLab context
bp.registerBThread('test - OpenLab activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var b = LocalDateTime.parse(test_times[1]);
    CTX.subscribeWithParameters("check lab2","SpecificTime", "Time_"+b, {"time": b},function(t) {
        bp.log.info("HERE");

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

        bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});
    });
});

// check OpenTheLab command
/*bp.registerBThread('test - OpenTheLab command', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var labs = CTX.getContextInstances("LockedLab");
    bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(0)})});

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check lab","SpecificTime", "Time_"+a, {"time": a},function(a) {
        bp.log.info("HERE");

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

// check NonEmptyLab + EmptyLab context
/*bp.registerBThread('test - NonEmptyLab + EmptyLab activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check lab","SpecificTime", "Time_"+a, {"time": a},function(a) {
        bp.log.info("HERE");

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

// check Schedule context
/*bp.registerBThread('test - schedule activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var a = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check lab","SpecificTime", "Time_"+a, {"time": a},function(a) {
        bp.log.info("HERE");
        var schedules = CTX.getContextInstances("Schedule");
        bp.log.info("schedules size should be 4: " + schedules.size());
        if(schedules.size() !==4 ) {
            bp.ASSERT(false, "didn't get all schedules ");
        }
    });
});*/

//check BeforePractice Context
/*bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check before practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        // if(t.time.equals())
        bp.log.info("HERE");
        schedules = CTX.getContextInstances("BeforePractice");
        bp.log.info("found schedules: "+schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabBeforePractice");
        }
        if (!schedules.get(0).course.equals("NLP"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//check BeforePractice Context one hour later (1 minutes after class starts)
/*bp.registerBThread('test - before practice', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    //check 2 minutes after class starts
    var t =LocalDateTime.parse(test_times[5]);
    bp.log.info(t);
    CTX.subscribeWithParameters("check before practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        var schedules = CTX.getContextInstances("BeforePractice");
        bp.log.info(schedules);

        if(schedules.size() !== 0) {
            bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
        }
    });
});*/

//check AfterPractice Context
/*bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[1]);
    CTX.subscribeWithParameters("check after practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        // if(t.time.equals())
        bp.log.info("HERE");
        schedules = CTX.getContextInstances("AfterPractice");
        bp.log.info("found schedules: "+schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabAfterPractice");
        }
        if (!schedules.get(0).course.equals("NLP3"))
            bp.ASSERT(false, "the context does not match the right lab");
    });
});*/

//check BeforePracticeLockedLab Context
/*bp.registerBThread('test - before practice locked lab', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(test_times[0]);
    CTX.subscribeWithParameters("check before practice and locked lab","SpecificTime", "Time_"+t, {"time": t},function(t) {
        // if(t.time.equals())
        bp.log.info("HERE");
        var schedules = CTX.getContextInstances("BeforePracticeLockedLab");
        bp.log.info("found schedules - BeforePracticeLockedLab: "+schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not BeforePracticeLockedLab");
        }
        if (!schedules.get(0).course.equals("ML1"))
            bp.ASSERT(false, "the context does not match the right lab");

        schedules = CTX.getContextInstances("BeforePracticeFreeLearningLab");
        bp.log.info("found schedules - BeforePracticeFreeLearningLab: "+schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==0 ) {
            bp.ASSERT(false, "no lab's context should be BeforePracticeFreeLearningLab");
        }

        schedules = CTX.getContextInstances("BeforePracticeLockedLab");
        bp.log.info("found schedules - BeforePracticeLockedLab: "+schedules);
        bp.sync({request: CTX.UpdateEvent("FreeLearning", {lab: schedules.get(0) })});

/!*        schedules = CTX.getContextInstances("BeforePracticeFreeLearningLab");
        bp.log.info("found schedules - BeforePracticeFreeLearningLab: "+schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not BeforePracticeFreeLearningLab");
        }*!/
    });
});*/

