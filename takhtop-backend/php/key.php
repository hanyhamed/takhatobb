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
case 1:GetUsers();break;
case 2:InsertUser($param);break;
case 3:UpdateUser($param);break;
case 4:GetUserInfo($param);break;
case 5: DelUser($param);break;

}




function GetUsers()
{
	$sql="SELECT `user_name` FROM `keys` WHERE 1";
	$rr=array();
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while ($row = $result->fetch_row())
	{
	
	$rr[$i]=array("user"=>strval($row[0]));
	$i++;
	}
	if($i==0) $rr[0]=array("user"=>"لا يوجد");
	
	 echo json_encode($rr);
}
//////////////////////////////////////////////////////////////////////////////
function IsUserFound($pp)
{
	$sql="SELECT Count(`ID`) FROM `keys` WHERE `user_name`='".$pp->uname."'";
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
function InsertUser($pp)
{
	$uu=0;
$rr=array();
if(IsUserFound($pp)) $rr[0]=array("result"=>"هذا المستخدم موجودة بالفعل" );
else {
	include "db_config.php"; 
	$sql="INSERT INTO `keys`(`user_name`, `phone`, `email`,  `expiration`, `company`) VALUES('";
	$ss=$pp->uname."','".$pp->phone."','".$pp->email."','".$pp->expdate."','".$pp->company."')";
	$sql=$sql.$ss;
	
	$result = mysqli_query($con,$sql);
	$sql="SELECT `ID` FROM `keys` WHERE `user_name`='".$pp->uname."'";
	$result = mysqli_query($con,$sql);
	if ($row = $result->fetch_row())
		 {
			 $uu=$row[0];
		 }
	$sql="UPDATE `keys` SET `user_key`='".sha1(strval($uu))."' WHERE `user_name`='".$pp->uname."'";
    $result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم إضافة المستخدم بنجاح" );
}


 echo json_encode($rr);
}
////////////////////////////////////////////////////////////////////////
function DelUser($pp)
{
	$rr=array();
	include "db_config.php"; 
			$sql="DELETE FROM `keys` WHERE `user_name`='".$pp->uname."'";
            $result = mysqli_query($con,$sql);
		
$rr[0]=array("result"=>"تم حذف المستخدم بنجاح" );
 echo json_encode($rr);
	
}
///////////////////////////////////////////////////////////////////////////
function UpdateUser($pp)
{
	$rr=array();
	include "db_config.php"; 
	
	$sql="UPDATE `keys` SET `user_name`='".$pp->uname."',"." `phone`='".$pp->phone."',"." `email`='".$pp->email."',"." `user_key`='".$pp->key."',"." `expiration`='".$pp->expdate."', `company`='".$pp->company."' WHERE `user_name`='".$pp->olduname."'";		

	$result = mysqli_query($con,$sql);
	$rr[0]=array("result"=>"تم التعديل بنجاح" );
 echo json_encode($rr);

}
////////////////////////////////////////////////////////////////////////
function GetUserInfo($pp)
{
$sql="SELECT `user_name`,`phone`,`user_key`,`expiration`,`company`, `email` FROM `keys` WHERE `user_name`='".$pp->uname."'";
$rr=array();
include "db_config.php"; 
$result = mysqli_query($con,$sql);
if($row = $result->fetch_row())	
{
$rr[0]=array("uname"=>strval($row[0]),"phone"=>strval($row[1]),"key"=>strval($row[2]),"expdate"=>strval($row[3]),"company"=>strval($row[4]),"email"=>strval($row[5]));

}
 echo json_encode($rr);

}

?>