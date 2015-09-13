<?php
 header('Content-Type: text/html; charset=utf-8');/// set the content charset to utf-8 for php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();
$temp= $_POST["param"];
$temp=str_replace("[","",$temp);
$temp=str_replace("]","",$temp);
//echo $temp;
$param=  json_decode($temp);
$ordr=(int)$param->order;

switch ($ordr) {
case 1:InsertDrev($param);break;
case 2:WriteJson();break;
case 3:ClearDB();break;
case 4:FillCats($param);break;
}

function InsertDrev($pp)
{
	$nms=array();
	$drv=array();
    $drvs=array();
	if(strpos(strval($pp->drevname),",") !== false) { 
		$nms=explode(",",strval($pp->drevname));
		$drv=explode(",",strval($pp->drev));
	}
	else {
			$nms[0]=strval($pp->drevname);
		    $drv=strval($pp->drev);
			
	}
	include "db_config.php"; 
	for($i=0;$i<count($nms);$i++)
	{
		for ($k=count($drvs)-1;$k>=0;$k--) unset($drvs[$k]);
		
		if(strpos(strval($drv[$i]),"~") !== false)
		$drvs=explode("~",strval($drv[$i]));
		else
		$drvs[0]=strval($drv[$i]);
	for($j=0;$j<count($drvs);$j++)
	{	
	$sql="INSERT INTO `drevs`( `verb`, `drev_name`, `drev`) VALUES ('".$pp->verb."','".$nms[$i]."','".$drvs[$j]."')";
	$result = mysqli_query($con,$sql);
	}
	}
	$rr[0]=array("result"=>"تم إضافة المشتقات بنجاح" );
	echo json_encode($rr);
}
///////////////////////////////////////////////////////////////////////////////////////
function WriteJson()
{
$rr=array();

$sql="SELECT `verb`, `drev_name`, `drev` FROM `drevs` WHERE 1"  ;

include "db_config.php"; 
$result = mysqli_query($con,$sql);
$i=0;
if (file_exists(getcwd()."\\..\\downloads\\derivatives.js")) unlink(getcwd()."\\..\\downloads\\derivatives.js");
$myfile = fopen(getcwd()."\\..\\downloads\\\derivatives.js", "w") ;
$txt = ' var derivatives = { "deriv": ['.PHP_EOL;
fwrite($myfile, $txt);
while($row = $result->fetch_row())	
{

$txt='{ "verb":"'.$row[0].'", "dname":"'.$row[1].'", "derivative":"'.$row[2].'"}'.PHP_EOL;
if($i>0) $txt=','.$txt;
fwrite($myfile, $txt);
$i++;
}
$txt="]}".PHP_EOL;
fwrite($myfile, $txt);
fclose($myfile);
if (file_exists(getcwd()."\\..\\downloads\\derivatives.zip")) unlink(getcwd()."\\..\\downloads\\derivatives.zip");
$zip = new ZipArchive();
$filename =getcwd()."\\..\\downloads\\derivatives.zip";
if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
    exit("cannot open <$filename>\n");
}      
	


$zip->addFile(getcwd()."\\..\\downloads\\derivatives.js","derivatives.js");
$zip->close(); 
$rr[0]=array("result"=>"done");


 echo json_encode($rr);	
}
///////////////////////////////////////////////////////////////////////////////////////
function ClearDB()
{
$rr=array();

$sql="DELETE FROM `drevs` WHERE 1"  ;
include "db_config.php"; 
$result = mysqli_query($con,$sql);
$rr[0]=array("result"=>"تم مسح قاعدة البيانات بنجاح");


 echo json_encode($rr);	
	
}
///////////////////////////////////////////////////////////////////////
function FillCats($pp)
{
   $cats=explode("~",strval($pp->cats));
	include "db_config.php"; 
	for ($i=0;$i<count($cats);$i++){
	$sql="INSERT INTO `subjects`(`subject`) VALUES ('".$cats[$i]."')";
	$result = mysqli_query($con,$sql);
	}
	$rr=array();
	$rr[0]=array("result"=>"Categories Imported");
	echo json_encode($rr);	
}
?>
