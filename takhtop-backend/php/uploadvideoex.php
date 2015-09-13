<?php
header('Content-Type: text/html; charset=utf-8');/// set the content charset to utf-8 for php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$ffolder=$_POST['videoexfolder'];
$fname=$_POST['videoexname'];
if ($_FILES["videoexfile"]["error"] > 0)
  {
  echo "<p style='font-size:16; font-color:#FF0000; '>Error: " . $_FILES["file"]["error"] ." </p>";
  }
else
  {
	$srcpath= $_FILES["videoexfile"]["tmp_name"];  
	$destpath=getcwd()."\\..\\res\\videoex\\".$ffolder;
	if (!file_exists($destpath)) if (!mkdir($destpath, 0777, true)) {
    die('Failed to create folders...'.$destpath);
}
 ;
	$destpath=$destpath."/".$fname.".webm";
	if (file_exists($destpath)) unlink($destpath);
	if (!copy( $srcpath,$destpath))  die('can not copy... from '.$srcpath.' to '.$destpath); 
	else { unlink($srcpath); echo "upladed successfully";}
	  }
  
  ?>