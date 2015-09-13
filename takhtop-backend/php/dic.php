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
case 1:GetCountries();break;
case 2:Getgovernates($param->country);break;
case 3:GetRegions($param->country,$param->governate);break;
case 4:InsertCountry($param);break;
case 5:InsertGovernate($param);break;
case 6:InsertRegion($param);break;
case 7:DelCountry($param);break;
case 8:DelGovernate($param);break;
case 9:DelRegion($param);break;
case 10:UpdateCountry($param);break;
case 11:UpdateGovernate($param);break;
case 12:UpdateRegion($param);break;
case 13:InsertSubject($param);break;
case 14:DelSubject($param);break;
case 15:UpdateSubject($param);break;
case 16:GetSubjects();break;
case 17:InsertLang($param);break;
case 18:DelLang($param);break;
case 19:UpdateLang($param);break;
case 20:GetLangs();break;
case 21:InsertDialect($param);break;
case 22:DelDialect($param);break;
case 23:UpdateDialect($param);break;
case 24:GetDialects($param->lang);break;
case 25:DelFile($param);break;


}

function DelFile($pp)
{
	$destpath=getcwd()."\\..\\res\\".$pp->fpath;
	if (file_exists($destpath)) unlink($destpath);
	$rr=array();
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
	echo json_encode($rr);
		
}
///////////////////////////////////////////////////////////////////////
function GetCountries()
{
	$sql="SELECT `country` FROM `countries`";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("country"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
//////////////////////////////////////////////////////////////////////
function Getgovernates($cntry)
{
	$sql="SELECT `governate` FROM `governates` WHERE `country`='".$cntry."'";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("governate"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
///////////////////////////////////////////////////////
function GetRegions($cntry,$gvrn)
{
	$sql="SELECT `region` FROM `regions` WHERE `country`='".$cntry."'  AND `governate`='".$gvrn."'";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("region"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
////////////////////////////////////////////////////////////////////
function IsCountryFound($pp)
{
	$sql="SELECT COUNT(`ID`) FROM `countries` WHERE `country`='".$pp->country."'";
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
///////////////////////////////////////////////////////////////////

function IsGovernateFound($pp)
{
	
	$sql="SELECT COUNT(`ID`) FROM `governates` WHERE `country`='".$pp->country."' AND `governate`='".$pp->governate."'";
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
///////////////////////////////////////////////////////////////////
function IsRegionFound($pp)
{
	
	$sql="SELECT COUNT(`ID`) FROM `regions` WHERE `country`='".$pp->country."' AND `governate`='".$pp->governate."' AND `region`='".$pp->region."'";
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
function InsertCountry($pp)
{
$rr=array();
if(IsCountryFound($pp)) $rr[0]=array("result"=>"دولة بنفس الأسم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `countries`(`country`) VALUES('".$pp->country."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة الدولة بنجاح" );
            }
}
 echo json_encode($rr);
}

/////////////////////////////////////////////////////////////
function InsertGovernate($pp)
{
$rr=array();
if(IsGovernateFound($pp)) $rr[0]=array("result"=>"محافظة بنفس الأسم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `governates`(`country`,`governate`) VALUES('".$pp->country."','".$pp->governate."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة المحافظة بنجاح" );
            }
}
 echo json_encode($rr);
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
function InsertRegion($pp)
{
$rr=array();
if(IsRegionFound($pp)) $rr[0]=array("result"=>"منطقة بنفس الأسم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `regions`(`country`,`governate`, `region`) VALUES('".$pp->country."','".$pp->governate."','".$pp->region."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة المنطقة بنجاح" );
            }
}
 echo json_encode($rr);
}
/////////////////////////////////////////////////////////////////////////////////
function DelCountry($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `countries` WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$sql="DELETE FROM `governates` WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$sql="DELETE FROM `regions` WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
//////////////////////////////////////////////////////////////////////////////////////////
function DelGovernate($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `governates` WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."'";
	$result = mysqli_query($con,$sql);
	$sql="DELETE FROM `regions` WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////////////////////////////
function DelRegion($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `regions` WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."' AND `region`='".$pp->region."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function UpdateCountry($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `countries` SET `country`='".$pp->newvalue."' WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$sql="UPDATE `governates` SET `country`='".$pp->newvalue."' WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$sql="UPDATE `regions` SET `country`='".$pp->newvalue."' WHERE `country`='".$pp->country."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
//////////////////////////////////////////////////////////////////////////////////////
function UpdateGovernate($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `governates` SET  `governate`='".$pp->newvalue."' WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."'";
	$result = mysqli_query($con,$sql);
	$sql="UPDATE `regions` SET  `governate`='".$pp->newvalue."' WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateRegion($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `regions` SET `region`='".$pp->newvalue."'  WHERE `country`='".$pp->country."'  AND `governate`='".$pp->governate."' AND `region`='".$pp->region."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function IsSubjectFound($pp)
{
	$sql="SELECT COUNT(`ID`) FROM `subjects` WHERE `subject`='".$pp->subject."'";
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function InsertSubject($pp)
{
$rr=array();
if(IsSubjectFound($pp)) $rr[0]=array("result"=>"موضوع بنفس الأسم موجود بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `subjects`(`subject`) VALUES('".$pp->subject."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة الموضوع بنجاح" );
            }
}
 echo json_encode($rr);
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSubject($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `subjects` SET `subject`='".$pp->newvalue."' WHERE `subject`='".$pp->subject."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
/////////////////////////////////////////////////////////////////////////////////
function DelSubject($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `subjects` WHERE `subject`='".$pp->subject."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
///////////////////////////////////////////////////////////////////////////////////////////////////
function GetSubjects()
{
	$sql="SELECT `subject` FROM `subjects`";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("subject"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function IsLangFound($pp)
{
	$sql="SELECT COUNT(`ID`) FROM `langs` WHERE `lang`='".$pp->lang."'";
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function InsertLang($pp)
{
$rr=array();
if(IsLangFound($pp)) $rr[0]=array("result"=>"لغة بنفس الأسم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `langs`(`lang`) VALUES('".$pp->lang."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة اللغة بنجاح" );
            }
}
 echo json_encode($rr);
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function UpdateLang($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `langs` SET `lang`='".$pp->newvalue."' WHERE `lang`='".$pp->lang."'";
	$result = mysqli_query($con,$sql);
	$sql="UPDATE `dialects` SET `lang`='".$pp->newvalue."' WHERE `lang`='".$pp->lang."'";
	$result = mysqli_query($con,$sql);

	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
/////////////////////////////////////////////////////////////////////////////////
function DelLang($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `langs` WHERE `lang`='".$pp->lang."'";
	$result = mysqli_query($con,$sql);
	$sql="DELETE FROM `dialects` WHERE `lang`='".$pp->lang."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
///////////////////////////////////////////////////////////////////////////////////////////////////
function GetLangs()
{
	$sql="SELECT `lang` FROM `langs`";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("lang"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

function IsDialectFound($pp)
{
	
	$sql="SELECT COUNT(`ID`) FROM `dialects` WHERE `lang`='".$pp->lang."' AND `dialect`='".$pp->dialect."'";
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
///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
function InsertDialect($pp)
{
$rr=array();
if(IsdialectFound($pp)) $rr[0]=array("result"=>"لهجة بنفس الأسم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `dialects`(`lang`,`dialect`) VALUES('".$pp->lang."','".$pp->dialect."')";
	$result = mysqli_query($con,$sql);

  if (!$result) 
            { 
			
			$rr[0]=array("result"=>"Database Error:" . mysqli_error());
             } 
        else 
            {
			$rr[0]=array("result"=>"تم إضافة اللهجة بنجاح" );
            }
}
 echo json_encode($rr);
}
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function DelDialect($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="DELETE FROM `dialects` WHERE `lang`='".$pp->lang."'  AND `dialect`='".$pp->dialect."'";
	$result = mysqli_query($con,$sql);
	$sql="DELETE FROM `regions` WHERE `lang`='".$pp->lang."'  AND `dialect`='".$pp->dialect."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم الحذف بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function UpdateDialect($pp)
{
	$rr=array();
	include "db_config.php"; 
	$sql="UPDATE `dialects` SET  `dialect`='".$pp->newvalue."' WHERE `lang`='".$pp->lang."'  AND `dialect`='".$pp->dialect."'";
	$result = mysqli_query($con,$sql);
	$sql="UPDATE `regions` SET  `dialect`='".$pp->newvalue."' WHERE `lang`='".$pp->lang."'  AND `dialect`='".$pp->dialect."'";
	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////////////////////////////
function GetDialects($lng)
{
	$sql="SELECT `dialect` FROM `dialects` WHERE `lang`='".$lng."'";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("dialect"=>strval($row[0]));
	$i++;
	}
	
	 echo json_encode($rr);
}
///////////////////////////////////////////////////////





?>