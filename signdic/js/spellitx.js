function writetosign()
{
//str="<span class='sp1' >" + document.getElementById("newcat").value + "</span>";
    //document.getElementById("signdiv").innerHTML=str;
    //handlepaste() 

	var ss = document.getElementById("newcat").value;
    if(ss.indexOf("  ")>0)
	{
	var sss=	ss.replace(/\s+/g,' ').trim();
	document.getElementById("newcat").value=Noquots(sss);

	
	}
 FoundOrNot();
}
///////////////////////////////////////////////////////////////////////////////////


function analyseit()
{
if(sessionStorage.getItem("status")=="pause")
{
sessionStorage.setItem("status","play");
callit();
return;
}
var ss=Noquots(document.getElementById("newcat").value);
var ss=trimstr(ss);
document.getElementById("newcat").value=Noquots(ss);
if (ss!="") {
                 document.getElementById("newcat").disabled=true;
                 document.getElementById("cmdtrans").disabled=true;
                 document.getElementById("signdiv").name="abcd";
         		 var n=ss.indexOf(" ");
	         if(n>0)  {var sss=ss.split(" ") ;sss=SearchExprssions(sss);document.getElementById("cmdtrans").name=sss.length;  }
                  else {document.getElementById("cmdtrans").name="1";}
                  document.getElementById("newcat").name="0";
//                  anlaysePharase();
                  
                  signit();
		}

}
////////////////////////////////////////////////////////////////
function signit()
{
var ss=document.getElementById("cmdtrans").name;
var sss=document.getElementById("newcat").name;
var noofwords=parseInt(ss,10);
words_displayed=parseInt(sss,10);

if (noofwords ==words_displayed)
                                {//1	
            		  document.getElementById("newcat").disabled=false;
 			          document.getElementById("cmdtrans").disabled=false;

				}//1c
else
{//2

var wordstr ="";
var str=Noquots(document.getElementById("newcat").value);
str=Withoutquot(str);
if (noofwords==1){wordstr=str;} else {var strarr=str.split(" "); strarr=SearchExprssions(strarr);wordstr=strarr[words_displayed];}
if (FoundInDic(wordstr)) {//3
			               words_displayed=words_displayed+1; 
                           document.getElementById("newcat").name=words_displayed;                         
                           document.getElementById("vidcontrol").name="abc";
                          if(GetWordCat(wordstr)=="أفعال شائعة") {//4
							  document.getElementById("signdiv").name=wordstr; 
						  
						   var fl=wordstr.substr(0,1);
							var qqq="bororoom";
							if(words_displayed>1)  qqq=strarr[words_displayed-1];
							if ( (fl=="أ" || fl=="ا") && (qqq.trim()=="أنا" ||  qqq.trim()=="انا") ) DisplayVideo("الآن");
                             else   DisplayVideo("الماضى");
						 
			              //DisplayVideo(wordstr);
                               
                                 }//4c
								 else  DisplayVideo(wordstr);
}//3c
else 
    {//5
     var advstr=AdvencedSearch(wordstr);
     if (advstr!="Bombaaa")
      {
      words_displayed=words_displayed+1; 
      document.getElementById("newcat").name=words_displayed;                         
      document.getElementById("vidcontrol").name="abc";                  
      DisplayVideo(advstr);
      }
      else {
     document.getElementById("vidcontrol").name="0";
     SpellWord();
      }         
 
   }//5c

}//2c
}


///////////////////////////////////////
function SpellWord()
{
var ss=document.getElementById("cmdtrans").name;
var sss=document.getElementById("newcat").name;
var ssss=document.getElementById("vidcontrol").name;
var noofwords=parseInt(ss,10);
words_displayed=parseInt(sss,10);
letters_displayed=parseInt(ssss,10);

var str=Noquots(document.getElementById("newcat").value);
if (noofwords==1){wordstr=str;} else {var strarr=str.split(" "); strarr=SearchExprssions(strarr); wordstr=strarr[words_displayed];}
var n=wordstr.length;


if (letters_displayed==n){
			 words_displayed=words_displayed+1; 
              document.getElementById("newcat").name=words_displayed;
			 document.getElementById("vidcontrol").name="abc";
			 signit();			
			
                         } 
						 

else {var arr=wordstr.split("");
      letters_displayed=letters_displayed+1;
      document.getElementById("vidcontrol").name= letters_displayed;
      DisplayVideoA(arr[letters_displayed-1])  ;  
   
    
	}
}
//////////////////////////////////////////////////
function DisplayVideo(str)

{
HighLightWord();
var ss=GetVideoName(str);
var vv = document.getElementById("vidcontrol");
	
	    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		ppp=ppp+"res/video/" +ss + "/1.webm";
		vv.src =ppp;
		
//vv.src = "./video/" + ss + ".webm";
}
////////////////////////////////////////////////////////////
function DisplayVideoA(str)

{
HighLightLtter();
var ss=GetVideoNameA(str);
var vv = document.getElementById("vidcontrol");
    var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		ppp=ppp+"res/video/" +ss + "/1.webm";
		vv.src =ppp;
//vv.src="./video/" + ss + ".webm";
          

}
////////////////////////////////////////////////////////////////
function callit()
{
	if(sessionStorage.getItem("status")=="pause") return;
var flag=false;
var vv=document.getElementById("vidcontrol");

if (vv.ended) 
{

var sss=vv.name;

if (sss=="abc"){flag =MoreSigns();   if (flag==true){DisplayMoreSigns();} else { darkit(); signit();}}
else {darkit();SpellWord();}
}

}
//////////////////////////////////////////////////////////////////////////////////////
function anlaysePharase()
{

var innerstr="";
var sss=[];

var temp=document.getElementById("cmdtrans").name;
var noofwords=parseInt(temp,10);

var ss=Noquots(document.getElementById("newcat").value);


           if(noofwords>0)  {var sss=ss.split(" ") ;}   else {sss.push(ss);}
             for (var i=0;i<sss.length; i++)
             {var ts=sss[i]; 
             innerstr=innerstr+"<span id='w" + i + "' class='sp1' >" + ts + " </span>";
               }
                 
                                                            
document.getElementById("signdiv").innerHTML=innerstr;



}
////////////////////////////////////

function HighLightWord()
{
var innerstr="";
var sss=[];

var temp1=document.getElementById("cmdtrans").name;
var temp2=document.getElementById("newcat").name;
var noofwords=parseInt(temp1,10);
var words_displayed=parseInt(temp2,10);

var ss=Noquots(document.getElementById("newcat").value);


           if(noofwords>1)  {var sss=ss.split(" ") ; sss=SearchExprssions(sss);}   else {sss.push(ss);}
             
for (var i=0;i<sss.length; i++)
             {var ts=sss[i];
                if (i== (words_displayed-1)){    innerstr=innerstr+"<span id='w" + i + "' class='sp2' >" + ts + " </span>" ;}
                else {innerstr=innerstr+"<span id='w" + i + "' class='sp1' >" + ts + " </span>" ;}
               }
                 
                                                             
document.getElementById("signdiv").innerHTML=innerstr;



}
//////////////////////////////////////////
function HighLightLtter()
{
var innerstr="";
var wrds=[];

var ss=document.getElementById("cmdtrans").name;
var sss=document.getElementById("newcat").name;
var ssss=document.getElementById("vidcontrol").name;
var noofwords=parseInt(ss,10);
var words_displayed=parseInt(sss,10);
var letters_displayed=parseInt(ssss,10);

var ww=Noquots(document.getElementById("newcat").value);
if(noofwords>0)  {var wrds=ww.split(" ") ; wrds=SearchExprssions(wrds);}   else {wrds.push(ww);}

for (var i=0;i<wrds.length; i++)
{
if (words_displayed==i){
                         var temp=wrds[i];
                         var larr=temp.split('');
                         for (var j=0;j< larr.length;j++) {
                         if(j==(letters_displayed-1))  
                            {innerstr=innerstr + "<span id='ltr" + j + "' class='sp2' >" + larr[j] + "</span>" ;} 
                      else  {innerstr=innerstr + "<span id='ltr" + j + "' class='sp1' >" + larr[j] + "</span>" ;}
                         }
                        } 
else {innerstr=innerstr+"<span id='w" + i + "' class='sp1' > " + wrds[i] + " </span>" ;}                       
                        
}

document.getElementById("signdiv").innerHTML=innerstr;
}

function darkit()
{
var sss =document.getElementById("signdiv").innerHTML;
sss=sss.replace("sp2","sp1");
document.getElementById("signdiv").innerHTML=sss;
}

function trimstr(str)
{
var ss=str.replace(/^\s+/,'');
var sss=ss.replace(/\s+$/,'');
var ssss =sss.replace(/\s{2,}/g, ' ');
return ssss

}

/////////////////////////////////////

function SearchExprssions(str)
{
var sss=[];

var ss="";


for(var k=2; k<=str.length;k++)
{

for(var i=0;i<=(str.length - k);i++)
{

ss="";

for (j=i; j<(i+k); j++) {ss=ss + " " +str[j];}
ss=trimstr(ss);
sss.push(Noquots(ss));


}
}

var temp="";
var vvv=Noquots(document.getElementById("newcat").value);
var expr=[];

for (i=0; i<sss.length; i++) {if (FoundInDic(sss[i])){ expr.push(sss[i]); }} 
if (expr.length>0) 
{ 


for (i=0; i < expr.length;  i++ ) {temp="~" + i; vvv=vvv.replace(expr[i],temp);}
                             
var estr=vvv.split(" ");
j=0;
for(var k=0;k<expr.length;k++)
for (i=0; i< estr.length;i++){temp="~" +j; if (estr[i]==temp) { estr[i]=expr[j];j++;}     }

return estr;

}                                     
else return str;
}

////////////////////////////////////////////////////////////////////////////////
function AdvencedSearch(str)
{
var sstr="Bombaaa";
var ss="";
var sep="~";
var words=[];
words=SearchInDic(str);
if (words[0]!=str)
{
for (var i=1;i<words.length;i++) {if(i==1){sep="";} else {sep="~";}; ss=ss+sep+words[i];}
if (ss!=""){document.getElementById("signdiv").name=ss;} else {document.getElementById("signdiv").name="abcd";} 
sstr=words[0];
}

return sstr; 
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
function DisplayMoreVideo(str)

{
//HighLightWord();
var ss=GetVideoName(str);
var vv = document.getElementById("vidcontrol");
vv.src="./res/video/" + ss + "/1.webm";
           
}

///////////////////////////////////////////////////////////
function DisplayMoreSigns()
{
var vdstr="";
var sss="";
var ss=document.getElementById("signdiv").name;
var nn=ss.indexOf("~");
if (nn>0) {vdstr =ss.substr(0,nn);sss=ss.substr(nn+1,ss.length-(nn+1));}
else {vdstr=ss;sss="abcd" ;}
document.getElementById("signdiv").name=sss;
DisplayMoreVideo(vdstr);
 
}  
///////////////////////////////////////////////////////////
function MoreSigns()
{
var flag=false;
var ss=document.getElementById("signdiv").name;
if (ss != "abcd" ) {flag=true; }
return flag ;
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function FoundOrNot() {
    var flag = false;
    
    var temp = "";
    var innerstr = "";
    var ssss = [];
    var sss = [];
    document.getElementById("signdiv").innerHTML = "";
    coolmenu.style.display = "none";
    var ss = document.getElementById("newcat").value;
	ss=Noquots(ss);
var storest="";
    if (ss.length > 1) {
        var n = ss.indexOf(" ");
        if (n > 0) { sss = ss.split(" "); sss = SearchExprssions(sss); } else {sss.push(ss);}
        
        for (var i = 0; i < sss.length; i++) {
			storest=storest+"~"+ sss[i];
            ts = sss[i];
            flag = FoundInDic(ts);
            if (flag == true) { innerstr = innerstr + " " + "<span id='w" + i + "' class='sp4' >" + ts + "</span>"; };
            if (flag == false) { ssss = FindSimilar(ts); }
			 if (flag == false) { ssss = FindSimilard(ts); }
            if (flag==false && ssss.length > 0) {
                flag = true;
                temp = "";
                for (var j = 0; j < ssss.length; j++) { temp = temp + ssss[j] + "~"; };
                temp = temp.substr(0, temp.length - 1);
                innerstr = innerstr + " " +"<span id='y" + i + "' data-alts='"+temp +"' class='sp3'>" + ts +  "</span>";
               
            }
            if (flag == false) { innerstr = innerstr + " " + "<span id='w" + i + "' class='sp1' >" + ts + "</span>"; };
        }
		storest=storest.substring(1,storest.length-1);
        document.getElementById("signdiv").innerHTML = innerstr;
	    document.getElementById("cmdtrans").name = sss.length;
		var prevst="";
    if(sessionStorage.getItem("prevst")!=null) 
	{
	prevst=sessionStorage.getItem("prevst");
	
		var xyz=prevst.indexOf("~");
		var prevarr=[];
	if(xyz>0) prevarr=prevst.split("~");
	 else prevarr.push(prevst);
			i = 0;
        var wflag = false;
        while (i < sss.length && wflag == false) {
            var vv = document.getElementById("y" + i);
            if (vv != null) {if(i<=prevarr.length-1) if(sss[i]==prevarr[i])  LeaveIt(i);
			                 else {wflag = true; showPopupMenu(i);}
							 }
            i++;
        }
    }
	
	
	else
	{
		i = 0;
        var wflag = false;
        while (i < sss.length && wflag == false) {
            var vv = document.getElementById("y" + i);
            if (vv != null) { wflag = true; showPopupMenu(i) }
            i++;
        }
  
	}
	sessionStorage.setItem("prevst",storest);
	}
}

/////////////////////////////////////////////////////
function showPopupMenu(spno) 
{
    var innerstr = "";
    var sss = [];
    
    var vv = document.getElementById("y" + spno);
    var ss = vv.getAttribute("data-alts");

     var nn = ss.indexOf("~");
     if (nn > 0) { sss = ss.split("~"); } else { sss.push(ss); }
     for (var i = 0; i < sss.length; i++) {
         innerstr = innerstr + "<a href='#' onclick='ReplaceIt("+ spno + "," + i + ")'>" + sss[i] + "</a>";
     }
         
    coolmenu.innerHTML = innerstr;
    coolmenu.style.top = vv.offsetTop + 0;//380 ;
    coolmenu.style.left = vv.offsetLeft - 0;//150;
    coolmenu.style.display = "block"

}
////////////////////////////////////
///////////////////////////////////
function ReplaceIt(spno, ordno) 
{
    var innerstr = "";
    var sss = [];
    var vv = document.getElementById("y" + spno);
    var ss = vv.getAttribute("data-alts");
    var nn = ss.indexOf("~");
    if (nn > 0) { sss = ss.split("~"); } else { sss.push(ss); }
     
   vv.innerText = sss[ordno]; 
   vv.innerHTML= sss[ordno];  
  vv.setAttribute("class", "sp4");
  vv.style.color="#336666";
   
   vv.setAttribute("id","w" + spno);
   vv.removeAttribute("data-alts"); 
 

   

var intervID= setInterval("FindNextWord()", 1000);

document.getElementById("panel").name=intervID;
var ccc="";
var i=0;
var cc=document.getElementById("w"+i) ;
while(cc!=null)
{
if (i>0) ccc=ccc+" "+cc.innerHTML; else  ccc=cc.innerHTML;
i++;
cc=document.getElementById("w"+i) ;
}
 //document.getElementById("newcat").value=document.getElementById("signdiv").innerText;
   document.getElementById("newcat").value=Noquots(ccc);
 document.getElementById("newcat").innerHTML=Noquots(ccc);
 document.getElementById('newcat').value =Noquots(ccc);
 document.getElementById('newcat').text =Noquots(ccc);
 document.getElementById('newcat').innerHTML=Noquots(ccc);


}


/////////////////////////////////////////////

function FindNextWord()
{

var ss = document.getElementById("cmdtrans").name;
var noofwords = parseInt(ss, 10);
var flag=false;
i=0;


var intervs=document.getElementById("panel").name;
var intervID=parseInt(intervs, 10);

while (i < noofwords && flag == false)

{
var vv=document.getElementById("y" + i);
if (vv !=null) {flag=true;} else {i++;};
}

if (flag==true) {showPopupMenu(i);} else {clearInterval(intervID);}

}

//////////////////////////////////////////////////

function isAdj(str)
{
var sss= GetWordCat(str);
if (sss=="صفات") {return true;} else {return false;}

         
}     

/////////////////////////////////////////////////////////////////
function PauseIt()
{
sessionStorage.setItem("status","pause");


}

function StopIt()
{
sessionStorage.setItem("status","stop");
window.location="spellit.php";

}

function RepeatIt()
{
	sessionStorage.setItem("status","rerload");
    var ss=Noquots(document.getElementById("newcat").value);
	sessionStorage.setItem("pharase",ss);
	window.location="spellit.php";
}

function ReloadIt()
{
	if(sessionStorage.getItem("status")=="rerload")
	{
		var ss=sessionStorage.getItem("pharase");
		document.getElementById("newcat").value=ss;
		sessionStorage.setItem("status","play");
	}
	
}

////////////////////////////////////////////////////////////////////
function handlepaste() {
    var ss=window.clipboardData.getData("Text");
   var sss= Noquots(document.getElementById("newcat").value);
   var xx=sss.indexOf("ss");
		 if(ss!="" && xx>=0){
		 
		 var ssss=sss.replace(ss,"");
		 document.getElementById("newcat").value=ssss;
		 }
}

/////////////////////////////////////////
function LeaveIt(spno)
{
   var innerstr = "";
    var sss = [];
    var vv = document.getElementById("y" + spno);
   
  vv.setAttribute("class", "sp4");
  vv.style.color="#336666";
   
   vv.setAttribute("id","w" + spno);
   vv.removeAttribute("data-alts"); 
 
}
////////////////////////////////////////////
