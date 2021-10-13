var lStor = window.localStorage;
class localData {

    save(inputData, room) {
        var apNum = parseInt(room.id.substring(1)) - 1;
        count = (lStor.getItem("count" + apNum) !== null) ? parseInt(lStor.getItem("count" + apNum)) : 0;
        lStor.setItem("arrival" + apNum + count, inputData[0]);
        lStor.setItem("departure" + apNum + count, inputData[1]);
        lStor.setItem("name" + apNum + count, inputData[2]);
        lStor.setItem("price" + apNum + count, inputData[3]);
        count += 1;
        lStor.setItem("count" + apNum, count);
    }

    initLoad(floor1rooms) {
        /*
        First iterates by all apartments. after that iterates by the count*n* which will be incremeneted in every addDate() and decremented in every delDate(). watch which apartment is being incremented or decremented.
         */
        var k = 0;
        var clients = [];
        var rooms = [];
        for (var i = 0; i < floor1rooms.length; i++) {
            for (var j = 0; j < lStor.getItem("count" + i); j++) {
                var inputData = [];
                inputData[0] = lStor.getItem("arrival" + i + j);
                inputData[1] = lStor.getItem("departure" + i + j);
                inputData[2] = lStor.getItem("name" + i + j);
                inputData[3] = lStor.getItem("price" + i + j);
                clients.push(inputData);
                rooms.push(floor1rooms[i]);
                k++;
            }
        }
        return {
            clients,
            rooms
        };
    }

    deleteLocalStorage() {
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

    downloadFile(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content)], {
            type: contentType
        });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    checkDate(startDate, endDate, room) {
        var dateFlag = true;
        var roomID = room.id.split("a")[1] - 1;
        var roomCount = parseInt(lStor.getItem("count" + roomID));
        var startD = new Date(startDate).getDate();
        var endD = new Date(endDate).getDate();
        for (var i = 0; i < roomCount; i++) {
            var startDatabase = new Date(lStor.getItem("arrival" + roomID + i)).getDate();
            var endDatabase = new Date(lStor.getItem("departure" + roomID + i)).getDate();
            for (var j = startD; j <= endD; j++) {
                var startInside = ((j > startDatabase) & (j < endDatabase));
                var endInside = ((j < endDatabase) & (j > startDatabase));
                if (startInside || endInside) {
                    dateFlag = false;
                    break;
                } else {
                    dateFlag = true;
                }
            }
            if(dateFlag == false) {
                break;
            }
        }

        return dateFlag;
    }
}