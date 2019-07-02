importPackage(Packages.java.time);

var today = "2019-07-02";
var finishDay = "2019-07-29";

bp.registerBThread('db population', function(){
    var Labs = [], Schedules =[];

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
    Schedules.push(new Schedule('1', 'NLP',today.concat('T06:00:00'),today.concat('T07:00:00'), finishDay.concat('T08:00:00'), lab1));
    Schedules.push(new Schedule('2', 'ML1',today.concat('T07:00:00'),today.concat('T08:00:00'), finishDay.concat('T08:00:00'), lab1));
    Schedules.push(new Schedule('3', 'ML2',today.concat('T11:00:00'),today.concat('T12:00:00'), finishDay.concat('T08:00:00'), lab1));
    Schedules.push(new Schedule('4', 'NLP2',today.concat('T12:00:00'),today.concat('T13:00:00'), finishDay.concat('T08:00:00'), lab1));

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

    var a = LocalDateTime.parse('2019-07-02T05:04:00.0');
    CTX.subscribeWithParameters("check lab","SpecificTime", "Time_"+a, {"time": a},function(a) {
/*        bp.log.info("HERE");
        labs = CTX.getContextInstances("Lab");
         bp.log.info("lab: " + labs);
         for(var i = 0; i<labs.size(); i++) {
             bp.log.info("lab: "+labs.get(i));
         }
         if(labs.size() !==4) {
             bp.ASSERT(false, "didn't get all labs ");
         }*/
    });

});

// check OpenLab + LockedLab context and OpenTheLab command
bp.registerBThread('test - OpenLab activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });
    bp.sync({waitFor:bp.Event("Time", today.concat(' 08:03:00.0'))});

    var labs = CTX.getContextInstances("OpenLab");
    if(labs.size() !==0) {
        bp.ASSERT(false, "all labs should be closed ");
    }

    labs = CTX.getContextInstances("LockedLab");
    if(labs.size() !==4) {
        bp.ASSERT(false, "all labs should be closed ");
    }
    
    bp.sync({request: CTX.UpdateEvent("OpenTheLab",{  lab:labs.get(0)})});

    labs = CTX.getContextInstances("OpenLab");
    if(labs.size() !==1) {
        bp.ASSERT(false, "one lab should be open ");
    }

    labs = CTX.getContextInstances("LockedLab");
    if(labs.size() !==3) {
        bp.ASSERT(false, "3 labs should be closed ");
    }
});

// check NonEmptyLab + EmptyLab context
bp.registerBThread('test - NonEmptyLab + EmptyLab activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });
    bp.sync({waitFor:bp.Event("Time", today.concat(' 08:03:00.0'))});

    var labs = CTX.getContextInstances("NonEmptyLab");
    if(labs.size() !==2) {
        bp.ASSERT(false, "2 labs should be non empty ");
    }

    labs = CTX.getContextInstances("EmptyLab");
    if(labs.size() !==2) {
        bp.ASSERT(false, "2 labs should be empty");
    }

});


// check Schedule context
/*bp.registerBThread('test - schedule activation/deactivation', function() {
    bp.sync({ waitFor: bp.Event("Context Population Ended") });
    bp.sync({waitFor:bp.Event("Time", today.concat(' 08:04:00.0'))});

    var schedules = CTX.getContextInstances("Schedule");
    if(schedules.size() !==4 ) {
        bp.ASSERT(false, "didn't get all schedules ");
    }
});*/

//check BeforePractice +  AfterPractice Context
bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({ waitFor: bp.Event("Context Population Ended") });

    var t = LocalDateTime.parse(today.concat('T05:10:00.0'));
    CTX.subscribeWithParameters("check before practice","SpecificTime", "Time_"+t, {"time": t},function(t) {
        // if(t.time.equals())
        schedules = CTX.getContextInstances("BeforePractice");
        bp.log.info(schedules);
        // bp.log.info(schedules.get(0));
        if(schedules.size() !==1 ) {
            bp.ASSERT(false, "the lab's context is not LabBeforePractice");
        }
        if (!schedules.get(0).course.equals("NLP"))
            bp.ASSERT(false, "the context does not match the right lab");
    });


    bp.sync({waitFor:bp.Event("Time", today.concat(' 09:01:00.0'))}); // 1 == 1 minutes after class starts
    schedules = CTX.getContextInstances("BeforePractice");
    if(schedules.size() !==0) {
        bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
    }

    // check AfterPractice context
    bp.sync({waitFor:bp.Event("Time", today.concat(' 10:01:00.0'))}); // 1 == 1 minutes after class ends
    schedules = CTX.getContextInstances("AfterPractice");
    if(schedules.size() !==0) {
        bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
    }
});



