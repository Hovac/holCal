var xmlFile = '<reservations><reservation><customer><first_name>hovac</first_name><last_name>ovac</last_name></customer><date>2015-03-29</date><id>325070178</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-22</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per      night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><price date="2015-02-21" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>700</totalprice></room><time>20:51:09</time></reservation><reservation><customer><first_name>test</first_name><last_name>test</last_name></customer><date>2015-03-29</date><id>438151297</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-21</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>350</totalprice></room><time>20:51:09</time></reservation></reservations>'

/*
    TODO: 
    - Implement information on clicked dates, or even better span element over all dates taken up by 1 entry - DONE
    - count*n* incrementation in addDate() and delDate() - DONE
    - possibility of booking.com admin site scrape?
    - if hosted on website, possible node.js save/load file directly on file system. further discussion needed.
    - add triangle shit on end date (currently implemented on start date and works good if user inputs date in ascending order)
*/

var lStor = window.localStorage;
var floor1rooms = document.getElementsByClassName("room1Floor");
var floor2rooms = document.getElementsByClassName("room2Floor");
var count = 0;
/*
    fuck javascript and fuck everything about this language. whoever thought of javascript should burn
    loadLocalStorage floor1rooms won't send HTML elements as parameter if there isn't 
*/

// Global Variables //
var monthStart = 6;
var monthEnd = 10;
var dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var parser = new DOMParser();
var haDoc = parser.parseFromString(xmlFile, "text/xml");

var haLength = haDoc.getElementsByTagName("customer").length;

var renderDates = function () {
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
    loadLocalStorage(floor1rooms);
}

var loadLocalStorage = function (floor1rooms) {
    /*
    First iterates by all apartments. after that iterates by the count*n* which will be incremeneted in every addDate() and decremented in every delDate(). watch which apartment is being incremented or decremented.
     */
    var inputData = [];
    for (var i = 0; i < floor1rooms.length; i++) {
        for (var j = 0; j < lStor.getItem("count" + i); j++) {
            inputData[0] = lStor.getItem("arrival" + i + j);
            inputData[1] = lStor.getItem("departure" + i + j);
            inputData[2] = lStor.getItem("name" + i + j);
            inputData[3] = lStor.getItem("price" + i + j);
            colorDayBoxes(inputData, floor1rooms[i]);
        }
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
        saveToLStor(inputData, room);


        console.log(lStor, count);
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

var saveToLStor = function (inputData, room) {
    var apNum = parseInt(room.id.substring(1)) - 1;
    count = (lStor.getItem("count" + apNum) !== null) ? parseInt(lStor.getItem("count" + apNum)) : 0;
    lStor.setItem("arrival" + apNum + count, inputData[0]);
    lStor.setItem("departure" + apNum + count, inputData[1]);
    lStor.setItem("name" + apNum + count, inputData[2]);
    lStor.setItem("price" + apNum + count, inputData[3]);
    count += 1;
    lStor.setItem("count" + apNum, count);
}

// var download = function(content, fileName, contentType) {
//     var a = document.createElement("a");
//     var file = new Blob([JSON.stringify(content)], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
//     URL.revokeObjectURL(a.href);
// }

var createTooltip = function (day, name, price) {
    var tSpan = document.createElement("span");
    tSpan.innerHTML += "ime: " + name + "\n" + "cijena/noć: " + price;
    tSpan.className = "tooltiptext";
    day.classList.add("tooltip");
    day.appendChild(tSpan);

}

var colorDayBoxes = function (iData, room) {
    var tSDate = iData[0].split("-");
    var tEDate = iData[1].split("-");
    if (tSDate[1] == tEDate[1]) {
        var tMonth = room.querySelector("#mjesec_" + parseInt(tSDate[1]));
        var tempDayHolder = [];
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        for (let i = parseInt(tSDate[2]); i <= parseInt(tEDate[2]); i++) {
            let j = 0;
            tempDayHolder[j] = tMonth.querySelector("#dan_" + i);
            if (i == parseInt(tSDate[2])) {
                var lGradRGB = "rgba(0, 0, 0, 0)";
                if (tempDayHolder[j].style.backgroundImage) {
                    var lGradString = tempDayHolder[j].style.backgroundImage.split("rgb")[1];
                    lGradString = lGradString.slice(0, -5);
                    //lGradRGB = lGradString.split("rgb")[1];
                    var rgbColRaw = lGradString.replace(/[^\d,]/g, '').split(',');
                    lGradRGB = "rgba(" + rgbColRaw[0] + ", " + rgbColRaw[1] + ", " + rgbColRaw[2] + ", 255) 50%";
                }
                var eGradArr = [
                    parseInt(randomColor[0] + randomColor[1], 16),
                    parseInt(randomColor[2] + randomColor[3], 16),
                    parseInt(randomColor[4] + randomColor[5], 16),
                ];
                var eGradRGB = "rgba(" + eGradArr[0] + ", " + eGradArr[1] + ", " + eGradArr[2] + ", 255) 50%";
                console.log(eGradRGB);
                tempDayHolder[j].style.backgroundImage = 'linear-gradient(to bottom right,' + lGradRGB + ', ' + eGradRGB + ')';
                createTooltip(tempDayHolder[j], iData[2], iData[3]);
            } else if (i == parseInt(tEDate[2])) {
                tempDayHolder[j].style.backgroundImage = 'linear-gradient(to bottom right, #' + randomColor + ' 50%, rgba(0, 0, 0, 0))';

                createTooltip(tempDayHolder[j], iData[2], iData[3]);
            } else {
                tempDayHolder[j].style.backgroundColor = "#" + randomColor;
                createTooltip(tempDayHolder[j], iData[2], iData[3]);
            }
            j++
        }
        var tStartDay = tMonth.querySelector("#dan_" + parseInt(tSDate[2]));
        var tEndDay = tMonth.querySelector("#dan_" + parseInt(tEDate[2]));
        console.log()

    } else {
        alert("Mora se unijeti mjesec po mjesec, ne mogu između!");
    }
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

function removeLocalStorage() {
    if (confirm("Želiš li sigurno izbrisati memoriju?")) {
        lStor.clear();
        if (window.localStorage.length == 0) {
            alert("Svi datumi su obrisani!");
            location.reload();
        } else {
            alert("došlo je do pogreške pri brisanju, nazovi Ivana!");
        }
    } else {
        alert("Nazovi sinka Ivana ako nisi sigurna!");
    }
}