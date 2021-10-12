var xmlFile = '<reservations><reservation><customer><first_name>hovac</first_name><last_name>ovac</last_name></customer><date>2015-03-29</date><id>325070178</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-22</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per      night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><price date="2015-02-21" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>700</totalprice></room><time>20:51:09</time></reservation><reservation><customer><first_name>test</first_name><last_name>test</last_name></customer><date>2015-03-29</date><id>438151297</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-21</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>350</totalprice></room><time>20:51:09</time></reservation></reservations>'

/*
    TODO: 
    - Implement information on clicked dates, or even better span element over all dates taken up by 1 entry - DONE
    - count*n* incrementation in addDate() and delDate() - DONE
    - possibility of booking.com admin site scrape?
    - if hosted on website, possible node.js save/load file directly on file system. further discussion needed.
    - add triangle shit on end date (currently implemented on start date and works good if user inputs date in ascending order)
*/

var lData = new localData();
var clr = new Renderer();

var floor1rooms = document.getElementsByClassName("room1Floor");
var floor2rooms = document.getElementsByClassName("room2Floor");
var count = 0;

// Global Variables //
var monthStart = 6;
var monthEnd = 10;
var dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// var parser = new DOMParser();
// var haDoc = parser.parseFromString(xmlFile, "text/xml");
// var haLength = haDoc.getElementsByTagName("customer").length;


var renderDates = function () {
    var mAxis;

    // months write number
    for (let i = 0; i < floor1rooms.length; i++) {
        mAxis = floor1rooms[i].getElementsByClassName("months")[0].getElementsByClassName("mAxis")[0];
        mBoxes = floor1rooms[i].getElementsByClassName("months")[0].getElementsByClassName("mBoxes")[0];
        var mTitle = floor1rooms[i].getElementsByClassName("title")[0];
        clr.TitleButtons(mTitle, i, floor1rooms[i]);

        for (let j = monthStart; j <= monthEnd; j++) {
            clr.Months(mAxis, j);
            clr.Boxes(mBoxes, j);
        }
    }
    var cList = lData.initLoad(floor1rooms).clients;
    var cDate = lData.initLoad(floor1rooms).rooms;
    console.log(cList);
    console.log(cDate);
    for(var i = 0; i < cList.length; i++) {
        colorDayBoxes(cList[i], cDate[i]);
    }
}

var addDate = function (room) {
    rOverlay(room);
}

var delDate = function (room) {
    console.log("delete " + room.id);
}

var rOverlay = function (room) {
    var inputData = [];
    var overlaygnd = document.getElementById("overlaybgnd");
    overlaygnd.className = "overlayShow";
    var exitOlayBtn = document.getElementById("exitOlayBtn");
    exitOlayBtn.className = "exitOlayBtn";
    var inputBox = document.getElementById("inputBox");
    inputBox.style.visibility = "visible";

    var oSDate = document.getElementById("oSDate");
    var oEDate = document.getElementById("oEDate");
    var oNames = document.getElementById("oName");
    var oPrice = document.getElementById("oPrice");

    var oSaveBtn = document.getElementById("oSaveBtn");
    var oCancelBtn = document.getElementById("oCancelBtn");

    oCancelBtn.onclick = function () {
        overlaygnd.className = "overlayHide";
        inputBox.style.visibility = "hidden";
        oSDate.value = "";
        oEDate.value = "";
        oNames.value = "";
        oPrice.value = "";
    }

    exitOlayBtn.onclick = function () {
        overlaygnd.className = "overlayHide";
        inputBox.style.visibility = "hidden";
        oSDate.value = "";
        oEDate.value = "";
        oNames.value = "";
        oPrice.value = "";
    }

    oSaveBtn.onclick = function () {
        inputData[0] = oSDate.value;
        inputData[1] = oEDate.value;
        inputData[2] = oNames.value;
        inputData[3] = oPrice.value;
        lData.save(inputData, room);

        colorDayBoxes(inputData, room);
        overlaygnd.className = "overlayHide";
        inputBox.style.visibility = "hidden";
        oSDate.value = "";
        oEDate.value = "";
        oNames.value = "";
        oPrice.value = "";
        // download(jsonData, "jsonTest.text", "text/plain");
    }
}

var colorDayBoxes = function (iData, room) {
    var tSDate = iData[0].split("-");
    var tEDate = iData[1].split("-");
    if (tSDate[1] == tEDate[1]) {
        var tMonth = room.querySelector("#mjesec_" + parseInt(tSDate[1]));
        var tempDayHolder = [];
        var randomColor = clr.rndColHex();
        for (let i = parseInt(tSDate[2]); i <= parseInt(tEDate[2]); i++) {
            //j = 0 is needed since i might not start from 0
            let j = 0;
            tempDayHolder[j] = tMonth.querySelector("#dan_" + i);
            if (i == parseInt(tSDate[2])) {
                // color the start triangle while taking care of dates before it
                clr.cDayBefore = "rgba(0, 0, 0, 0)"
                if (tempDayHolder[j].style.backgroundImage) {
                    /*
                    if there is a colored date before the start date of this entry,
                    save the color and use it in gradient to create new gradient 
                    with both colors, instead of empty color + random color
                    */
                    clr.cDayBefore = clr.colFromCSS(tempDayHolder[j], "before");
                }
                var eGradRGB = clr.rndColString(randomColor);
                clr.setGradient(tempDayHolder[j], clr.cDayBefore, eGradRGB);
                clr.createTooltip(tempDayHolder[j], iData[2], iData[3]);
            } else if (i == parseInt(tEDate[2])) {
                // color the end triangle taking care of dates after it
                clr.cDayAfter = "rgba(0, 0, 0, 0)";
                if (tempDayHolder[j].style.backgroundImage) {
                    /*
                    if there is a colored date after the end date of this entry,
                    save the color and use it in gradient to create new gradient 
                    with both colors, instead of empty color + random color
                    */
                    clr.cDayAfter = clr.colFromCSS(tempDayHolder[j], "after");
                }
                var eGradRGB = clr.rndColString(randomColor);
                clr.setGradient(tempDayHolder[j], eGradRGB, clr.cDayAfter);
                clr.createTooltip(tempDayHolder[j], iData[2], iData[3]);
            } else {
                // color the whole box
                tempDayHolder[j].style.backgroundColor = "#" + randomColor;
                clr.createTooltip(tempDayHolder[j], iData[2], iData[3]);
            }
            j++
        }
        // var tStartDay = tMonth.querySelector("#dan_" + parseInt(tSDate[2]));
        // var tEndDay = tMonth.querySelector("#dan_" + parseInt(tEDate[2]));
    } else {
        alert("Mora se unijeti mjesec po mjesec, ne mogu između!");
    }
}

function removeLocalStorage() {
    lData.deleteLocalStorage();
}


renderDates();