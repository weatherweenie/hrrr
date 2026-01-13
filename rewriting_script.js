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

//WE ARE USING ZULU TIME


async function getMostRecentRun(){
	console.log("getMostRecentRun()");
//first, we can get the fifth oldest run from a url, this is the first thing i found
///hrrr/status/status.txt might also be useful
//calculate the most recent run with that +5 hrs

//get the fifth oldest run from matrixinfo.txt
//format is yyyymmddhh
	matrixInfo = await fetch('https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/matrixinfo.txt'); //returns a response
	fifthOldestRun = await matrixInfo.text();
	fifthOldestRun = Number(fifthOldestRun);
	console.log("fifthOldestRun (from matrixinfo.txt)", fifthOldestRun);

	//add 5 hrs to that then return mostRecentRun, using the Date object to work with milliseconds since Unix Epoch
	fifthOldestRunMs = runToUnixMs(fifthOldestRun);
	mostRecentRunMs = 5 * 3600000 + fifthOldestRunMs; //3600000ms/hr
	mostRecentRun = unixMsToRun(mostRecentRunMs);

	console.log("return mostRecentRun:", mostRecentRun);
	return mostRecentRun;
}

function unixMsToRun(unixMs) {
	console.log("unixMsToRun(", unixMs, ")");

	//put the ms since unix epoch into date constructor
	dateObject = new Date(unixMs); 

	//build the run number from that
	newYear = dateObject.getFullYear();
        newMonth = dateObject.getMonth();
        newDay = dateObject.getDate();
        newHour = dateObject.getHours();

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

	newRun = newYear + newMonth + newDay + newHour;
	console.log("returned newRun:", newRun);
	return newRun;


}

//returns ms since unix epoch
function runToUnixMs(runNum) {

	runNum = runNum.toString();

	//separate the year, month, day, hour of the run to use in the Date() constructor
	year = runNum.slice(0, 4);
	month = runNum.slice(4, 6);
	day = runNum.slice(6, 8);
	hour = runNum.slice(8, 10);

	dateObject = new Date(year, month, day, hour);

	unixMs = dateObject.getTime();
	return unixMs;

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
	updateMainImg();
}

function calculateFrame(run, fullFrame) {
	//calculate the frame by getting the difference between the full frame's number and the run's starting number
	//using ms
	fullFrameMs = runToUnixMs(fullFrame);
	runMs = runToUnixMs(run);
	frameMs = fullFrameMs - runMs;
	//divide that by the 3600000ms in a hour
	frame = frameMs / 3600000; 

	//it has to be a str with 3 digits, add leading zeros
	if (frame < 10) { frame = '00' + frame.toString(); }
	else { frame = '0' + frame.toString(); }

	return frame;
}

function updateMainImg() {
	console.log("todo: update the img");
	run = Number(run);
	fullFrame = Number(fullFrame);

	//info needed for the url:
	//sector - already passed to function
	//the run - already passed to function
	//the frame - calculate that here
	//the full frame's number - already passed to function
	//the product to view - already passed to function - currently reflectivity by default
	
	frame = calculateFrame(run, fullFrame);

	url = buildUrl(sector, run, frame, fullFrame, product);

	document.getElementById('mainImg').src = url;
}

function buildUrl(sector, run, frame, fullFrame, product) {
	console.log("buildUrl(", sector, run, fullFrame, product, ")");

	url = 'https://www.spc.noaa.gov/exper/hrrr/data/hrrr3'
	+ '/s' + sector
	+ '/R' + run
	+ '_F' + frame //needs to be 3 digits, with leading zeros included in that
	+ '_V' + fullFrame
	+ '_S' + sector
	+ '_' + product
	+ '.gif';

	console.log("url to return: ", url);

	return url;
}









async function main_program() {

	//defaults:
	sector = 19; //conus
	run = await getMostRecentRun();
	//set the default frame hr to the 1st frame of newest run
	fullFrame = unixMsToRun(runToUnixMs(run) + 3600000); //3600000ms/hr
	frame = calculateFrame(run, fullFrame);
	product = 'refc';

	updateMainImg();

}


main_program();












//then listen for keypresses left/right arrows to scroll through frames
//or up/down to go through older/newer runs

document.addEventListener('keydown', (event) => {
	//check if the key pressed was left or right
	//then add or subtract 3600000ms (1hr) to fullFrame,
	//calculate the frame, and update img
	if (event.key === 'ArrowRight') {
		console.log('ArrowRight');
		fullFrame = unixMsToRun( runToUnixMs(fullFrame) + 3600000 )
		frame = calculateFrame(run, fullFrame);
	}
	else if (event.key === 'ArrowLeft') {
		console.log('ArrowLeft');
		fullFrame = unixMsToRun( runToUnixMs(fullFrame) - 3600000 )
		frame = calculateFrame(run, fullFrame);
	}


	updateMainImg();
});//end of EventListener
	



















