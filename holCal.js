var xmlFile = '<reservations><reservation><customer><first_name>hovac</first_name><last_name>ovac</last_name></customer><date>2015-03-29</date><id>325070178</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-22</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per      night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><price date="2015-02-21" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>700</totalprice></room><time>20:51:09</time></reservation><reservation><customer><first_name>test</first_name><last_name>test</last_name></customer><date>2015-03-29</date><id>438151297</id><room><arrival_date>2015-02-20</arrival_date><currencycode>INR</currencycode><departure_date>2015-02-21</departure_date><id>37568001</id><meal_plan>Breakfast costs INR 15.00 per person per night.</meal_plan><numberofguests>7</numberofguests><price date="2015-02-20" rate_id="1354450">350</price><roomreservation_id>1799964999</roomreservation_id><totalprice>350</totalprice></room><time>20:51:09</time></reservation></reservations>'

var parser = new DOMParser();
var haDoc = parser.parseFromString(xmlFile, "text/xml");

var haLength = haDoc.getElementsByTagName("customer").length;
console.log(haLength);

for (var i = 0; i < haLength; i++) {
    console.log(haDoc.getElementsByTagName("first_name")[i].firstChild.nodeValue);
}
