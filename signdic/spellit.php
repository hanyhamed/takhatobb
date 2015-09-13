<html language="ar" charset="utf-8" dir="rtl">
<head>
<title>قاموس الإشارة المصري</title>
<link media="all" type="text/css" href="css/deafreaderIn.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>
    <script type="text/javascript" language="JavaScript" src="./js/derivatives.js"></script>
   <script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>
<script type="text/javascript" language="JavaScript" src="./js/spellitx.js"></script>
</head>
<body onLoad="ReloadIt()">
<div class="fullcontainer">
	<div class="videocontainer">
 		<video class="videoview" width="640" height="320" id="vidcontrol" type="video/webm" autoplay onended="callit()" >
        </video>
	</div>
	<div class="txtoutcontainer">
    	<div  id ="signdiv" name="abcd" width="800" style="text-align: center;" height="450" ><span class="sp2"></span>
        </div>
        <div id="coolmenu" onClick="coolmenu.style.display='none'">
<a href="#" onClick="alert(this.innerText)"></a>
<a href="#" onClick="alert(this.innerText)"></a>
<a href="#" onClick="alert(this.innerText)"></a>
<a href="#" onClick="alert(this.innerText)"></a>
<a href="#" onClick="alert(this.innerText)"></a>
</div>
<div id="cmdtrans"></div>
    </div>
    <div id="panel" class="panelcontain">
		<label class="labclass">أكتب الجملة التي تريد ترجمتها إلى لغة الإشارة:</label>
		<input id="newcat" class="inpclass" oninput="writetosign()" maxlength="140"></input>
    </div>
    <div  style="text-align:center;">
    	<a href="#" class="tooltip" title="إالغاء"><img id="cmdstop" class="morph" src="./images/stopx.png" onClick="StopIt()"></a>
		<a href="#" class="tooltip" title="إعادة"><img id="cmdreload" class="morph" src="./images/reloadx.png"  onClick=" RepeatIt()"></a>
      	<a href="#" class="tooltip" title="إيقاف مؤقت "><img id="cmdpause" class="morph" src="./images/pausex.png" onClick="PauseIt()"></a>
        <a href="#" class="tooltip" title="بدء الترجمة "><img  id="cmdplay" class="morph" src="./images/playx.png" onClick="analyseit()" ></a>  
	</div>
        
</div>


  </body>
</html>
