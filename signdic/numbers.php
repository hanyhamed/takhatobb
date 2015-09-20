<html language="ar" charset="utf-8" dir="rtl">
<head>
<title>الأرقام</title>
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
<video width="480" height="360"  controls="controls" id="vidcontrol"  type="video/webm"  onEnded="PlayAnotherVideo()" style="margin:1px;padding:1px;border:5px solid black;">
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
<a href="#" class="alphabox" data-letterid="1"><div class="letterbox" >1</div></a>
<a href="#" class="alphabox" data-letterid="2"><div class="letterbox">2</div></a>
<a href="#" class="alphabox" data-letterid="3"><div class="letterbox">3</div></a>
<a href="#" class="alphabox" data-letterid="4"><div class="letterbox">4</div></a>
<a href="#" class="alphabox" data-letterid="5"><div class="letterbox">5</div></a>
<a href="#" class="alphabox" data-letterid="6"><div class="letterbox">6</div></a>
<a href="#" class="alphabox" data-letterid="7"><div class="letterbox">7</div></a>
<a href="#" class="alphabox" data-letterid="8"><div class="letterbox">8</div></a>
<a href="#" class="alphabox" data-letterid="9"><div class="letterbox">9</div></a>
<a href="#" class="alphabox" data-letterid="10"><div class="letterbox">10</div></a>
<a href="#" class="alphabox" data-letterid="11"><div class="letterbox">11</div></a>
<a href="#" class="alphabox" data-letterid="12"><div class="letterbox">12</div></a>
<a href="#" class="alphabox" data-letterid="13"><div class="letterbox">13</div></a>
<a href="#" class="alphabox" data-letterid="14"><div class="letterbox">14</div></a>
<a href="#" class="alphabox" data-letterid="15"><div class="letterbox">15</div></a>
<a href="#" class="alphabox" data-letterid="16"><div class="letterbox">16</div></a>
<a href="#" class="alphabox" data-letterid="17"><div class="letterbox">17</div></a>
<a href="#" class="alphabox" data-letterid="18"><div class="letterbox">18</div></a>
<a href="#" class="alphabox" data-letterid="19"><div class="letterbox">19</div></a>
<a href="#" class="alphabox" data-letterid="20"><div class="letterbox">20</div></a>
<a href="#" class="alphabox" data-letterid="21"><div class="letterbox">21</div></a>
<a href="#" class="alphabox" data-letterid="22"><div class="letterbox">22</div></a>
<a href="#" class="alphabox" data-letterid="23"><div class="letterbox">23</div></a>
<a href="#" class="alphabox" data-letterid="24"><div class="letterbox">24</div></a>
<a href="#" class="alphabox" data-letterid="25"><div class="letterbox">25</div></a>
<a href="#" class="alphabox" data-letterid="26"><div class="letterbox">26</div></a>
<a href="#" class="alphabox" data-letterid="27"><div class="letterbox">27</div></a>
<a href="#" class="alphabox" data-letterid="28"><div class="letterbox">28</div></a>
<a href="#" class="alphabox" data-letterid="29"><div class="letterbox">29</div></a>

</div>
<br>
<br>
<div class="alphabetbtncontainer">
<div class="switchalphabetsbtn" data-tolang="English">التالي</div>
</div>
</div>
</body>

</html>
