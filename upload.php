<?php
echo "<pre>";
foreach($_FILES as $file)
{
 move_uploaded_file($file["tmp_name"],"./upload/" . $file["name"]);
	echo $file["tmp_name"] . "->" . $file["name"] . "<br />\n";
}

?>