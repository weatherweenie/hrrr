//first task: setting the main image
//
//list of things needed for the main img url:

//the sector you're viewing
//time of the run you're viewing
//the frame you're viewing; frame 0 is the run time and will show nothing, default is 001 which is the run time + 1
//the time of which frame you're viewing

//the info you need to get, and in what order:
//the most recent run (how can i figure out if it's complete or not?)
//the sector that's selected (default 19 which is conus)
//the frame needed for the hour that's selected; default to 1st frame of the recent run, but if an old run is selected convert the current hour to that run's frame accordingly
//and the types of info you want to see, like reflectivity, cape, stp, etc.

//default values to start with:
sector = 19; //conus

//WE ARE USING ZULU TIME


async function getMostRecentRun(){
//first, we can get the fifth oldest run from a url, this is the first thing i found
///hrrr/status/status.txt might also be useful
//calculate the most recent run with that +5 hrs

//get the fifth oldest run from matrixinfo.txt
//format is yyyymmddhh
	matrixInfo = await fetch('https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/matrixinfo.txt'); //returns a response
	fifthOldestRun = await matrixInfo.text();
	fifthOldestRun = Number(fifthOldestRun);
	console.log("fifthOldestRun (from matrixinfo.txt)", fifthOldestRun);

	//add 5 hrs to that, then get a Date object from that
	//the Date() constructor accounts for the hours overflowing 23
	temp_mostRecentRun = fifthOldestRun + 5;
	temp_mostRecentRun = temp_mostRecentRun.toString();

	year = temp_mostRecentRun.slice(0, 4);
	month = temp_mostRecentRun.slice(4, 6);
	day = temp_mostRecentRun.slice(6, 8);
	hour = temp_mostRecentRun.slice(8, 10); 

	mostRecentRunDateObject = new Date(year, month, day, hour);

	//build the most recent run's value from that
	newYear = mostRecentRunDateObject.getFullYear();
	newMonth = mostRecentRunDateObject.getMonth();
	newDay = mostRecentRunDateObject.getDate();
	newHour = mostRecentRunDateObject.getHours();

	newYear = newYear.toString();
	newMonth = newMonth.toString();
	newDay = newDay.toString();
	newHour = newHour.toString();

	function convertNum(num) {
		if (num < 10) { str = '0' + num.toString() }
		else { str = num.toString() }

		return str
	}

	newYear = newYear.toString();
	newMonth = convertNum(newMonth);
	newDay = convertNum(newDay);
	newHour = convertNum(newHour);

	mostRecentRun = newYear + newMonth + newDay + newHour;
	console.log("mostRecentRun", mostRecentRun);

	return mostRecentRun;


}

//change the highlighted sector in the sector select img, on mouseover
function showSector(num) {
	if (num == 19) { //19 is conus, uses different url
		document.getElementById('sectormap').src = 'https://www.spc.noaa.gov/exper/hrrr/sectors/sectors_small.gif';
	}

	else {
	document.getElementById('sectormap').src = 'https://www.spc.noaa.gov/exper/hrrr/sectors/sector' + num + '.gif';
	}
}

//when sector selection img isn't moused over, show the one for the 
//currently selector sector's global variable
function showCurrentSector() {
	showSector(sector);
}

function selectSector(num) { 
	sector = num; 
	updateImg();
}

function selectFrame(num) {

}

function updateImg() {
	console.log("todo: update the img");
}

mostRecentRun = getMostRecentRun();










