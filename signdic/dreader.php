<?php

header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();
if(isset($_POST["param"])){
$param= $_POST["param"];
echo '<!DOCTYPE HTML>';
echo '<html language="ar">';
echo '<head>';
echo '<meta http-equiv="Content-type" content="text/html;charset=UTF-8">';
echo '<link media="all" type="text/css" href="css/Dreader.css" rel="stylesheet">';
echo '    <title>مترجم الجمل</title>';
echo '   <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>';
echo '     <script type="text/javascript" src="js/jquery-ui.js"></script>';
echo '     <script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>';
echo '     <script type="text/javascript" language="JavaScript" src="./js/derivatives.js"></script>' ;
echo '    <script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>';
 
echo ' <script type="text/javascript" language="JavaScript" src="./js/deafreaderx.js"></script>';
echo '<script type="text/javascript">';
echo 'function Correct()';
echo '{';
echo 'writeback();';
echo  '}';
echo '</script>';

echo '   </head>';
echo '   <body onLoad="Correct();">';
echo '   <div class="container">';
echo '   <div class="centered">';
echo '   <div class="header"><div class="deaftitle" >مترجم الجمل</div></div>';
echo '   <div class="content">';
echo '   <div class="textvideo">';
echo '   <div class="videoarea">';
echo '   <video width="400" height="300" id="vidcontrol" type="video/webm" autoplay onended="callit()"></video>';
echo '   </div>';
echo '  <div class="inputtext">';
echo '  <div class="intxttitle"><span style="padding:10px 0; line-height:1.6em;">ادخل الجملة المراد ترجمتها</span></div>';
echo '  <input id="newcat" class="inpclass"  style="display:none;">';
echo '   <textarea name="newcat1" id="newcatkot" class="inpclass"  oninput="writeback();" >'.$param.'</textarea>';

echo '   </div>';
echo '   <div id="coolmenu" onClick="coolmenu.hide()">';
echo ' <a href="#" onClick="alert(this.innerText)">JavaScript Kit</a>';
echo '<a href="#" onClick="alert(this.innerText)">Free JavaScripts</a>';
echo '<a href="#" onClick="alert(this.innerText)">JavaScript Reference</a>';
echo '<a href="#" onClick="alert(this.innerText)">Coding Forums</a>';
echo '<a href="#" onClick="alert(this.innerText)">Dynamic Drive</a>';
echo '</div>';
echo ' <div class="verfiedtxt">';
echo '  <div  id ="signdiv" name="abcd"><span class="sp2"></span></div>';
echo '  </div>  ';          
echo '  <div  style="text-align:center;">';
echo '            <a href="#" class="tooltip" title="إالغاء"><img id="cmdstop" class="morph" src="./images/stopx.png" onClick="StopIt()"></a>';
echo '<a href="#" class="tooltip" title="إعادة"><img id="cmdreload" class="morph" src="./images/reloadx.png"  onClick=" RepeatIt()"></a>';
echo '     		<a href="#" class="tooltip" title="إيقاف مؤقت "><img id="cmdpause" class="morph" src="./images/pausex.png" onClick="PauseIt()"></a>';
echo '           <a href="#" class="tooltip" title="بدء الترجمة "><img  id="cmdplay" class="morph" src="./images/playx.png" onClick="analyseit()" ></a> '; 

echo '           </div>';
echo '          <div id="cmdtrans"></div>';
 
echo ' </div>';
  
echo '</div>';
  
echo '<div class="footer">';
echo '<div class="logo"><img src="images/projectlogos.png"  class="logos"/></div>';
echo ' <div class="copyright"><a href="http:khalifacomputergroup.com" target="_blank">جميع الحقوق محفوظة © 2014 لمجموعة خليفة للكمبيوتر</a></div>';
echo ' </div>';
echo '  </div>';
echo ' </div>';
echo '<div id="panel"></div>';
echo ' </body>';
echo '</html>';
}
else
{
echo '<!DOCTYPE HTML>';
echo '<html language="ar">';

echo '<head>';
echo '    <title>مترجم الجمل</title>';
echo '<style>.centerclass {font-size:64px;color:#FF0000;}</style>';
echo '</head>';
echo '<body dir="rtl">';
echo '<table width="100%" align="center"> <tr><td align="center" class="centerclass">';
echo' أنت غيرمشترك بهذه الخدمة';
echo '</td> </tr></table>';
echo ' </body>';
echo '</html>';

}
?>
