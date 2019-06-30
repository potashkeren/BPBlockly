var today = "2019-06-29";
var finishDay = "2019-07-29";

bp.registerBThread('db population', function(){
    var Labs = [], Schedules =[];

    // add Labs
    var lab1 = new Lab('1', 50, 0);
    var lab2 = new Lab('2', 30, 0);
    var lab3 = new Lab('3', 32, 0);
    var lab4 = new Lab('4', 35, 0);
    Labs.push(lab1);
    Labs.push(lab2);
    Labs.push(lab3);
    Labs.push(lab4);

    // add Schedules
    Schedules.push(new Schedule('1', 'NLP1',today.concat('T09:00:00Z'),today.concat('T10:00:00Z'), finishDay.concat('T08:00:00Z'), lab1));
    Schedules.push(new Schedule('2', 'ML1',today.concat('T10:00:00Z'),today.concat('T11:00:00Z'), finishDay.concat('T08:00:00Z'), lab1));
    Schedules.push(new Schedule('3', 'ML2',today.concat('T11:00:00Z'),today.concat('T12:00:00Z'), finishDay.concat('T08:00:00Z'), lab1));
    Schedules.push(new Schedule('4', 'NLP2',today.concat('T12:00:00Z'),today.concat('T13:00:00Z'), finishDay.concat('T08:00:00Z'), lab1));

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
    bp.sync({ request: CTX.InsertEvent(Labs) });
    bp.sync({ request: CTX.InsertEvent(Schedules) });

    bp.sync({ request: bp.Event("Context Population Ended") });
});


bp.registerBThread('test - before practice activation/deactivation', function(){
    bp.sync({waitFor:bp.Event("Time", today.concat(' 08:05:00.0'))}); // 1 == 59 minutes before first schedule
    bp.sync({ request: bp.Event("boom",today.concat(' 08:05:00.0')) });

    var schedules = CTX.getContextInstances("BeforePractice");
    if(schedules.length !==1 || schedules[0].course.equals("NLP")) {
        bp.ASSERT(false, "the lab's context is not LabBeforePractice");
    }
    bp.sync({waitFor:bp.Event("Time", today.concat(' 09:01:00.0'))}); // 1 == 1 minutes after class starts
    schedules = CTX.getContextInstances("BeforePractice");
    if(schedules.length !==0) {
        bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
    }
    bp.sync({waitFor:bp.Event("Time", today.concat(' 10:01:00.0'))}); // 1 == 1 minutes after class ends
    schedules = CTX.getContextInstances("AfterPractice");
    if(schedules.length !==0) {
        bp.ASSERT(false, "The lab is still defined as LabBeforePractice");
    }
});

