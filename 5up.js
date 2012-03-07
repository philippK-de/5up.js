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
	var fd = new FormData();

	for(var i = 0;i<theFiles.length;i++)
		{
			fd.append("fileToUpload"+i, theFiles[i]);
		}

	var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", this.uploadProgress, false);
    xhr.addEventListener("load", this.uploadComplete, false);
    xhr.addEventListener("error", this.uploadFailed, false);
    xhr.addEventListener("abort", this.uploadCanceled, false);
    xhr.open("POST", "upload.php");
    xhr.send(fd);


}

html5up.prototype.uploadProgress = function(evt,huhu) {
	if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        indicator.innerHTML  = percentComplete.toString() + '%';

       }
       else {
         indicator.innerHTML  = 'unable to compute';
       }
}

html5up.prototype.uploadComplete = function(evt) {
        /* This event is raised when the server send back a response */
        console.log(evt.target.responseText);
        indicator.innerHTML = "100%";
      }

html5up.prototype.uploadFailed = function(evt) {
        alert("There was an error attempting to upload the file.");
      }

html5up.prototype.uploadCanceled = function(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }