var fs = require("fs");
//Stores embedded serial number to be used as a 
//container for slides associated with the device 

var serialNum = fs.readFileSync('/factory/serial_number').toString();
//Path for where device content is stored
//Example /ADA/<company_name>/<region>/<device_ID> where device id is the serial number
var path = '/tmp/test/';
//Brings the directory together
var hold = path + serialNum+'';

//Checks if the directory built exists. If not, 
if (!fs.existsSync(hold)){
    fs.mkdirSync(hold);
    console.log("ADA device registered.");
    console.log(serialNum);
}
else{
    console.log("ADA device already registered.");
    console.log(serialNum);
}

