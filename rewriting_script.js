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
//the frame that's selected (default 1)
//and the types of info you want to see, like reflectivity, cape, stp, etc.

async function getMostRecentRun(){
//first, we can get the fifth oldest run from a url, this is the first thing i found
//calculate the most recent run with that +5 hrs

//get the fifth oldest run from matrixinfo.txt
	matrixInfo = await fetch('https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/matrixinfo.txt'); //returns a response
	fifthOldestRun = await matrixInfo.text();
	console.log("fifthOldestRun (from matrixinfo)", fifthOldestRun);

	//get the last two digits to just get the hour
	//then check if it's above 24, if so change the day
	//we're assuming it's yyyymmddhr
	fifthOldestHour = fifthOldestRun.slice(8, 10);
	fifthOldestHour = Number(fifthOldestHour);
	console.log("fifthOldestHour", fifthOldestHour);

	mostRecentHour = fifthOldestHour + 5;
	console.log("mostRecentHour", mostRecentHour);

	if (mostRecentHour >= 24) {
		//get just the fifthOldestRun's date,
		//then 
	}


}

getMostRecentRun();











