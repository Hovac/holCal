var xmlFile = '<reservations><reservation><customer><first_name>hovac</first_name><last_name>ovac</last_name></customer><date>2015-03-29</date><id>325070178</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-22</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per      night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><price date="2015-02-21" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>700</totalprice></room><time>20:51:09</time></reservation><reservation><customer><first_name>test</first_name><last_name>test</last_name></customer><date>2015-03-29</date><id>438151297</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-21</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>350</totalprice></room><time>20:51:09</time></reservation></reservations>'

// Global Variables //
var monthStart = 6;
var monthEnd = 10;
var dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var parser = new DOMParser();
var haDoc = parser.parseFromString(xmlFile, "text/xml");

var haLength = haDoc.getElementsByTagName("customer").length;

for (var i = 0; i < haLength; i++) {
    console.log(haDoc.getElementsByTagName("first_name")[i].firstChild.nodeValue);
}

var renderDates = function () {
    var floor1rooms = document.getElementsByClassName("room1Floor");
    var floor2rooms = document.getElementsByClassName("room2Floor");
    var mAxis;
    // months write number
    for (let i = 0; i < floor1rooms.length; i++) {
        mAxis = floor1rooms[i].getElementsByClassName("months")[0].getElementsByClassName("mAxis")[0];
        mBoxes = floor1rooms[i].getElementsByClassName("months")[0].getElementsByClassName("mBoxes")[0];
        var mTitle = floor1rooms[i].getElementsByClassName("title")[0];

        rTitleButtons(mTitle, i, floor1rooms[i]);

        for (let j = monthStart; j <= monthEnd; j++) {
            rMonths(mAxis, j);
            rBoxes(mBoxes, j);
        }
    }
}

var addDate = function (room) {
    rOverlay();

    console.log("add " + room.id);
}

var delDate = function (room) {
    console.log("delete " + room.id);
}

var rOverlay = function () {
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
    }

    exitOlayBtn.onclick = function () {
        overlaygnd.className = "overlayHide";
        inputBox.style.visibility = "hidden";
    }

    oSaveBtn.onclick = function () {
        inputData[0] = oSDate.value;
        inputData[1] = oEDate.value;
        inputData[2] = oNames.value;
        inputData[3] = oPrice.value;
    }

    colordayBoxes(inputData);
}

var colordayBoxes = function(iData) {
    
}

var rMonths = function (mAxis, j) {
    var divMonth = document.createElement("div");
    divMonth.className = "dMonth";
    divMonth.style.cssText = `height:${(100/(monthEnd-monthStart+1))-0.4}%;display:flex;flex-direction:column;justify-content:center;align-content:center;text-align:center;border-top:solid 1px;`;
    var monthNum = document.createElement("p");
    monthNum.innerHTML = j + ".";
    monthNum.style.cssText = `font-size:120%;color:white`;
    divMonth.appendChild(monthNum);
    mAxis.appendChild(divMonth);
}

var rBoxes = function (mBoxes, j) {
    var monthLine = document.createElement("div");
    monthLine.style.cssText = `height:${(100/(monthEnd-monthStart+1))-0.4}%;;width:100%;display:flex;flex-direction:row;border-top:solid 1px;flex-wrap:nowrap;`;
    monthLine.id = "mjesec_" + j
    mBoxes.appendChild(monthLine);
    for (let i = 1; i <= dayInMonth[j]; i++) {
        var dayBox = document.createElement("div");
        dayBox.style.cssText = `height:100%;flex: 0 0 ${100/32}%;border-right:solid 1px;display:flex;background-color:white;justify-content:center;align-content:center;text-align:center;`;
        dayBox.innerHTML = i + ".";
        dayBox.id = "dan_" + i;
        monthLine.appendChild(dayBox);
    }
}

var rTitleButtons = function (mTitle, i, room) {
    var mTitleText = document.createElement("p");
    mTitleText.className = "titleText";
    mTitleText.innerHTML = "Apartman A" + (i + 1);
    mTitle.appendChild(mTitleText);
    var addButton = document.createElement("button");
    addButton.className = "btnClass btnClassAdd";
    addButton.innerHTML = "Dodaj rezervaciju";
    addButton.onclick = function () {
        addDate(room);
    };
    mTitle.appendChild(addButton);
    var delButton = document.createElement("button");
    delButton.innerHTML = "izbriši rezervaciju";
    delButton.className = "btnClass btnClassDel";
    delButton.onclick = function () {
        delDate(room);
    };
    mTitle.appendChild(delButton);
}



renderDates();