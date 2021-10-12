class Renderer {
    cDayBefore = "rgba(0, 0, 0, 0)";
    cDayAfter = "rgba(0, 0, 0, 0)";

    createTooltip(day, name, price) {
        var tSpan = document.createElement("span");
        tSpan.innerHTML += "ime: " + name + " cijena/noć: " + price;
        tSpan.className = "tooltiptext";
        day.classList.add("tooltip");
        day.appendChild(tSpan);
        var triangleDiv = document.createElement("div");
        triangleDiv.className = "trianglePointer";
        day.appendChild(triangleDiv);
    }

    doubleTooltip(day, name, price, comeNgo) {
        var spanText = day.children[0].innerHTML;
        var oldPrice = spanText.split(" ")[3];
        var oldName = spanText.split(" ")[1];
        if (comeNgo == "arrival") {
            var doubleText = "ODLAZAK:</br>Ime:" + oldName + "</br>Cijena: " + oldPrice + "</br>DOLAZAK:</br>Ime: " + name + "</br>Cijena: " + price;
        } else if (comeNgo == "departure") {
            var doubleText = "ODLAZAK:</br>Ime:" + name + "</br>Cijena: " + price + "</br>DOLAZAK:</br>Ime: " + oldName + "</br>Cijena: " + oldPrice;
        }
        day.children[0].innerHTML = doubleText;
        day.children[0].style.marginTop = "-141px";
    }

    Months(mAxis, j) {
        var divMonth = document.createElement("div");
        divMonth.className = "dMonth";
        divMonth.style.cssText = `height:${(100/(monthEnd-monthStart+1))-0.4}%;display:flex;flex-direction:column;justify-content:center;align-content:center;text-align:center;border-top:solid 1px;`;
        var monthNum = document.createElement("p");
        monthNum.innerHTML = j + ".";
        monthNum.style.cssText = `font-size:120%;color:white`;
        divMonth.appendChild(monthNum);
        mAxis.appendChild(divMonth);
    }

    Boxes(mBoxes, j) {
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

    TitleButtons(mTitle, i, room) {
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

    colFromCSS(strColor, day) {
        var tempStr
        if (day == "before") {
            tempStr = strColor.style.backgroundImage.split("rgb")[1];
        } else if (day == "after") {
            tempStr = strColor.style.backgroundImage.split("rgb")[2];
        }
        tempStr = tempStr.slice(0, -5);
        var arrColor = tempStr.replace(/[^\d,]/g, '').split(',');
        var colStr = "rgba(" + arrColor[0] + ", " + arrColor[1] + ", " + arrColor[2] + ", 255) 50%";
        return colStr;
    }

    rndColString(clr) {
        var eGradArr = [
            parseInt(clr[0] + clr[1], 16),
            parseInt(clr[2] + clr[3], 16),
            parseInt(clr[4] + clr[5], 16),
        ];
        var eGradRGB = "rgba(" + eGradArr[0] + ", " + eGradArr[1] + ", " + eGradArr[2] + ", 255) 50%";
        return eGradRGB;
    }

    rndColHex() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    setGradient(el, startCol, endCol) {
        el.style.backgroundImage = 'linear-gradient(to bottom right,' + startCol + ', ' + endCol + ')';
    }
}