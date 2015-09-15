

//// when a word is selected play the video according to the word and show the word in the title//////
function play_video() 
    {
		document.getElementById("videodiv").style.display="none";
		document.getElementById("picdiv").style.display="block";
       sessionStorage.setItem("dvideo","none");
	   sessionStorage.setItem("current","0");
	   sessionStorage.setItem("vcount","0");

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
		FillSyon(ss);
		FillDrevs(ss);
		ShowExplain(ss);
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
		ppp=ppp+"res/images/" + GetVideoName(ss) + "/1.jpg";
		var flag=UrlExists(ppp);
		if(!flag) {var dog= CorrectPicName(ppp);
		              flag=UrlExists(dog);
					  }
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
//////////////////////////////////////////////////////////////////////////////////////////
 function inlist(str) {
    var f = false;
    for (var i = 0; i < document.getElementById("Select2").options.length; i++) {
             var sss = document.getElementById("Select2").options[i].text;
             if (sss == str) { f = true; }

         }
         return f;
   }


////////////////////////////////////////
function populate() 
{
var AllWords=GetAllWords();
document.getElementById("Select1").innerHTML = "";


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

document.getElementById("Select2").innerHTML = "";
       
         var cats = Getcats();
/////// creating option for all words //////
var ob0 = document.createElement("option");

                ob0.text = "جميع الكلمات";
                ob0.value = "جميع الكلمات";
                ob0.name = "catop" + (0);
                ob0.id = "catop" + (0);
				//ob0.onclick ="populate()";
 document.getElementById("Select2").add(ob0);
//alert("object option  "+ ob0.text);
 ///////////////////////////////////////
         for (var i = 0; i < cats.length; i++) {
             var catob = document.createElement("option");
             catob.text = cats[i];
             catob.value = cats[i];
             catob.name = "catop" + (i + 1);
             catob.id = "catop" + (i + 1);
             document.getElementById("Select2").add(catob);
         }

//         var cats = GetUserCats();

//         for (var j = 0; j < cats.length; j++) {
//             if(! inlist(cats[j]))
//             { 
//             var catob = document.createElement("option");
//             catob.text = cats[j];
//             catob.value = cats[j];
//             catob.name = "catop" + (i + j + 1);
//             catob.id = "catop" + (i + j  +  1);
//             document.getElementById("Select2").add(catob);
//             }
//         }

}

////////////////////////////////////////////////////////////
 function loadcatwords() 
{
document.getElementById("intxt").value="";
        var lst = document.getElementById("Select2");
        var j = 0;
        var ss = "";
		var selectedId=""

        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                
                ss = lst.options[i].value.toLowerCase();
				showcatTit(ss);
				selectedId=lst.options[i].id;
				//alert(j);
            }
        }

        if (j == 1) {
	document.getElementById("Select1").innerHTML = "";
	
	if(selectedId=="catop0"){
		populate();
		
	}else{
	var catwords =  GetCatWords(ss);

         for (var i = 0; i < catwords.length; i++) {
             var ob = document.createElement("option");
             ob.text = catwords[i];
             ob.value = catwords[i];
             ob.name = "op" + (i + 1);
             ob.id = "op" + (i + 1);
             document.getElementById("Select1").add(ob);
         }

	}
	$("#accordion1").accordion({active:1});
//         var ucatwords = GetUserCatWords(ss);

//         for (var j = 0; j < ucatwords.length; j++) {
          
            
//             var ob = document.createElement("option");
//             ob.text = ucatwords[j];
//             ob.value = ucatwords[j];
//             ob.name = "op" + (i + j + 1);
//             ob.id = "op" + (i + j  +  1);
//             document.getElementById("Select1").add(ob);
//             
//         }
}
}

//////////////////
// accordion tabs controller  funciton //
$(function() {
    $("#accordion1").accordion();
  });

////////////// Show the selected category and word in the title ////
function showcatTit(ctitle){
	document.getElementById("wordTit").innerHTML=""
	document.getElementById("catTit").innerHTML=ctitle;
}
function showwordTit(wtitle){
	document.getElementById("wordTit").innerHTML=wtitle;
	
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
               
 

/////////////////////////////////////////////////////////////////////
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

/////////////////////////////////
function FillSyon(str)
{
var ss= GetSyn(str);
document.getElementById("synsel").innerHTML = "";
var lst=document.getElementById("synsel");
for (var i=0;i<ss.length;i++) 
{
	var option = document.createElement("option");
    option.text = ss[i];
    option.value=ss[i];
	lst.add(option);
	}
}

function FillDrevs(str)
{
	
var ss= GetDrevs(str);
document.getElementById("drevsel").innerHTML = "";

var lst=document.getElementById("drevsel");

for (var i=0;i<ss.length;i++) 
{
	 var option = document.createElement("option");
             
    option.text = ss[i];
    option.value=ss[i];
	lst.add(option);
	}

	
}
/////////////////////////////////////////////////////////////////
function ShowExplain(str)
{
	var ss=GetExplain(str);
	if(ss!="") {
		         document.getElementById("txtexplain").value=ss;
				  document.getElementById("explaindiv").style.display="block";
		}
		else  document.getElementById("explaindiv").style.display="none";
}
///////////////////////////////////////////////////////////////////////
function PlayExplainVideo()
{
document.getElementById("picdiv").style.display="none";
document.getElementById("videodiv").style.display="block";
var lst = document.getElementById("Select1");

var ss = "";
 
		
for (var i = 0; i < lst.options.length; i++) if (lst.options[i].selected == true) ss = lst.options[i].value.toLowerCase();
            

        
var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/videoex/" + GetVideoName(ss) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            

        }
////////////////////////////////////////////////////////////////
function PlayDrevVideo()
{
	var lst = document.getElementById("drevsel");

var ss = "";
 
		
for (var i = 0; i < lst.options.length; i++) if (lst.options[i].selected == true) ss = lst.options[i].value.toLowerCase();
if(ss!="")
{
document.getElementById("picdiv").style.display="none";
document.getElementById("videodiv").style.display="block";

	var dd=ReturnDeriv(ss);
if(dd.length>0)	{
	sessionStorage.setItem("dvideo",dd.toString());
	sessionStorage.setItem("current","0");
	sessionStorage.setItem("vcount",dd.length);
var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/video/" + GetVideoName(dd[0]) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            

}

}
}

function PlayAnotherVideo()
{
	var sss=sessionStorage.getItem("current");
	var ss =sessionStorage.getItem("vcount");
	var vcount=parseInt(ss,10);
	var current=parseInt(sss,10);
	if (vcount>0 && current<vcount)
	{
		current=current+1;
		sessionStorage.setItem("current",current);
		var dd=sessionStorage.getItem("dvideo").split(",");
		var vv = document.getElementById("vidcontrol");		
var vvv= document.URL ;
var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
ppp=ppp.replace("#","");
	
ppp=ppp+"res/video/" + GetVideoName(dd[current]) + "/1.webm";
	
vv.src=ppp;
vv.poster="";
vv.play();            

		
	}
	
	else {
		sessionStorage.setItem("dvideo","none");
	   sessionStorage.setItem("current","0");
	   sessionStorage.setItem("vcount","0");

	}
	
}