    

 function loadcatwords() 
{
 var lst = document.getElementById("Select2");
        var j = 0;
        var ss = "";

        for (var i = 0; i < lst.options.length; i++) 
        {

            if (lst.options[i].selected == true) 
            {
                j++;
                
                ss = lst.options[i].value.toLowerCase();
            }


        }

        if (j == 1) {document.getElementById("newcat").value=ss;}


        
}
/////////////////////////////////////////////////////////

function getCookieData(labelName) {
var labelLen = labelName.length;
// read cookie property only once for speed
var cookieData = document.cookie;
var cLen = cookieData.length;
var i = 0;
var cEnd;
while (i < cLen) {
var j = i + labelLen;
if (cookieData.substring(i,j) == labelName) {
cEnd = cookieData.indexOf(";",j);
if (cEnd == -1) {
cEnd = cookieData.length;
}
return decodeURIComponent(cookieData.substring(j+1, cEnd));
}
i++;
}
return "";
}

/////////////////////////////////////////////////////////////


function Addneword() 
{
var flag=true;
var i = GetUserWordsNumber() + 1;

var wstr=document.getElementById("intxt").value;
var cstr = document.getElementById("newcat").value;
if (wstr=="") {alert("منن فضلك أدخل الكلمة") ; flag=false;}
if (cstr=="") {alert("من فضلك اختر أو أدخل التصنيف");  flag=false;}
if (flag==true){ flag = !( IsinTheDic(wstr));}

if (flag==true)
 {
        localStorage.setItem("signdicword" + i, wstr)
        localStorage.setItem("singdiccat" + i, cstr)
      populate();  
 }



}
 
 //////////////////////////////////
     function inlist(str) {
         var f = false;
         for (var i = 0; i < document.getElementById("Select2").options.length; i++) {
             var sss = document.getElementById("Select2").options[i].text;
             if (sss == str) { f = true; }

         }
         return f;
     }
     ////////////////////////////////////////


     /////////////////////////////////////////////////////////
     function populate() {
     	document.getElementById("Select2").innerHTML = "";
       
         var cats = Getcats()

         for (var i = 0; i < cats.length; i++) {
             var catob = document.createElement("option");
             catob.text = cats[i];
             catob.value = cats[i];
             catob.name = "catop" + (i + 1);
             catob.id = "catop" + (i + 1);
             document.getElementById("Select2").add(catob);
         }

         var cats = GetUserCats();

         for (var j = 0; j < cats.length; j++) {
             if(! inlist(cats[j]))
             { 
             var catob = document.createElement("option");
             catob.text = cats[j];
             catob.value = cats[j];
             catob.name = "catop" + (i + j + 1);
             catob.id = "catop" + (i + j  +  1);
             document.getElementById("Select2").add(catob);
             }
         }
	document.getElementById("Select1").innerHTML = "";
	var AllWords=GetUserWords();
	//alert(AllWords.length);

	 for(var j=0;j<AllWords.length;j++) 
	{
	var ob = document.createElement("option");
	ob.text = AllWords[j];
	ob.value = AllWords[j];
	ob.name = "op" + ( j + 1);
	ob.id = "op" + ( j + 1);
	document.getElementById("Select1").add(ob);
	}


     }

function IsinTheDic(str)
{
var dicwords =GetAllWords();
var uwords=GetUserWords();
var allwords= dicwords.concat(uwords);
var flag=false;
j=0;
while ((j < allwords.length) && (flag==false)) 
{
if (str==allwords[j]){flag=true;}
j++;
}
if (flag==true) {alert("هذه الكلمة موجودة بالفعل في القاموس") ;}
return flag;
}