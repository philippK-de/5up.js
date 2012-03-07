<?php
set_time_limit(0);
ini_set("max_file_uploads",128 );
echo "<pre>";
foreach($_FILES as $file)
{
 move_uploaded_file($file["tmp_name"],"./upload/" . $file["name"]);
	echo $file["tmp_name"] . "->" . $file["name"] . "<br />\n";
}

?>