function html5up(theFiles,theIndicator,theInfoEl)
{
this.theFiles = document.getElementById(theFiles);
this.infoEl = document.getElementById(theInfoEl);
indicator = document.getElementById(theIndicator);
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

	for(var i = 0;i<theFiles.length;i++)
		{
			myData.append("fileToUpload"+i, theFiles[i]);
		}

	var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", this.progress, false);
    xhr.addEventListener("load", this.complete, false);
    xhr.addEventListener("error", this.failed, false);
    xhr.addEventListener("abort", this.canceled, false);
    xhr.open("POST", "upload.php");
    xhr.send(myData);


}

html5up.prototype.progress = function(evt) {
	if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        indicator.innerHTML  = percentComplete.toString() + '%';

       }
       else {
         indicator.innerHTML  = 'unable to compute';
       }
}

html5up.prototype.complete = function(evt) {
        /* This event is raised when the server send back a response */
        console.log(evt.target.responseText);
        indicator.innerHTML = "100%";
      }

html5up.prototype.failed = function(evt) {
        alert("There was an error attempting to upload the file.");
      }

html5up.prototype.canceled = function(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }