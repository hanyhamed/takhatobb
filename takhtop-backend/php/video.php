<?php

header('Content-Type: text/html; charset=utf-8');/// set the content charset to utf-8 for php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
session_start();

$oneword= $_REQUEST["oneword"];
$prevword= $_REQUEST["prevword"];

$vv=GetWordVideo($oneword,$prevword);

echo json_encode($vv);


//echo "<!doctype html>";
//echo '<html lang="ar">';
//echo "<head>";
//echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>';
//echo "<title>Untitled Document</title>";
//echo "</head>";
//echo '<body>';
//echo "Start<br>";
//if(IsValidKey("fawzy")){
//$vv=GetWordVideo("ذهب,الولد,إلى, المدرسة","");
//}
//$ww=IsValidKey("fawzy");
//echo var_dump($vv);
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
///////////////////////////////////////////////////////////////////////////////
function GetVerb($word)
{
	$sql="SELECT `ID`FROM `words` WHERE `the_word`='". WithoutHamza(WithoutAccent($word))."' AND `subject`='أفعال شائعة'";
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$vv="";
	if($row = $result->fetch_row())	
	{
		
              $sql="SELECT  `the_word` FROM `oneword` WHERE `ID`=".$row[0];
               $res = mysqli_query($con,$sql);
                if($rr = $res->fetch_row()) $vv=$rr[0];

	}

	return $vv;
}
//////////////////////////////////////////////////////////////////////////////////
function WithoutAccent($str)
 {
	 $ll=strlen($str);
      $delta=1;
   if(!is_numeric($str)) { $delta=2;}
    $ss = "";
   for( $i=0;$i<$ll;$i+=$delta)
   {

    $sss=substr($str,$i,$delta);
    if ($sss!= 'َ' && $sss != 'ً' && $sss!= 'ُ' && $sss != 'ٌ' && $sss != 'ِ' && $sss != 'ٍ' && $sss != 'ّ' && $sss != 'ْ' ) { $ss = $ss.$sss; }
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
	
    for ( $i=0; $i < strlen($str);$i++ ){
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
function SearchInDic($strr, $prevword)
{
$words=array();
$flag=false;
$doneflag=false;
$femaleflag=false;
$pluflag = false;
$twoflag=false;
$adjflag=false;
$ownflag=false;
$str=Withoutquot($strr);
$ssss="";
$sss=$str;
$cc="";

if(is_numeric($str) ) 
{  $vv =ReadNummber($str); 
for( $i=0;$i<count($vv);$i++) array_push($words,$vv[$i]);
if(count($words)>0) { $flag=true;return $words;}

}
if ($flag==false ) {
$ss =substr($str,0, 4);


if ($ss == "ال") {$doneflag=true; $sss = substr($str,4, strlen($str) - 4) ;$flag=FoundInDic($sss);};

if ($flag==true) {array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ب") { $doneflag=true;$sss = substr($str,2, strlen($str) - 2);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"في");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ف") { $doneflag=true; $sss = substr($str,2, strlen($str) - 2) ;$flag=FoundInDic($sss);};

if ($flag==true) {array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ل") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"إلى");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 6);
if ($ss == "بال") { $doneflag=true;$sss = substr($str,6, strlen($str) - 6);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"في");array_push($words,$sss);}
}

if ($flag==false ) {
$ss = substr($str,0, 4);
if ($ss == "لل") {$doneflag=true; $sss = substr($str,4, strlen($str) - 4);$flag=FoundInDic($sss); };

if ($flag==true) {array_push($words,"إلى");array_push($words,$sss);}
}

if ($flag==false && $doneflag==true)
{
$doneflag=false;
 
$ssss=$str; 
$ss=substr($sss,strlen($sss)-6,6);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-4,4);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 4); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-2,2);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };

$flag=FoundInDic($ssss);
//if($flag) if(VerbInDIC(WithoutAccent($ssss))) {$twoflag=false;$pluflag=false;$femaleflag=false;array_push($words,"الماضى");}
if ($flag==true){array_push($words,$ssss);$adjflag=isAdj($ssss); if ($adjflag==true) { $femaleflag =false; $pluflag=false;$twoflag=false;$ownflag=false;}}

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-2,2); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-6,6);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-8,8);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}

/////--------------------------

if ($flag==false)
{
$doneflag=false;
$sss=$str; 
$ssss=$str; 
$ss=substr($sss,strlen($sss)-6,6);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-4,4);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 4); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-2,2);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };

$flag=FoundInDic($ssss);
//if($flag) if(VerbInDIC(WithoutAccent($ssss))) {$twoflag=false;$pluflag=false;array_push($words,"الماضى"); array_push($words,GetVerb($ssss);}
if ($flag==true){array_push($words,$ssss);$adjflag=isAdj($ssss); if ($adjflag==true) { $femaleflag =false; $pluflag=false;$twoflag=false;$ownflag=false;}}

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-2,2); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");array_push($words,$ssss);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-6,6);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-8,8);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDic($ssss); if ($flag==true) {array_push($words,$ssss);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}

 
if ($flag==false) 
{
$doneflag=false;
$sss=$str;
if(VerbInDIC(WithoutAccent($sss))){ $tempo=GetVerb(WithoutAccent($sss));$flag=true; array_push($words,"الماضى"); array_push($words,$tempo);}
}

if ($flag==false)
{
$doneflag=false;
$sss=$str;
$ss=substr($str,strlen($str)-2,2);
if ($ss=="ت"){$sss=substr($str,0,strlen($str)-2);};
$ss=substr($str,strlen($str)-4,4);
if ($ss=="وا"  ){$sss=substr($str,0,strlen($str)-4);$doneflag=true;};
if ($ss=="ون" ){$sss=substr($str,0,strlen($str)-4);$doneflag=true;};
if ($ss=="تي" ){$sss=substr($str,0,strlen($str)-4);};
if ($ss == "ان") { $sss = substr($str,0, strlen($str) - 4); $doneflag = true; }
if ($ss == "تا") { $sss = substr($str,0, strlen($str) - 4); $doneflag = true; }
$ss=substr($str,strlen($str)-2,2);
if (($ss=="ن") && ($doneflag == false) ){$sss=substr($str,0,strlen($str)-2);};
if (($ss=="ا") && ($doneflag == false) ){$sss=substr($str,0,strlen($str)-2);};


if ($flag==false && $doneflag == true) if(VerbInDIC(WithoutAccent($sss))){ $tempo=GetVerb(WithoutAccent($sss));$flag=true; array_push($words,"الماضى"); array_push($words,$tempo);}

}

$sss=$str;
if ($flag == false) 
{
    $doneflag = false ;
    $ss = substr($sss,0, 2);
    if ($ss == "أ") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "ن") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "ت") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
    if ($ss == "ي") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
	if ($ss == "ا") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
	if ($ss == "إ") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };

if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss)); $flag=true;array_push($words,"الآن"); array_push($words,$tempo); }
if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) {$tempo="أ"+$ssss; if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss)); $flag=true;array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && ($ss=="أ" || $ss=="ا") && ($prevword=="أنا" ||  $prevword=="انا")  ) {$tempo="ا"+$ssss; if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss)); $flag=true;array_push($words,"الآن"); array_push($words,$tempo); }}
	

if ($flag==false && $doneflag == true  && ($ss=="أ" || $ss=="ا") ) { $flag = FoundInDic($ssss); if ($flag == true) {array_push($words,"أمر"); array_push($words,$ssss); } }
if ($flag==false && $doneflag == true  && ($ss=="أ" || $ss=="ا")) if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss)); $flag=true;array_push($words,"أمر"); array_push($words,$tempo); }

$ll= substr($ssss,strlen($ssss) - 2, 2);
if($flag==false && $doneflag == true  && ($ss=="ا" || $ss=="إ") && $ll=="ْ")
	    {
			$tttt=substr($ssss,strlen($ssss) - 2);
			
			if(VerbInDIC(WithoutAccent($tttt))){$tempo=GetVerb(WithoutAccent($tttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }
			if ($flag==false && $doneflag == true) {$ttt="أ"+$tttt; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   		if ($flag==false && $doneflag == true) {$ttt="ا"+$tttt; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   		if ($flag==false && $doneflag == true) {$ttt="إ"+$tttt; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   
		}

//if ($flag==false && $doneflag == true) { $flag = FoundInDic($ssss); if ($flag == true) {array_push($words,"الآن"); array_push($words,$ssss); } }
if ($flag==false && $doneflag == true) if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss)); $flag=true;array_push($words,"الآن"); array_push($words,$tempo); }

if ($flag==false && $doneflag == true) {if(substr($ssss,0, 2)=="ؤ"){$ttt=str_replace("ؤ","أ",$ssss); if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); } }}}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="أ"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="ا"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}
if ($flag==false && $doneflag == true && $ss!="ا" && $ss!="أ" && $ss !="إ" ) {$ttt="إ"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"الآن"); array_push($words,$tempo); }}





if ($flag == false) { $ssss =  $sss; $flag = FoundInDic($ssss); if ($flag == true) {if(GetWordCat($ssss)=="أفعال شائعة") array_push($words,"الماضى");  array_push($words,$ssss); }}
if ($flag==false ) {if(VerbInDIC(WithoutAccent($sss))){$tempo=GetVerb(WithoutAccent($sss));$flag=true;  array_push($words,"الماضى"); array_push($words,$tempo); } }

if ($flag == false) {
    $doneflag = false;
    $ss = substr($sss,0, 4);
    if ($ss == "سن") { $ssss = substr($sss,4, strlen($str) - 4); $doneflag = true; };
    if ($ss == "سأ") { $ssss = substr($sss,4, strlen($str) - 4); $doneflag = true; };
    if ($ss == "سي") { $ssss = substr($sss,4, strlen($str) - 4); $doneflag = true; };
    if ($ss == "ست") { $ssss = substr($sss,4, strlen($str) - 4); $doneflag = true; };
    if ($doneflag == true) { $ssss = $ssss; $flag = FoundInDic($ssss); if ($flag == true) { array_push($words,"القادم"); array_push($words,$ssss); } }
	if ($flag==false && $doneflag == true) {if(substr($ssss,0, 2)=="ؤ"){$ttt=str_replace("ؤ","أ",$ssss); if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}}
  	if ($flag==false && $doneflag == true) {$ttt="أ"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}
    if ($flag==false && $doneflag == true) {$ttt="ا"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}
    if ($flag==false && $doneflag == true) {$ttt="إ"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }}


if ($flag==false && $doneflag == true) if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss));$flag=true;  array_push($words,"القادم"); array_push($words,$tempo); }

}

if ($flag == false) {
    $doneflag = false;
	  $ss = substr($sss,0, 2);
	   if ($ss == "ا" || $ss=="إ") { $ssss = substr($sss,2, strlen($str) - 2); $doneflag = true; };
	   if(!$doneflag)
	    {
			 $ss = substr($sss,0, 4);
			  if ($ss == "لت") { $ssss = substr($sss,4, strlen($str) - 4); $doneflag = true; };
	   }
	     if(!$doneflag)
	    {
			 $ss = substr($sss,0, 6);
			  if ($ss == "فلت") { $ssss = substr($sss,6, strlen($str) - 6); $doneflag = true; };
			  
	   }
	   if ($doneflag == true) { $ssss =  $ssss; $flag = FoundInDic($ssss); if ($flag == true) { array_push($words,"أمر"); array_push($words,$ssss); } }
	   if ($flag==false && $doneflag == true) {if(VerbInDIC(WithoutAccent($ssss))){$tempo=GetVerb(WithoutAccent($ssss));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); } }

	   if ($flag==false && $doneflag == true) {$ttt="أ"+$ssss;if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   if ($flag==false && $doneflag == true) {$ttt="ا"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
	   if ($flag==false && $doneflag == true) {$ttt="إ"+$ssss; if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}



	   
} 

if ($flag==false) {if(VerbInDIC(WithoutAccent($sss))){$tempo=GetVerb(WithoutAccent($sss));$flag=true;  array_push($words,"الماضى"); array_push($words,$tempo); }}
if ($flag==false) {$ttt="ا"+$sss;  if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
if ($flag==false) {$ttt="أ"+$sss;  if(VerbInDIC(WithoutAccent($ttt))){$tempo=GetVerb(WithoutAccent($ttt));$flag=true;  array_push($words,"أمر"); array_push($words,$tempo); }}
if ($flag==false) $words=SearchInDeriv($str);
//if (strlen(words)==0) {$flag=false;array_push($words,str);}

return $words;
}

//////////////////////////////////////////////////////////////////////////////////////

function SearchInDeriv($strr)
{
$words=array();
$flag=false;
$doneflag=false;
$femaleflag=false;
$pluflag = false;
$twoflag=false;
$adjflag=false;
$ownflag=false;
$str=Withoutquot($strr);
$ssss="";
$sss=$str;
$cc="";
$ss = substr($str,0, 4);
$dd=array();
$flag=FoundInDeriv($sss);
if ($flag==true) {$dd=ReturnDeriv($sss);for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}

if ($flag==false ) {
if ($ss == "ال") {$doneflag=true; $sss = substr($str,4, strlen($str) - 4) ;$flag=FoundInDeriv($sss);};

if ($flag==true) {$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}
if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ب") { $doneflag=true;$sss = substr($str,2, strlen($str) - 2);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"في");$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ف") { $doneflag=true; $sss = substr($str,2, strlen($str) - 2) ;$flag=FoundInDeriv($sss);};

if ($flag==true) {$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}

if ($flag==false ) {
$ss = substr($str,0, 2);
if ($ss == "ل") {$doneflag=true; $sss = substr($str,2, strlen($str) - 2);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"إلى");$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}

if ($flag==false ) {
$ss = substr($str,0, 6);
if ($ss == "بال") { $doneflag=true;$sss = substr($str,6, strlen($str) - 6);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"في");$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}

if ($flag==false ) {
$ss = substr($str,0, 4);
if ($ss == "لل") {$doneflag=true; $sss = substr($str,4, strlen($str) - 4);$flag=FoundInDeriv($sss); };

if ($flag==true) {array_push($words,"إلى");$dd=ReturnDeriv($sss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}
}

if ($flag==false && $doneflag==true)
{
$doneflag=false;
//$sss=$str; 
//$ssss=$str; 
$ss=substr($sss,strlen($sss)-6,6);
if ($ss=="تان" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};
if ($ss=="تين" ){$ssss=substr($sss,0,strlen($sss)-6);$femaleflag=true;$twoflag=true;$doneflag=true;};

$ss=substr($sss,strlen($sss)-4,4);
if (($ss=="ان") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if (($ss=="ين") && ($doneflag == false) ){$ssss=substr($sss,0,strlen($sss)-4);$twoflag=true;};
if ($ss=="ون" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;};
if ($ss=="ات" ){$ssss=substr($sss,0,strlen($sss)-4);$pluflag =true;$femaleflag=true;};
if ($ss == "تا") { $ssss = substr($sss,0, strlen($sss) - 4); $femaleflag = true; $twoflag=true; $doneflag = true; };

$ss=substr($sss,strlen($sss)-2,2);
if ($ss == "ة") { $ssss = substr($sss,0, strlen($sss) - 2); $femaleflag = true; };
if ($ss == "ا" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $twoflag=true; };
if ($ss == "و" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $pluflag=true; };
if ($ss == "ي" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };
if ($ss == "ى" && ($doneflag == false)) { $ssss = substr($sss,0, strlen($sss) - 2); $ownflag = true; };

$flag=FoundInDeriv($ssss);

if (($flag==true) && ($femaleflag == true)){array_push($words,"مؤنث");}
if (($flag==true) && ($pluflag == true)){array_push($words,"الذين");}
if (($flag==true) && ($twoflag == true)){array_push($words,"هذان");}
if (($flag==true) && ($ownflag == true)){array_push($words,"أنا");}

}
$cc=substr($sss,strlen($sss)-2,2); 
if($flag==false) {if ($cc=="ه") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هو");} }} 
if($flag==false) {if ($cc=="ك") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="ي") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنا");} }} 
if($flag==false) {if ($cc=="ى") {$ssss=substr($sss,0,strlen($sss)-2); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنا");} }} 

$cc=substr($sss,strlen($sss)-4,4);
if($flag==false) {if ($cc=="هم") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"الذين");} }} 
if($flag==false) {if ($cc=="هن") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"اللآئى");} }} 
if($flag==false) {if ($cc=="نا") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"نحن");} }}   
if($flag==false) {if ($cc=="ته") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هو");} }}
if($flag==false) {if ($cc=="تك") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);;array_push($words,"أنتَ");} }}
if($flag==false) {if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنا");} }}
if($flag==false) {if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنا");} }}
if($flag==false) if ($cc=="تي") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}} 
if($flag==false) if ($cc=="تى") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) if(GetWordCat($ssss)!="أفعال شائعة") {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"مؤنث");array_push($words,"أنا");} else{array_push($words,"الماضى");$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);}} 
if($flag==false) {if ($cc=="ها") {$ssss=substr($sss,0,strlen($sss)-4); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هذه");} }}
$cc=substr($sss,strlen($sss)-6,6);
if($flag==false) {if ($cc=="هما") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="يا") {$ssss=substr($sss,0,strlen($sss)-6); $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنا");array_push($words,"هذان");} }} 
if($flag==false) {if ($cc=="تها") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هذه");} }}
if($flag==false) {if ($cc=="تنا") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"نحن");} }}
if($flag==false) {if ($cc=="تهم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"الذين");} }}
if($flag==false) {if ($cc=="تهن") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"اللآئى");} }}
if($flag==false) {if ($cc=="تكم") {$ssss=substr($sss,0,strlen($sss)-6)+"ة"; $flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"أنتم");} }}

$cc=substr($sss,strlen($sss)-8,8);
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تهما") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"مؤنث");array_push($words,"هاتان");} }}

if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8)+"ة";$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);;array_push($words,"مؤنث");array_push($words,"هاتان");} }}
if($flag==false) {if ($cc=="تيا") {$ssss=substr($sss,0,strlen($sss)-8);$flag=FoundInDeriv($ssss); if ($flag==true) {$dd=ReturnDeriv($ssss); for($k=0;$k<count($dd);$k++) array_push($words,$dd[$k]);array_push($words,"مؤنث");array_push($words,"أنا");array_push($words,"هاتان");} }}



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
///////////////////////////////////////////////////////////////////////////////////////////////	 
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
 
function hasAccent($str)
{
	$flag=false;
	 $ll=strlen($str);
      $delta=1;
   if(!is_numeric($str)) { $delta=2;}
 
   for( $i=0;$i<$ll;$i+=$delta)
   {

    $sss=substr($str,$i,$delta);
    if ($sss== 'َ' || $sss != 'ً' || $sss== 'ُ' || $sss == 'ٌ' || $sss == 'ِ' || $sss == 'ٍ' || $sss == 'ّ' || $sss == 'ْ' ) { $flag=true; }
     }
     return $flag;
  
}
///////////////////////////////////////////////////////////////////////////////////////////////
function GetVideoName($str)
{
	
	
//if(is_numeric($str))
//$arr = str_split($str);
//else	
//$arr=str_split_php4_utf8($str);

$vcode="";
$ll=strlen($str);
$delta=1;
if(!is_numeric($str)) { $delta=2;}

for( $i=0;$i<$ll;$i+=$delta)
{
$ss=substr($str,$i,$delta);
$vcode=$vcode."0".GetLetterOrdinalNumber($ss);
}

return $vcode;
}
/////////////////////////////////////////////////////////////////////////////////////////
function GetLetterOrdinalNumber($str)
{
switch ($str)
            {

                case "أ":
                    $lstr = "1"; break;          
                case "ب":
                    $lstr = "2"; break;
                case "ت":
                    $lstr = "3"; break;
                case "ث":
                    $lstr = "4"; break;
                case "ج":
                    $lstr = "5"; break;
                case "ح":
                    $lstr = "6"; break;
                case "خ":
                    $lstr = "7"; break;
                case "د":
                    $lstr = "8"; break;
                case "ذ":
                    $lstr = "9"; break;
                case "ر":
                    $lstr = "10"; break;
                case "ز":
                    $lstr = "11"; break;
                case "س":
                    $lstr = "12"; break;
                case "ش":
                    $lstr = "13"; break;
                case "ص":
                    $lstr = "14"; break;
                case "ض":
                    $lstr = "15"; break;
                case "ط":
                    $lstr = "16"; break;
                case "ظ":
                    $lstr = "17"; break;
                case "ع":
                    $lstr = "18"; break;
                case "غ":
                    $lstr = "19"; break;
                case "ف":
                    $lstr = "20"; break;
                case "ق":
                    $lstr = "21"; break;
                case "ك":
                    $lstr = "22"; break;
                case "ل":
                    $lstr = "23"; break;
                case "م":
                    $lstr = "24"; break;
                case "ن":
                    $lstr = "25"; break;
                case "ه":
                    $lstr = "26"; break;
                case "و":
                    $lstr = "27"; break;
                case "ي":
                    $lstr = "28"; break;
                case "إ": 
                    $lstr = "29"; break;
                case "آ":
                    $lstr = "30"; break;
                case "ى":
                    $lstr = "31"; break;
                case "ة":
                    $lstr = "32"; break;
                case "ئ":
                    $lstr = "33"; break;
                case "ؤ":
                    $lstr = "34"; break;
                case "ا":
                    $lstr = "35"; break;
                case "َ":
                    $lstr = "36"; break;
                case "ُ":
                    $lstr = "37"; break;
                case "ِ":
                    $lstr = "38"; break;
                case "ّ":
                    $lstr = "39"; break;
                case "ْ":
                    $lstr = "40"; break;
                case "ً":
                    $lstr = "41"; break;
                case "ٌ":
                    $lstr = "42"; break;
                case "ٍ":
                    $lstr = "43"; break;             
               case "0":
                     $lstr = "44"; break;
                case "1":
                    $lstr = "45"; break;
                case "2":
                    $lstr = "46"; break;

                case "3":
                    $lstr = "47"; break;
                case "4":
                    $lstr = "48"; break;
                case "5":
                    $lstr = "49"; break;
                case "6":
                    $lstr = "50"; break;
                case "7":
                    $lstr = "51"; break;
                case "8":
                    $lstr = "52"; break;
                case "9":
                    $lstr = "53"; break;
                case "A":
                    $lstr = "54"; break;
                case "B":
                    $lstr = "55"; break;
                case "C":
                    $lstr = "56"; break;
                case "D":
                    $lstr = "57"; break;
                case "E":
                    $lstr = "58"; break;
                case "F":
                    $lstr = "59"; break;
                case "G":
                    $lstr = "60"; break;
                case "H":
                    $lstr = "61"; break;
                case "I":
                    $lstr = "62"; break;
                case "J":
                    $lstr = "63"; break;
                case "K":
                    $lstr = "64"; break;
                case "L":
                    $lstr = "65"; break;
                case "M":
                    $lstr = "66"; break;
                case "N":
                    $lstr = "67"; break;
	case "O":
                    $lstr = "68"; break;
                case "P":
                    $lstr = "69"; break;
                case "Q":
                    $lstr = "70"; break;
                case "R":
                    $lstr = "71"; break;
                case "S":
                    $lstr = "72"; break;
                case "T":
                    $lstr = "73"; break;
                case "U":
                    $lstr = "74"; break;
                case "V":
                    $lstr = "75"; break;
                case "W":
                    $lstr = "76"; break;
                case "X":
                    $lstr = "77"; break;
                case "Y":
                    $lstr = "78"; break;
                case "Z":
                    $lstr = "79"; break;
 
case "ء":
                    $lstr = "80"; break;
 
                         default:
                    $lstr = "0"; break;

            }

return $lstr;
}


////////////////////////////////////////////////////////////
function GetWordVideo($wr,$prev)
{   $words=array();
    $arr=array();
     
    $vname="";
	$clink = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$xx=strpos($clink,"/php/");
	if($xx>0) $clink=substr($clink,0,$xx);
	$vpath= $clink."/res/video/";
	$phr=$wr;
	$xx=1;
	while($xx>0)
	{
	$xx=strpos($phr,",");
	if($xx>0){ $wr=substr($phr,0,$xx);$phr=substr($phr,$xx+1,strlen($phr)-$xx);}
	else $wr=$phr;
    if(	FoundInDic($wr)){ $vname= $vpath.GetVideoName($wr)."/1.3gp";array_push($words,$vname);}
   else {
	$arr=SearchInDic($wr,$prev);
	
	if (count($arr)>0)for($i=0;$i<count($arr);$i++)
									{$vname=$vpath.GetVideoName($arr[$i])."/1.3gp";array_push($words,$vname);}
	else array_push($words,$vpath."000.3gp");
								
}
	
	}
		$proto = '{ 

"videos":[
   ]}';
   
$videoarray = json_decode($proto , true);
$temp=array();
for($i=0;$i<count($words);$i++) {$temp["vpath"]=$words[$i];array_push($videoarray["videos"],$temp);	}							
return $videoarray;

}
/////////////////////////////////////////////////////////////////////////////////////////
 function IsValidKey($kk)
 {
	
	 $sql="SELECT Count(`ID`) FROM `keys` WHERE `user_key`='".$kk."'";
	$rr=0;
	$flag=false;
	include "db_config.php"; 
	$result = mysqli_query($con,$sql);
	$i=0;
	if ($row = $result->fetch_row())
	{
		
	$rr=$row[0];
	
	}
	
	if($rr>0) {
		$sql="SELECT `expiration` FROM `keys` WHERE `user_key`='".$kk."'";
         $result = mysqli_query($con,$sql);   
		 if ($row = $result->fetch_row())
		 {
			 $dd=strtotime(strval($row[0]));
			 $ddd=strtotime(date('Y-m-d'));
			 $dddd=$dd-$ddd;
			 if ($dddd>0) $flag=true;
		 }
	}
	return $flag;
 }
/////////////////////////////////////////////////////////////////
 function Withoutquot($str)
 {
    // $sss = str.split("");
     $s1=str_replace(".","",$str);
     $s1=  str_replace("ـ","",$s1);
      $s1=  str_replace("،","",$s1);
      $s1=  str_replace("!","",$s1);
     $s1=  str_replace("؟","",$s1); 
     $s1=  str_replace("(","",$s1);
      $s1=  str_replace(")","",$s1);
     $s1=  str_replace("'","",$s1);
     $s1=  str_replace('"','',$s1);
	  $s1=  str_replace('،','',$s1);
	  $s1= str_replace('؛','',$s1);
	   $s1=  str_replace(':','',$s1);
	  
	 $s1=  str_replace('اً','',$s1);
 $s1=  str_replace("أنتِي","أنتِ",$s1);
 $s1=  str_replace("أنتِى","أنتِ",$s1);
 $s1=  str_replace("أنتَى","أنتِ",$s1);
 $s1=  str_replace("أنتَي","أنتِ",$s1);
 $s1=  str_replace("أنتي","أنتِ",$s1);
 $s1=  str_replace("أنتى","أنتِ",$s1);
      return trim($s1);
 }
 ////////////////////////////////////////////////////////////////////////////////////////
 function ReadNummber($numstr)
 {
	
	 $num=array();
	 
	 if(strlen($numstr)<=12) 
	 {
		 $xx=intval($numstr);
	$numb =(int)($xx/1000000000); 
	if ($numb>1){ $yy=Readhandreds($numb);
	             for( $i=0;$i<count($yy);$i++)array_push($num,$yy[$i]);}
	if($numb>0) array_push($num,"1000000000");
	if($numb>0)$xx=$xx-1000000000*$numb;
	
	 $numb =(int)($xx/1000000); 
	if ($numb>1){ $yy=Readhandreds($numb);
	             for( $i=0;$i<count($yy);$i++)array_push($num,$yy[$i]);}
	if($numb>0) array_push($num,"1000000");
	if($numb>0)$xx=$xx-1000000*$numb;
	
	 $numb =(int)($xx/1000); 
	if ($numb>1){ $yy=Readhandreds($numb);
	             for( $i=0;$i<count($yy);$i++)array_push($num,$yy[$i]);}
	if($numb>0) array_push($num,"1000");
    if($numb>0)$xx=$xx-1000*$numb;  
   if ($xx>1){ $yy=Readhandreds($xx);
	             for( $i=0;$i<count($yy);$i++)array_push($num,$yy[$i]);}
		 }
 return $num;
 }
 
 /////////////////////////////////////////////////////////////////////
 
 function Readhandreds($numb)
 {
	$ss=array();
	$h=0;
	$d=0;
	$u=0; 
	$uu=0;
	$h=(int)($numb/100);
	$dd=$numb-($h*100);
	if($dd>0) $d=(int)($dd/10);
	if($dd>0) $u=$dd-($d*10);
	if($h>0) array_push($ss,strval(100*$h));
	if($u>0) array_push($ss,strval($u));
	if($d>0)  array_push($ss,strval(10*$d));
	return $ss;
	
 }
?>