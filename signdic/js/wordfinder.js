// JavaScript Document
   var sentence=[];
   var wordstatus=[];  
   var videos={};
   function Disolve(sent)
   {
	   var str= Noquots(sent.trim());
	   if(str.indexOf(" ")>0) sentence=str.split(" ");
	   else sentence.push(str);
	   
   }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
   function FindInDic(str)
   {
	   var dicword="";
	   var sss="";
	   var ssss="";
	   var ss= WithoutHamza(WithoutAccent(str));
	   if(FoundInDic(str)) sss= str;
	   else {
		   for (var i = 0; i < Diction.words.length; i++) 
		    {
      
	        dicword = Diction.words[i].word;
            ssss = WithoutHamza(WithoutAccent(dicword));
			if(ssss==ss) sss=dicword
		   }
		   
	   }
 	   if(sss=="") sss=str;
	   return sss;
	   }
 ///////////////////////////////////////////////////////////////////////////////////////
function SearchInDic(str)
{
var words=[];
var flag=false;
var doneflag=false;
var femaleflag=false;
var pluflag = false;
var twoflag=false;
var adjflag=false;
var ownflag=false;
str=Withoutquot(str);
var ssss="";
var sss=str;
var cc="";
var numbo=0;

if(isNumeric(str) ) 
{ var vv =ReadNummber(str); 
for( var i=0;i<vv.length;i++) words.push(vv[i]);
if(words.length>0)flag=true;
}

var ss = str.substr(0, 2);

if(flag==true)
{
if (ss == "ال") {doneflag=true; sss = str.substr(2, str.length - 2) ;flag=FoundInDic(sss);};

if (flag==true) {words.push(sss);}
}

if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ب") { doneflag=true;sss = str.substr(1, str.length - 1);flag=FoundInDic(sss); };

if (flag==true) {words.push("في");words.push(sss);}
}

if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ف") { doneflag=true; sss = str.substr(1, str.length - 1) ;flag=FoundInDic(sss);};

if (flag==true) {words.push(sss);}
}

if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ل") {doneflag=true; sss = str.substr(1, str.length - 1);flag=FoundInDic(sss); };

if (flag==true) {words.push("إلى");words.push(sss);}
}

if (flag==false ) {
var ss = str.substr(0, 3);
if (ss == "بال") { doneflag=true;sss = str.substr(3, str.length - 3);flag=FoundInDic(sss); };

if (flag==true) {words.push("في");words.push(sss);}
}

if (flag==false ) {
var ss = str.substr(0, 2);
if (ss == "لل") {doneflag=true; sss = str.substr(2, str.length - 2);flag=FoundInDic(sss); };

if (flag==true) {words.push("إلى");words.push(sss);}
}

if (flag==false && doneflag==true)
{
doneflag=false;
//sss=str; 
ssss=str; 
ss=sss.substr(sss.length-3,3);
if (ss=="تان" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};
if (ss=="تين" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};

ss=sss.substr(sss.length-2,2);
if ((ss=="ان") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if ((ss=="ين") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if (ss=="ون" ){ssss=sss.substr(0,sss.length-2);pluflag =true;};
if (ss=="ات" ){ssss=sss.substr(0,sss.length-2);pluflag =true;femaleflag=true;};
if (ss == "تا") { ssss = sss.substr(0, sss.length - 2); femaleflag = true; twoflag=true; doneflag = true; };

ss=sss.substr(sss.length-1,1);
if (ss == "ة") { ssss = sss.substr(0, sss.length - 1); femaleflag = true; };
if (ss == "ا" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); twoflag=true; };
if (ss == "و" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); pluflag=true; };
if (ss == "ي" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };
if (ss == "ى" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };

flag=FoundInDic(ssss);
if(flag) if(GetWordCat(ssss)=="أفعال شائعة") {twoflag=false;pluflag=false;femaleflag=false;words.push("الماضى");}
if (flag==true){words.push(ssss);adjflag=isAdj(ssss); if (adjflag==true) { femaleflag =false; pluflag=false;twoflag=false;ownflag=false;}}

if ((flag==true) && (femaleflag == true)){words.push("مؤنث");}
if ((flag==true) && (pluflag == true)){words.push("الذين");}
if ((flag==true) && (twoflag == true)){words.push("هذان");}
if ((flag==true) && (ownflag == true)){words.push("أنا");}

}
cc=sss.substr(sss.length-1,1); 
if(flag==false) {if (cc=="ه") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هو");} }} 
if(flag==false) {if (cc=="ك") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنتَ");} }}
if(flag==false) {if (cc=="ي") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }} 
if(flag==false) {if (cc=="ى") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }} 

cc=sss.substr(sss.length-2,2);
if(flag==false) {if (cc=="هم") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("الذين");} }} 
if(flag==false) {if (cc=="هن") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("اللآئى");} }} 
if(flag==false) {if (cc=="نا") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("نحن");} }}   
if(flag==false) {if (cc=="ته") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هو");} }}
if(flag==false) {if (cc=="تك") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);;words.push("أنتَ");} }}
if(flag==false) {if (cc=="تي") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }}
if(flag==false) {if (cc=="تى") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }}
if(flag==false) if (cc=="تي") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {words.push(ssss);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");words.push(ssss);}} 
if(flag==false) if (cc=="تى") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {words.push(ssss);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");words.push(ssss);}} 
if(flag==false) {if (cc=="ها") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذه");} }}
cc=sss.substr(sss.length-3,3);
if(flag==false) {if (cc=="هما") {ssss=sss.substr(0,sss.length-3); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذان");} }} 
if(flag==false) {if (cc=="يا") {ssss=sss.substr(0,sss.length-3); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");words.push("هذان");} }} 
if(flag==false) {if (cc=="تها") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذه");} }}
if(flag==false) {if (cc=="تنا") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("نحن");} }}
if(flag==false) {if (cc=="تهم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("الذين");} }}
if(flag==false) {if (cc=="تهن") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("اللآئى");} }}
if(flag==false) {if (cc=="تكم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنتم");} }}

cc=sss.substr(sss.length-4,4);
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هاتان");} }}
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4);flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("مؤنث");words.push("هاتان");} }}

if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);;words.push("مؤنث");words.push("هاتان");} }}
if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4);flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("مؤنث");words.push("أنا");words.push("هاتان");} }}



if (flag==false )
{
doneflag=false;
sss=str; 
ssss=str; 
ss=sss.substr(sss.length-3,3);
if (ss=="تان" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};
if (ss=="تين" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};

ss=sss.substr(sss.length-2,2);
if ((ss=="ان") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if ((ss=="ين") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if (ss=="ون" ){ssss=sss.substr(0,sss.length-2);pluflag =true;};
if (ss=="ات" ){ssss=sss.substr(0,sss.length-2);pluflag =true;femaleflag=true;};
if (ss == "تا") { ssss = sss.substr(0, sss.length - 2); femaleflag = true; twoflag=true; doneflag = true; };

ss=sss.substr(sss.length-1,1);
if (ss == "ة") { ssss = sss.substr(0, sss.length - 1); femaleflag = true; };
if (ss == "ا" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); twoflag=true; };
if (ss == "و" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); pluflag=true; };
if (ss == "ي" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };
if (ss == "ى" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };

flag=FoundInDic(ssss);
if(flag) if(GetWordCat(ssss)=="أفعال شائعة") {twoflag=false;pluflag=false;words.push("الماضى");}
if (flag==true){words.push(ssss);adjflag=isAdj(ssss); if (adjflag==true) { femaleflag =false; pluflag=false;twoflag=false;ownflag=false;}}

if ((flag==true) && (femaleflag == true)){words.push("مؤنث");}
if ((flag==true) && (pluflag == true)){words.push("الذين");}
if ((flag==true) && (twoflag == true)){words.push("هذان");}
if ((flag==true) && (ownflag == true)){words.push("أنا");}

}
cc=sss.substr(sss.length-1,1); 
if(flag==false) {if (cc=="ه") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هو");} }} 
if(flag==false) {if (cc=="ك") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنتَ");} }}
if(flag==false) {if (cc=="ي") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }} 
if(flag==false) {if (cc=="ى") {ssss=sss.substr(0,sss.length-1); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }} 

cc=sss.substr(sss.length-2,2);
if(flag==false) {if (cc=="هم") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("الذين");} }} 
if(flag==false) {if (cc=="هن") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("اللآئى");} }} 
if(flag==false) {if (cc=="نا") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("نحن");} }}   
if(flag==false) {if (cc=="ته") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هو");} }}
if(flag==false) {if (cc=="تك") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);;words.push("أنتَ");} }}
if(flag==false) {if (cc=="تي") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }}
if(flag==false) {if (cc=="تى") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");} }}
if(flag==false) if (cc=="تي") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {words.push(ssss);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");words.push(ssss);}} 
if(flag==false) if (cc=="تى") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {words.push(ssss);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");words.push(ssss);}} 
if(flag==false) {if (cc=="ها") {ssss=sss.substr(0,sss.length-2); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذه");} }}
cc=sss.substr(sss.length-3,3);
if(flag==false) {if (cc=="هما") {ssss=sss.substr(0,sss.length-3); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذان");} }} 
if(flag==false) {if (cc=="يا") {ssss=sss.substr(0,sss.length-3); flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنا");words.push("هذان");} }} 
if(flag==false) {if (cc=="تها") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هذه");} }}
if(flag==false) {if (cc=="تنا") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("نحن");} }}
if(flag==false) {if (cc=="تهم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("الذين");} }}
if(flag==false) {if (cc=="تهن") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("اللآئى");} }}
if(flag==false) {if (cc=="تكم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("أنتم");} }}

cc=sss.substr(sss.length-4,4);
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("هاتان");} }}
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4);flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("مؤنث");words.push("هاتان");} }}

if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);;words.push("مؤنث");words.push("هاتان");} }}
if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4);flag=FoundInDic(ssss); if (flag==true) {words.push(ssss);words.push("مؤنث");words.push("أنا");words.push("هاتان");} }}

 
if (flag==false) 
{
doneflag=false;
sss=str;
var ss=str.substr(str.length-1,1);
if (ss=="ت"){sss=str.substr(0,str.length-1);};
ss=str.substr(str.length-2,2);
if (ss=="وا"  ){sss=str.substr(0,str.length-2);doneflag=true;};
if (ss=="ون" ){sss=str.substr(0,str.length-2);doneflag=true;};
if (ss=="تي" ){sss=str.substr(0,str.length-2);};
if (ss == "ان") { sss = str.substr(0, str.length - 2); doneflag = true; }
if (ss == "تا") { sss = str.substr(0, str.length - 2); doneflag = true; }
ss=str.substr(str.length-1,1);
if ((ss=="ن") && (doneflag == false) ){sss=str.substr(0,str.length-1);};
if ((ss=="ا") && (doneflag == false) ){sss=str.substr(0,str.length-1);};


if (flag==false && doneflag == true) {var tempo=VerbInDIC(WithoutAccent(sss));if (tempo!=""){flag=true; words.push("الماضى"); words.push(tempo);}}
//flag = FoundInDic(WithoutAccent(sss));
//if (flag == true) {   words.push(sss); }
}

if (flag == false) 
{
    doneflag = false ;
    ss = sss.substr(0, 1);
    if (ss == "أ") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
    if (ss == "ن") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
    if (ss == "ت") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
    if (ss == "ي") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
	if (ss == "ا") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
	if (ss == "إ") { ssss = sss.substr(1, str.length - 1); doneflag = true; };

var aaa=document.getElementById("newcat").name;
var bbb=parseInt(aaa, 10)-1;


if(bbb>=0 && (ss=="أ" || ss=="ا"))
{
	var qqp=document.getElementById("w"+bbb);
var qflag=false;
if ((typeof qqp!= "undefined" ) && qqp!=null ) qflag=true;
if (qflag)
{
	var qqq=document.getElementById("w"+bbb).innerHTML;
var qflag=false;
if (flag==false && (ss=="أ" || ss=="ا") && (qqq.trim()=="أنا" ||  qqq.trim()=="انا")  ) { var tempo=VerbInDIC(WithoutAccent(ssss)); if (tempo!="") {flag=true;words.push("الآن"); words.push(ssss); } }
if (flag==false && (ss=="أ" || ss=="ا") && (qqq.trim()=="أنا" ||  qqq.trim()=="انا")  ) {var ttt="أ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}
if (flag==false && (ss=="أ" || ss=="ا") && (qqq.trim()=="أنا" ||  qqq.trim()=="انا")  ) {var ttt="ا"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}
	}
}
if (flag==false && doneflag == true  && (ss=="أ" || ss=="ا") ) { flag = FoundInDic(ssss); if (flag == true) {words.push("أمر"); words.push(ssss); } }
if (flag==false && doneflag == true  && (ss=="أ" || ss=="ا")) { var tempo=VerbInDIC(WithoutAccent(ssss)); if (tempo!="") {flag=true;words.push("أمر"); words.push(ssss); } }

var ll= ssss.substr(ssss.length - 1, 1);
if(flag==false && doneflag == true  && (ss=="ا" || ss=="إ") && ll=="ْ")
	    {
			var tttt=ssss.substr(0,ssss.length - 1);
			
			var tempo=VerbInDIC(WithoutAccent(tttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }
			if (flag==false && doneflag == true) {var ttt="أ"+tttt; tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
	   		if (flag==false && doneflag == true) {var ttt="ا"+tttt;  tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
	   		if (flag==false && doneflag == true) {var ttt="إ"+tttt;  tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
	   
				   }
				   
//if (flag==false && doneflag == true) { flag = FoundInDic(ssss); if (flag == true) {words.push("الآن"); words.push(ssss); } }
if (flag==false && doneflag == true) {var tempo=VerbInDIC(WithoutAccent(ssss)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }

if (flag==false && doneflag == true) {if(ssss.substr(0, 1)=="ؤ"){var ttt=ssss.replace("ؤ","أ"); var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}}
if (flag==false && doneflag == true && ss!="ا" && ss!="أ" && ss !="إ" ) {var ttt="أ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}
if (flag==false && doneflag == true && ss!="ا" && ss!="أ" && ss !="إ" ) {var ttt="ا"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}
if (flag==false && doneflag == true && ss!="ا" && ss!="أ" && ss !="إ" ) {var ttt="إ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("الآن"); words.push(tempo); }}

}

}
if (flag == false) { ssss =  sss; flag = FoundInDic(ssss); if (flag == true) {if(GetWordCat(ssss)=="أفعال شائعة") words.push("الماضى");  words.push(ssss); }}
if (flag==false ) {var tempo=VerbInDIC(WithoutAccent(sss)); if (tempo!="") {flag=true;  words.push("الماضى");  words.push(tempo); }
}
if (flag == false) {
    doneflag = false;
    ss = sss.substr(0, 2);
    if (ss == "سن") { ssss = sss.substr(2, str.length - 2); doneflag = true; };
    if (ss == "سأ") { ssss = sss.substr(2, str.length - 2); doneflag = true; };
    if (ss == "سي") { ssss = sss.substr(2, str.length - 2); doneflag = true; };
    if (ss == "ست") { ssss = sss.substr(2, str.length - 2); doneflag = true; };
    if (doneflag == true) { ssss = ssss; flag = FoundInDic(ssss); if (flag == true) { words.push("القادم"); words.push(ssss); } }
	if (flag==false && doneflag == true) {if(ssss.substr(0, 1)=="ؤ"){var ttt=ssss.replace("ؤ","أ"); var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;   words.push("القادم"); words.push(tempo); }}}
  	if (flag==false && doneflag == true) {var ttt="أ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("القادم"); words.push(tempo); }}
    if (flag==false && doneflag == true) {var ttt="ا"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("القادم"); words.push(tempo); }}
    if (flag==false && doneflag == true) {var ttt="إ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("القادم"); words.push(tempo); }}


if (flag==false && doneflag == true) {var tempo=VerbInDIC(WithoutAccent(ssss)); if (tempo!="") {flag=true;  words.push("القادم"); words.push(tempo); }
}
}
if (flag == false) {
    doneflag = false;
	  ss = sss.substr(0, 1);
	   if (ss == "ا" || ss=="إ") { ssss = sss.substr(1, str.length - 1); doneflag = true; };
	   if(!doneflag)
	    {
			 ss = sss.substr(0, 2);
			  if (ss == "لت") { ssss = sss.substr(2, str.length - 2); doneflag = true; };
	   }
	     if(!doneflag)
	    {
			 ss = sss.substr(0, 3);
			  if (ss == "فلت") { ssss = sss.substr(3, str.length - 3); doneflag = true; };
			  
	   }
	   if (doneflag == true) { ssss =  ssss; flag = FoundInDic(ssss); if (flag == true) { words.push("أمر"); words.push(ssss); } }
	   if (flag==false && doneflag == true) {var tempo=VerbInDIC(WithoutAccent(ssss)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }

	   if (flag==false && doneflag == true) {var ttt="أ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
	   if (flag==false && doneflag == true) {var ttt="ا"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
	   if (flag==false && doneflag == true) {var ttt="إ"+ssss; var tempo=VerbInDIC(WithoutAccent(ttt)); if (tempo!="") {flag=true;  words.push("أمر"); words.push(tempo); }}
}


	   
} 

if (flag==false) {var tempo=VerbInDIC(WithoutAccent(sss));if (tempo!=""){flag=true; words.push("الماضى"); words.push(tempo);}}
if (flag==false) {var tempo=VerbInDIC(WithoutHamza(WithoutAccent(sss)));if (tempo!=""){flag=true; words.push("الماضى"); words.push(tempo);}}
if (flag==false) {var ttt="ا"+sss;  tempo=VerbInDIC(WithoutAccent(ttt));if (tempo!=""){flag=true; words.push("أمر"); words.push(tempo);}}
if (flag==false) {var ttt="أ"+sss;  tempo=VerbInDIC(WithoutAccent(ttt));if (tempo!=""){flag=true; words.push("أمر"); words.push(tempo);}}
if (flag==false) words=SearchInDeriv(str);
if (words.length==0) {flag=false;words.push(str);}

return words;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function SearchInDeriv(str)
{
var words=[];
var flag=false;
var doneflag=false;
var femaleflag=false;
var pluflag = false;
var twoflag=false;
var adjflag=false;
var ownflag=false;
str=Withoutquot(str);
var ssss="";
var sss=str;
var cc="";
var ss = str.substr(0, 2);
var dd=[];
flag=FoundInDeriv(sss);
if (flag==true) {dd=ReturnDeriv(sss); words= words.concat(dd);}

if (flag==false ) {
if (ss == "ال") {doneflag=true; sss = str.substr(2, str.length - 2) ;flag=FoundInDeriv(sss);};

if (flag==true) {dd=ReturnDeriv(sss); words= words.concat(dd);}
}
if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ب") { doneflag=true;sss = str.substr(1, str.length - 1);flag=FoundInDeriv(sss); };

if (flag==true) {words.push("في");dd=ReturnDeriv(sss); words= words.concat(dd);}
}

if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ف") { doneflag=true; sss = str.substr(1, str.length - 1) ;flag=FoundInDeriv(sss);};

if (flag==true) {dd=ReturnDeriv(sss); words= words.concat(dd);}
}

if (flag==false ) {
var ss = str.substr(0, 1);
if (ss == "ل") {doneflag=true; sss = str.substr(1, str.length - 1);flag=FoundInDeriv(sss); };

if (flag==true) {words.push("إلى");dd=ReturnDeriv(sss); words= words.concat(dd);}
}

if (flag==false ) {
var ss = str.substr(0, 3);
if (ss == "بال") { doneflag=true;sss = str.substr(3, str.length - 3);flag=FoundInDeriv(sss); };

if (flag==true) {words.push("في");dd=ReturnDeriv(sss); words= words.concat(dd);}
}

if (flag==false ) {
var ss = str.substr(0, 2);
if (ss == "لل") {doneflag=true; sss = str.substr(2, str.length - 2);flag=FoundInDeriv(sss); };

if (flag==true) {words.push("إلى");dd=ReturnDeriv(sss); words= words.concat(dd);}
}

if (flag==false && doneflag==true)
{
doneflag=false;
//sss=str; 
ssss=str; 
ss=sss.substr(sss.length-3,3);
if (ss=="تان" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};
if (ss=="تين" ){ssss=sss.substr(0,sss.length-3);femaleflag=true;twoflag=true;doneflag=true;};

ss=sss.substr(sss.length-2,2);
if ((ss=="ان") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if ((ss=="ين") && (doneflag == false) ){ssss=sss.substr(0,sss.length-2);twoflag=true;};
if (ss=="ون" ){ssss=sss.substr(0,sss.length-2);pluflag =true;};
if (ss=="ات" ){ssss=sss.substr(0,sss.length-2);pluflag =true;femaleflag=true;};
if (ss == "تا") { ssss = sss.substr(0, sss.length - 2); femaleflag = true; twoflag=true; doneflag = true; };

ss=sss.substr(sss.length-1,1);
if (ss == "ة") { ssss = sss.substr(0, sss.length - 1); femaleflag = true; };
if (ss == "ا" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); twoflag=true; };
if (ss == "و" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); pluflag=true; };
if (ss == "ي" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };
if (ss == "ى" && (doneflag == false)) { ssss = sss.substr(0, sss.length - 1); ownflag = true; };

flag=FoundInDeriv(ssss);
if(flag) if(GetWordCat(ssss)=="أفعال شائعة") {twoflag=false;pluflag=false;femaleflag=false;words.push("الماضى");}
if (flag==true){dd=ReturnDeriv(ssss); words= words.concat(dd);adjflag=isAdj(ssss); if (adjflag==true) { femaleflag =false; pluflag=false;twoflag=false;ownflag=false;}}

if ((flag==true) && (femaleflag == true)){words.push("مؤنث");}
if ((flag==true) && (pluflag == true)){words.push("الذين");}
if ((flag==true) && (twoflag == true)){words.push("هذان");}
if ((flag==true) && (ownflag == true)){words.push("أنا");}

}
cc=sss.substr(sss.length-1,1); 
if(flag==false) {if (cc=="ه") {ssss=sss.substr(0,sss.length-1); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هو");} }} 
if(flag==false) {if (cc=="ك") {ssss=sss.substr(0,sss.length-1); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنتَ");} }}
if(flag==false) {if (cc=="ي") {ssss=sss.substr(0,sss.length-1); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنا");} }} 
if(flag==false) {if (cc=="ى") {ssss=sss.substr(0,sss.length-1); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنا");} }} 

cc=sss.substr(sss.length-2,2);
if(flag==false) {if (cc=="هم") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("الذين");} }} 
if(flag==false) {if (cc=="هن") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("اللآئى");} }} 
if(flag==false) {if (cc=="نا") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("نحن");} }}   
if(flag==false) {if (cc=="ته") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هو");} }}
if(flag==false) {if (cc=="تك") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);;words.push("أنتَ");} }}
if(flag==false) {if (cc=="تي") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنا");} }}
if(flag==false) {if (cc=="تى") {ssss=sss.substr(0,sss.length-2)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنا");} }}
if(flag==false) if (cc=="تي") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");dd=ReturnDeriv(ssss); words= words.concat(dd);}} 
if(flag==false) if (cc=="تى") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) if(GetWordCat(ssss)!="أفعال شائعة") {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("مؤنث");words.push("أنا");} else{words.push("الماضى");dd=ReturnDeriv(ssss); words= words.concat(dd);}} 
if(flag==false) {if (cc=="ها") {ssss=sss.substr(0,sss.length-2); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هذه");} }}
cc=sss.substr(sss.length-3,3);
if(flag==false) {if (cc=="هما") {ssss=sss.substr(0,sss.length-3); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هذان");} }} 
if(flag==false) {if (cc=="يا") {ssss=sss.substr(0,sss.length-3); flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنا");words.push("هذان");} }} 
if(flag==false) {if (cc=="تها") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هذه");} }}
if(flag==false) {if (cc=="تنا") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("نحن");} }}
if(flag==false) {if (cc=="تهم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("الذين");} }}
if(flag==false) {if (cc=="تهن") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("اللآئى");} }}
if(flag==false) {if (cc=="تكم") {ssss=sss.substr(0,sss.length-3)+"ة"; flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("أنتم");} }}

cc=sss.substr(sss.length-4,4);
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("هاتان");} }}
if(flag==false) {if (cc=="تهما") {ssss=sss.substr(0,sss.length-4);flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("مؤنث");words.push("هاتان");} }}

if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4)+"ة";flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);;words.push("مؤنث");words.push("هاتان");} }}
if(flag==false) {if (cc=="تيا") {ssss=sss.substr(0,sss.length-4);flag=FoundInDeriv(ssss); if (flag==true) {dd=ReturnDeriv(ssss); words= words.concat(dd);words.push("مؤنث");words.push("أنا");words.push("هاتان");} }}


for(var i=0;i<words.length;i++) words[i]=FindInDic(words[i]);
if (flag==false){words.push(str);}
return words;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Getcats() {

         var cat = [];

         for (var i = 0; i < Diction.words.length; i++) {


             var catstr = Diction.words[i].subject;

             if (cat.indexOf(catstr)<0) { cat.push(catstr); }


         }
         return cat;
     }
    
///////////////////////////////////////////////////////////////
     
function GetAllWords() {

         var words = [];

         for (var i = 0; i < Diction.words.length; i++) {


            words.push(Diction.words[i].word);

         }
         return words;
     }
     /////////////////////////////////////////////////////////////
     
function GetCatWords(catstr) 
     {
         var catwords = [];

         for (var i = 0; i < Diction.words.length; i++) {


           

             if (catstr == Diction.words[i].subject) { catwords.push(Diction.words[i].word); }


         }
         return catwords;

     }

     

     
      

function GetVideoName(str)
{
var vcode="";

for(var i=0;i<str.length;i++)
{
var ss = str.substr(i,1);
vcode=vcode + "0" + GetLetterOrdinalNumber(ss);
}

return vcode;
}


//////////////////////////////
function GetAllwordStartingWith(str)

{

var swords=[];

for (var i = 0; i < Diction.words.length; i++) {

            var ss=Diction.words[i].word;
            var sss=ss.substr(0,str.length);
            if (sss==str) {swords.push(Diction.words[i].word);}

         }
	
//       var k=1;
//	var ss = "khonfoshari buildings";
//         while (ss != null) {
//		
//             var ss = localStorage.getItem("signdicword" + k);
//             if (ss != null) {var sss=ss.substr(0,1);
//             if (sss==str) {swords.push(ss);}
//		};
//             k++;
//         }
         return swords;

}
/////////////////////////////

function GetLetter(ordn)
{

switch(ordn)
{

case 1:
  lstr="أ";  break;
case 2:
  lstr="ب";  break;
case 3:
  lstr="ت";  break;
case 4:
  lstr="ث";  break;
case 5:
  lstr="ج";  break;
case 6:
  lstr="ح";  break;
case 7:
  lstr="خ";  break;
case 8:
  lstr="د";  break;
case 9:
  lstr="ذ";  break;
case 10:
  lstr="ر";  break;
case 11:
  lstr="ز";  break;
case 12:
  lstr="س";  break;
case 13:
  lstr="ش";  break;
case 14:
  lstr="ص";  break;
case 15:
  lstr="ض";  break;
case 16:
  lstr="ط";  break;
case 17:
  lstr="ظ";  break;
case 18:
  lstr="ع";  break;
case 19:
  lstr="غ";  break;
case 20:
  lstr="ف";  break;
case 21:
  lstr="ق";  break;
case 22:
  lstr="ك";  break;
case 23:
  lstr="ل";  break;
case 24:
  lstr="م";  break;
case 25:
  lstr="ن";  break;
case 26:
  lstr="ه";  break;
case 27:
  lstr="و";  break;
case 28:
  lstr="ي";  break;
case 29: 
  lstr = "إ"; break;
case 30:
  lstr = "آ"; break;
case 31:
  lstr = "ى"; break;
case 32:
  lstr = "ة"; break;
case 33:
  lstr = "ئ"; break;
case 34:
  lstr = "ؤ"; break;
case 35:
lstr = "ا"; break;   
case 54:
lstr = "A"; break;           
case 55:
lstr = "B"; break; 
case 56:
lstr = "C"; break; 
case 57:
lstr = "D"; break; 
case 58:
lstr = "E"; break; 
case 59:
lstr = "F"; break; 
case 60:
lstr = "G"; break; 
case 61:
lstr = "H"; break; 
case 62:
lstr = "I"; break; 
case 63:
lstr = "J"; break; 
case 64:
lstr = "K"; break; 
case 65:
lstr = "L"; break; 
case 66:
lstr = "M"; break; 
case 67:
lstr = "N"; break; 
case 68:
lstr = "O"; break; 
case 69:
lstr = "P"; break; 
case 70:
lstr = "Q"; break; 
case 71:
lstr = "R"; break; 
case 72:
lstr = "S"; break; 
case 73:
lstr = "T"; break; 
case 74:
lstr = "U"; break; 
case 75:
lstr = "V"; break; 
case 76:
lstr = "W"; break; 
case 77:
lstr = "X"; break; 
case 78:
lstr = "Y"; break; 
case 79:
lstr = "Z"; break; 



case 80:
lstr = "ء"; break; 



}


return lstr;

}

//////////////////////////////////////////////////////////////////////////
function FoundInDeriv(str)
{
var flag=false
var k=0;
var dname="";
while ((flag==false) && ( k<derivatives.deriv.length))
{
dname= derivatives.deriv[k].dname;
if (derivatives.deriv[k].derivative==str  ) {flag=true;}

else k++;
}
if(flag)
{
		switch(dname)
	{
		case "اسم فاعل مزيد":flag=true; break;
		case "مصدر مزيد":flag=true; break;
		case "اسم فاعل مجرد":flag=true; break;
		case "مصدر مجرد":flag=true; break;
		case "صفة منسوبة":flag=true; break;
		case "مصدر مجرد":flag=true; break;
		case "صيغة مبالغة":flag=true;;break;
		case "اسم تفضيل":flag=true;break;
        case "فعل ماض مزيد مجهول": flag=true;;break;
        case "فعل ماض مجرد مجهول": flag=true;break;
        case "فعل مضارع مزيد مجهول": flag=true;break;
        case "فعل مضارع مجرد مجهول": flag=true;break;
        case "اسم مفعول مزيد": flag=true;break;
        case "اسم مفعول مجرد":flag=true;break;
        case "اسم مرة مجرد":flag=true;break;
        case "اسم مرة مزيد":flag=true;break;
        case "اسم آلة": flag=true;break;
        case "اسم مكان مزيد": flag=true;break;
        case "اسم مكان مجرد":flag=true;break;
        case "اسم زمان مجرد": flag=true;break;
        case "اسم زمان مزيد":flag=true;break;
        case "ظرف مكان": flag=true;break;
        case "ظرف زمان":flag=true;break;
		default: flag=false; 
 
	} 
}
//if(flag) flag=IsVideoThere(WithoutAccent(derivatives.deriv[k].verb));

return flag;

}
///////////////////////////////////////////////////////////////////////////
function ReturnDeriv(str)
{
var dd=[];
var flag=false;
var k=0;
var dname="";
while ((flag==false) && ( k<derivatives.deriv.length))
{
dname= derivatives.deriv[k].dname;
if (derivatives.deriv[k].derivative==str &&  dname!="اسم ذات" && dname!="اسم علم" && dname!="صفة مشبه" ) {flag=true;}

else k++;
}
if (flag)
{
	switch(dname)
	{
		case "اسم فاعل مزيد":dd.push(derivatives.deriv[k].verb); break;
		case "مصدر مزيد":dd.push(derivatives.deriv[k].verb); break;
		case "اسم فاعل مجرد":dd.push(derivatives.deriv[k].verb); break;
		case "مصدر مجرد":dd.push(derivatives.deriv[k].verb); break;
		case "صفة منسوبة":dd.push(derivatives.deriv[k].verb); break;
		case "مصدر مجرد":dd.push(derivatives.deriv[k].verb); break;
		case "صيغة مبالغة":dd.push(derivatives.deriv[k].verb); dd.push("دوماً");break;
		case "اسم تفضيل":dd.push(derivatives.deriv[k].verb); dd.push("أكثرً");break;
        case "فعل ماض مزيد مجهول": dd.push("الماضي");dd.push(derivatives.deriv[k].verb);break;
        case "فعل ماض مجرد مجهول": dd.push("الماضي");dd.push(derivatives.deriv[k].verb);break;
        case "فعل مضارع مزيد مجهول": dd.push("الآن");dd.push(derivatives.deriv[k].verb);break;
        case "فعل مضارع مجرد مجهول": dd.push("الآن");dd.push(derivatives.deriv[k].verb);break;
        case "اسم مفعول مزيد": dd.push("شئ");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "اسم مفعول مجرد":dd.push("شئ");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "اسم مرة مجرد":dd.push(derivatives.deriv[k].verb); dd.push("مرة");break;
        case "اسم مرة مزيد":dd.push(derivatives.deriv[k].verb); dd.push("مرة");break;
        case "اسم آلة": dd.push("ماكينة");  dd.push("صنع");dd.push(derivatives.deriv[k].verb);break;
        case "اسم مكان مزيد": dd.push("مكان");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "اسم مكان مجرد": dd.push("مكان");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "اسم زمان مجرد": dd.push("زمان");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "اسم زمان مزيد": dd.push("زمان");  dd.push("حدوث");dd.push(derivatives.deriv[k].verb);break;
        case "ظرف مكان": dd.push("مكان");  dd.push(derivatives.deriv[k].verb);break;
        case "ظرف زمان": dd.push("زمان");  dd.push(derivatives.deriv[k].verb);break;
 
	}
	
}
return dd;
}

/////////////////////////////////////////////////////////////////////////
function FoundInDic(str)

{
var flag=false
var k=0;
while ((flag==false) && ( k<Diction.words.length))
{
if (Diction.words[k].word==str) {flag=true;}
k++;
}
if(flag) flag=IsVideoThere(str);

return flag;
}
/////////////////////////////////////////////////////////////////////////
function VerbInDIC(str)
{
var tempo="";
var flag=false
var k=0;
while ((flag==false) && ( k<Diction.words.length))
{
if (WithoutAccent(Diction.words[k].word)==str  &&  Diction.words[k].subject =="أفعال شائعة") {flag=true;tempo=Diction.words[k].word;}
k++;
}

if(flag) flag=IsVideoThere(tempo);

return tempo;
}
//////////////////////////////////////////////////////////////////////////
function isAdj(str)
{
var sss= GetWordCat(str);
if (sss=="صفات") {return true;} else {return false;}

         
}     
//////////////////////////////////////////////////////////////////
function Urlfound(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}	
//////////////////////////////////////////////////////////
function IsVideoThere(ss)
{
	   var vvv= document.URL ;
 	    var ppp= vvv.substring(0,vvv.lastIndexOf('/')+1) ;
		ppp=ppp.replace("#","");
		//ppp=ppp.replace("http://","");
		ppp=ppp+"res/video/" + GetVideoName(ss) + "/1.webm";
		var flag=Urlfound(ppp);
		return flag;
}
///////////////////////////////////

function GetLetterOrdinalNumber(str)
{
switch (str)
            {

                case "أ":
                    lstr = "1"; break;          
                case "ب":
                    lstr = "2"; break;
                case "ت":
                    lstr = "3"; break;
                case "ث":
                    lstr = "4"; break;
                case "ج":
                    lstr = "5"; break;
                case "ح":
                    lstr = "6"; break;
                case "خ":
                    lstr = "7"; break;
                case "د":
                    lstr = "8"; break;
                case "ذ":
                    lstr = "9"; break;
                case "ر":
                    lstr = "10"; break;
                case "ز":
                    lstr = "11"; break;
                case "س":
                    lstr = "12"; break;
                case "ش":
                    lstr = "13"; break;
                case "ص":
                    lstr = "14"; break;
                case "ض":
                    lstr = "15"; break;
                case "ط":
                    lstr = "16"; break;
                case "ظ":
                    lstr = "17"; break;
                case "ع":
                    lstr = "18"; break;
                case "غ":
                    lstr = "19"; break;
                case "ف":
                    lstr = "20"; break;
                case "ق":
                    lstr = "21"; break;
                case "ك":
                    lstr = "22"; break;
                case "ل":
                    lstr = "23"; break;
                case "م":
                    lstr = "24"; break;
                case "ن":
                    lstr = "25"; break;
                case "ه":
                    lstr = "26"; break;
                case "و":
                    lstr = "27"; break;
                case "ي":
                    lstr = "28"; break;
                case "إ": 
                    lstr = "29"; break;
                case "آ":
                    lstr = "30"; break;
                case "ى":
                    lstr = "31"; break;
                case "ة":
                    lstr = "32"; break;
                case "ئ":
                    lstr = "33"; break;
                case "ؤ":
                    lstr = "34"; break;
                case "ا":
                    lstr = "35"; break;
                case "َ":
                    lstr = "36"; break;
                case "ُ":
                    lstr = "37"; break;
                case "ِ":
                    lstr = "38"; break;
                case "ّ":
                    lstr = "39"; break;
                case "ْ":
                    lstr = "40"; break;
                case "ً":
                    lstr = "41"; break;
                case "ٌ":
                    lstr = "42"; break;
                case "ٍ":
                    lstr = "43"; break;             
               case "0":
                     lstr = "44"; break;
                case "1":
                    lstr = "45"; break;
                case "2":
                    lstr = "46"; break;

                case "3":
                    lstr = "47"; break;
                case "4":
                    lstr = "48"; break;
                case "5":
                    lstr = "49"; break;
                case "6":
                    lstr = "50"; break;
                case "7":
                    lstr = "51"; break;
                case "8":
                    lstr = "52"; break;
                case "9":
                    lstr = "53"; break;
                case "A":
                    lstr = "54"; break;
                case "B":
                    lstr = "55"; break;
                case "C":
                    lstr = "56"; break;
                case "D":
                    lstr = "57"; break;
                case "E":
                    lstr = "58"; break;
                case "F":
                    lstr = "59"; break;
                case "G":
                    lstr = "60"; break;
                case "H":
                    lstr = "61"; break;
                case "I":
                    lstr = "62"; break;
                case "J":
                    lstr = "63"; break;
                case "K":
                    lstr = "64"; break;
                case "L":
                    lstr = "65"; break;
                case "M":
                    lstr = "66"; break;
                case "N":
                    lstr = "67"; break;
	case "O":
                    lstr = "68"; break;
                case "P":
                    lstr = "69"; break;
                case "Q":
                    lstr = "70"; break;
                case "R":
                    lstr = "71"; break;
                case "S":
                    lstr = "72"; break;
                case "T":
                    lstr = "73"; break;
                case "U":
                    lstr = "74"; break;
                case "V":
                    lstr = "75"; break;
                case "W":
                    lstr = "76"; break;
                case "X":
                    lstr = "77"; break;
                case "Y":
                    lstr = "78"; break;
                case "Z":
                    lstr = "79"; break;
 
case "ء":
                    lstr = "80"; break;
 
                         default:
                    lstr = "0"; break;

            }

return lstr;
}


////////////////////////////////////////////////////////////

function GetLetterOrdinalNumberA(str)
{
switch(str)
{

case "أ":
  lstr="1";  break;
case "ب":
  lstr="2";  break;
case "ت":
  lstr="3";  break;
case "ث":
  lstr="4";  break;
case "ج":
  lstr="5";  break;
case "ح":
  lstr="6";  break;
case "خ":
  lstr="7";  break;
case "د":
  lstr="8";  break;
case "ذ":
  lstr="9";  break;
case "ر":
  lstr="10";  break;
case "ز":
  lstr="11";  break;
case "س":
  lstr="12";  break;
case "ش":
  lstr="13";  break;
case "ص":
  lstr="14";  break;
case "ض":
  lstr="15";  break;
case "ط":
  lstr="16";  break;
case "ظ":
  lstr="17";  break;
case "ع":
  lstr="18";  break;
case "غ":
  lstr="19";  break;
case "ف":
  lstr="20";  break;
case "ق":
  lstr="21";  break;
case "ك":
  lstr="22";  break;
case "ل":
  lstr="23";  break;
case "م":
  lstr="24";  break;
case "ن":
  lstr="25";  break;
case "ه":
  lstr="26";  break;
case "و":
  lstr="27";  break;
case "ي":
  lstr="28";  break;
case "إ": 
  lstr = "29"; break;
case "آ":
  lstr = "30"; break;
case "ى":
  lstr = "31"; break;
case "ة":
  lstr = "32"; break;
case "ئ":
  lstr = "33"; break;
case "ؤ":
  lstr = "34"; break;
case "ا":
lstr = "35"; break;             

default:
  lstr="0";
}

return lstr;
}


/////////////////////////////////////////////////////////

function GetVideoNameA(str)
{
var vcode="";

for(var i=0;i<str.length;i++)
{
var ss = str.substr(i,1);
vcode=vcode + "0" + GetLetterOrdinalNumberA(ss);
}
return vcode;
}

function WithoutAccent(str)
 {
     var sss = str.split("");
     var ss = "";
     for (var i = 0; i < sss.length; i++) {
         if (sss[i] != 'َ' && sss[i] != 'ً' && sss[i] != 'ُ' && sss[i] != 'ٌ' && sss[i] != 'ِ' && sss[i] != 'ٍ' && sss[i] != 'ّ' && sss[i] != 'ْ' ) { ss = ss + sss[i]; }
     }
     return ss;
 }
 
///////////////////////////////////////////////////////////////////////////////////////////////////////
 
function WithoutHamza(str) {
     var ss = str.replace("أ", "ا");
     var sss = ss.replace("إ", "ا");
     var ssss = sss.replace("آ", "ا");
     var sssss = ssss.replace("ى", "ي");
         
     return sssss;
 }
 ////////////////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////////////////////////////////
 
function FindSimilar(str) {
   var cc="";  
   var ts="";
   var ssss = "";
   var dicword = "";
   var simword = [];
   var  ss = WithoutAccent(str);
   var sss = WithoutHamza(ss);

   var doneflag=false;
   
 for (var i = 0; i < Diction.words.length; i++) {
         df=false;

	dicword = Diction.words[i].word;
        ssss = WithoutHamza(WithoutAccent(dicword));
        if (ssss == sss) {simword.push(dicword); df=true ;}
        var flag=hasAccent(dicword);
        
	if (flag==true) {

         cc=sss.substr(0,2);  
        if(df==false){ if ((cc=="ال" ) || (cc=="لل" )) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} }} 
           
	
        
         cc=sss.substr(0,1);  
        if(df==false){ if ((cc=="ب" ) ||(cc=="ل" )) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} } }
           

	
         cc=sss.substr(0,3);  
        if(df==false){ if (cc=="بال" ) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} } }
           
	
        
       if(df==false){
        cc=sss.substr(sss.length-1,1);
	if ((cc=="ه") || (cc=="ك") || (cc=="ي") ) {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

           }
	
	if(df==false){        
        cc=sss.substr(sss.length-2,2);
	if ((cc=="هم") || (cc=="نا") || (cc=="ها") || (cc=="هن")) {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

	}

	if(df==false){        
        cc=sss.substr(sss.length-3,3);
	if (cc=="هما") {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

	}

	if(df==false){        
        cc=sss.substr(sss.length-2,2);
	if ((cc=="تك") || (cc=="تي") ||  (cc=="ته")) {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }


	}
	if(df==false){        
        cc=sss.substr(sss.length-3,3);
	if ((cc=="تها") || (cc=="تنا") || (cc=="تهم") || (cc=="تهن") || (cc=="تكم")) {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }

	}
	if(df==false){        
        cc=sss.substr(sss.length-4,4);
	if (cc=="تهما") {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }

	}

       }
    }
	if(simword.length>0)simword.push(str);
    return simword;     
 }
 /////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function FindSimilard(str) {
   var cc="";  
   var ts="";
   var ssss = "";
   var dicword = "";
   var simword = [];
   var  ss = WithoutAccent(str);
   var sss = WithoutHamza(ss);
   var dname="";
   var doneflag=false;
   var dflag=false
   
 for (var i = 0; i < derivatives.deriv.length; i++) {
         df=false;
                   
		dicword = derivatives.deriv[i].derivative;
		dname= derivatives.deriv[i].dname;
        ssss = WithoutHamza(WithoutAccent(dicword));
        if (ssss == sss ) {
			if(flag)
{
		switch(dname)
	{
		case "اسم فاعل مزيد":dflag=true; break;
		case "مصدر مزيد":dflag=true; break;
		case "اسم فاعل مجرد":dflag=true; break;
		case "مصدر مجرد":dflag=true; break;
		case "صفة منسوبة":dflag=true; break;
		case "مصدر مجرد":dflag=true; break;
		case "صيغة مبالغة":dflag=true;;break;
		case "اسم تفضيل":dflag=true;break;
        case "فعل ماض مزيد مجهول": dflag=true;;break;
        case "فعل ماض مجرد مجهول": dflag=true;break;
        case "فعل مضارع مزيد مجهول": dflag=true;break;
        case "فعل مضارع مجرد مجهول": dflag=true;break;
        case "اسم مفعول مزيد": dflag=true;break;
        case "اسم مفعول مجرد":dflag=true;break;
        case "اسم مرة مجرد":dflag=true;break;
        case "اسم مرة مزيد":dflag=true;break;
        case "اسم آلة": dflag=true;break;
        case "اسم مكان مزيد": dflag=true;break;
        case "اسم مكان مجرد":dflag=true;break;
        case "اسم زمان مجرد": dflag=true;break;
        case "اسم زمان مزيد":dflag=true;break;
        case "ظرف مكان": dflag=true;break;
        case "ظرف زمان":flag=true;break;
		default: flag=false; 
 
	} 
}
   if(dflag) {simword.push(dicword); df=true ;}
		}
        var flag=hasAccent(dicword);
        
	if (flag==true) {

         cc=sss.substr(0,2);  
        if(df==false){ if ((cc=="ال" ) || (cc=="لل" )) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} }} 
           
	
        
         cc=sss.substr(0,1);  
        if(df==false){ if ((cc=="ب" ) ||(cc=="ل" )) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} } }
           

	
         cc=sss.substr(0,3);  
        if(df==false){ if (cc=="بال" ) {ts=cc+ssss;if(sss==ts) {ts=cc+dicword;simword.push(ts);df=true;} } }
           
	
        
       if(df==false){
        cc=sss.substr(sss.length-1,1);
	if ((cc=="ه") || (cc=="ك") || (cc=="ي") ) {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

           }
	
	if(df==false){        
        cc=sss.substr(sss.length-2,2);
	if ((cc=="هم") || (cc=="نا") || (cc=="ها") || (cc=="هن")) {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

	}

	if(df==false){        
        cc=sss.substr(sss.length-3,3);
	if (cc=="هما") {ts=ssss+cc;if(sss==ts){ts=dicword+cc;simword.push(ts);df=true;} }

	}

	if(df==false){        
        cc=sss.substr(sss.length-2,2);
	if ((cc=="تك") || (cc=="تي") ||  (cc=="ته")) {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }


	}
	if(df==false){        
        cc=sss.substr(sss.length-3,3);
	if ((cc=="تها") || (cc=="تنا") || (cc=="تهم") || (cc=="تهن") || (cc=="تكم")) {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }

	}
	if(df==false){        
        cc=sss.substr(sss.length-4,4);
	if (cc=="تهما") {ts=ssss.substr(0,ssss.length-1)+cc;if(sss==ts){ts=dicword.substr(0,dicword.length-1)+cc;simword.push(ts);df=true;} }

	}

       }
    }
	if(simword.length>0)simword.push(str);
    return simword;     
 }
 /////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function hasAccent(str)
{
     var sss = str.split("");
     var ss = "";
     var flag=false; 
     for (var i = 0; i < sss.length; i++) {
         if (sss[i] == "َ" || sss[i] == "ً" || sss[i] == "ُ" || sss[i] == "ٌ" || sss[i] == "ِ" || sss[i] == "ٍ" || sss[i] == "ّ" || sss[i] == "ْ" ) { flag=true; }
     
}
     return flag;

}

////////////////////////////////////////////////////////////////////////////////


function GetWordCat(wordstr) 
     {
         var sss="";
	 var i = 0;
         var   flag=false;
	while ( i < Diction.words.length && flag==false )
 	{
     

             if (wordstr == Diction.words[i].word) { flag=true;sss=Diction.words[i].subject; }
            i++;

         }
         return sss;

     }

////////////////////////////////////////////

////////////////////////////////////////////

function Withoutquot(str)
 {
    // var sss = str.split("");
     var s1=str.replace(".","");
     var s2=  s1.replace("ـ","");
      var s3=  s2.replace("،","");
      var s4=  s3.replace("!","");
     var s5=  s4.replace("؟",""); 
     var s6=  s5.replace("(","");
      var s7=  s6.replace(")","");
     var s8=  s7.replace("'","");
     var s9=  s8.replace('"','');
	  s9=  s8.replace('،','');
	  s9=  s8.replace('؛','');
	   s9=  s8.replace(':','');
	  
	 s9=  s9.replace('اً','');
 s9=  s9.replace("أنتِي","أنتِ");
 s9=  s9.replace("أنتِى","أنتِ");
 s9=  s9.replace("أنتَى","أنتِ");
 s9=  s9.replace("أنتَي","أنتِ");
 s9=  s9.replace("أنتي","أنتِ");
 s9=  s9.replace("أنتى","أنتِ");
  //   var ss = "";
  //   for (var i = 0; i < sss.length; i++) {
  //       if (sss[i] != "ـ" && sss[i] != "،" && sss[i] != "." && sss[i] != "!" && sss[i] != "؟" && sss[i] != "(" //&& sss[i] != ")" && sss[i] != "'"   && sss[i] != '"') { ss = ss + sss[i]; }
  //   }
//if(s9.trim()=="") s9="Bombaaa";
     return s9.trim();
 }
 ///////////////////////////
 function CorrectPicName(picname)
{
	var sss="";
	var xx=picname.indexOf("0360390");
	if(xx>0)  sss=picname.replace("0360390","0390360");
	else sss=picname;
	return sss;
}

///////////////////////////////////////////


function Noquots(str)
 {
    // var sss = str.split("");
     var s1=str.replace(".","");
     var s2=  s1.replace("ـ","");
      var s3=  s2.replace("،","");
      var s4=  s3.replace("!","");
     var s5=  s4.replace("؟",""); 
     var s6=  s5.replace("(","");
      var s7=  s6.replace(")","");
     var s8=  s7.replace("'","");
     var s9=  s8.replace('"','');
	  s9=  s8.replace('،','');
	  s9=  s8.replace('؛','');
	   s9=  s8.replace(':','');
	  
	 
  //   var ss = "";
  //   for (var i = 0; i < sss.length; i++) {
  //       if (sss[i] != "ـ" && sss[i] != "،" && sss[i] != "." && sss[i] != "!" && sss[i] != "؟" && sss[i] != "(" //&& sss[i] != ")" && sss[i] != "'"   && sss[i] != '"') { ss = ss + sss[i]; }
  //   }

     return s9.trim();
 }
 
 function ReadNummber(numstr)
 {
	
	 var num=[];
	 
	 if(numstr.length<=12) 
	 {
		 var xx=parseInt(numstr,10);
	var numb =Math.floor(xx/1000000000); 
	if (numb>1){ var yy=Readhandreds(numb);
	             for(var i=0;i<yy.length;i++)num.push(yy[i]);}
	if(numb>0) num.push("1000000000");
	if(numb>0)xx=xx-1000000000*numb;
	
	 numb =Math.floor(xx/1000000); 
	if (numb>1) { var yy=Readhandreds(numb);
	                     for(var i=0;i<yy.length;i++)num.push(yy[i]);}
	if(numb>0) num.push("1000000");
	if(numb>0)xx=xx-1000000*numb;
	
	 numb =Math.floor(xx/1000); 
	if (numb>1){ var yy=Readhandreds(numb);
						for(var i=0;i<yy.length;i++)num.push(yy[i]);}
	if(numb>0) num.push("1000");
    if(numb>0)xx=xx-1000*numb;  
    if(xx>0) {var yy=Readhandreds(xx); 
						for(var i=0;i<yy.length;i++)num.push(yy[i]);}
		 }
 return num;
 }
 
 
 
 function Readhandreds(numb)
 {
	 var ss=[];
	var h=0;
	var d=0;
	var u=0; 
	var uu=0;
	h=Math.floor(numb/100);
	var dd=numb-(h*100);
	if(dd>0) d=Math.floor(dd/10);
	if(dd>0) u=dd-(d*10);
	if(h>0) ss.push((100*h).toString());
	if(u>0) ss.push(u.toString());
	if(d>0) ss.push((10*d).toString());
	return ss;
	
 }
 
 function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}