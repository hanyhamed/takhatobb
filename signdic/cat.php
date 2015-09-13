<html language="ar" charset="utf-8" dir="rtl">
<head>
<title>الموضوعات</title>

<link media="all" type="text/css" href="css/wordcat.css" rel="stylesheet">
<link rel="stylesheet" href="css/jquery-ui.css">
<!--<script type="text/javascript" src="js/jquery.min-1.7.2.min.js"></script>-->
<!-- <script type="text/javascript" src="js/jquery-1.9.1.js"></script>-->
 <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
 <script type="text/javascript" src="js/jquery-ui.js"></script>
 <script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>
 <script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>
 <script type="text/javascript"  language="JavaScript"  src="js/cat.js"></script>
</head>
  
<body onLoad="populate()">
<div class="maincontainer">
<!---------------------------------Video Player------------------------>
<div class="videoplayer">
<div class="wordpicture">
<div class="picture" style="width:230px;">
<a href="#" id="postimg" class="bubble big gray" style="display:inline;" onClick="LoadPics()">صورة</a>
<a href="#" id="showvideo" class="bubble big orange" style="display:inline;" onClick="LoadVideo()">الأشارة</a>
</div>
<div class="wordtitle">
<div id="catTit" style="font-size:18px;">جميع الكلمات</div>
<div id="wordTit"  style="font-size:18px;"></div>
</div>
</div>
<div id="videodiv" style="display:none;">
    <video width="530" height="360"  controls="controls" id="vidcontrol"  type="video/webm" style="margin:1px;padding:1px;border:5px solid green;">
    </video>
     <div style="text-align:center;">
     
 <a href="#" onClick="Showvid(1)"><img id="nxtvid" src="images/next.png"></a>
  <a href="#" onClick="Showvid(0)"><img id="prevvid" src="images/prev.png"></a>
  </div>
 </div>
 <div id="picdiv" style="text-align:center;">
 <div>
 <img id="wordimage" style="width:530px;height:360px; border-style:double;">
 </div>
 <div id="morevid">
 <a href="#" onClick="ShowImage(1)"><img id="nxtimg" src="images/next.png"></a>
  <a href="#" onClick="ShowImage(0)"><img id="previmg" src="images/prev.png"></a>
  </div>
 </div>   
</div>
<!------------------------------------------>
<!---------------------------Alphabets Container ------------------------>
<div id="accordion1">
  <h3>1 - اختر المجموعة</h3>
<div>
<div style="text-align: center;">
<select class="SelStylish" name="drop2" id="Select2"   onclick = "loadcatwords()" multiple="multiple" ></select>
</div>
<!--------------- end of words cat Div------------>
</div><!----------- end of accordion div 1---------->
<h3>2 - الكلمات</h3>
<div><p>
<label class="labclass">بحث: </label><input id="intxt" type="text" onKeyUp="SearchInList()">
<div style="text-align: center;">                
<select class="SelStyle" name="drop1" id="Select1"   multiple="multiple"  onChange="play_video()" ></select>
</div></p>
</div>
</div><!-------------- end of accordion main---->
</div>

<!----------------------------------------------------->


</body>

</html>
