/////jquery events and functions
$(document).ready(function() {
/////switch alphabets Arabic English
$(document).on('click','.alphabetbtncontainer .switchalphabetsbtn',function(){
var tolanguage=$(this).data('tolang')
switch(tolanguage){
case "English":
GoEnglish();
break;	
case "Arabic":
GoArabic();
break;		
}
})////end of func

//////click on any alphabet either Arabic or English

$(document).on('click','.alphabetscontainer .alphabox',function(){
var lang=$(".alphabetscontainer").data('lang')
var alphabetid=parseInt($(this).data('letterid'))
event.preventDefault()
switch(lang){
case "Ar":
activalphabet($(this));
popxa(alphabetid);
break;	
case "En":
activalphabet($(this));
popx(alphabetid);
break;		
}
})////end of func


})///end of doc ready
function popxa(ordn) 

{
	var lstr=GetLetter(ordn);	     
	
        var vv = document.getElementById("vidcontrol");
   
	   	
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+"res/video/" + GetVideoNameOld( lstr) + "/1.webm";
           // vv.src= "./res/video/" + GetVideoName( lstr) + ".webm";
	    vv.src= ppp;
        vv.load();
        vv.play();            


}
////////////////////////////////////////////////////////////
function popx(ordn) 

{
	var lstr=GetLetter(ordn + 53);	     
	
        var vv = document.getElementById("vidcontrol");
   
	   	
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+"res/video/" + GetVideoNameOld( lstr) + "/1.webm";
           // vv.src= "./res/video/" + GetVideoName( lstr) + ".webm";
	    vv.src= ppp;
        vv.load();
        vv.play();            


}
////////////////////////////////////////////////////////////
function GoEnglish()
{
	var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+ "alphabete.php"
	 window.location.assign(ppp);
}
////////////////////////////////////////////////////////////
function GoArabic()
{
	var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+ "alphabet.php"
	 window.location.assign(ppp);
}
/////////////////////////////////////////////////////////////
function LoadPoster()
{
var vv = document.getElementById("vidcontrol");
vv.poster="";      
var sss=vv.src;
var pos =sss.indexOf(".webm");
if (pos>1){vv.poster=sss.replace(".webm",".png");vv.src="";} 
}

////////////////////////////////////////////////////////////
function activalphabet(element){
	//alert(element);
	//alert(element.id);
		$( "a.alphabox" ).each(function() {
    $(this).removeClass('alphactive');
	//alert(this);
  });
 
	$(element).removeClass('alphactive').addClass('alphactive');
}

function ReturnPicNo(word)
{
	dd=GetVideoNameOld(word) ;
	 var vvv= document.URL ;
 	 var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1)+"res/images/"+dd+"/" ;
	var xx=0;
	var i=0;
	while (UrlExists(ppp+(i+1)+".jpg")>0)
	{
		i++;
	
	}
	return i;
}


function ShowImage(param) {
    var sss=document.getElementById("wordTit").innerHTML;
    var ss =document.getElementById("wordimage").name ;
	var vv=document.getElementById("picdiv").name;
	var currpic=parseInt(vv,10);
	var cnt= parseInt(ss,10);
	if(param>0) if(currpic<cnt) {currpic++; document.getElementById("picdiv").name=currpic;}
    if(param==0) if(currpic>1) {currpic--; document.getElementById("picdiv").name=currpic;}
	
	if (cnt > 0) {
        $("#wordimage").toggle("slide");
        //$("#wordimage").attr('src',zz[xx]);
        $("#wordimage").attr('src', 'res/images/' +GetVideoNameOld(sss)+"/"+ currpic + ".jpg");
        $("#wordimage").toggle("slide");
               
    }
}
function LoadPics()
{
	var ss=document.getElementById("wordTit").innerHTML;
	
	var xx= ReturnPicNo(ss);
	document.getElementById("wordimage").name=xx;
	document.getElementById("picdiv").name=0;
	if (xx>0)
	{
		document.getElementById("videodiv").style.display="none";
		document.getElementById("picdiv").style.display="block";
		ShowImage(1);
	}
	
}

function LoadVideo()
{
		document.getElementById("picdiv").style.display="none";
	document.getElementById("videodiv").style.display="block";
	
}

function IsPicThere(picurl)
{
	var xx=0;
	$.ajax({
    url:picurl,
    type:'HEAD',
    error: function()  {xx=0;},
    success: function() {xx=1;   }
});

return xx;
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
