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
case 1:GetWords($param);break;
case 2:InsertWord($param);break;
case 3:UpdateWord($param);break;
case 4:GetWordInfo($param);break;
case 5: DelWord($param);break;
case 6: WriteJson($param);break;
case 7: ZipResources();break;
case 8:UpdateDB();break;
case 9:UpdateDrevs();break;

}




function GetWords($pp)
{
	$sql="SELECT `the_word` FROM `oneword` WHERE `subject`='".$pp->subj."'";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("word"=>strval($row[0]));
	$i++;
	}
	if($i==0) $rr[0]=array("word"=>"لا يوجد");
	
	 echo json_encode($rr);
}
//////////////////////////////////////////////////////////////////////////////
function IsWordFound($pp)
{
	$sql="SELECT Count(`ID`) FROM `oneword` WHERE `the_word`='".$pp->word."'";
	$rr=0;
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	if ($row = $result->fetch_row())
	{
	
	$rr=$row[0];
	
	}
	if($rr>0) return true;
	else return false;
}
/////////////////////////////////////////////////////////
function InsertWord($pp)
{
$rr=array();
if(IsWordFound($pp)) $rr[0]=array("result"=>"هذه الكلمة موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`,`explain`,`vexcount`) VALUES('";
	$ss=$pp->lang."','".$pp->dialect."','".$pp->word."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',".$pp->vcount.",'".$pp->syn."',".$pp->lcount.",".$pp->acount.",'".$pp->region."','".$pp->wcode."',".$pp->icount.",'".$pp->explain."',".$pp->vexcount.")";
	$sql=$sql.$ss;
	
	$result = mysqli_query($con,$sql);
if($pp->syn!="") {
	
	if(strpos(strval($pp->syn),"~") !== false) { 
		$wds=explode("~",strval($pp->syn));
		//$wdcode=explode("~",strval($pp->syncode));
		for($i=0;$i<count($wds);$i++)
		{
			$newsyn=$pp->syn;
			
		$newsyn=str_replace($wds[$i],$pp->word,$newsyn);
		
		$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`,`explain`,`vexcount`) VALUES('";
		$ss=$pp->lang."','".$pp->dialect."','".$wds[$i]."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',0,'".$newsyn."',0,0,'".$pp->region."','".$pp->wcode."',0,'".$pp->explain."',".$pp->vexcount.")";
		$sql=$sql.$ss;
	
		$result = mysqli_query($con,$sql);
			}
		}	
	else {
		;
		
	$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`,`explain`,`vexcount`) VALUES('";
	$ss=$pp->lang."','".$pp->dialect."','".$pp->syn."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',0,'".$pp->word."',0,0,'".$pp->region."','".$pp->wcode."',0,'".$pp->explain."',".$pp->vexcount.")";
	$sql=$sql.$ss;
	
	$result = mysqli_query($con,$sql);

	}
	
  			
       }
	   
$rr[0]=array("result"=>"تم إضافة الكلمة بنجاح" );
ArrangeFiles("\\..\\res\\video\\".$pp->wcode."\\",".webm");
ArrangeFiles("\\..\\res\\images\\".$pp->wcode."\\",".jpg");
ArrangeFiles("\\..\\res\\audio\\".$pp->wcode."\\",".mp3");
ArrangeFiles("\\..\\res\\lipsing\\".$pp->wcode."\\",".webm");
}


 echo json_encode($rr);
}
////////////////////////////////////////////////////////////////////////
function DelWord($pp)
{
	$rr=array();
	$sss="";
	include "db_config.php"; 
	$sql="SELECT `synonym_ids` FROM `oneword` WHERE `the_word`='".$pp->word."'";
	$ss=array();
	$result = mysqli_query($con,$sql);
	if($row = $result->fetch_row())	$sss=strval($row[0]);
	if($sss!="")
	{
		if(!strpos($sss,"~")) $ss[0]=$sss;
		else $ss=explode( "~",$sss);
		for($i=0;$i<count($ss);$i++)
		{
			$sql="DELETE FROM `oneword` WHERE  `the_word`='".$ss[$i]."'";
            $result = mysqli_query($con,$sql);
		}
		
		
	}
$sql="DELETE FROM `oneword` WHERE  `the_word`='".$pp->word."'";
$result = mysqli_query($con,$sql);
$rr[0]=array("result"=>"تم حذف الكلمة ومرادفتها بنجاح بنجاح" );
 echo json_encode($rr);
	
}
///////////////////////////////////////////////////////////////////////////
function UpdateWord($pp)
{
	$rr=array();
	include "db_config.php"; 
	
	$sql="UPDATE `oneword` SET `lang`='".$pp->lang."',"." `dialect`='".$pp->dialect."',"." `the_word`='".$pp->word."',"." `word_type`='".$pp->wtype."',"." `subject`='".$pp->subject."'" ;
	$ss="',`major`='".$pp->major."',`country`='".$pp->cntry."',`governate`='".$pp->gvrn."',`video_count`=".$pp->vcount.",`synonym_ids`='".$pp->syn."',`lipsing _count`=".$pp->lcount;
	$sss=",`audio_count`=".$pp->acount.",`region`='".$pp->region."',`wcode`='".$pp->wcode."',`image_count`=".$pp->icount.",`explain`='".$pp->explain."',`vexcount`=".$pp-vexcount;
	$sql=$sql.$ss.$sss;
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////
function GetWordInfo($pp)
{
$sql="SELECT `lang`,`dialect`,`word_type`,`subject`, `country`, `governate`, `region`,`major`,`synonym_ids`, `video_count`, `image_count`, `audio_count` , `lipsing _count`,`explain`,`vexcount` FROM `oneword` WHERE `the_word`='".$pp->word."'";
$rr=array();
include "db_config.php"; 
$result = mysqli_query($con,$sql);
if($row = $result->fetch_row())	
{
$rr[0]=array("lang"=>strval($row[0]),"dialect"=>strval($row[1]),"wtype"=>strval($row[2]),"subject"=>strval($row[3]),"cntry"=>strval($row[4]),"gvrn"=>strval($row[5]),"region"=>strval($row[6]),"major"=>strval($row[7]),"syn"=>strval($row[8]),"vcount"=>strval($row[9]),"icount"=>strval($row[10]),"acount"=>strval($row[11]),"lcount"=>strval($row[12]),"explain"=>strval($row[13]),"vexcount"=>strval($row[14]) );

}
 echo json_encode($rr);

}
/////////////////////////////////////////////////////////////
function ArrangeFiles($ddd,$xt)
{
$dd=getcwd().$ddd;
$ff=array();

$i=0;

if(is_dir($dd)) { 
foreach(glob($dd.'*'.$xt) as $filename){    $ff[$i]=$filename;$i++; }
for($j=0;$j<$i;$j++)  if(!file_exists($dd.($j+1).$xt)){ copy($ff[$j],$dd.($j+1).$xt); unlink($ff[$j]); }
	  }
}
/////////////////////////////////////////////////////////////////////////////
function recursiveRemoveDirectory($directory)
{
    foreach(glob("{$directory}/*") as $file)
    {
        if(is_dir($file)) { 
            recursiveRemoveDirectory($file);
        } else {
            unlink($file);
        }
    }
    rmdir($directory);
}
///////////////////////////////////////////////////////////////////////////////////
function WriteJson($pp)
{
$rr=array();

$sql="SELECT `lang`,`dialect`,`word_type`,`subject`, `country`, `governate`, `region`,`major`,`synonym_ids`, `video_count`, `image_count`, `audio_count` , `lipsing _count` ,`the_word`, `wcode`,`explain`, `vexcount` FROM `oneword` WHERE `country`='".$pp->cntry."' AND `governate`='".$pp->gvrn."' AND `region`='".$pp->gvrn."' AND `lang`='".$pp->lang."'" ;

include "db_config.php"; 
$result = mysqli_query($con,$sql);
$i=0;
if (file_exists(getcwd()."\\..\\downloads\\dic.js")) unlink(getcwd()."\\..\\downloads\\dic.js");
$myfile = fopen(getcwd()."\\..\\downloads\\dic.js", "w") ;
$txt = ' var Diction = { "words": ['.PHP_EOL;
fwrite($myfile, $txt);
while($row = $result->fetch_row())	
{

$txt='{ "lang":"'.$row[0].'", "dialect":"'.$row[1].'", "word":"'.$row[13].'", "type":"'.$row[2].'", "subject":"'.$row[3].'", "synonym":"'.$row[8].'", "major":"'.$row[7].'", "country":"'.$row[4].'", "governate":"'.$row[5].'", "region":"'.$row[6].'", "wcode":"'.$row[14].'", "video_count":"'.$row[9].'", "image_count":"'.$row[10].'", "audio_count":"'.$row[11].'", "lipsing_count":"'.$row[12].'","explain":"'.$row[15].'","explain_video":"'.$row[16].'"}'.PHP_EOL;
if($i>0) $txt=','.$txt;
fwrite($myfile, $txt);
$i++;
}
$txt="]}".PHP_EOL;
fwrite($myfile, $txt);
fclose($myfile);
if (file_exists(getcwd()."\\..\\downloads\\dic.zip")) unlink(getcwd()."\\..\\downloads\\dic.zip");
$zip = new ZipArchive();
$filename =getcwd()."\\..\\downloads\\dic.zip";
if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
    exit("cannot open <$filename>\n");
}      
	


$zip->addFile(getcwd()."\\..\\downloads\\dic.js","dic.js");
$zip->close(); 
$rr[0]=array("result"=>"done");


 echo json_encode($rr);	
}
//////////////////////////////////////////////////////////////////////////////
function ZipResources()
{
$rootPath = realpath(getcwd()."\\..\\res\\");

// Initialize archive object
$zip = new ZipArchive();
$zip->open(getcwd()."\\..\\downloads\\res.zip", ZipArchive::CREATE | ZipArchive::OVERWRITE);

// Create recursive directory iterator
/** @var SplFileInfo[] $files */
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootPath),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($files as $name => $file)
{
    // Skip directories (they would be added automatically)
    if (!$file->isDir())
    {
        // Get real and relative path for current file
        $filePath = $file->getRealPath();
        $relativePath = substr($filePath, strlen($rootPath) + 1);

        // Add current file to archive
        $zip->addFile($filePath, $relativePath);
    }
}

// Zip archive will be created only after closing object
$zip->close();
$rr=array();
$rr[0]=array("result"=>"done");


 echo json_encode($rr);	
}

//////////////////////////////////////////////////////////////////////////////////
function WithoutAccent($str)
 {
     $sss =  str_split_php4_utf8($str);
     $ss = "";
     for ($i = 0; $i < count($sss); $i++) {
         if ($sss[$i] != 'َ' && $sss[$i] != 'ً' && $sss[$i] != 'ُ' && $sss[$i] != 'ٌ' && $sss[$i] != 'ِ' && $sss[$i] != 'ٍ' && $sss[$i] != 'ّ' && $sss[$i] != 'ْ' ) { $ss = $ss.$sss[$i]; }
     }
     return $ss;
 }
 
//////////////////////////////////////////////////////////////////////////////////
function WithoutHamza($str) {
     $ss = str_replace("أ", "ا",$str);
     $sss = str_replace("إ", "ا",$ss);
     $ssss = str_replace("آ", "ا",$sss);
     $sssss = str_replace("ى", "ي",$ssss);
         
     return $sssss;
 }
/////////////////////////////////////////////////////////////////////////////////////
function UpdateDB()
{
	$sql="SELECT `ID`,`the_word` FROM `words`";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	While ($row = $result->fetch_row())	
{
	$sql="UPDATE `words` SET `the_word`='".WithoutHamza(WithoutAccent(strval($row[1])))."' WHERE `ID`=".$row[0];
	
	$res = mysqli_query($con,$sql);
	$i++;
}
	$rr=array();
   $rr[0]=array("result"=>"done ".$i);


  echo json_encode($rr);	
}
////////////////////////////////////////////////////////////////////////////////////
function UpdateDrevs()
{
	$sql="SELECT `ID`,`drev` FROM `drevsx`";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	While ($row = $result->fetch_row())	
{
	$sql="UPDATE `drevsx` SET `drev`='".WithoutHamza(WithoutAccent(strval($row[1])))."' WHERE `ID`=".$row[0];
	
	$res = mysqli_query($con,$sql);
	$i++;
}
	$rr=array();
   $rr[0]=array("result"=>"done ".$i);


  echo json_encode($rr);	
}
///////////////////////////////////////////////////////////////////////
function str_split_php4_utf8($str) {
    // place each character of the string into and array
    $split=1;
    $array = array();
    for ( $i=0; $i < strlen( $str ); ){
        $value = ord($str[$i]);
        if($value > 127){
            if($value >= 192 && $value <= 223)
                $split=2;
            elseif($value >= 224 && $value <= 239)
                $split=3;
            elseif($value >= 240 && $value <= 247)
                $split=4;
        }else{
            $split=1;
        }
            $key = NULL;
        for ( $j = 0; $j < $split; $j++, $i++ ) {
            $key .= $str[$i];
        }
        array_push( $array, $key );
    }
    return $array;
}

?>