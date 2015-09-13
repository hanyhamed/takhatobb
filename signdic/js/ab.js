    function play_video() 
    {

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
		
     if(document.getElementById("videodiv").style.display=="none")
		{
			if ( HasImage()){LoadPics();return;}
		}
        if (j == 1) {
             
        var vv = document.getElementById("vidcontrol");
	    //vv.setAttribute("controls");
		
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+"video/" + GetVideoName(ss) + ".webm";
		 HasImage();
		//alert(ppp);
		vv.src=ppp;
	    //vv.src="./video/" + GetVideoName(ss) + ".webm";
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
	
	
     document.getElementById("wordimage").src="images/loading.gif";

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
		ppp=ppp+"images/pics/" + GetVideoName(ss) + "/1.jpg";
		var flag=UrlExists(ppp);
		if (flag)  document.getElementById("postimg").className = "bubble big orange";
		else {
			 document.getElementById("wordimage").src="images/pics/0.jpg";
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
	    vv.poster="./images/pics/" + ss + "/1.jpg";

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
	dd=GetVideoName(word) ;
	 var vvv= document.URL ;
 	 var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1)+"images/pics/"+dd+"/" ;
	var xx=0;
	var i=0;
	while (UrlExists(ppp+(i+1)+".jpg")>0)
	{
		i++;
	
	}
	if (i>1) document.getElementById("nxtimg").src="images/nextr.png";
	else document.getElementById("nxtimg").src="images/next.png";
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
	
	if (currpic>1 ) document.getElementById("previmg").src="images/prevr.png";
                else document.getElementById("previmg").src="images/prev.png";
               if (currpic<cnt  && cnt>0) document.getElementById("nxtimg").src="images/nextr.png";
                else document.getElementById("nxtimg").src="images/next.png";    
	
	if (cnt > 0) {
        $("#wordimage").toggle("slide");
        //$("#wordimage").attr('src',zz[xx]);
        $("#wordimage").attr('src', 'images/pics/' +GetVideoName(sss)+"/"+ currpic + ".jpg");
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

