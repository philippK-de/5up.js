function html5up(theFiles,theIndicator,theInfoEl)
{
	this.theFiles = document.getElementById(theFiles);
	this.infoEl = document.getElementById(theInfoEl);
	indicator = document.getElementById(theIndicator);

	this.progress = 0;
}

html5up.prototype.fileInfo = function()
{
   var theFiles = this.theFiles.files;
   var outstr = "";

   outstr += "<ol>";
   for(var i=0;i<theFiles.length;i++)
   {
	   if (theFiles[i]) {
	      var fileSize = 0;
	      if (theFiles[i].size > 1024 * 1024)
	      {
	        fileSize = (Math.round(theFiles[i].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	      }
		  else
	      {
		    fileSize = (Math.round(theFiles[i].size * 100 / 1024) / 100).toString() + 'KB';
		  }

		outstr += "<li>" + theFiles[i].name + "</li>";
	    }
    }
	outstr += "</ol>";
	this.infoEl.innerHTML = outstr;
}


html5up.prototype.upload = function() {
	var theFiles = this.theFiles.files;
	var myData = new FormData();
console.log(theFiles.length);
	for(var i = 0;i<theFiles.length;i++)
		{
			myData.append("myUploadFile"+i, theFiles[i]);

console.log(i);
		}
	var xhr = new XMLHttpRequest();
	  xhr.onreadystatechange=function()
  {
  console.log("state"+xhr.status);
  if (xhr.readyState==4 && xhr.status==200)
    {

    console.log(xhr.responseText);
    }
  }
    xhr.upload.addEventListener("progress", this.progress, false);
    xhr.addEventListener("load", this.complete, false);
    xhr.addEventListener("error", this.failed, false);
    xhr.addEventListener("abort", this.canceled, false);
    xhr.open("POST", "upload.php",true);
    xhr.send(myData);

}

//display progress. you can overwrite this on runtime to implement different display options
html5up.prototype.progress = function(evt) {
	if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        indicator.innerHTML  = percentComplete.toString() + '%';
        this.progress = percentComplete.toString();

       }
       else {
         indicator.innerHTML  = "N/A";
       }
}

//this is fired when the UL is complete
html5up.prototype.complete = function(evt) {
        console.log(evt.target.responseText);
        indicator.innerHTML = "100%";
      }

//fired when there is an error
html5up.prototype.failed = function(evt) {
        alert("Error! File not uploaded.");
      }
//fired when the upload has been canceled / connection lost
html5up.prototype.canceled = function(evt) {
        alert("The upload has been canceled.");
      }