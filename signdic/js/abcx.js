////jquery evnets and functions
$(document).ready(function() {
/////switch alphabets Arabic English
$(document).on('click','#accordion .alphabetwords .alphabox',function(){
	var filterletterid =$(this).data('letterid');
	//alert(filterletterid )
	console.log($(this).data('letterid'))
	if(parseInt(filterletterid)!=29){
	activalphabet($(this));
	popxa(parseInt(filterletterid));
	}else{
		activalphabet($(this));
		populate();
	}
	$("#accordion").accordion({active:1});
})

})//end of doc ready

function play_video() 
    {
		document.getElementById("videodiv").style.display="none";
		document.getElementById("picdiv").style.display="block";
        var lst = document.getElementById("Select1");
        var j = 0;
        var k = 0;
        var ss = "";
		var wordtitle=document.getElementById("wordTit");
 
		
        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                k = i;
                ss = lst.options[i].value.toLowerCase();
				wordtitle.innerHTML=ss;
            }


        }
        if(document.getElementById("videodiv").style.display=="none" &&  j>0)
		{
			if ( HasImage()){LoadPics();return;}
			
		}
        if (j >0) {
             document.getElementById("nxtvid").src="images/next.png";
             document.getElementById("prevvid").src="images/prev.png";
        var vv = document.getElementById("vidcontrol");
	    //vv.setAttribute("controls");
		
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
	
		ppp=ppp+"res/video/" + GetVideoName(ss) + "/1.webm";
		 HasImage();
		 ReturnVidNo(ss);
		//alert(ppp);
		vv.src=ppp;
	    //vv.src="./res/video/" + GetVideoName(ss) + ".webm";
	    vv.poster="";
		// vv.load();
          vv.play();            

        }
    }
////////////////////////////////////////////////////////////

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}	
/////////////////////////////////////////////////////////////
function HasImage()
{
	  var lst = document.getElementById("Select1");
        var j = 0;
        var k = 0;
        var ss = "";
	
	
      if(document.getElementById("videodiv").style.display=="none") document.getElementById("wordimage").src="images/loading.gif";

        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                k = i;
                ss = lst.options[i].value.toLowerCase();
            }


        }

        if (j == 1) {
             var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+"res/images/" +GetVideoName(ss) + "/1.jpg";
		var flag=UrlExists(ppp);
		if(!flag)  flag=UrlExists(CorrectPicName(ppp));

		if (flag)  document.getElementById("postimg").className = "bubble big orange";
		else {
			 document.getElementById("wordimage").src="res/images/0.jpg";
			 document.getElementById("postimg").className = "bubble big gray";}
		}
		return flag;
}
////////////////////////////////////////////////////////////
function LoadPoster()
{
if(! HasImage()) return;
        var lst = document.getElementById("Select1");
        var j = 0;
        var k = 0;
        var ss = "";
	
	
 

        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                k = i;
                ss = lst.options[i].value.toLowerCase();
            }


        }

        if (j == 1) {
             ss=GetVideoName(ss);
            var vv = document.getElementById("vidcontrol");
            vv.poster="";
	    vv.src="";
	    vv.removeAttribute("controls");
	    vv.poster="./res/images/" + ss + "/1.jpg";

           }
}

////////////////////////////////////////////////////////////

 function SearchInList() {
            var ss = document.getElementById("intxt");
            var sss = ss.value;
document.getElementById("Select1").innerHTML = "";
var swords=GetAllwordStartingWith(sss)
for(var i=0;i<swords.length;i++) 
{
var ob = document.createElement("option");

    ob.text = swords[i];
    ob.value = swords[i];
    ob.name = "op" + (i + 1);
    ob.id = "op" + (i + 1);
    document.getElementById("Select1").add(ob);

}
          var l = document.getElementById('Select1');
			
      if (sss.length > 0) 
            {
				
				
				
                for (var i = 0; i < l.options.length; i++) {
                    var str = l.options[i].text;
                    
                    if (str == sss)  l.options[i].selected = true;
                    else  l.options[i].selected = false;  
                }
           }
//            else { l.selectedIndex = -1; }  
        }
////////////////////////////////////////////////////////
////////////////////////////////////////
function populate() 
{

//$(document).ready(function() {
var AllWords=GetAllWords();
document.getElementById("Select1").innerHTML = "";
$("#intxt").val("");

 for(var i=0;i<AllWords.length;i++) 
{
var ob = document.createElement("option");
            
                ob.text = AllWords[i];
                ob.value = AllWords[i];
                ob.name = "op" + (i + 1);
                ob.id = "op" + (i + 1);
 document.getElementById("Select1").add(ob);
 

}

//AllWords=GetUserWords();

// for(var j=0;j<AllWords.length;j++) 
//{
//var ob = document.createElement("option");
//ob.text = AllWords[j];
//ob.value = AllWords[j];
//ob.name = "op" + (i + j + 1);
//ob.id = "op" + (i + j + 1);
//document.getElementById("Select1").add(ob);

//}
//})

}
////////////////////////////////////////////////////////////////////
function popxa(ordn) 
{
var lstr=GetLetter(ordn);
document.getElementById("intxt").value=lstr;
document.getElementById("Select1").innerHTML = "";

var swords=GetAllwordStartingWith(lstr)
 
for(var i=0;i<swords.length;i++) 
{
var ob = document.createElement("option");

    ob.text = swords[i];
    ob.value = swords[i];
    ob.name = "op" + (i + 1);
    ob.id = "op" + (i + 1);
    document.getElementById("Select1").add(ob);

}

}
//////////////////
$(function() {
    $( "#accordion" ).accordion();
  });
  
function activalphabet(element){

$( "a.alphabox" ).each(function() {
    $(this).removeClass('alphactive');
});
	$(element).removeClass('alphactive').addClass('alphactive');
}

function ReturnPicNo(word)
{
	dd=GetVideoName(word) ;
	 var vvv= document.URL ;
 	 var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1)+"res/images/"+dd+"/" ;
	var xx=0;
	var i=1;
	while (UrlExists(ppp+(i+1)+".jpg")>0 || UrlExists(CorrectPicName(ppp)+(i+1)+".jpg")>0  )
	{
		i++;
	
	}
	if (i>1) document.getElementById("nxtimg").src="images/nextr.png";
	else document.getElementById("nxtimg").src="images/next.png";
	return i;
}
//////////////////////////////////////////////////////////////////////
function ReturnVidNo(word)
{
	dd=GetVideoName(word) ;
	 var vvv= document.URL ;
 	 var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1)+"res/video/"+dd+"/" ;
	var xx=0;
	var i=0;
	while (UrlExists(ppp+(i+1)+".webm")>0)
	{
		i++;
	
	}
		if (i>1) document.getElementById("nxtvid").src="images/nextr.png";
	else document.getElementById("nxtvid").src="images/next.png";
	document.getElementById("morevid").name=i;
	document.getElementById("nxtvid").name="1";
	
}
////////////////////////////////////////////////////////////////////////

function ShowImage(param) {
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(is_chrome ) setTimeout( "ImageReload()",12000);

    var sss=document.getElementById("wordTit").innerHTML;
    var ss =document.getElementById("wordimage").name ;
	var vv=document.getElementById("picdiv").name;
	var currpic=parseInt(vv,10);
	var cnt= parseInt(ss,10);
	if(param>0) if(currpic<cnt) {currpic++; document.getElementById("picdiv").name=currpic;}
    if(param==0) if(currpic>1) {currpic--; document.getElementById("picdiv").name=currpic;}
	
	if (currpic>1 ) document.getElementById("previmg").src="images/prevr.png";
                else document.getElementById("previmg").src="images/prev.png";
               if (currpic<cnt  && cnt>0) document.getElementById("nxtimg").src="images/nextr.png";
                else document.getElementById("nxtimg").src="images/next.png";    
	
	if (cnt > 0) {
        $("#wordimage").toggle("slide");
        //$("#wordimage").attr('src',zz[xx]);
    var vvv= document.URL ;
 var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
ppp=ppp+"res/images/" +GetVideoName(sss)+"/"+ currpic + ".jpg";

if(!UrlExists(ppp))  $("#wordimage").attr('src', CorrectPicName(ppp));
	else  $("#wordimage").attr('src', ppp);
        $("#wordimage").toggle("slide");
               
    }
}
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
function Showvid(param) {
    var sss=document.getElementById("wordTit").innerHTML;
    var ss =document.getElementById("morevid").name ;
	var vv=document.getElementById("nxtvid").name;
	var currpic=parseInt(vv,10);
	var cnt= parseInt(ss,10);
	if(param>0) if(currpic<cnt) {currpic++; document.getElementById("nxtvid").name=currpic;}
    if(param==0) if(currpic>1) {currpic--; document.getElementById("nxtvid").name=currpic;}
	if (currpic>1 ) document.getElementById("vidcontrol").style.borderColor="#0000FF";
	else document.getElementById("vidcontrol").style.borderColor="#00FF00";
	
	if (currpic>1 ) document.getElementById("prevvid").src="images/prevr.png";
	     else document.getElementById("prevvid").src="images/prev.png";
               if (currpic<cnt  && cnt>0) document.getElementById("nxtvid").src="images/nextr.png";
                else document.getElementById("nxtvid").src="images/next.png";    

	
       var vvv= document.URL ;
      var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
      ppp=ppp.replace("#","");
    ppp=ppp+"res/video/" +GetVideoName(sss)+"/"+ currpic + ".webm";
	document.getElementById("vidcontrol").src=ppp;
	document.getElementById("vidcontrol").play();
}
               

//////////////////////////////////////////////////////////////////////
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
	
	     var lst = document.getElementById("Select1");
        var j = 0;
        var k = 0;
        var ss = "";
		var wordtitle=document.getElementById("wordTit");
 
		
        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                k = i;
                ss = lst.options[i].value.toLowerCase();
				wordtitle.innerHTML=ss;
            }


        }
        
        if (j >0) {
             document.getElementById("nxtvid").src="images/next.png";
             document.getElementById("prevvid").src="images/prev.png";
        var vv = document.getElementById("vidcontrol");
	    //vv.setAttribute("controls");
		
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
	
		ppp=ppp+"res/video/" + GetVideoName(ss) + "/1.webm";
		 HasImage();
		 ReturnVidNo(ss);
		//alert(ppp);
		vv.src=ppp;
	    //vv.src="./res/video/" + GetVideoName(ss) + ".webm";
	    vv.poster="";
		// vv.load();
          vv.play();            

        }

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

function ImageReload()
{
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(is_chrome)
{
var mm =document.getElementById("wordimage").src;

var rr=mm.indexOf("loading.gif");
if (rr>=0 && document.getElementById("videodiv").style.display!="none") {
var vv=document.getElementById("picdiv").name;
var currpic=parseInt(vv,10);
currpic--;
document.getElementById("picdiv").name=currpic;
ShowImage(1);

}
}
}