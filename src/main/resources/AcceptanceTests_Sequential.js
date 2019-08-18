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


function test01_1_1() { //test 01 to req.1.1

    bp.registerBThread('check req 1.1 ', function () {
        bp.log.info("start test_01");

        //Check that 1 lab is indeed open and empty
        bp.sync({waitFor: bp.Event("Finish loading lab requirements")});
        bp.log.info("Check that 1 lab is indeed open and empty");
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");


        bp.log.info(" 2 People will come into the lab_1");
        enterALab(Labs[0], 2);

        // check that 2 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came into the lab")});
        bp.log.info("check that 2 people came into the FreeLearningOpenLab");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("lab realOccupancy: " +labs.get(0).realOccupancy);
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).realOccupancy !== (2.0)  , "2 people should be in lab_1 ");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.log.info("llabs.size(): " +labs.size());
        bp.ASSERT(labs.size() === 0, "no lab should be FreeLearningEmptyLab ");

        bp.log.info("test_01 was successfully completed");

    });
}

function test02_1_3() { //test 02 to req 1.3

    bp.registerBThread('check req 1.3 ', function () {
        bp.log.info("start test_02");

        bp.sync({waitFor: bp.Event("Finish loading lab requirements")});
        bp.log.info("check - try to lock the free learning open Lab");
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("labs.size(): " +labs.size());
        bp.sync({ request: CTX.TransactionEvent(
                CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)}),
                CTX.UpdateEvent("NotFreeLearningLab", {lab: labs.get(0)})) });

        var labsAfter = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("llabs.size(): " +labsAfter.size());
        bp.ASSERT(labsAfter.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labsAfter.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");


        bp.log.info("test_02 was successfully completed");

    });
}

function test03_1_1_1_3() { //test 03 to req 1.1 + 1.3

    bp.registerBThread('check req 1.1 + 1.3 ', function () {
        bp.log.info("start test_03");

        bp.sync({waitFor: bp.Event("Finish loading lab requirements")});

        bp.log.info("open another free learning open Lab");
        var labs = CTX.getContextInstances("Lab");
        bp.sync({request: CTX.UpdateEvent("FreeLearningLab", {lab: labs.get(1)})});
        bp.sync({request: CTX.UpdateEvent("OpenTheLab", {lab: labs.get(1)})});


        var a = LocalDateTime.parse(test_times[1]);
        CTX.subscribeWithParameters("check after 4 minutes","SpecificTime", "Time_"+a, {"time": a},function(a) {
            bp.log.info("Check that just 1 lab is open and empty");
            var labs = CTX.getContextInstances("FreeLearningOpenLab");
            bp.log.info("labs.size(): "+ labs.size());
            bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
            bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");
        });

        bp.log.info("test_03 was successfully completed");

    });
}

function test04_1_4() { //test 01 to req.1.4

    bp.registerBThread('check req 1.1 ', function () {
        bp.log.info("start test_04");

        //Check that 1 lab is indeed open and empty
        bp.sync({waitFor: bp.Event("Finish loading lab requirements")});
        bp.log.info("Check that 1 lab is indeed open and empty");
        var labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");

        labs = CTX.getContextInstances("FreeLearningEmptyLab");
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningEmptyLab ");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");


        bp.log.info(" 2 People will come into the lab_1");
        enterALab(Labs[0], 2);

        // check that 2 people came into the FreeLearningOpenLab
        bp.sync({waitFor: bp.Event("People came into the lab")});
        bp.log.info("check that 2 people came into the FreeLearningOpenLab");
        labs = CTX.getContextInstances("FreeLearningOpenLab");
        bp.log.info("lab realOccupancy: " +labs.get(0).realOccupancy);
        bp.ASSERT(labs.size() === 1, "1 lab should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).id !== "lab_1"  , "lab_1 should be FreeLearningOpenLab");
        bp.ASSERT( labs.get(0).realOccupancy !== (2.0)  , "2 people should be in lab_1 ");

        //check req_1.4
        var openLabs = CTX.getContextInstances("OpenLab");
        bp.log.info("openLabs.size(): " +openLabs.size());
        bp.ASSERT(openLabs.size() === 1, "1 lab should be OpenLab");

        // try close the FreeLearningOpenLab
        bp.sync({request: CTX.UpdateEvent("CloseTheLab", {lab: labs.get(0)})});

        //check lab still open
        openLabs = CTX.getContextInstances("OpenLab");
        bp.log.info("openLabs.size(): " +openLabs.size());
        bp.ASSERT(openLabs.size() === 1, "1 lab should be OpenLab");

        bp.log.info("test_04 was successfully completed");

    });
}

//test01_1_1();
//test02_1_3();
test03_1_1_1_3();

//test04_1_4();