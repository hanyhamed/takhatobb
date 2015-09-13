<?php

header('Content-Type: text/html; charset=utf-8');/// set the content charset to utf-8 for php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();


$phrase= $_REQUEST["phrase"];
$key=$_REQUEST["key"];

if(IsValidKey($key)){
$ww=GetwordInfo($phrase);

echo json_encode($ww);
}
//
///////////////////////////////////////////////////////////////////////
//echo "<!doctype html>";
//echo '<html lang="ar">';
//echo "<head>";
//echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>';
//echo "<title>Untitled Document</title>";
//echo "</head>";
//echo '<body>';
//echo "Start";
//$ww=GetwordInfo("مدرس مزار شبشب");
//echo var_dump($ww);
//echo(json_encode($ww));
//for ($i=0;$i<count($ww["words"]);$i++)
//{
//	echo $ww["words"][$i]["word"]."<br>";
//	echo $ww["words"][$i]["status"]."<br>";
//	echo $ww["words"][$i]["alternates"][0]."<br>";
//}
//echo "</body>";
//echo "</html>";


function FoundInDic($word)
{
	$sql="SELECT COUNT(`ID`) FROM `oneword` WHERE `the_word`='".$word."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$rr=false;
	if($row = $result->fetch_row())	
	{
		if(intval($row[0])>0) $rr=true;
	}

	return $rr;
}
////////////////////////////////////////////////////////////////////////////////
function FoundInDicX($word)
{
	$sql="SELECT COUNT(`ID`) FROM `words` WHERE `the_word`='". WithoutHamza(WithoutAccent($word))."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$rr=false;
	if($row = $result->fetch_row())	
	{
		if(intval($row[0])>0) $rr=true;
	}

	return $rr;
}
///////////////////////////////////////////////////////////////////////
function FoundInDeriv($word)
{
	$sql="SELECT COUNT(`ID`) FROM `drevsx` WHERE `drev`='".WithoutHamza(WithoutAccent($word))."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$rr=false;
	if($row = $result->fetch_row())	
	{
		if(intval($row[0])>0) $rr=true;
	}

	return $rr;
}
///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function VerbInDIC($word)
{
	$sql="SELECT COUNT(`ID`) FROM `words` WHERE `the_word`='". WithoutHamza(WithoutAccent($word))."' AND `subject`='أفعال شائعة'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$rr=false;
	if($row = $result->fetch_row())	
	{
		if(intval($row[0])>0) $rr=true;
	}
if($rr) {
	
	 }
	return $rr;
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
function ReturnDeriv($str)
{
$dd=array();
$flag=false;
$k=0;
$dname="";

	$sql="SELECT COUNT(`ID`) FROM `drevsx` WHERE `drev`='".WithoutHamza(WithoutAccent($str))."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);

	if($row = $result->fetch_row())	
	{
		if(intval($row[0])>0) $flag=true;
	}
	
	if ($flag)
{
	$sql="SELECT `drev_name`, `verb` FROM `drevsx` WHERE `drev`='".WithoutHamza(WithoutAccent($str))."'";
    $result = mysqli_query($con,$sql);
	if($row = $result->fetch_row())	
	{


	switch($row[0])
	{
		case "اسم فاعل مزيد":array_push($dd,$row[1]); break;
		case "مصدر مزيد":array_push($dd,$row[1]);break;
		case "اسم فاعل مجرد":array_push($dd,$row[1]); break;
		case "مصدر مجرد":array_push($dd,$row[1]); break;
		case "صفة منسوبة":array_push($dd,$row[1]); break;
		case "مصدر مجرد":array_push($dd,$row[1]); break;
		case "صيغة مبالغة":array_push($dd,$row[1],"دوماً");break;
		case "اسم تفضيل":array_push($dd,$row[1],"أكثرً");break;
        case "فعل ماض مزيد مجهول": array_push($dd,"الماضي",$row[1]);break;
        case "فعل ماض مجرد مجهول": array_push($dd,"الماضي",$row[1]);break;
        case "فعل مضارع مزيد مجهول": array_push($dd,"الآن",$row[1]);break;
        case "فعل مضارع مجرد مجهول": array_push($dd,"الآن",$row[1]);break;
        case "اسم مفعول مزيد": array_push($dd,"شئ","حدوث",$row[1]);break;
        case "اسم مفعول مجرد":array_push($dd,"شئ","حدوث",$row[1]);break;
        case "اسم مرة مجرد":array_push($dd,$row[1],"مرة");break;
        case "اسم مرة مزيد":array_push($dd,$row[1],"مرة");break;
        case "اسم آلة": array_push($dd,"ماكينة","صنع",$row[1]);break;
        case "اسم مكان مزيد": array_push($dd,"مكان","حدوث",$row[1]);break;
        case "اسم مكان مجرد": array_push($dd,"مكان","حدوث",$row[1]);break;
		case "اسم زمان مجرد": array_push($dd,"زمان","حدوث",$row[1]);break;
        case "اسم زمان مزيد": array_push($dd,"زمان","حدوث",$row[1]);break;
        case "ظرف مكان":array_push($dd,"مكان",$row[1]);break;
        case "ظرف زمان":  array_push($dd,"زمان",$row[1]);break;
 
	}
	}
}
return $dd;
}
////////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////
function SearchInDic($str, $prevword)
{
$words=array();
$flag=false;
$doneflag=false;
$femaleflag=false;
$pluflag = false;
$twoflag=false;
$adjflag=false;
$str=Withoutquot($str);
$ssss="";
$sss=$str;
$cc="";
$ss =substr($str,0, 2);


if ($ss == "ال") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2) ;$flag=FoundInDic($sss);};

if ($flag==true) {array_push($words,$sss);}

if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ب") { $doneflag=true;$sss = substr($str,1, strlen($str) - 1);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"في");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ف") { $doneflag=true; $sss = substr($str,1, strlen($str) - 1) ;$flag=FoundInDic($sss);};

if ($flag==true) {array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ل") {$doneflag=true; $sss = substr($str,1, strlen($str) - 1);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"إلى");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 3);
if ($ss == "بال") { $doneflag=true;$sss = substr($str,3, strlen($str) - 3);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"في");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "لل") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"إلى");array_push($words,$sss);}
}

if ($flag==false && $doneflag==true)
{
$doneflag=false;
//$sss=str; 
$ssss=str; 
$ss=substr($sss,strlen($sss)-3,3);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-2,2);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-1,1);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 1); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };

$flag=FoundInDic($ssss);
if($flag) if(GetWordCat($ssss)=="أفعال شائعة") {$twoflag=false;$pluflag=false;$femaleflag=false;array_push($words,"الماضى");}
if ($flag==true){array_push($words,$ssss);$adjflag=isAdj($ssss); if ($adjflag==true) { $femaleflag =false; $pluflag=false;$twoflag=false;$ownflag=false;}}

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-1,1); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-2,2);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-3,3);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}



if ($flag==false)
{
$doneflag=false;
$sss=str; 
$ssss=str; 
$ss=substr($sss,strlen($sss)-3,3);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-2,2);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-1,1);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 1); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };

$flag=FoundInDic($ssss);
if($flag) if(GetWordCat($ssss)=="أفعال شائعة") {$twoflag=false;$pluflag=false;array_push($words,"الماضى");}
if ($flag==true){array_push($words,$ssss);$adjflag=isAdj($ssss); if ($adjflag==true) { $femaleflag =false; $pluflag=false;$twoflag=false;$ownflag=false;}}

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-1,1); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-2,2);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-3,3);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}

 
if ($flag==false) 
{
$doneflag=false;
$sss=str;
$ss=substr($str,strlen($str)-1,1);
if ($ss=="ت"){$sss=substr($str,0,strlen($str)-1);};
$ss=substr($str,strlen($str)-2,2);
if ($ss=="وا"  ){$sss=substr($str,0,strlen($str)-2);$doneflag=true;};
if ($ss=="ون" ){$sss=substr($str,0,strlen($str)-2);$doneflag=true;};
if ($ss=="تي" ){$sss=substr($str,0,strlen($str)-2);};
if ($ss == "ان") { $sss = substr($str,0, strlen($str) - 2); $doneflag = true; }
if ($ss == "تا") { $sss = substr($str,0, strlen($str) - 2); $doneflag = true; }
$ss=substr($str,strlen($str)-1,1);
if (($ss=="ن") && ($doneflag == false) ){$sss=substr($str,0,strlen($str)-1);};
if (($ss=="ا") && ($doneflag == false) ){$sss=substr($str,0,strlen($str)-1);};


if ($flag==false && $doneflag == true) {$tempo=VerbInDIC(WithoutAccent($sss));if ($tempo!=""){$flag=true; array_push($words,"الماضى"); array_push($words,$tempo);}}
//$flag = FoundInDic(WithoutAccent($sss));
//if ($flag == true) {   array_push($words,$sss); }
}

if ($flag == false) 
{
    $doneflag = false ;
    $ss = substr($sss,0, 1);
    if ($ss == "أ") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
    if ($ss == "ن") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
    if ($ss == "ت") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
    if ($ss == "ي") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
	if ($ss == "ا") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
	if ($ss == "إ") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };

if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) { $tempo=VerbInDIC(WithoutAccent($ssss)); if ($tempo!="") {$flag=true;array_push($words,"الآن"); array_push($words,$ssss); } }
if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) {$ttt="أ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) {$ttt="ا"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
	

if ($flag==false && $doneflag == true  && ($ss=="أ" || $ss=="ا") ) { $flag = FoundInDic($ssss); if ($flag == true) {array_push($words,"أمر"); array_push($words,$ssss); } }
if ($flag==false && $doneflag == true  && ($ss=="أ" || $ss=="ا")) { $tempo=VerbInDIC(WithoutAccent($ssss)); if ($tempo!="") {$flag=true;array_push($words,"أمر"); array_push($words,$ssss); } }

$ll= substr($ssss,strlen($ssss) - 1, 1);
if($flag==false && $doneflag == true  && ($ss=="ا" || $ss=="إ") && $ll=="ْ")
	    {
			$tttt=substr($ssss,strlen($ssss) - 1);
			
			$tempo=VerbInDIC(WithoutAccent($tttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }
			if ($flag==false && $doneflag == true) {$ttt="أ"+$tttt; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   		if ($flag==false && $doneflag == true) {$ttt="ا"+$tttt;  $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   		if ($flag==false && $doneflag == true) {$ttt="إ"+$tttt;  $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   
				   }
				   
//if ($flag==false && $doneflag == true) { $flag = FoundInDic($ssss); if ($flag == true) {array_push($words,"الآن"); array_push($words,$ssss); } }
if ($flag==false && $doneflag == true) {$tempo=VerbInDIC(WithoutAccent($ssss)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }

if ($flag==false && $doneflag == true) {if(substr($ssss,0, 1)=="ؤ"){$ttt=str_replace("ؤ","أ",$ssss); $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="أ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="ا"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="إ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}

}

}
if ($flag == false) { $ssss =  $sss; $flag = FoundInDic($ssss); if ($flag == true) {if(GetWordCat($ssss)=="أفعال شائعة") array_push($words,"الماضى");  array_push($words,$ssss); }}
if ($flag==false ) {$tempo=VerbInDIC(WithoutAccent($sss)); if ($tempo!="") {$flag=true;  array_push($words,"الماضى");  array_push($words,$tempo); }
}
if ($flag == false) {
    $doneflag = false;
    $ss = substr($sss,0, 2);
    if ($ss == "سن") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "سأ") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "سي") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "ست") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($doneflag == true) { $ssss = $ssss; $flag = FoundInDic($ssss); if ($flag == true) { array_push($words,"القادم"); array_push($words,$ssss); } }
	if ($flag==false && $doneflag == true) {if(substr($ssss,0, 1)=="ؤ"){$ttt=str_replace("ؤ","أ",$ssss); $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;   array_push($words,"القادم"); array_push($words,$tempo); }}}
  	if ($flag==false && $doneflag == true) {$ttt="أ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}
    if ($flag==false && $doneflag == true) {$ttt="ا"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}
    if ($flag==false && $doneflag == true) {$ttt="إ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}


if ($flag==false && $doneflag == true) {$tempo=VerbInDIC(WithoutAccent($ssss)); if ($tempo!="") {$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }
}
}
if ($flag == false) {
    $doneflag = false;
	  $ss = substr($sss,0, 1);
	   if ($ss == "ا" || $ss=="إ") { $ssss = substr($sss,1, strlen($str) - 1); $doneflag = true; };
	   if(!$doneflag)
	    {
			 $ss = substr($sss,0, 2);
			  if ($ss == "لت") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
	   }
	     if(!$doneflag)
	    {
			 $ss = substr($sss,0, 3);
			  if ($ss == "فلت") { $ssss = substr($sss,3, strlen($str) - 3); $doneflag = true; };
			  
	   }
	   if ($doneflag == true) { $ssss =  $ssss; $flag = FoundInDic($ssss); if ($flag == true) { array_push($words,"أمر"); array_push($words,$ssss); } }
	   if ($flag==false && $doneflag == true) {$tempo=VerbInDIC(WithoutAccent($ssss)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }

	   if ($flag==false && $doneflag == true) {$ttt="أ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   if ($flag==false && $doneflag == true) {$ttt="ا"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   if ($flag==false && $doneflag == true) {$ttt="إ"+$ssss; $tempo=VerbInDIC(WithoutAccent($ttt)); if ($tempo!="") {$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
}


	   
} 

if ($flag==false) {$tempo=VerbInDIC(WithoutAccent($sss));if ($tempo!=""){$flag=true; array_push($words,"الماضى"); array_push($words,$tempo);}}
if ($flag==false) {$tempo=VerbInDIC(WithoutHamza(WithoutAccent($sss)));if ($tempo!=""){$flag=true; array_push($words,"الماضى"); array_push($words,$tempo);}}
if ($flag==false) {$ttt="ا"+$sss;  $tempo=VerbInDIC(WithoutAccent($ttt));if ($tempo!=""){$flag=true; array_push($words,"أمر"); array_push($words,$tempo);}}
if ($flag==false) {$ttt="أ"+$sss;  $tempo=VerbInDIC(WithoutAccent($ttt));if ($tempo!=""){$flag=true; array_push($words,"أمر"); array_push($words,$tempo);}}
if ($flag==false) $words=SearchInDeriv(str);
if (strlen(words)==0) {$flag=false;array_push($words,str);}

return words;
}

//////////////////////////////////////////////////////////////////////////////////////

function SearchInDeriv($str)
{
$words=array();
$flag=false;
$doneflag=false;
$femaleflag=false;
$pluflag = false;
$twoflag=false;
$adjflag=false;
$ownflag=false;
$str=Withoutquot($str);
$ssss="";
$sss=$str;
$cc="";
$ss = substr($str,0, 2);
$dd=array();
$flag=FoundInDeriv($sss);
if ($flag==true) {$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}

if ($flag==false ) {
if ($ss == "ال") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2) ;$flag=FoundInDeriv($sss);};

if ($flag==true) {$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}
if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ب") { $doneflag=true;$sss = substr($str,1, strlen($str) - 1);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"في");$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}

if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ف") { $doneflag=true; $sss = substr($str,1, strlen($str) - 1) ;$flag=FoundInDeriv($sss);};

if ($flag==true) {$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}

if ($flag==false ) {
$ss = substr($str,0, 1);
if ($ss == "ل") {$doneflag=true; $sss = substr($str,1, strlen($str) - 1);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"إلى");$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}

if ($flag==false ) {
$ss = substr($str,0, 3);
if ($ss == "بال") { $doneflag=true;$sss = substr($str,3, strlen($str) - 3);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"في");$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "لل") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"إلى");$dd=ReturnDeriv($sss); $words= array_push($words,$dd);}
}

if ($flag==false && $doneflag==true)
{
$doneflag=false;
//$sss=$str; 
$ssss=$str; 
$ss=substr($sss,strlen($sss)-3,3);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-3);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-2,2);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-2);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-2);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-1,1);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 1); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 1); $ownflag = true; };

$flag=FoundInDeriv($ssss);
if($flag) if(GetWordCat($ssss)=="أفعال شائعة") {$twoflag=false;$pluflag=false;$femaleflag=false;array_push($words,"الماضى");}
if ($flag==true){$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);$adjflag=isAdj($ssss); if ($adjflag==true) { $femaleflag =false; $pluflag=false;$twoflag=false;$ownflag=false;}}

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-1,1); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-1); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-2,2);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-3,3);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-3); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-3)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4)+"ة";$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-4);$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); $words= array_push($words,$dd);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}


for($i=0;i<count($words);$i++) $words[$i]=FindInDic($words[$i]);
if ($flag==false){array_push($words,$str);}
return $words;

}

function GetWordCat($wordstr) 
     {
		 	$sql="SELECT `subject` FROM `words` WHERE `the_word`='".$wordstr."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$rr="";
	if($row = $result->fetch_row())	
	{
	$rr=$row[0];
	}
return $rr;
	 }
	 
////////////////////////////////////////////////////////////////////////////////////////
function isAdj($str)
{
 $sss= GetWordCat($str);
if ($sss=="صفات") {return true;} else {return false;}

         
}
//////////////////////////////////////////////////////////////////
function Noquots($str)
 {
     $ss=str_replace($str,".","");
     $ss=str_replace($ss,"ـ","");
     $ss=str_replace($ss,"،","");
     $ss=str_replace($ss,"!","");
     $ss=str_replace($ss,"؟",""); 
     $ss=str_replace($ss,"(","");
     $ss=str_replace($ss,")","");
     $ss=str_replace($ss,"'","");
     $ss=str_replace($ss,'"','');
	 $ss=str_replace($ss,'،','');
	 $ss=str_replace($ss,'؛','');
	 $ss=str_replace($ss,':','');
     return trim($ss);
 }    
 //////////////////////////////////////////////////////////////////////
 
/////////////////////////////////////

function SearchExprssions($phrase)
{
$str=array();

if(strpos($phrase," ") !== false) $str = explode(" ", $phrase);
else array_push($str,$phrase);

$sss=array();

$ss="";


for($k=2; $k<=count($str);$k++)
{

for($i=0;$i<=(count($str) - $k);$i++)
{

$ss="";

for ($j=$i; $j<($i+$k);$j++) {$ss=$ss." ".$str[$j];}
$ss=trim($ss);
array_push($sss,Noquots($ss));


}
}

$temp="";
$vvv=Noquots($phrase);
$expr=array();

for ($i=0; $i<count($sss); $i++) {if (FoundInDic($sss[$i])){array_push($expr,$sss[$i]); }} 
if (count($expr)>0) 
{ 
for ($i=0; $i < count($expr);  $i++ ) {$temp="~".$i; $vvv= str_replace($vvv,$expr[$i],$temp);}
                             
$estr=explode(" ",$vvv);
$j=0;
for($k=0;$k<count($expr);$k++)
for ($i=0; $i< count($estr);$i++){$temp="~".$j; if ($estr[$i]==$temp) { $estr[$i]=$expr[$j];$j++;}     }

return $estr;

}                                     
else return $str;
}
//////////////////////////////////////////////////////////////////////
function ReturnSimilars($wrd)
{
	$sim=array();
	$sql="SELECT `ID` FROM `words` WHERE `the_word`='".$wrd."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	while($row = $result->fetch_row())
	{
		$sql="SELECT `the_word`  FROM `oneword` WHERE`ID`=".$row[0];
		$res=	$result = mysqli_query($con,$sql);
		if($rr = $res->fetch_row()){$sim[$i]=strval($rr[0]);$i++;};
	
		}
		return $sim;
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function ReturnSimilarDrevs($wrd)
{
	$sim=array();
	$sql="SELECT `ID` FROM `drevsx` WHERE `drev`='".$wrd."'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
		$i=0;
	while($row = $result->fetch_row())
	{
		$sql="SELECT `drev`  FROM `drevs` WHERE`ID`=".$row[0];
		$res=	$result = mysqli_query($con,$sql);
		if($rr = $res->fetch_row()){$sim[$i]=strval($rr[0]);$i++;}

	
		}
		return $sim;
}
//////////////////////////////////////////////////////////////////////////////

function hasAccent($str)
{
      $sss = str_split_php4_utf8($str);
      $ss = "";
     $flag=false; 
     for ($i = 0; $i < count($sss); $i++) {
         if ($sss[$i] == "َ" || $sss[$i] == "ً" || $sss[$i] == "ُ" || $sss[$i] == "ٌ" || $sss[$i] == "ِ" || $sss[$i] == "ٍ" || $sss[$i] == "ّ" || $sss[$i] == "ْ" ) { $flag=true; }
     
}
     return $flag;

}

///////////////////////////////////////////////////////////////////////////////////////////
function FindSimilar($str) {
   $cc="";  
   $ts="";
   $ssss = "";
  // $dicword = array();
  $simword = array();
    $ss = WithoutAccent($str);
   $sss = WithoutHamza($ss);
   $doneflag=false;
   $df=false;
    $dicword=ReturnSimilars( $sss);
      if (count($dicword)>0) {$simword=$dicword; $df=true ;}
        
        
         $cc=substr($sss,0,2);  
        if($df==false){ if (($cc=="ال" ) || ($cc=="لل" )) {$ts=substr($sss,2,strlen($sss)-2); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           
	
        
         $cc=substr($sss,0,1);  
        if($df==false){ if (($cc=="ب" ) ||($cc=="ل" )) {$ts=substr($sss,1,strlen($sss)-1); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           

	
         $cc=substr($sss,0,3);  
        if($df==false){ if ($cc=="بال" ) {$ts=substr($sss,3,strlen($sss)-3); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           
	
        
       if($df==false){
        $cc=substr($sss,strlen($sss)-1,1);
	if (($cc=="ه") || ($cc=="ك") || ($cc=="ي") ) {$ts=substr($sss,0,strlen($sss)-1); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

       
	
	if($df==false){        
        $cc=substr($sss,strlen($sss)-2,2);
	if (($cc=="هم") || ($cc=="نا") || ($cc=="ها") || ($cc=="هن")) {$ts=substr($sss,0,strlen($sss)-2); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

	

	if($df==false){        
        $cc=substr($sss,strlen($sss)-3,3);
	if ($cc=="هما") {$ts=substr($sss,0,strlen($sss)-3); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

	if($df==false){        
        $cc=substr($sss,strlen($sss)-2,2);
	if (($cc=="تك") || ($cc=="تي") ||  ($cc=="ته")) {$ts=substr($sss,0,strlen($sss)-2); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 
	if($df==false){        
        $cc=substr($sss,strlen($sss)-3,3);
	if (($cc=="تها") || ($cc=="تنا") || ($cc=="تهم") || ($cc=="تهن") || ($cc=="تكم")) {$ts=substr($sss,0,strlen($sss)-3); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 
	if($df==false){        
        $cc=substr($sss,strlen($sss)-4,4);
	if ($cc=="تهما") {$ts=substr($sss,0,strlen($sss)-4); $dicword=ReturnSimilars($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 



	if(count($simword)==0)
	{
		$dword=FindSimilard($str);
		if(count($dword)>0) $simword=$dword;
	}
  
	if(count($simword)>0 && !in_array($str,$simword)) array_push($simword,$str);
    return $simword;     
 }
 ///////////////////////////////////////////////////////////////////////////
  
function FindSimilard($str) {
   $cc="";  
   $ts="";
   $ssss = "";
   $dicword = array();
   $simword = array();
    $ss = WithoutAccent($str);
   $sss = WithoutHamza($ss);
   $doneflag=false;
   $df=false;
    $dicword=ReturnSimilarDrevs( $sss);
      if (count($dicword)>0) {$simword=$dicword; $df=true ;}
        
        
         $cc=substr($sss,0,2);  
        if($df==false){ if (($cc=="ال" ) || ($cc=="لل" )) {$ts=substr($sss,2,strlen($sss)-2); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           
	
        
         $cc=substr($sss,0,1);  
        if($df==false){ if (($cc=="ب" ) ||($cc=="ل" )) {$ts=substr($sss,1,strlen($sss)-1); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           

	
         $cc=substr($sss,0,3);  
        if($df==false){ if ($cc=="بال" ) {$ts=substr($sss,3,strlen($sss)-3); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$cc.$dicword[$i] ; $simword=$dicword;$df=true;} }} 
           
	
        
       if($df==false){
        $cc=substr($sss,strlen($sss)-1,1);
	if (($cc=="ه") || ($cc=="ك") || ($cc=="ي") ) {$ts=substr($sss,0,strlen($sss)-1); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

       
	
	if($df==false){        
        $cc=substr($sss,strlen($sss)-2,2);
	if (($cc=="هم") || ($cc=="نا") || ($cc=="ها") || ($cc=="هن")) {$ts=substr($sss,0,strlen($sss)-2); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

	

	if($df==false){        
        $cc=substr($sss,strlen($sss)-3,3);
	if ($cc=="هما") {$ts=substr($sss,0,strlen($sss)-3); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

	if($df==false){        
        $cc=substr($sss,strlen($sss)-2,2);
	if (($cc=="تك") || ($cc=="تي") ||  ($cc=="ته")) {$ts=substr($sss,0,strlen($sss)-2); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 
	if($df==false){        
        $cc=substr($sss,strlen($sss)-3,3);
	if (($cc=="تها") || ($cc=="تنا") || ($cc=="تهم") || ($cc=="تهن") || ($cc=="تكم")) {$ts=substr($sss,0,strlen($sss)-3); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 
	if($df==false){        
        $cc=substr($sss,strlen($sss)-4,4);
	if ($cc=="تهما") {$ts=substr($sss,0,strlen($sss)-4); $dicword=ReturnSimilarDrevs($ts);if (count($dicword)>0) {for($i=0;$i<count($dicword);$i++) $dicword[$i]=$dicword[$i].$cc ; $simword=$dicword;$df=true;} }} 

    return $simword;    
	
	 
 }
 //////////////////////////////////////////////////////////////////////////////////
 function GetwordInfo($str)
 {
	  $proto = '{ 

"words":[
   ]}';

     $wordarray = json_decode($proto , true);
     $temp=array();
	 $alter=array();
	 $warr=SearchExprssions($str);
	 for($i=0;$i<count($warr);$i++){
		 $temp['word']=$warr[$i];
		 $alter=FindSimilar($warr[$i]);
		 if(count($alter)>0) $temp['status']="Found";
		 else $temp['status']="Not Found";	
		//$temp["alternates"]=$alter;
		 if(count($alter)>0)
				$temp["alternates"]=$alter;
	     else $temp["alternates"]=array("Not Found");
		 array_push($wordarray["words"],$temp);
		 
		  }
	  
	 return $wordarray;
 }
 //////////////////////////////////////////////////////////////////////
 function IsValidKey($kk)
 {
	 $sql="SELECT Count(`ID`) FROM `keys` WHERE `user_key`='".$kk."'";
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
?>