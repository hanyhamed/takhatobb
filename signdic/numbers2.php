<html language="ar" charset="utf-8" dir="rtl">
<head>
<title>الحروف</title>
<link media="all" type="text/css" href="css/numbers.css" rel="stylesheet">
<!-- <script type="text/javascript" src="js/jquery.min-1.7.2.min.js"></script>-->
 <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
 <script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>
   <script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>
 <script type="text/javascript"  language="JavaScript"  src="./js/numbers.js"></script>
</head>
  
<body>
<div class="maincontainer">
<div class="videoplayer">
<video width="480" height="360"  controls="controls" id="vidcontrol"  type="video/webm" onEnded="PlayAnotherVideo()" style="margin:1px;padding:1px;border:5px solid black;">
</video>
	<div class="txtoutcontainer">
    	<div  id ="signdiv" name="abcd" width="800" style="text-align: center; direction:ltr;" height="450" ><span class="sp2"></span>
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
        <table>
        <tr>
        <td>
		<label class="labclass">أكتب الرقم الذي تريد ترجمته إلى لغة الإشارة:</label>
        </td>
        <td>
		<input id="newcat" class="inpeclass" oninput="writetosign()" maxlength="12"></input>
        </td>
        </tr>
        </table>
    </div>
    <div  style="text-align:center;">
    	<a href="#" class="tooltip" title="إالغاء"><img id="cmdstop" class="morph" src="./images/stopx.png" onClick="StopIt()"></a>
		<a href="#" class="tooltip" title="إعادة"><img id="cmdreload" class="morph" src="./images/reloadx.png"  onClick=" RepeatIt()"></a>
      	<a href="#" class="tooltip" title="إيقاف مؤقت "><img id="cmdpause" class="morph" src="./images/pausex.png" onClick="PauseIt()"></a>
        <a href="#" class="tooltip" title="بدء الترجمة "><img  id="cmdplay" class="morph" src="./images/playx.png" onClick="PlayIt()" ></a>  
	</div>
   
</div>

<div class="alphabetscontainer" data-lang="Ar">
<a href="#" class="alphabox" data-letterid="0"><div class="letterbox" >0</div></a>
<a href="#" class="alphabox" data-letterid="10"><div class="letterbox">10</div></a>
<a href="#" class="alphabox" data-letterid="20"><div class="letterbox">20</div></a>
<a href="#" class="alphabox" data-letterid="30"><div class="letterbox">30</div></a>
<a href="#" class="alphabox" data-letterid="40"><div class="letterbox">40</div></a>
<a href="#" class="alphabox" data-letterid="50"><div class="letterbox">50</div></a>
<a href="#" class="alphabox" data-letterid="60"><div class="letterbox">60</div></a>
<a href="#" class="alphabox" data-letterid="70"><div class="letterbox">70</div></a>
<a href="#" class="alphabox" data-letterid="80"><div class="letterbox">80</div></a>
<a href="#" class="alphabox" data-letterid="90"><div class="letterbox">90</div></a>
<a href="#" class="alphabox" data-letterid="100"><div class="letterbox">100</div></a>
<a href="#" class="alphabox" data-letterid="200"><div class="letterbox">200</div></a>
<a href="#" class="alphabox" data-letterid="300"><div class="letterbox">300</div></a>
<a href="#" class="alphabox" data-letterid="400"><div class="letterbox">400</div></a>
<a href="#" class="alphabox" data-letterid="500"><div class="letterbox">500</div></a>
<a href="#" class="alphabox" data-letterid="600"><div class="letterbox">600</div></a>
<a href="#" class="alphabox" data-letterid="700"><div class="letterbox">700</div></a>
<a href="#" class="alphabox" data-letterid="800"><div class="letterbox">800</div></a>
<a href="#" class="alphabox" data-letterid="900"><div class="letterbox">900</div></a>
<a href="#" class="alphabox" data-letterid="1000"><div class="letterbox">1000</div></a>

<a href="#" class="alphabox" data-letterid="1000000"><div class="letterboxx">1000000</div></a>
<a href="#" class="alphabox" data-letterid="1000000000"><div class="letterboxx">1000000000</div></a>

</div>
<br>
<br>
<div class="alphabetbtncontainer">
<div class="switchalphabetsbtn" data-tolang="Arabic">السابق</div>
</div>
</div>
</body>

</html>
