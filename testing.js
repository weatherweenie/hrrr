//use these variables for selecting the hrrr images
var sector = 19; //conus
var date = "0"; //where to get this?
var latestRun = "0"; //need to figure out what the latest is
var frame = '003';
var version = "2025121722";
var matrixInfo = '0'; //the run 5 numbers behind the most recent run

async function getMatrixInfo() {
	response = await fetch('https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/matrixinfo.txt');
	text = await response.text();
	return text;
}

function getDate(matrixInfo) {
	date = matrixInfo.slice(0, matrixInfo.length-2);
	return date;
}

function getFifthOldestRun(matrixInfo) {
	fifthRun = matrixInfo.slice(matrixInfo.length-2, matrixInfo.length);
	return fifthRun;
}

function showSector(num) {
	document.getElementById('sectormap').src = 'https://www.spc.noaa.gov/exper/hrrr/sectors/sector' + num + '.gif';
}

function selectSector(num) {
	sector = num;	
}

function setImage(sectorNum, run, frame, ) {
	sector = sectorNum;
	url = 'https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/s' 
	+ sector
	+ '/R' 
	+ run 
	+ '_F'
	+ frame
	+ '_V'
	+ version
	+ '_S'
	+ sector
	+ '_refc.gif';

	document.getElementById('mainImg').src = url;
}

function selectRun(runNum) {
}

//use this function to keep most of the main script bc await needs to be used to wait for fetch() requests to finish
async function mainProgram() {
	matrixInfo = await getMatrixInfo(); //gets the 5th old hrrr run
	console.log(matrixInfo);
	date = getDate(matrixInfo); //gets the date from that run's id
	fifthRun = getFifthOldestRun(matrixInfo);

	setImage(19, fifthRun, 002, 


}

mainProgram();
