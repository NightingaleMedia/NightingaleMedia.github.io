var currSlogan = 1;
var numProjects = $(".Project-Picture").length;
    console.log(numProjects);


var setSlogans = function () {
    var count = $(".Project-Picture .scro h2.ss1 span").length / numProjects;

    var cS = currSlogan;
    var pS = currSlogan - 1;     if (pS < 1) pS = count;
    var ppS = currSlogan - 2;
    if (currSlogan < 2) ppS = count - currSlogan;
    if (ppS < 1) ppS = count;

    currSlogan++;
    if (currSlogan > count) currSlogan = 1;
    var nS = currSlogan;

    // console.log(count);

    // console.log("count="+count+"/ns="+nS+"/cs="+cS+"/ps="+pS+"/pps="+ppS);

    $(".scro h2 .s" + cS).addClass("removed");
    $(".scro h2 .s" + pS).addClass("hidden");//.removeClass("active removed");
    $(".scro h2 .s" + ppS).removeClass("hidden active removed");
    $(".scro h2 .s" + nS).addClass("active");
};

setInterval(setSlogans, 1200);
