<!DOCTYPE HTML>
<html language="ar">
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
  <link media="all" type="text/css" href="css/Dreader.css" rel="stylesheet">
    <title>مترجم الجمل</title>
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>
    <script type="text/javascript" language="JavaScript" src="./js/derivatives.js"></script>
   <script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>
 
 <script type="text/javascript" language="JavaScript" src="./js/deafreaderx.js"></script>

  </head>
  <body>
  <div class="container">
  <div class="centered">
  <div class="header"><div class="deaftitle" >مترجم الجمل</div></div>
  <div class="content">
  <div class="textvideo">
  <div class="videoarea">
  <video width="400" height="300" id="vidcontrol" type="video/webm" autoplay onended="callit()"></video>
  </div>
  <div class="inputtext">
 <div class="intxttitle"><span style="padding:10px 0; line-height:1.6em;">ادخل الجملة المراد ترجمتها</span></div>
 <input id="newcat" class="inpclass"  style="display:none;">
  <textarea name="newcat1" id="newcatkot" class="inpclass"  oninput="writeback();"  cols="42"></textarea>

  </div>
  <div id="coolmenu" onClick="coolmenu.style.display='none'">
<a href="#" onClick="alert(this.innerText)">JavaScript Kit</a>
<a href="#" onClick="alert(this.innerText)">Free JavaScripts</a>
<a href="#" onClick="alert(this.innerText)">JavaScript Reference</a>
<a href="#" onClick="alert(this.innerText)">Coding Forums</a>
<a href="#" onClick="alert(this.innerText)">Dynamic Drive</a>
</div>
  <div class="verfiedtxt">
  <div  id ="signdiv" name="abcd"><span class="sp2"></span></div>
  </div>            
  <div  style="text-align:center;">
            <a href="#" class="tooltip" title="إالغاء"><img id="cmdstop" class="morph" src="./images/stopx.png" onClick="StopIt()"></a>
			<a href="#" class="tooltip" title="إعادة"><img id="cmdreload" class="morph" src="./images/reloadx.png"  onClick=" RepeatIt()"></a>
      		<a href="#" class="tooltip" title="إيقاف مؤقت "><img id="cmdpause" class="morph" src="./images/pausex.png" onClick="PauseIt()"></a>
            <a href="#" class="tooltip" title="بدء الترجمة "><img  id="cmdplay" class="morph" src="./images/playx.png" onClick="analyseit()" ></a>  

            </div>
           <div id="cmdtrans"></div>
 
  </div>
  
  </div>
  
  <div class="footer">
  <div class="logo"><img src="images/projectlogos.png"  class="logos"/></div>
  <div class="copyright"><a href="http://khalifacomputergroup.com" target="_blank">جميع الحقوق محفوظة © 2014 لمجموعة خليفة للكمبيوتر</a></div>
  </div>
  </div>
  </div>
 <div id="panel"></div>
  </body>
</html>

