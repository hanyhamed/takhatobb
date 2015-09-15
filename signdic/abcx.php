<html language="ar" charset="utf-8" dir="rtl">
  <head>
    
<title>الكلمات</title>
<link media="all" type="text/css" href="css/words.css" rel="stylesheet">
<link rel="stylesheet" href="css/jquery-ui.css">
<!--<script type="text/javascript" src="js/jquery.min-1.7.2.min.js"></script>-->
<!--<script type="text/javascript" src="js/jquery-1.9.1.js"></script>-->
<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" language="JavaScript" src="./js/dic.js"></script>
<script type="text/javascript" language="JavaScript" src="./js/derivatives.js"></script>
<script type="text/javascript" language="JavaScript" src="./js/wordfinder.js"></script>
<script type="text/javascript"  language="JavaScript"  src="js/abcx.js"></script>
</head>
  
<body onLoad="populate();">
<div class="maincontainer">
<!---------------------------------Video Player------------------------>
<!---------------------------------Video Player------------------------>
<div class="videoplayer">
<div class="wordpicture">
<div class="picture" style="width:230px;">
<a href="#" id="postimg" class="bubble big gray" style="display:inline;" onClick="LoadPics()">صورة</a>
<a href="#" id="showvideo" class="bubble big orange" style="display:inline;" onClick="LoadVideo()">الأشارة</a>
</div>
<div class="wordtitle"><div id="wordTit"  style="font-size:18px;"></div> <div id="catTit" style="font-size:18px;"></div></div>
</div>
<div id="videodiv" style="display:none;">
    <video width="530" height="360"  controls="controls" id="vidcontrol" onEnded="PlayAnotherVideo()"  type="video/webm" style="margin:1px;padding:1px;border:5px solid green;">
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
 <div id="explaindiv" style="display:none;"> 
 <table style="font-family:'Times New Roman'; font-size:16px; font-weight:bold">
<tr>
<td>شرح الكلمة:</td>
<td><textarea  readonly="readonly" id="txtexplain" style="width:350px; font-family:'Times New Roman'; font-size:18px;" ></textarea></td>
<td><button onClick="PlayExplainVideo()">عرض فيدبو الشرح</button></td>
</tr>
</table>
</div>
</div>
<!------------------------------------------>
<!---------------------------Alphabets Container ------------------------>
<div id="accordion">
  <h3>اختر أول حرف من الكلمة</h3>
  <div>
<div class="alphabetscontainer alphabetwords">
    <a href="#" class="alphabox" data-letterid="1"><div class="letterbox">أ</div></a>
    <a href="#" class="alphabox" data-letterid="2"><div class="letterbox" >ب</div></a>
    <a href="#" class="alphabox" data-letterid="3"><div class="letterbox">ت</div></a>
    <a href="#" class="alphabox" data-letterid="4"><div class="letterbox">ث</div></a>
    <a href="#" class="alphabox" data-letterid="5"><div class="letterbox">ج</div></a>
    <a href="#" class="alphabox" data-letterid="6"><div class="letterbox">ح</div></a>
    <a href="#" class="alphabox" data-letterid="7"><div class="letterbox">خ</div></a>
    <a href="#" class="alphabox" data-letterid="8"><div class="letterbox">د</div></a>
    <a href="#" class="alphabox" data-letterid="9"><div class="letterbox">ذ</div></a>
    <a href="#" class="alphabox" data-letterid="10"><div class="letterbox">ر</div></a>
    <a href="#" class="alphabox" data-letterid="11"><div class="letterbox">ز</div></a>
    <a href="#" class="alphabox" data-letterid="12"><div class="letterbox">س</div></a>
    <a href="#" class="alphabox" data-letterid="13"><div class="letterbox">ش</div></a>
    <a href="#" class="alphabox" data-letterid="14"><div class="letterbox">ص</div></a>
    <a href="#" class="alphabox" data-letterid="15"><div class="letterbox">ض</div></a>
    <a href="#" class="alphabox" data-letterid="16"><div class="letterbox">ط</div></a>
    <a href="#" class="alphabox" data-letterid="17"><div class="letterbox">ظ</div></a>
    <a href="#" class="alphabox" data-letterid="18"><div class="letterbox">ع</div></a>
    <a href="#" class="alphabox" data-letterid="19"><div class="letterbox">غ</div></a>
    <a href="#" class="alphabox" data-letterid="20"><div class="letterbox">ف</div></a>
    <a href="#" class="alphabox" data-letterid="21"><div class="letterbox">ق</div></a>
    <a href="#" class="alphabox" data-letterid="22"><div class="letterbox">ك</div></a>
    <a href="#" class="alphabox" data-letterid="23"><div class="letterbox">ل</div></a>
    <a href="#" class="alphabox" data-letterid="24"><div class="letterbox">م</div></a>
    <a href="#" class="alphabox" data-letterid="25"><div class="letterbox">ن</div></a>
    <a href="#" class="alphabox" data-letterid="26"><div class="letterbox">هـ</div></a>
    <a href="#" class="alphabox" data-letterid="27"><div class="letterbox">و</div></a>
    <a href="#" class="alphabox" data-letterid="28"><div class="letterbox">ي</div></a>
    <a href="#" class="alphabox" data-letterid="29"><div class="letterbox1">الكل</div></a>
</div>
<!--------------- end of Alphabet Div------------>
</div><!----------- end of accordion div 1---------->
<h3>الكلمات</h3>
  <div>
  <p>
  <form>
  <label class="labclass">بحث: </label><input id="intxt" type="text" onKeyUp="SearchInList()">
              
<div style="text-align: center;">
                
<select class="SelStyle selectalphaword" name="drop1" id="Select1"  multiple="multiple" onChange="play_video()" >

                </select> 
</div>

</form>
  </p>
  </div>
  </div><!-------------- end of accordion main---->
  <table style="font-family:'Times New Roman'; font-size:16px; font-weight:bold; background-color:rgba(83, 190, 186, 0.5);">
  <tr><td align="center">المرادفات</td><td align="center">المشتقات</td></tr>

  <tr>
  <td><select id="synsel" multiple="multiple" style="width:150px; font-size:20px; font-weight:bold;font-family:'Times New Roman';" > </select></td>
  <td><select id="drevsel" multiple="multiple" onclick="PlayDrevVideo()"style="width:150px;font-size:20px; font-weight:bold;font-family:'Times New Roman';"> </select></td>
  </tr>
  </table>
</div>

<!----------------------------------------------------->
<div style="display:none;">

 
<table style="width: 942px; height: 398px;" border="1">
      
<tbody>
        <tr>
          <td style="width: 244px;"><br>
            
<table style="width: 229px; height: 346px;" class="tableup" dir="rtl"

  border="1">

<tbody>
                <tr style="height: 48.7167px;">
                  <td class="tdbox" style="text-align: center;" onClick="popxa(1)">أ</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(2)">ب</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(3)">ت</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(4)">ث</td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(5)">ج</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(6)">ح<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(7)">خ<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(8)">د</td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center; " onClick="popxa(9)">ذ</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(10)">ر<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(11)">ز<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(12)">س<br>
                  </td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(13)">ش<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(14)">ص<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(15)">ض<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(16)">ط</td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(17)">ظ<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(18)">ع<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(19)">غ</td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(20)">ف<br>
                  </td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(21)">ق<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(22)">ك<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(23)">ل<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(24)">م</td>
                </tr>
                <tr>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(25)">ن<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(26)">هـ<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(27)">و<br>
                  </td>
                  <td class="tdbox" style="text-align: center;" onClick="popxa(28)">ي<br>
                  </td>
                </tr>
              </tbody>
</table>
          
</td>
         
 <td style="width: 184.183px;"><br>
            
<form><br>
            
  &nbsp; <label class="labclass">بحث: </label>&nbsp;<input id="intxt" type="text" onKeyUp="SearchInList()">
              
<div style="text-align: center;"> &nbsp; &nbsp; &nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;
                
<select class="SelStyle" name="drop1" id="Select1"   onclick = "play_video()" multiple="multiple"  onChange="HasImage()">

                </select>
</div>

</form>

 </td>
 
 <td style="width: 500 px; "text-align: center;"> 
 <button id="picbtn" class="picbutton"  onclick="LoadPoster()">صورة  </button>
<video  width="456" height="342" controls id="vidcontrol"  type="video/webm"  style="margin:1px;padding:1px;border:5px solid black;">
</video>
</td>

</tr>

</tbody>

</table>
  </div>
</body>

</html>
