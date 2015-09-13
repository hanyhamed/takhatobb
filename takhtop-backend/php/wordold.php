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
case 1:GetWords();break;
case 2:InsertWord($param);break;
case 3:UpdateWord($param);break;
case 4:GetWordInfo($param);break;
case 5: DelWord($param);break;

}




function GetWords()
{
	$sql="SELECT `the_word` FROM `oneword`";
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
	$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`) VALUES('";
	$ss=$pp->lang."','".$pp->dialect."','".$pp->word."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',".$pp->vcount.",'".$pp->syn."',".$pp->lcount.",".$pp->acount.",'".$pp->region."','".$pp->wcode."',".$pp->icount.")";
	$sql=$sql.$ss;
	
	$result = mysqli_query($con,$sql);
if($pp->syn!="") {
	
	if(strpos(strval($pp->syn),"~") !== false) { 
		$wds=explode("~",strval($pp->syn));
		$wdcode=explode("~",strval($pp->syncode));
		for($i=0;$i<count($wds);$i++)
		{
			$newsyn=$pp->syn;
			
		$newsyn=str_replace($wds[$i],$pp->word,$newsyn);
		
		$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`) VALUES('";
		$ss=$pp->lang."','".$pp->dialect."','".$wds[$i]."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',".$pp->vcount.",'".$newsyn."',".$pp->lcount.",".$pp->acount.",'".$pp->region."','".$wdcode[$i]."',".$pp->icount.")";
		$sql=$sql.$ss;
	
		$result = mysqli_query($con,$sql);
	cpy(getcwd()."\\..\\res\\video\\".$pp->wcode,getcwd()."\\..\\res\\video\\".$wdcode[$i]);
	ArrangeFiles("\\..\\res\\video\\".$wdcode[$i]."\\",".webm");
	cpy(getcwd()."\\..\\res\\images\\".$pp->wcode,getcwd()."\\..\\res\\images\\".$wdcode[$i]);
	ArrangeFiles("\\..\\res\\images\\".$wdcode[$i]."\\",".webm");
	cpy(getcwd()."\\..\\res\\audio\\".$pp->wcode,getcwd()."\\..\\res\\audio\\".$wdcode[$i]);
	ArrangeFiles("\\..\\res\\audio\\".$wdcode[$i]."\\",".webm");
	cpy(getcwd()."\\..\\res\\lipsing\\".$pp->wcode,getcwd()."\\..\\res\\lipsing\\".$wdcode[$i]);
	ArrangeFiles("\\..\\res\\lipsing\\".$wdcode[$i]."\\",".webm");
			}
		}	
	else {
		;
		
	$sql="INSERT INTO `oneword`(`lang`, `dialect`, `the_word`, `word_type`, `subject`, `major`, `country`, `governate`, `video_count`, `synonym_ids`, `lipsing _count`, `audio_count`, `region`, `wcode`, `image_count`) VALUES('";
	$ss=$pp->lang."','".$pp->dialect."','".$pp->syn."','".$pp->wtype."','".$pp->subject."','".$pp->major."','".$pp->cntry."','".$pp->gvrn."',".$pp->vcount.",'".$pp->word."',".$pp->lcount.",".$pp->acount.",'".$pp->region."','".$pp->syncode."',".$pp->icount.")";
	$sql=$sql.$ss;
	cpy(getcwd()."\\..\\res\\video\\".$pp->wcode,getcwd()."\\..\\res\\video\\".$pp->syncode);
	ArrangeFiles("\\..\\res\\video\\".$pp->syncode."\\",".webm");
	cpy(getcwd()."\\..\\res\\images\\".$pp->wcode,getcwd()."\\..\\res\\images\\".$pp->syncode);
	ArrangeFiles("\\..\\res\\images\\".$pp->syncode."\\",".webm");
	cpy(getcwd()."\\..\\res\\audio\\".$pp->wcode,getcwd()."\\..\\res\\audio\\".$pp->syncode);
	ArrangeFiles("\\..\\res\\audio\\".$pp->syncode."\\",".webm");
	cpy(getcwd()."\\..\\res\\lipsing\\".$pp->wcode,getcwd()."\\..\\res\\lipsing\\".$pp->syncode);
	ArrangeFiles("\\..\\res\\lipsing\\".$pp->syncode."\\",".webm");

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
		$sql="DELETE FROM `oneword` WHERE  `the_word`='".$pp->word."'";
        $result = mysqli_query($con,$sql);
		
	}

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
	$sss=",`audio_count`=".$pp->acount.",`region`='".$pp->region."',`wcode`='".$pp->wcode."',`image_count`=".$pp->icount;
	$sql=$sql.$ss.$sss;
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////
function GetWordInfo($pp)
{
$sql="SELECT `lang`,`dialect`,`word_type`,`subject`, `country`, `governate`, `region`,`major`,`synonym_ids`, `video_count`, `image_count`, `audio_count` , `lipsing _count` FROM `oneword` WHERE `the_word`='".$pp->word."'";
$rr=array();
include "db_config.php"; 
$result = mysqli_query($con,$sql);
if($row = $result->fetch_row())	
{
$rr[0]=array("lang"=>strval($row[0]),"dialect"=>strval($row[1]),"wtype"=>strval($row[2]),"subject"=>strval($row[3]),"cntry"=>strval($row[4]),"gvrn"=>strval($row[5]),"region"=>strval($row[6]),"major"=>strval($row[7]),"syn"=>strval($row[8]),"vcount"=>strval($row[9]),"icount"=>strval($row[10]),"acount"=>strval($row[11]),"lcount"=>strval($row[12]) );

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
///////////////////////////////////////////////////////////////////////////////////////
function cpy($source, $dest){
    if(is_dir($source)) {
        $dir_handle=opendir($source);
        while($file=readdir($dir_handle)){
            if($file!="." && $file!=".."){
                if(is_dir($source."/".$file)){
                    if(!is_dir($dest."/".$file)){
                        mkdir($dest."/".$file);
                    }
                    cpy($source."/".$file, $dest."/".$file);
                } else {
                    copy($source."/".$file, $dest."/".$file);
                }
            }
        }
        closedir($dir_handle);
    } else {
        copy($source, $dest);
    }
}
?>