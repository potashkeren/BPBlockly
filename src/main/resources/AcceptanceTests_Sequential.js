importPackage(Packages.il.ac.bgu.cs.bp.bpjs.context);
importPackage(Packages.il.ac.bgu.bp.cotextualBlockly.context.schema);

var timeEvents = bp.EventSet("", function(e) {
    return e.name.equals("Time");
});
bp.registerBThread('update time', function () {
    while(true) {
        var time = bp.sync({waitFor: timeEvents}).data;
        bp.sync({ request: CTX.UpdateEvent("UpdateTime", {"time":time})});
    }
});


/*bp.registerBThread('start after loading lab requirements ', function () {
    bp.sync({waitFor: bp.Event("Finish loading lab requirements")});
    bp.log.info("start AcceptanceTests_Sequential");

    bp.log.info(" 2 People will come into the lab_1");
    enterALab(Labs[0], 2);



});*/

/*bp.registerBThread('people\'s lab income', function () {
    var labAmount = [[1,2],[1,3],[1,4], [1,5]];
    var time = bp.sync({ waitFor: bp.EventSet('', function (e) {return e.name.equals('Time')})}).data;

    for (var i=0; i<labAmount.size(); i++){
        bp.sync({waitFor: bp.Event('Time', time)});
        enterALab(labAmount[i][0], labAmount[i][1]);
        time += 60000;
    }
});*/


function test_1_1() { //test req.1.1

    bp.registerBThread('check req 1.1 ', function () {

        bp.sync({waitFor: bp.Event("Finish loading lab requirements")});
        bp.log.info("start test_1_1");
        bp.log.info("Check that 1 lab is indeed open and empty");

        //Check that 1 lab is indeed open and empty
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id.equals( "lab_1"), "lab_1 should be FreeLearningOpenLab");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labs.get(0).id.equals( "lab_1" ), "lab_1 should be FreeLearningEmptyLab");


        bp.log.info(" 2 People will come into the lab_1");
        enterALab(Labs[0], 2);

        // check that 2 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 2 people came into the FreeLearningOpenLab");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
       // bp.log.info("labs.size(): " +labs.size());
       // bp.log.info("lab realOccupancy: " +labs.get(0).realOccupancy);
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id.equals("lab_1"), "lab_1 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).realOccupancy !== 2 , "2 people should be in lab_1 ");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
       // bp.log.info("labs.size(): " +labs.size());
        bp.ASSERT(labs.size() === 0, "no lab should be FreeLearningEmptyLab ");

        bp.log.info("test_1_1 was successfully completed");
        bp.sync({request: bp.Event("test_1_1 was successfully completed")});
    });
}

function test_1_3() { //test req 1.3

    bp.registerBThread('check req 1.3 ', function () {

        bp.sync({waitFor: bp.Event("test_1_1 was successfully completed")});
        bp.log.info("start test_1_3");
        bp.log.info("check - try to lock the free learning open Lab");

        var labs = CTX.getContextInstances("FreeLearningOpenLab");
       // bp.log.info("labs.size(): " +labs.size());

        var a = LocalDateTime.parse(test_times[0]);
        CTX.subscribeWithParameters("check after 2 minutes","SpecificTime", "Time_"+a, {"time": a},function(a) {
            bp.sync({request: bp.Event("timeout test_1_3")});
        });

        // try close the FreeLearningOpenLab
        bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)}), waitFor:bp.Event("timeout test_1_3")});

        var labsAfter = CTX.getContextInstances("FreeLearningOpenLab");
       // bp.log.info("llabs.size(): " +labsAfter.size());
        bp.ASSERT(labsAfter.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labsAfter.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");

        bp.log.info("test_1_3 was successfully completed");
        bp.sync({request: bp.Event("test_1_3 was successfully completed")});
    });
}

function test_1_1__1_3() { //test req 1.1 + 1.3

    bp.registerBThread('check req 1.1 + 1.3 ', function () {

        bp.sync({waitFor: bp.Event("test_1_3 was successfully completed")});
        bp.log.info("start test_1_1__1_3");
        bp.log.info("open another free learning open Lab");

        var labs = CTX.getContextInstances("Lab");
        bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(1)})});
        bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(1)})});


        var a = LocalDateTime.parse(test_times[1]);
        CTX.subscribeWithParameters("check after 4 minutes","SpecificTime", "Time_"+a, {"time": a},function(a) {
            bp.log.info("Check that just 1 lab is open and free learning");
            var labs = CTX.getContextInstances("FreeLearningOpenLab");
            bp.log.info("labs.size(): "+ labs.size());
            bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
            bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");

            bp.log.info("test_1_1__1_3 was successfully completed");
            bp.sync({request: bp.Event("test_1_1__1_3 was successfully completed")});
        });
        });
}

function test_1_4() { //test req.1.4

    bp.registerBThread('check req 1.4 ', function () {

        bp.sync({waitFor: bp.Event("test_1_1__1_3 was successfully completed")});
        bp.log.info("start test_1_4");
        bp.log.info("Check that 1 lab is indeed open and empty");

        //Check that 1 lab is indeed open and empty
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");

        //check req_1.4
        var openLabs = CTX.getContextInstances("OpenLab");
        bp.log.info("openLabs.size(): " +openLabs.size());
        bp.ASSERT(openLabs.size() === 1, "1 lab should be OpenLab");


        var a = LocalDateTime.parse(test_times[2]);
        CTX.subscribeWithParameters("check after 6 minutes","SpecificTime", "Time_"+a, {"time": a},function(a) {
            bp.sync({request: bp.Event("timeout test_1_4")});
        });

        // try close the FreeLearningOpenLab
        bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)}), waitFor:bp.Event("timeout test_1_4")});

        //check lab still open
        openLabs = CTX.getContextInstances("OpenLab");
        bp.log.info("openLabs.size(): " +openLabs.size());
        bp.ASSERT(openLabs.size() === 1, "1 lab should be OpenLab");

        bp.log.info("test_1_4 was successfully completed");
        bp.sync({request: bp.Event("test_1_4 was successfully completed")});
    });
}

function test_1_1b() { //test req.1.1

    bp.registerBThread('check req 1.1 b ', function () {

        bp.sync({waitFor: bp.Event("test_1_4 was successfully completed")});
        bp.log.info("start test_1_1b");

        bp.log.info(" 2 People leave the lab_1");
        exitALab(Labs[0], 2);

        // check that 2 people leave the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 2 people leave the FreeLearningOpenLab and the lab still open");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        // bp.log.info("labs.size(): " +labs.size());
        // bp.log.info("lab realOccupancy: " +labs.get(0).realOccupancy);
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id.equals("lab_1"), "lab_1 should be FreeLearningOpenLab");
        bp.log.info(" labs.get(0).realOccupancy : "+ labs.get(0).realOccupancy );
        bp.ASSERT( labs.get(0).realOccupancy !== 0 , "no people should be in lab_1 ");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        // bp.log.info("labs.size(): " +labs.size());
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");

        bp.log.info("test_1_1b was successfully completed");
        bp.sync({request: bp.Event("test_1_1b was successfully completed")});
    });
}

function test_1_5__7_1() { //test req. 1.5 + 7.1

    bp.registerBThread('check req 1.5 + 7.1 ', function () {

        bp.sync({waitFor: bp.Event("test_1_1b was successfully completed")});
        bp.log.info("start test_1_5__7_1");
        bp.log.info(" 20 People will come into the lab_1");
        enterALab(Labs[0], 20);

        // check that 20 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 20 people came into the FreeLearningOpenLab");
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).realOccupancy !== 20 , "20 people should be in lab_1 ");

        bp.log.info(" 15 People will come into the lab_1");
        enterALab(Labs[0], 15);

        // check that 20+15 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 20+15 people came into the FreeLearningOpenLab");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).realOccupancy !== 35 , "35 people should be in lab_1 ");

        //Check that 2 labs is open
        bp.sync({waitFor: bp.Event("another FreeLearningLab was opened")});
        bp.log.info("check that 2 labs is open");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("labs.size(): "+ labs.size());
        bp.ASSERT(labs.size() === 2, "2 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id.equals( "lab_1"), "lab_1 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(1).id.equals( "lab_2"), "lab_2 should be FreeLearningOpenLab");

        //Check that 1 lab is empty
        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.log.info("FreeLearningEmptyLab: "+  labs.get(0));
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labs.get(0).id.equals( "lab_2" ), "lab_2 should be FreeLearningEmptyLab");

        bp.log.info("test_1_5__7_1 was successfully completed");
        bp.sync({request: bp.Event("test_1_5__7_1 was successfully completed")});
    });
}

function test_1_5__7_1b() { //test req. 1.5 + 7.1

    bp.registerBThread('check req 1.5 + 7.1 b ', function () {

        bp.sync({waitFor: bp.Event("test_1_5__7_1 was successfully completed")});
        bp.log.info("start test_1_5__7_1b");

        bp.log.info(" 20 People will come into the lab_2");
        enterALab(Labs[1], 20);

        // check that 20 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 20 people came into the FreeLearningOpenLab");
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT( labs.get(1).realOccupancy !== 20 , "20 people should be in lab_2 ");

        bp.log.info(" 10 People will come into the lab_2");
        enterALab(Labs[1], 10);

        // check that 20+10 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came/leave the lab")});
        bp.log.info("check that 20+10 people came into the FreeLearningOpenLab");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT( labs.get(1).realOccupancy !== 30 , "30 people should be in lab_2 ");

        //Check that 3 labs is open
        bp.sync({waitFor: bp.Event("another FreeLearningLab was opened")});
        bp.log.info("check that 3 labs is open");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("labs.size(): "+ labs.size());
        bp.ASSERT(labs.size() === 3, "3 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id.equals( "lab_1"), "lab_1 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(1).id.equals( "lab_2"), "lab_2 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(1).id.equals( "lab_3"), "lab_2 should be FreeLearningOpenLab");

        //Check that 1 lab is empty
        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.log.info("FreeLearningEmptyLab: "+  labs.get(0));
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labs.get(0).id.equals( "lab_3" ), "lab_3 should be FreeLearningEmptyLab");

        //
        bp.log.info(" 2 People will come into the lab_2");
        enterALab(Labs[1], 2);

        bp.log.info("test_1_5__7_1b was successfully completed");
        bp.sync({request: bp.Event("test_1_5__7_1b was successfully completed")});
    });
}



test_1_1();
test_1_3();
test_1_1__1_3();
test_1_4();
test_1_1b();
test_1_5__7_1();
test_1_5__7_1b();

