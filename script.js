//global variables
var sector = 19; //full conus


//change the sector by clicking on the image. showSector name is just 
//what it was in the original site
function showSector(num) { 
	document.getElementById('sectormap').src = 'https://www.spc.noaa.gov/exper/hrrr/sectors/sector' + num + '.gif';
}

function selectSector(num) { //change the global sector var
	sector = 19; 
}

function setImage(sector, run, frame, version) {
	url = 'https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/s'
	+ sector
	+ '/R'
	+ run
	+ '_F'
	+ frame //needs to be three digits, like 003 or 012
	+ '_V'
	+ version
	+ '_S'
	+ sector
	+ '_refc.gif';

	document.getElementById('mainImg').src = url;
}

async function getMatrixInfo() { //txt file that has the 5h oldest run id
	response = await fetch('https://www.spc.noaa.gov/exper/hrrr/data/hrrr3/matrixinfo.txt');
	text = await response.text();
	console.log("matrixinfo: ", text);
	return text;
}

function getDate(matrixInfo) { //get the current date from matrixInfo
	date = matrixInfo.slice(0, matrixInfo.length-2);
	console.log("date: ", date);
	return date;
}

function getFifthOldestRun(matrixInfo) { //hour of the 5th oldest run
	fifthRun = matrixInfo.slice(matrixInfo.length-2, matrixInfo.length);
	console.log("fifth oldest run: ", fifthRun);
	return fifthRun;
}

function selectRun(fifthOldestRun) { //makes the default run the newest	
	selectedRun = fifthOldestRun + 5; //is fifthOldestRun num or str?
}

//have one main async function to run everything, because some functions need to be await-ed and you can't do that outside of another async function (why? this is frustrating)
async function mainProgram() { //sector should already be set
	matrixInfo = await getMatrixInfo(); //5th oldest run
	date = getDate(matrixInfo); 
	fifthRun = getFifthOldestRun(matrixInfo);
	run = selectRun(fifthRun);

	//setImage(sector, run, frame, version);
}

mainProgram();
