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
	if( document.getElementById("newcat").disabled=="disabled" )  return;

	//var lstr=GetLetter(ordn);	     
	 var lstr=ordn.toString(); 
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
	if( document.getElementById("newcat").disabled=="disabled" )  return;

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
	if( document.getElementById("newcat").disabled )  return;

	var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+ "numbers2.php"
	 window.location.assign(ppp);
}
////////////////////////////////////////////////////////////
function GoArabic()
{
		if( document.getElementById("newcat").disabled )  return;

	var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+ "numbers.php"
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
//////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////
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

function writetosign()
{
	sessionStorage.setItem("ndivisions","0");
	var ss = document.getElementById("newcat").value;
  if(isNumeric(ss))
	document.getElementById("signdiv").innerHTML =DivideNumber(ss);
	else  {
		document.getElementById("newcat").value="";
		document.getElementById("signdiv").innerHTML ="";
		sessionStorage.setItem("ndivisions","0");
	}
}

function  DivideNumber(str)

{

var nn=[]
if(str.length==0) {sessionStorage.setItem("ndivisions","0");return "";}
if(str.length>1)nn=str.split('');
else nn.push(str);
var gg=Math.floor(nn.length /3);
if((nn.length % 3)>0) gg=gg+1;
var ff=nn.length % 3;
var ss="";
var sss="";

var s1="<span id='w" ;
var s2="' class='sp1' >" ;
var s3=" </span>";
startpos=0;
for(var i=0;i<gg;i++) 
{
	if(ff>0 && i==0) { 
	  					ss=str.substr(startpos,ff);
					     sss=s1+(i+1).toString()+s2+ss+s3;
					   if(i<gg-1) sss=sss+",";
					   startpos=startpos+ff;
	}
	else  {
	     ss=str.substr(startpos,3);
		 sss=sss+s1+(i+1).toString()+s2+ss+s3;
		 if(i<gg-1) sss=sss+",";
		  startpos=startpos+3;
						
	                     }
						 
}
	sessionStorage.setItem("ndivisions",gg.toString());
	sessionStorage.setItem("current_division","1");
	sessionStorage.setItem("current_video","0");
	return sss;
}
///////////////////////////////////////////////////////////////////
function PlayIt()
{
	if(sessionStorage.getItem("status")=="pause")
	{
	document.getElementById("vidcontrol").play();
	sessionStorage.setItem("status","play");
	return;
	}
var ss = document.getElementById("newcat").value;
sessionStorage.setItem("pharase",ss);
if(ss!="") document.getElementById("newcat").disabled = true;
else return;
var ndv=parseInt(sessionStorage.getItem("ndivisions"),10);
if(!isNaN(ndv)) if(ndv>0)
{
var	nn=document.getElementById("w1").innerHTML ;
var dd=	Readhandreds(parseInt(nn,10));
if(ndv==2) dd.push("1000");
if(ndv==3) dd.push("1000000");
if(ndv==4) dd.push("1000000000");
sessionStorage.setItem("ndvideo",dd.toString());
document.getElementById("w1").className="sp2";

var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/video/" + GetVideoName(dd[0]) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            
sessionStorage.setItem("status","play");
}

	
}

function PlayAnotherVideo()
{
	if(sessionStorage.getItem("status")=="stop") 
	{
	sessionStorage.setItem("ndivisions","0");
	sessionStorage.setItem("current_division","0");
	sessionStorage.setItem("current_video","0");
    sessionStorage.setItem("ndvideo","");
	document.getElementById("newcat").value="";
	document.getElementById("signdiv").innerHTML="";
    document.getElementById("newcat").disabled = false;
    return;
	}
	if(sessionStorage.getItem("status")=="reload") 
	{
		var kk=parseInt(sessionStorage.getItem("ndivisions"),10);
		for(var j=1; j<=kk;j++)
		document.getElementById("w"+j.toString()).className="sp1";
		sessionStorage.setItem("current_division","1");
        sessionStorage.setItem("current_video","0");
		PlayIt();
        return;
	}
	
if( !document.getElementById("newcat").disabled )  return;

var currentv=parseInt(sessionStorage.getItem("current_video"),10);

//if(isNaN(currentv)) return;
	var ss=[];
var	sss=sessionStorage.getItem("ndvideo");
if (sss.indexOf(",")>0) ss=sss.split(",");
else ss.push(sss);
currentv=currentv+1;
if (currentv<ss.length) 
{
sessionStorage.setItem("current_video",currentv.toString());
var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/video/" + GetVideoName(ss[currentv]) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            
sessionStorage.setItem("status","play");
}
else { 

    var k=parseInt(sessionStorage.getItem("ndivisions"),10);
	var currentd =parseInt(sessionStorage.getItem("current_division"));
	document.getElementById("w"+currentd.toString()).className="sp1";

	currentd=currentd+1;
if(currentd<=k)
{
sessionStorage.setItem("current_video",0);
sessionStorage.setItem("current_division",currentd.toString());
	var	nn=document.getElementById("w"+currentd.toString()).innerHTML ;
var dd=	Readhandreds(parseInt(nn,10));
if(currentd==2 && k==3) dd.push("1000");
if(currentd==2 && k==4) dd.push("1000000");
if(currentd==3 && k==4) dd.push("1000");
sessionStorage.setItem("ndvideo",dd.toString());

document.getElementById("w"+currentd.toString()).className="sp2";
var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/video/" + GetVideoName(dd[0]) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            

sessionStorage.setItem("status","play");
}
else 
{
	sessionStorage.setItem("ndivisions","0");
	sessionStorage.setItem("current_division","0");
	sessionStorage.setItem("current_video","0");
    sessionStorage.setItem("ndvideo","");
	document.getElementById("newcat").value="";
	document.getElementById("signdiv").innerHTML="";
    document.getElementById("newcat").disabled = false;
	}
	
}

}
function PauseIt()
{
sessionStorage.setItem("status","pause");
document.getElementById("vidcontrol").pause();

}

function StopIt()
{
	
	sessionStorage.setItem("status","stop");

	

}

function RepeatIt()
{
	sessionStorage.setItem("status","reload");
	document.getElementById("vidcontrol").stop();

}


