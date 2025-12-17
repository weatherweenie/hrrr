//use these variables for selecting the hrrr images
var sector = 19; //conus
var date = 0; //where to get this?
var run = 2025121719; //need to figure out what the latest is
var frame = '003';
var version = 2025121722;

function showSector(num) {
	document.getElementById('sectormap').src = 'https://www.spc.noaa.gov/exper/hrrr/sectors/sector' + num + '.gif';
}

function selectSector(num) {
	sector = num;	
}

function setImage(sectorNum) {
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
