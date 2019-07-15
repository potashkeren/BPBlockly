bp.registerBThread('production-db population', function(){
    CTX.registerParameterizedContextQuery("Schedule", "Schedule_now", {'val':'now'});
});