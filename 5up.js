function html5up(theForm,theFiles,theInfoEl)
{
this.theForm = document.getElementById(theForm);
this.theFiles = document.getElementById(theFiles);
this.infoEl = document.getElementById(theInfoEl);
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

		var boundary = "AJAX--------------" + (new Date).getTime();
		var contentType = "multipart/form-data; boundary=" + boundary;
		var theReq = this.readElms(theFiles,boundary);


		var xhr = new XMLHttpRequest();

        xhr.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "upload.php");


        xhr.setRequestHeader("Content-Type", contentType);
		xhr.send(theReq);
}

html5up.prototype.readElms = function(elements, boundary) {
    var CRLF = "\r\n";
    var parts = [];
    var reader = new FileReader();

    for(i=0;i<elements.length;i++)
	{
	    var part = "";
        var type = "TEXT";
            var fileName = elements[i].fileName;

            part += 'Content-Disposition: form-data; ';
            part += 'name="' + fileName + '"; ';
            part += 'filename="'+ fileName + '"' + CRLF;

            part += "Content-Type: application/octet-stream";
            part += CRLF + CRLF; // marks end of the headers part

            part += elements[i] + CRLF;


       parts.push(part);
}

    var request = "--" + boundary + CRLF;
        request+= parts.join("--" + boundary + CRLF);
        request+= "--" + boundary + "--" + CRLF;

    return request;
}

      function uploadProgress(evt) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
          console.log(percentComplete.toString());
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

      function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        console.log(evt.target.responseText);
      }

      function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
      }

      function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }