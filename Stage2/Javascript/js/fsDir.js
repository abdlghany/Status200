
const fs = require("fs");
fs.readdir("../", function(err, files){
if(err) console.log(err);
else{
  console.log(files);
}
});