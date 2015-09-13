<?php
 ini_set('default_charset','UTF-8'); 
 header('Content-Type: text/html; charset=utf-8');
echo "<!doctype html>";
echo '<html lang="ar">';
echo "<head>";
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>';
echo "<title>Untitled Document</title>";
echo "</head>";

echo '<body>';
$str="مُتَبَسِّم";
mb_internal_encoding('UTF-8'); 
$str=mb_strtolower($str); 
  $sss = str_split_php4_utf8($str);
     $ss = "";
     for ($i = 0; $i < count($sss); $i++) {
         if (strcmp($sss[$i] ,'َ')!=0 && strcmp($sss[$i] ,'ً')!=0 && strcmp($sss[$i] ,'ُ')!=0 && strcmp($sss[$i] ,'ٌ')!=0 && strcmp($sss[$i] ,'ِ')!=0 && strcmp($sss[$i] ,'ٍ')!=0 && strcmp($sss[$i] ,'ّ')!=0 && strcmp($sss[$i] ,'ْ')!=0 ) { $ss = $ss.$sss[$i]; }
		 echo  mb_strtolower($sss[$i])."<br>";
     }
echo $ss;
echo "</body>";
echo "</html>";

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