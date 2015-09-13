var CurrentWord="";

function GetSetData(jsonobj)
{
	var jsonstr = JSON.stringify(jsonobj);
	ajaxData=[];
	console.log(jsonobj);
	console.log(jsonstr);
	
			$.ajaxSetup({async:false});

 $.post("php/dic.php",{param:jsonstr },function(data) {
	
      try {ajaxData = $.parseJSON(data); } catch (e) { };	  
	  });
	  return ajaxData;
}
////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function GetSetWordData(jsonobj)
{
	var jsonstr = JSON.stringify(jsonobj);
	ajaxData=[];
	//console.log(jsonobj);
    //	console.log(jsonstr);
$.ajaxSetup({async:false});
$.post("php/word.php",{param:jsonstr },function(data) {
	
      try {ajaxData = $.parseJSON(data); } catch (e) { };	  
	  });
	  return ajaxData;
}
////////////////////////////////////////////////////////////////////////
function Delfile(ftype,ffolder,fname)
{
	var jsonObj= new Array();
	item = {};
    item ["order"] = 25;
	item["fpath"]=ftype+"\\"+ffolder+"\\"+fname;
    jsonObj.push(item);
	var data=GetSetData(jsonObj);
	var sss=data[0]["result"];
	alert(sss);
	
}
////////////////////////////////////////////////////////////////////////////
function FillCountryBoxs()
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 1;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#countrybox2").find('option').remove().end();
		$("#countrybox3").find('option').remove().end();
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["country"];
		
		$("#countrybox2").append("<option value="+sss+">"+sss+"</option>");
		$("#countrybox3").append("<option value="+sss+">"+sss+"</option>");
		ddd.push(sss);
		
		 }
		 
		 $("#countryList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
////////////////////////////////////////////////////////////////////////
function FillGovernateBoxs(cntry)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 2;
		 item ["country"] = cntry;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#governatebox2").find('option').remove().end();
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["governate"];
		
		$("#governatebox2").append("<option value="+sss+">"+sss+"</option>");
		ddd.push(sss);
		
		 }
		 
		 $("#governateList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
/////////////////////////////////////////////////////////////////////////
function FillGovernateBoxs2(cntry)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 2;
		 item ["country"] = cntry;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#governatebox2").find('option').remove().end();
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["governate"];
		
		$("#governatebox2").append("<option value="+sss+">"+sss+"</option>");
		
		 }
		 
	
}

////////////////////////////////////////////////////////////////////////
function FillRegionList(cntry,govrn)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 3;
		item ["country"] = cntry;
		item ["governate"] = govrn;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["region"];
			ddd.push(sss);
		
		 }
		 
		 $("#regionList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
////////////////////////////////////////////////////////////////////////
function Getmajors()
{
	var ss="";
	var sss= $("#majorList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
	{
		var it=$("#majorList").jqxListBox('getItems').length;
		for(var i=0;i<it;i++) if(i==0)  ss=$("#majorList").jqxListBox('getItem', i).value;
		                                else ss=ss+"~"+$("#majorList").jqxListBox('getItem', i).value;  
		
	}
	return ss;
}
/////////////////////////////////////////////////////////////////////
function Getsyn()
{
	var ss="";
	var sss= $("#synonymList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
	{
		var it=$("#synonymList").jqxListBox('getItems').length;
		for(var i=0;i<it;i++) if(i==0)  ss=$("#synonymList").jqxListBox('getItem', i).value;
		                                else ss=ss+"~"+$("#synonymList").jqxListBox('getItem', i).value;  
		
	}
	return ss;
}
//////////////////////////////////////////////////////////////////////////
function GetsynCode()
{
	var ss="";
	var sss= $("#synonymList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
	{
		var it=$("#synonymList").jqxListBox('getItems').length;
		for(var i=0;i<it;i++) if(i==0)  ss=GetVideoName($("#synonymList").jqxListBox('getItem', i).value);
		                                else ss=ss+"~"+GetVideoName($("#synonymList").jqxListBox('getItem', i).value);  
		
	}
	return ss;
}

//////////////////////////////////////////////////////////////////////////
function GetVcount()
{
	var it=0;
	 it=$("#videoList").jqxListBox('getItems').length;
	 if(it==1)
	 {
	var sss= $("#videoList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
		 it=$("#videoList").jqxListBox('getItems').length;
	else it=0;
	 }
return it;	
}
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function GetVexcount()
{
	var it=0;
	 it=$("#videoexList").jqxListBox('getItems').length;
	 if(it==1)
	 {
	var sss= $("#videoexList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
		 it=$("#videoexList").jqxListBox('getItems').length;
	else it=0;
	 }
return it;	
}
////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
function GetAcount()
{
	var it=0;
	 it=$("#audioList").jqxListBox('getItems').length;
	 if(it==1)
	 {
	var sss= $("#audioList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
		 it=$("#audioList").jqxListBox('getItems').length;
	else it=0
	 }
return it;	
}
//////////////////////////////////////////////////////////////////////////
function Getlcount()
{
	var it=0;
	 it=$("#lipsingList").jqxListBox('getItems').length;
	if(it==1)
	{
	var sss= $("#lipsingList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
	
		 it=$("#lipsingList").jqxListBox('getItems').length;
	 else it=0;
	}
return it;	
}
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function Geticount()
{
	var it=0;
	it=$("#imageList").jqxListBox('getItems').length;
	if(it==1)
	{
	var sss= $("#imageList").jqxListBox('getItem', 0).value;
	if(sss!="لا يوجد") 
	
		 it=$("#imageList").jqxListBox('getItems').length;
	
	else it=0;
	}
return it;	
}
//////////////////////////////////////////////////////
function GetListElements(sss)
{
	var ss=[];
if(sss=="") ss.push("لايوجد");
else {
	var xx=sss.indexOf("~");
	if(xx>0) { 
	var zz= sss.split("~");
	for(var i=0;i<zz.length;i++) ss.push(zz[i]);
	}

    else ss.push(sss);
}
return ss;
}
function Getfnames(num,typ)
{
	var ss=[];
	if(num=="") ss.push("لا يوجد");
	else {
		xx=parseInt(num,10);
		if(xx>0) for(var i=0;i<xx;i++) ss.push((i+1)+typ);
		else ss.push("لا يوجد");
	}
	return ss;
}
///////////////////////////////////////////////////////////////////////////
function GetWordInfo(selectedword)
{
	
	var jsonObj= new Array();
	item = {};
	item ["order"] = 4;
	item ["word"] = selectedword;
	item ["wcode"] = GetVideoName(selectedword);
	 jsonObj.push(item);
		var data=GetSetWordData(jsonObj);
		$("#onewordbox").val(selectedword);
		$("#langboxw").val(data[0]["lang"]);$("#langboxw").click();
		$("#dialectboxw").val(data[0]["dialect"]);
		$("#wordtypebox").val(data[0]["wtype"]);
     	$("#subjectboxw").val(data[0]["subject"]);
		$("#countryboxw").val(data[0]["cntry"]);$("#countryboxw").click();
		$("#govboxw").val(data[0]["gvrn"]);$("#govboxw").click();
		$("#regionboxw").val(data[0]["region"]);
	    $("#explainbox").val(data[0]["explain"]);
		var temp=GetListElements(data[0]["major"]); $("#majorList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
        temp=GetListElements(data[0]["syn"]); $("#synonymList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
        temp=Getfnames(data[0]["vcount"],".webm");  $("#videoList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
 	    temp=Getfnames(data[0]["icount"],".jpg");  $("#imageList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
        temp=Getfnames(data[0]["acount"],".mp3");  $("#audioList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
        temp=Getfnames(data[0]["lcount"],".webm");  $("#lipsingList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });
		temp=Getfnames(data[0]["vexcount"],".webm");  $("#videoexList").jqxListBox({ source: temp , width: '200px', height: '150px', theme: 'summer' });

}
///////////////////////////////////////////////////////////////////////////
function InsertWord(param)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 2;
		item ["lang"] = $("#langboxw").val();
		item ["dialect"] = $("#dialectboxw").val();
		item ["word"] = $("#onewordbox").val();
		item ["wtype"] = $("#wordtypebox").val();
		item ["subject"] = $("#subjectboxw").val();
		item ["major"] = Getmajors();
		item ["cntry"] = $("#countryboxw").val();
		item ["gvrn"] = $("#govboxw").val();
		item ["vcount"] =GetVcount();
		item ["syn"] = Getsyn();
		item ["lcount"] = Getlcount();
		item ["acount"] = GetAcount();
		item ["region"] = $("#regionboxw").val();
		item ["wcode"] = GetVideoName($("#onewordbox").val());
		item ["icount"] =Geticount();
		item ["syncode"] =GetsynCode();
		item["explain"]=$("#explainbox").val();
		item ["vexcount"] =GetVexcount();
		jsonObj.push(item);
		var data=GetSetWordData(jsonObj);
		var sss=data[0]["result"];
		if (param>0)alert(sss);

}
////////////////////////////////////////////////////////////////////////////////////
function DeleteWord(param)
{
	
	var jsonObj= new Array();
	item = {};
	item ["order"] = 5;
    item ["word"] = $("#onewordbox").val();
	item ["wcode"] = GetVideoName($("#onewordbox").val());
	jsonObj.push(item);
	var data=GetSetWordData(jsonObj);
	var sss=data[0]["result"];
	if (param>0) alert(sss);
	

}
////////////////////////////////////////////////////////////////////////////////////
function GetAllwords(subj)
{
		var jsonObj= new Array();
	item = {};
        item ["order"] = 1;
		item["subj"]=subj;
		jsonObj.push(item);
		var data=GetSetWordData(jsonObj);
		var ddd=[];
		
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["word"];
		 ddd.push(sss);
		 }
return ddd
}
//////////////////////////////////////////////////////////////////////////////////////
function DelCountry(cntry)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 7;
		item ["country"] = cntry;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
	//alert("تم الحذف بنجاح");

}

function UpdateCountry(cntry,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 10;
		item ["country"] = cntry;
		item ["newvalue"] = newvalue;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
		//alert("تم التعديل بنجاح");

}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
function InserGovernate(cntry,govrn)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 5;
		item ["country"] = cntry;
		item ["governate"] = govrn;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////////
function DelGovernate(cntry,govrn)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 8;
		item ["country"] = cntry;
		item ["governate"] = govrn;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////
function UpdateGovernate(cntry,govrn,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 11;
		item ["country"] = cntry;
		item ["governate"] = govrn;
        item ["newvalue"] = newvalue;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////
function InserRegion(cntry,govrn,rgn)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 6;
		item ["country"] = cntry;
		item ["governate"] = govrn;
		item ["region"] = rgn;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
//////////////////////////////////////////////////////////////////////////////
function DelRegion(cntry,govrn,rgn)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 9;
		item ["country"] = cntry;
		item ["governate"] = govrn;
		item ["region"] = rgn;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////////////////
function UpdateRegion(cntry,govrn,rgn,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 12;
		item ["country"] = cntry;
		item ["governate"] = govrn;
		item ["region"] = rgn;
		item ["newvalue"] = newvalue;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
//////////////////////////////////////////////////////////////////////////////
function InserSubject(subj)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 13;
		item ["subject"] = subj;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}

///////////////////////////////////////////////////////////////////////////
function DelSubject(subj)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 14;
		item ["subject"] = subj;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
	//alert("تم الحذف بنجاح");

}
////////////////////////////////////////////////////////////////////////////
function UpdateSubject(subj,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 15;
		item ["subject"] = subj;
		item ["newvalue"] = newvalue;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
		//alert("تم التعديل بنجاح");

}
///////////////////////////////////////////////////////////////////////
function FillSubjectBoxs()
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 16;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["subject"];
		
				ddd.push(sss);
		
		 }
		 
		 $("#subjectList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
////////////////////////////////////////////////////////////////////////
function InserLang(lng)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 17;
		item ["lang"] = lng;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}

//////////////////////////////////////////////////////////////////////////////
function DelLang(lng)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 18;
		item ["lang"] = lng;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
	//alert("تم الحذف بنجاح");

}

function UpdateLang(lng,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 19;
		item ["lang"] = lng;
		item ["newvalue"] = newvalue;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
		//alert("تم التعديل بنجاح");

}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
function InserDialect(lng,dlct)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 21;
		item ["lang"] = lng;
		item ["dialect"] = dlct;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////////
function DelDialect(lng,dlct)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 22;
		item ["lang"] = lng;
		item ["dialect"] = dlct;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////
function UpdateDialect(lng,dlct,newvalue)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 23;
		item ["lang"] = lng;
		item ["dialect"] = dlct;
        item ["newvalue"] = newvalue;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
function FillLangBoxs()
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 20;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#langbox2").find('option').remove().end();
		
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["lang"];
		
		$("#langbox2").append("<option value="+sss+">"+sss+"</option>");
		
		ddd.push(sss);
		
		 }
		 
		 $("#langList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
////////////////////////////////////////////////////////////////////////
function FillDialectBoxs(cntry)
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 24;
		 item ["lang"] = cntry;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var ddd=[];
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["dialect"];
		
		
		ddd.push(sss);
		
		 }
		 
		 $("#dialectList").jqxListBox({ source:ddd, width: '200px', height: '200px', theme: 'summer' });

}
////////////////////////////////////////////////////////////////////////////////
function fillwordboxes()
{
	var jsonObj= new Array();
	item = {};
        item ["order"] = 1;
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#countryboxw").find('option').remove().end();
		
		
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["country"];
		
		$("#countryboxw").append("<option value="+sss+">"+sss+"</option>");
				
		 }
		 
item = {};
jsonObj= new Array();

  item ["order"] = 16;

        jsonObj.push(item);
		 data=GetSetData(jsonObj);
		$("#subjectboxw").find('option').remove().end();
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["subject"];
		
		$("#subjectboxw").append("<option value="+sss+">"+sss+"</option>");		
		
		 }
		 
item = {};
jsonObj= new Array();

item ["order"] = 20;
        jsonObj.push(item);
		data=GetSetData(jsonObj);
		$("#langboxw").find('option').remove().end();
		
		
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["lang"];
		
		$("#langboxw").append("<option value="+sss+">"+sss+"</option>");
		
		
		
		 }
		 $("#wordtypebox").find('option').remove().end();
		 $("#wordtypebox").append("<option value='اسم'>اسم</option>");
		 $("#wordtypebox").append("<option value='فعل'>فعل</option>");
		 $("#wordtypebox").append("<option value='حرف'>حرف</option>");
		 $("#wordtypebox").append("<option value='ظرف زمان'>اظرف زمان</option>");
	     $("#wordtypebox").append("<option value='ظرف مكان'>ظرف مكان</option>");
         $("#wordtypebox").append("<option value='أداة إستفهام'>أداة إستفهام</option>");
         $("#wordtypebox").append("<option value='إسم موصول'>إسم موصول</option>");
		 $("#wordtypebox").append("<option value='اسم إشارة'>اسم إشارة</option>");
		 $("#wordtypebox").append("<option value='ضمير'>ضمير</option>");

}


////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
				FillCountryBoxs();
              var source = [
                    
"Affogato",
                    
"Americano",
                    
"Bicerin",
                    
"Breve",
                    
"Café Bombón",
                    
"Café au lait",
                    
"Caffé Corretto",
                    
"Café Crema",
                    
"Caffé Latte",
		        ];
                // Create a jqxListBox
$("#basiccmd").click(function(e) {
	$("#mainpanel").hide("slow",function(){$("#basicpanel").show( "explode", {pieces: 16 }, 1000 );});
	
    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddic").click(function(e) {
	$("#mainpanel").hide("slow",function(){$("#dicpanel").show( "explode", {pieces: 16 }, 1000 );});
	FillLangBoxs();
    FillDialectBoxs($("#langbox2").val());

    
});
/////////////////////////////////////////////////////////////////////////
$("#cmddicreturn").click(function(e) {
	if($('#subjectpanel').is(':visible'))   
	 	$("#subjectpanel").hide("slow",function(){$("#dicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
else if($('#langpanel').is(':visible'))   
	 	$("#langpanel").hide("slow",function(){$("#dicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
else if($('#dialectpanel').is(':visible'))   
	 	$("#dialectpanel").hide("slow",function(){$("#dicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
else if($('#wordpanel').is(':visible'))   
	 	$("#wordpanel").hide("slow",function(){$("#dicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
		
		else 
    	$("#dicpanel").hide("slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );});
	

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdcountries").click(function(e) {
	
    if($('#governatepanel').is(':visible')) 
		$("#governatepanel").hide("slow",function(){$("#countrypanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#regionpanel').is(':visible'))   
	 	$("#regionpanel").hide("slow",function(){$("#countrypanel").show( "explode", {pieces: 16 }, 1000 );});    
		else $("#countrypanel").show("explode",{},1000);
    // Code
//$("#countryList").jqxListBox({ source: source, width: '200px', height: '200px', theme: 'summer' });

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdgovernates").click(function(e) {
     if($('#countrypanel').is(':visible')) 
		$("#countrypanel").hide("slow",function(){$("#governatepanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#regionpanel').is(':visible'))   
	 	$("#regionpanel").hide("slow",function(){$("#governatepanel").show( "explode", {pieces: 16 }, 1000 );});    
		else $("#governatepanel").show( "explode", {pieces: 16 }, 1000 );
    FillGovernateBoxs($("#countrybox2").val());
	//$("#governateList").jqxListBox({ source: source, width: '200px', height: '200px', theme: 'summer' });

});
/////////////////////////////////////////////////////////////////////////////////////////
$("#cmdregions").click(function(e) {
     if($('#countrypanel').is(':visible')) 
		$("#countrypanel").hide("slow",function(){$("#regionpanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#governatepanel').is(':visible'))   
	 	$("#governatepanel").hide("slow",function(){$("#regionpanel").show( "explode", {pieces: 16 }, 1000 );});    
		else $("#regionpanel").show( "explode", {pieces: 16 }, 1000 );
    FillGovernateBoxs($("#countrybox3").val());
	//$("#regionList").jqxListBox({ source: source, width: '200px', height: '200px', theme: 'summer' });
FillRegionList($("#countrybox3").val(),$("#governatebox2").val());
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdreturn").click(function(e) {
     if($('#countrypanel').is(':visible')) 
		$("#countrypanel").hide("slow",function(){$("#basicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
    else if($('#governatepanel').is(':visible'))   
	 	$("#governatepanel").hide("slow",function(){$("#basicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});
	 else if($('#regionpanel').is(':visible'))   
	 	$("#regionpanel").hide("slow",function(){$("#basicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );});

		else $("#basicpanel").hide( "slow",function(){$("#mainpanel").show( "explode", {pieces: 16 }, 1000 );} );
    
	
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdaddcountry").click(function(e) {
	if( $("#countrybox").val()=="") {alert("من فضلك أكتب إسم الدولة"); return;}
    InserCountry($("#countrybox").val());
	FillCountryBoxs();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

$("#cmdaddgovernate").click(function(e) {
    if( $("#countrybox2").val()=="") {alert("من فضلك إختر إسم الدولة"); return;}
    if( $("#governatebox").val()=="") {alert("من فضلك أكتب إسم المحافظة"); return;}
    InserGovernate($("#countrybox2").val(),$("#governatebox").val());
	FillGovernateBoxs($("#countrybox2").val());
});

////////////////////////////////////////////////////////////////////////////////////

$("#cmdaddregion").click(function(e) {
	 if( $("#countrybox3").val()=="") {alert("من فضلك إختر إسم الدولة"); return;}
    if( $("#governatebox2").val()=="") {alert("من فضلك إختر إسم المحافظة"); return;}
	 if( $("#regionbox").val()=="") {alert("من فضلك إختر إسم المنطقة"); return;}
    InserRegion($("#countrybox3").val(),$("#governatebox2").val(),$("#regionbox").val());
	FillRegionList($("#countrybox3").val(),$("#governatebox2").val());

    
});//////////////////////////////////////////////////////////////////

$("#cmddelcountry").click(function(e) {
	
    var indx=$("#countryList").jqxListBox("getSelectedIndex");
	if (indx>=0){
		var cntry= $("#countryList").jqxListBox('getItem', indx).value;
		DelCountry(cntry);
		FillCountryBoxs();
	}
	else alert('إختر الدولة أولاً');
	
});
///////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifycountry").click(function(e) {
	
if( $("#countrybox").val()=="") {alert("من فضلك أكتب إسم الدولة المعدل"); return;}

    var indx=$("#countryList").jqxListBox("getSelectedIndex");
	
	if (indx>=0){
		var cntry= $("#countryList").jqxListBox('getItem', indx).value;
		UpdateCountry(cntry,$("#countrybox").val());
		FillCountryBoxs();
	}
	else alert('إختر الدولة أولاً');
});
          
////////////////////////////////////////////////////////////////////////////////////
			
////////////////////////////////////////////////////////////////////////////////////
 $("#cmddelgovernate").click(function(e) {
			if( $("#countrybox2").text()=="") {alert("من فضلك إختر إسم الدولة"); return;}

		
             var indx=$("#governateList").jqxListBox("getSelectedIndex");
			 if (indx>=0){
			 var cntry=$("#countrybox2").val();
			 var gvrn= $("#governateList").jqxListBox('getItem', indx).value;
			 DelGovernate(cntry,gvrn);
			  FillGovernateBoxs(cntry);
			 }
			  else alert('إختر المحافظة التي تريد حذفها ');
			 
        });
////////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifygovernate").click(function(e) {
	
 if( $("#countrybox2").text()=="") {alert("من فضلك إختر إسم الدولة"); return;}

 if( $("#governatebox").val()=="") { alert("من فضلك أكتب إسم المحافظة المعدل"); return;}

 var indx=$("#governateList").jqxListBox("getSelectedIndex");
 if (indx>=0){
			 var cntry=$("#countrybox2").val();
			 var gvrn= $("#governateList").jqxListBox('getItem', indx).value;
			 var newvalue=$("#governatebox").val();
			 UpdateGovernate(cntry,gvrn,newvalue);
			 FillGovernateBoxs(cntry);
			 }
			 else alert('إختر المحافظة التي تريد تعديل إسمها');

});
////////////////////////////////////////////////////////////////////////////////////////////////
 $("#cmddelregion").click(function(e) {
			
			if( $("#countrybox3").text()=="") {alert("من فضلك إختر إسم الدولة"); return;}
          	if( $("#governatebox2").text()=="") {alert("من فضلك إختر إسم المحافظة"); return;}

			 var indx=$("#regionList").jqxListBox("getSelectedIndex");
			 if (indx>=0){
			 var cntry=$("#countrybox3").val();
			 var gvrn=$("#governatebox2").val();
			 var rgn= $("#regionList").jqxListBox('getItem', indx).value;
			
			 DelRegion(cntry,gvrn,rgn);
			 FillRegionList(cntry,gvrn); 
			 }
			  else alert('إختر المنطقة التي تريد حذفها ');
			 
        });

///////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifyregion").click(function(e) {
	
 			if($("#countrybox3").text()=="") {alert("من فضلك إختر إسم الدولة"); return;}
          	if($("#governatebox2").text()=="") {alert("من فضلك إختر إسم المحافظة"); return;}
            if($("#regionbox").val()=="") { alert("من فضلك أكتب إسم المنطقة المعدل"); return;}

			 var indx=$("#regionList").jqxListBox("getSelectedIndex");
			 if (indx>=0){
			 var cntry=$("#countrybox3").val();
			 var gvrn=$("#governatebox2").val();
			 var newvalue=$("#regionbox").val();
			 var rgn= $("#regionList").jqxListBox('getItem', indx).value;
			 UpdateRegion(cntry,gvrn,rgn,newvalue);
			 FillRegionList(cntry,gvrn);
			 }
			 else alert('إختر المنطقة التي تريد تعديل إسمها');

});
/////////////////////////////////////////////////////////////////////
$("#countrybox2").click(function(e) {
	var contry=$("#countrybox2").val();
       FillGovernateBoxs(contry);
});
//////////////////////////////////////////////////////////////////////////////
$("#countrybox3").click(function(e) {
    var cntry=$("#countrybox3").val();
    FillGovernateBoxs2(cntry);
    var govrn=$("#governatebox2").val();
 	FillRegionList(cntry,govrn);
});
    
/////////////////////////////////////////////////////////////////////////////////////////////////
$("#governatebox2").click(function(e) {
	 var cntry=$("#countrybox3").val();
	 var govrn=$("#governatebox2").val();
 FillRegionList(cntry,govrn);
});
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdlangs").click(function(e) {
	
    if($('#dialectpanel').is(':visible')) 
		$("#dialectpanel").hide("slow",function(){$("#langpanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#subjectpanel').is(':visible'))   
	 	$("#subjectpanel").hide("slow",function(){$("#langpanel").show( "explode", {pieces: 16 }, 1000 );});    
	else  if($('#wordpanel').is(':visible'))   
	 	$("#wordpanel").hide("slow",function(){$("#langpanel").show( "explode", {pieces: 16 }, 1000 );});    

		else $("#langpanel").show("explode",{},1000);
  	FillLangBoxs();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddialects").click(function(e) {
     if($('#langpanel').is(':visible')) 
		$("#langpanel").hide("slow",function(){$("#dialectpanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#subjectpanel').is(':visible'))   
	 	$("#subjectpanel").hide("slow",function(){$("#dialectpanel").show( "explode", {pieces: 16 }, 1000 );});    
		else  if($('#wordpanel').is(':visible'))   
	 	$("#wordpanel").hide("slow",function(){$("#dialectpanel").show( "explode", {pieces: 16 }, 1000 );});    

		else $("#dialectpanel").show( "explode", {pieces: 16 }, 1000 );
    FillDialectBoxs($("#langbox2").val());
	//$("#dialectList").jqxListBox({ source: source, width: '200px', height: '200px', theme: 'summer' });

});
/////////////////////////////////////////////////////////////////////////////////////////
$("#cmdsubjects").click(function(e) {
     if($('#langpanel').is(':visible')) 
		$("#langpanel").hide("slow",function(){$("#subjectpanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#dialectpanel').is(':visible'))   
	 	$("#dialectpanel").hide("slow",function(){$("#subjectpanel").show( "explode", {pieces: 16 }, 1000 );});    
		else  if($('#wordpanel').is(':visible'))   
	 	$("#wordpanel").hide("slow",function(){$("#subjectpanel").show( "explode", {pieces: 16 }, 1000 );});    
	
		else $("#subjectpanel").show( "explode", {pieces: 16 }, 1000 );
   	FillSubjectBoxs();
});

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
$("#cmdwords").click(function(e) {
     if($('#langpanel').is(':visible')) 
		$("#langpanel").hide("slow",function(){$("#wordpanel").show( "explode", {pieces: 16 }, 1000 );});
     else  if($('#dialectpanel').is(':visible'))   
	 	$("#dialectpanel").hide("slow",function(){$("#wordpanel").show( "explode", {pieces: 16 }, 1000 );});    
		 else  if($('#subjectpanel').is(':visible'))   
	 	$("#dialectpanel").hide("slow",function(){$("#wordpanel").show( "explode", {pieces: 16 }, 1000 );});    
		else $("#wordpanel").show( "explode", {pieces: 16 }, 1000 );
			 $("#synonymList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
	         $("#majorList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
	         $("#imageList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
	         $("#videoList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
			 $("#videoexList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
             $("#lipsingList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
             $("#audioList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
             fillwordboxes();
   //	FillSubjectBoxs();
});

//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdaddsubject").click(function(e) {
		if( $("#subjectbox").val()=="") {alert("من فضلك أكتب إسم الموضوع"); return;}

    InserSubject( $("#subjectbox").val());
		FillSubjectBoxs();
});
/////////////////////////////////////////////////////////////////////////////

$("#cmddelsubject").click(function(e) {
      var indx=$("#subjectList").jqxListBox("getSelectedIndex");
	if (indx>=0){
		var subj= $("#subjectList").jqxListBox('getItem', indx).value;
		DelSubject(subj);
		FillSubjectBoxs();
	}
	else alert('إختر الموضوع أولاً');
});
////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifysubject").click(function(e) {
    if( $("#subjectbox").val()=="") {alert("من فضلك أكتب إسم الموضوع المعدل"); return;}

    var indx=$("#subjectList").jqxListBox("getSelectedIndex");
	
	if (indx>=0){
		var subj= $("#subjectList").jqxListBox('getItem', indx).value;
		UpdateSubject(subj,$("#subjectbox").val());
		FillSubjectBoxs();
	}
	else alert('إختر الموضوع أولاً');

});

$("#cmdaddlang").click(function(e) {
	if( $("#langbox").val()=="") {alert("من فضلك أكتب إسم اللغة"); return;}
    InserLang($("#langbox").val());
	FillLangBoxs();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

$("#cmdadddialect").click(function(e) {
    if( $("#langbox2").val()=="") {alert("من فضلك إختر إسم اللغة"); return;}
    if( $("#dialectbox").val()=="") {alert("من فضلك أكتب إسم اللهجة"); return;}
    InserDialect($("#langbox2").val(),$("#dialectbox").val());
	FillDialectBoxs($("#langbox2").val());
});



$("#cmddellang").click(function(e) {
	
    var indx=$("#langList").jqxListBox("getSelectedIndex");
	if (indx>=0){
		var lng= $("#langList").jqxListBox('getItem', indx).value;
		DelLang(lng);
		FillLangBoxs();
	}
	else alert('إختر اللغة أولاً');
	
});
///////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifylang").click(function(e) {
	
if( $("#langbox").val()=="") {alert("من فضلك أكتب إسم اللغة المعدل"); return;}

    var indx=$("#langList").jqxListBox("getSelectedIndex");
	
	if (indx>=0){
		var lng= $("#langList").jqxListBox('getItem', indx).value;
		UpdateLang(lng,$("#langbox").val());
		FillLangBoxs();
	}
	else alert('إختر اللغة أولاً');
});
          
			
////////////////////////////////////////////////////////////////////////////////////
 $("#cmddeldialect").click(function(e) {
			if( $("#langbox2").text()=="") {alert("من فضلك إختر إسم اللغة"); return;}

		
             var indx=$("#dialectList").jqxListBox("getSelectedIndex");
			 if (indx>=0){
			 var lng=$("#langbox2").val();
			 var dlct= $("#dialectList").jqxListBox('getItem', indx).value;
			 DelDialect(lng,dlct);
			  FillDialectBoxs(lng);
			 }
			  else alert('إختر اللهجة التي تريد حذفها ');
			 
        });
////////////////////////////////////////////////////////////////////////////////////
$("#cmdmodifydialect").click(function(e) {
	
 if( $("#langbox2").text()=="") {alert("من فضلك إختر إسم اللغة"); return;}

 if( $("#dialectbox").val()=="") { alert("من فضلك أكتب إسم اللهجة المعدل"); return;}

 var indx=$("#dialectList").jqxListBox("getSelectedIndex");
 if (indx>=0){
			 var lng=$("#langbox2").val();
			 var dlct= $("#dialectList").jqxListBox('getItem', indx).value;
			 var newvalue=$("#dialectbox").val();
			 UpdateDialect(lng,dlct,newvalue);
			 FillDialectBoxs(lng);
			 }
			 else alert('إختر اللهجة التي تريد تعديل إسمها');

});
/////////////////////////////////////////////////////////////////////////////////
$("#langbox2").click(function(e) {
	var lng=$("#langbox2").val();
       FillDialectBoxs(lng);
});

$("#countryboxw").click(function(e) {
    var jsonObj= new Array();
	item = {};
        item ["order"] = 2;
		 item ["country"] = $("#countryboxw").val();
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#govboxw").find('option').remove().end();
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["governate"];
		
		$("#govboxw").append("<option value="+sss+">"+sss+"</option>");
}
});

$("#govboxw").click(function(e) {
    var jsonObj= new Array();
	item = {};
        item ["order"] = 3;
		item ["country"] = $("#countryboxw").val();
		item ["governate"] = $("#govboxw").val();
        jsonObj.push(item);
		$("#regionboxw").find('option').remove().end();
		var data=GetSetData(jsonObj);
		
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["region"];
			
		$("#regionboxw").append("<option value="+sss+">"+sss+"</option>");
		 }
});

$("#langboxw").click(function(e) {
    var jsonObj= new Array();
	item = {};
        item ["order"] = 24;
		 item ["lang"] = $("#langboxw").val();
        jsonObj.push(item);
		var data=GetSetData(jsonObj);
	$("#dialectboxw").find('option').remove().end();
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["dialect"];
		 $("#dialectboxw").append("<option value="+sss+">"+sss+"</option>");
		 }
});

$("#cmdsearchword").click(function(e) {
if($("#subjectboxw").val()=="") {alert("من فضلك إختر الموضوع"); return;}
	var ddd=GetAllwords($("#subjectboxw option:selected").text());
//		$("#dvideo").hide();
//	 
//		$("#dimage").hide();
//		$("#daudio").hide();
		
	$("#wordList").jqxListBox({ source:ddd, width: '150px', height: '150px', theme: 'summer' });
   $("#serchdialog").dialog();
   // $( "#dialog" ).dialog();
});
$("#cmdaddmajor").click(function(e) {
  if($("#majorbox").val()=="") {alert(" أكتب التخصص أولاً");return;}
  var itemesno=0;
 itemesno=$("#majorList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#majorList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد") $("#majorList").jqxListBox('removeAt', 0);
	}
 var sss=$("#majorList").jqxListBox('getItemByValue',$("#majorbox").val());
if(typeof sss === 'undefined')  $("#majorList").jqxListBox('addItem', $("#majorbox").val());

else alert(" هذا التخصص موجود بالفعل");


});
$("#cmddelmajor").click(function(e) {
	
 	var itemesno=0;
 	itemesno=$("#majorList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
 
    var indx=$("#majorList").jqxListBox("getSelectedIndex");
	if (indx>=0) $("#majorList").jqxListBox('removeAt', indx);
	else alert('اختر التخصص الذي تريد حذفه');
});

$("#cmdmodifymajor").click(function(e) {
	var itemesno=0;
 itemesno=$("#majorList").jqxListBox('getItems').length;
   
    if(itemesno==0) return;
    if($("#majorbox").val()=="") {alert(" أكتب التخصص أولاً");return;}

	 var indx=$("#majorList").jqxListBox("getSelectedIndex");
	if (indx>=0) $("#majorList").jqxListBox('updateAt', { label: $("#majorbox").val(), value: $("#majorbox").val() },indx);
	else alert('اختر التخصص الذي تريد تعديله');
});
/////////////////////////////////////////////////////////////////////////////////

$("#cmdaddsynonym").click(function(e) {
  if($("#synonymbox").val()=="") {alert(" أكتب المرادف أولاً");return;}
    var itemesno=0;
 	itemesno=$("#synonymList").jqxListBox('getItems').length;
 	if(itemesno==1){
   var ss=  $("#synonymList").jqxListBox('getItem',0).value;
     if (ss=="لا يوجد") $("#synonymList").jqxListBox('removeAt', 0);
	}
	
var sss=$("#synonymList").jqxListBox('getItemByValue',$("#synonymbox").val());

if(typeof sss === 'undefined')  $("#synonymList").jqxListBox('addItem', $("#synonymbox").val());

else alert(" هذا المرادف موجود بالفعل");


});

//////////////////////////////////////////////////////////////////////////////

$("#cmddelsynonym").click(function(e) {
	var itemesno=0;
 	itemesno=$("#synonymList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
 
    var indx=$("#synonymList").jqxListBox("getSelectedIndex");
	if (indx>=0) $("#synonymList").jqxListBox('removeAt', indx);
	else alert('اختر المرادف الذي تريد حذفه');
});

$("#cmdmodifysynonym").click(function(e) {
	var itemesno=0;
 	itemesno=$("#synonymList").jqxListBox('getItems').length;
 	if(itemesno==0) return;

    if($("#synonymbox").val()=="") {alert(" أكتب المرادف أولاً");return;}

	 var indx=$("#synonymList").jqxListBox("getSelectedIndex");
	if (indx>=0) $("#synonymList").jqxListBox('updateAt', { label: $("#synonymbox").val(), value: $("#synonymbox").val() },indx);
	else alert('اختر المرادف الذي تريد تعديله');
});

/////////////////////////////////////////////////////////////////////////////////
$("#cmdaddword").click(function(e) {
  if( $("#countryboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم الدولة"); return;}
  if( $("#govboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المحافظة"); return;}
  if( $("#regionboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المنطقة"); return;}
  if( $("#subjectboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم الموضوع"); return;}
  if( $("#langboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم اللغة"); return;}
  if( $("#dialectboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم اللهجة"); return;}
  if( $("#wordtypebox option:selected" ).text()=="") {alert("من فضلك إختر  نوع الكلمة"); return;}
  if( $("#onewordbox").val()=="") {alert("من فضلك أكتب الكلمة"); return;}
  InsertWord(1);
  CurrentWord="";
  clearboxes();
});

$("#cmdmodifyword").click(function(e) {
	if(	CurrentWord=="") {alert("إختر الكلمة التي تريد حذفها أولا من خلال بحث");retutn;}
  if( $("#countryboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم الدولة"); return;}
  if( $("#govboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المحافظة"); return;}
  if( $("#regionboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المنطقة"); return;}
  if( $("#subjectboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم الموضوع"); return;}
  if( $("#langboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم اللغة"); return;}
  if( $("#dialectboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم اللهجة"); return;}
  if( $("#wordtypebox option:selected" ).text()=="") {alert("من فضلك إختر  نوع الكلمة"); return;}
   if( $("#onewordbox").val()!=CurrentWord) {alert("الكلمة المختارة للتعديل غير متطابقة مع الكلمة الحالية"); return;}
   DeleteWord(0);
   InsertWord(0);
 alert("تم التعديل بنجاح");
 CurrentWord="";
clearboxes();

});



$('#imageupload').submit(function () {

    // Get the Login Name value and trim it
    var name = $.trim($('#imagefile').val());
   var theword = $.trim($('#onewordbox').val());
    // Check if empty of not
    if (name  === '') {
        alert('إختر ملف الصورة أولاً');
        return false;
    }

 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الصورة الخاصة بها');
        return false;
    }
});

$('#imagefile').change(function(e) {
    
	
	 if($('#imagefile').val().indexOf(".jpg")<0)
	 {
		  alert('غير مسموح بهذا النوع من الملفات');
		  $('#imagefile').replaceWith($('#imagefile').val('').clone(true));
		  return;
	 }
	 var theword = $.trim($('#onewordbox').val());
	 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الصورة الخاصة بها');
		$('#imagefile').replaceWith($('#imagefile').val('').clone(true));
    }
	else {
		var ss=GetVideoName($.trim($('#onewordbox').val()));
		$("#imagefolder").val(ss);
		var xx= Geticount() +1;
		$("#imagename").val(xx);
	}
	
	});
	
	/////////////////////////////////////////////////////////////////////////////
	$('iframe#upframe').load(function() {
 itemesno=$("#imageList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#imageList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد"){ $("#imageList").jqxListBox('removeAt', 0);itemesno=0;}
	  
	}
 
  $("#imageList").jqxListBox('addItem', (itemesno+1) +".jpg");

});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
$("#cmddelimage").click(function(e) {
	var itemesno=0;
	
 	itemesno=$("#imageList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#imageList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#imageList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد حذف صورتها");return;}
	if (indx>=0) {
		 var ss=  $("#imageList").jqxListBox('getItem',indx).value;
		$("#imageList").jqxListBox('removeAt', indx);
	Delfile("images",GetVideoName($("#onewordbox").val()),ss);
	}
	else alert('اختر الصورة الذي تريد حذفها');

   
});  

$("#cmdvieimage").click(function(e) {
    	var itemesno=0;
	
 	itemesno=$("#imageList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#imageList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#imageList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد عرض صورتها");return;}
	if (indx>=0) {
	//	$("#dsearch").hide();
//		$("#dvideo").hide();
//		$("#daudio").hide();
//		$("#dimage").show();
		var ss=  $("#imageList").jqxListBox('getItem',indx).value;
		$("#previmg").attr("src", "res/images/"+GetVideoName($("#onewordbox").val())+ "/"+ss);
	  $( "#imagedialog" ).dialog();
	}
	else alert('اختر الصورة الذي تريد عرضها');

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#videoupload').submit(function () {

    // Get the Login Name value and trim it
    var name = $.trim($('#videofile').val());
   var theword = $.trim($('#onewordbox').val());
    // Check if empty of not
    if (name  === '') {
        alert('إختر ملف الفيديو أولاً');
        return false;
    }

 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الفيديو الخاص بها');
        return false;
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#videoexupload').submit(function () {

    // Get the Login Name value and trim it
    var name = $.trim($('#videoexfile').val());
   var theword = $.trim($('#onewordbox').val());
    // Check if empty of not
    if (name  === '') {
        alert('إختر ملف الفيديو أولاً');
        return false;
    }

 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الفيديو الخاص بها');
        return false;
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#videofile').change(function(e) {
    
	
	 if($('#videofile').val().indexOf(".webm")<0)
	 {
		  alert('غير مسموح بهذا النوع من الملفات');
		  $('#videofile').replaceWith($('#videofile').val('').clone(true));
		  return;
	 }
	 var theword = $.trim($('#onewordbox').val());
	 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الفيديو الخاص بها');
		$('#videofile').replaceWith($('#videofile').val('').clone(true));
    }
	else {
		var ss=GetVideoName($.trim($('#onewordbox').val()));
		$("#videofolder").val(ss);
		var xx= GetVcount() +1;
		$("#videoname").val(xx);
	}
	
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#videoexfile').change(function(e) {
    
	
	 if($('#videoexfile').val().indexOf(".webm")<0)
	 {
		  alert('غير مسموح بهذا النوع من الملفات');
		  $('#videofile').replaceWith($('#videofile').val('').clone(true));
		  return;
	 }
	 var theword = $.trim($('#onewordbox').val());
	 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الفيديو الخاص بها');
		$('#videoexfile').replaceWith($('#videoexfile').val('').clone(true));
    }
	else {
		var ss=GetVideoName($.trim($('#onewordbox').val()));
		$("#videoexfolder").val(ss);
		var xx= GetVexcount() +1;
		$("#videoexname").val(xx);
	}
	
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('iframe#upvframe').load(function() {
 itemesno=$("#videoList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#videoList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد"){ $("#videoList").jqxListBox('removeAt', 0);itemesno=0;}
	  
	}
 
  $("#videoList").jqxListBox('addItem', (itemesno+1) +".webm");

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('iframe#upvexframe').load(function() {
 itemesno=$("#videoexList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#videoexList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد"){ $("#videoexList").jqxListBox('removeAt', 0);itemesno=0;}
	  
	}
 
  $("#videoexList").jqxListBox('addItem', (itemesno+1) +".webm");

});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddelvideo").click(function(e) {
	var itemesno=0;
	
 	itemesno=$("#videoList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#videoList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#videoList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد حذف الفيديو الخاص بها");return;}
	if (indx>=0) {
		var ss=  $("#videoList").jqxListBox('getItem',indx).value;
		$("#videoList").jqxListBox('removeAt', indx);
	Delfile("videos",GetVideoName($("#onewordbox").val()),ss);
	}
	else alert('اختر الفيديو الذي تريد حذفه');

   
}); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddelvideoex").click(function(e) {
	var itemesno=0;
	
 	itemesno=$("#videoexList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#videoexList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#videoexList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد حذف الفيديو الخاص بها");return;}
	if (indx>=0) {
		var ss=  $("#videoexList").jqxListBox('getItem',indx).value;
		$("#videoexList").jqxListBox('removeAt', indx);
	Delfile("videoex",GetVideoName($("#onewordbox").val()),ss);
	}
	else alert('اختر الفيديو الذي تريد حذفه');

   
});   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdvievideo").click(function(e) {
    	var itemesno=0;
	
 	itemesno=$("#videoList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#videoList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#videoList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد عرض الفيديو الخاص بها");return;}
	if (indx>=0) {
//		$("#dsearch").hide();
//		$("#dimage").hide();
//		$("#daudio").hide();
//		$("#dvideo").show();
		var ss=  $("#videoList").jqxListBox('getItem',indx).value;
		$("#prevvideo").attr("src", "res/video/"+GetVideoName($("#onewordbox").val())+ "/"+ss);
	  $( "#dialog" ).dialog();
	}
	else alert('اختر الفيديو الذي تريد عرضه');

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdvievideoex").click(function(e) {
    	var itemesno=0;
	
 	itemesno=$("#videoexList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#videoexList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#videoexList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد عرض الفيديو الخاص بها");return;}
	if (indx>=0) {
//		$("#dsearch").hide();
//		$("#dimage").hide();
//		$("#daudio").hide();
//		$("#dvideo").show();
		var ss=  $("#videoexList").jqxListBox('getItem',indx).value;
		$("#prevvideo").attr("src", "res/videoex/"+GetVideoName($("#onewordbox").val())+ "/"+ss);
	  $( "#dialog" ).dialog();
	}
	else alert('اختر الفيديو الذي تريد عرضه');

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#audioupload').submit(function () {

    // Get the Login Name value and trim it
    var name = $.trim($('#audiofile').val());
   var theword = $.trim($('#onewordbox').val());
    // Check if empty of not
    if (name  === '') {
        alert('إختر ملف الصوت أولاً');
        return false;
    }

 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الصوت الخاص بها');
        return false;
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#audiofile').change(function(e) {
    
	
	 if($('#audiofile').val().indexOf(".mp3")<0)
	 {
		  alert('غير مسموح بهذا النوع من الملفات');
		  $('#audiofile').replaceWith($('#audiofile').val('').clone(true));
		  return;
	 }
	 var theword = $.trim($('#onewordbox').val());
	 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع الصوت الخاص بها');
		$('#audiofile').replaceWith($('#audiofile').val('').clone(true));
    }
	else {
		var ss=GetVideoName($.trim($('#onewordbox').val()));
		$("#audiofolder").val(ss);
		var xx= GetAcount() +1;
		$("#audioname").val(xx);
	}
	
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('iframe#upaframe').load(function() {
 itemesno=$("#audioList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#audioList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد"){ $("#audioList").jqxListBox('removeAt', 0);itemesno=0;}
	  
	}
 
  $("#audioList").jqxListBox('addItem', (itemesno+1) +".mp3");

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddelaudio").click(function(e) {
	var itemesno=0;
	
 	itemesno=$("#audioList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#audioList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#audioList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد حذف الصوت الخاص بها");return;}
	if (indx>=0) {
		var ss=  $("#audioList").jqxListBox('getItem',indx).value;
		$("#audioList").jqxListBox('removeAt', indx);
	Delfile("audio",GetVideoName($("#onewordbox").val()),ss);
	}
	else alert('اختر الصوت الذي تريد حذفه');

   
});  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdvieaudio").click(function(e) {
    	var itemesno=0;
	
 	itemesno=$("#audioList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#audioList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#audioList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد عرض الصوت الخاص بها");return;}
	if (indx>=0) {
	//	$("#dsearch").hide();
//		$("#dimage").hide();
//		$("#dvideo").hide();
//		$("#daudio").show();
		var ss=  $("#audioList").jqxListBox('getItem',indx).value;
		$("#prevaudio").attr("src", "res/audio/"+GetVideoName($("#onewordbox").val())+ "/"+ss);
	  $( "#audiodialog" ).dialog();
	}
	else alert('اختر الصوت الذي تريد عرضه');

});

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#lipsingupload').submit(function () {

    // Get the Login Name value and trim it
    var name = $.trim($('#lipsingfile').val());
   var theword = $.trim($('#onewordbox').val());
    // Check if empty of not
    if (name  === '') {
        alert('إختر ملف كيفية النطق أولاً');
        return false;
    }

 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع ملف كيفية النطق الخاص بها');
        return false;
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#lipsingfile').change(function(e) {
    
	
	 if($('#lipsingfile').val().indexOf(".webm")<0)
	 {
		  alert('غير مسموح بهذا النوع من الملفات');
		  $('#lipsingfile').replaceWith($('#lipsingfile').val('').clone(true));
		  return;
	 }
	 var theword = $.trim($('#onewordbox').val());
	 if (theword   === '') {
        alert(' أكتب الكلمة التي تريد رفع ملف كيفية النطق الخاص بها');
		$('#lipsingfile').replaceWith($('#lipsingfile').val('').clone(true));
    }
	else {
		var ss=GetVideoName($.trim($('#onewordbox').val()));
		$("#lipsingfolder").val(ss);
		var xx=  Getlcount()+1;
		$("#lipsingname").val(xx);
	}
	
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('iframe#uplframe').load(function() {
 itemesno=$("#lipsingList").jqxListBox('getItems').length;
   
    if(itemesno==1) {
      var ss=  $("#lipsingList").jqxListBox('getItem',0).value;
      if (ss=="لا يوجد"){ $("#lipsingList").jqxListBox('removeAt', 0);itemesno=0;}
	  
	}
 
  $("#lipsingList").jqxListBox('addItem', (itemesno+1) +".webm");

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmddellipsing").click(function(e) {
	var itemesno=0;
	
 	itemesno=$("#lipsingList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#lipsingList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#lipsingList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد حذف ملف كيفية النطق الخاص بها");return;}
	if (indx>=0) {
		var ss=  $("#lipsingList").jqxListBox('getItem',indx).value;
		$("#lipsingList").jqxListBox('removeAt', indx);
	Delfile("lipsing",GetVideoName($("#onewordbox").val()),ss);
	}
	else alert('اختر ملف كيفية النطق الذي تريد حذفه');

   
});  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#cmdvielipsing").click(function(e) {
    	var itemesno=0;
	
 	itemesno=$("#lipsingList").jqxListBox('getItems').length;
 	if(itemesno==0) return;
    if(itemesno==1) {
    var ss=  $("#lipsingList").jqxListBox('getItem',0).value;
    if (ss=="لا يوجد") return;
	}
    var indx=$("#lipsingList").jqxListBox("getSelectedIndex");
	if($("#onewordbox").val()=="") {alert("أكتب الكلمة التي تريد عرض كيفية النطق الخاص بها");return;}
	if (indx>=0) {
		//$("#dsearch").hide();
//		$("#dimage").hide();
//		$("#daudio").hide();
//		$("#dvideo").show();
        var ss=  $("#lipsingList").jqxListBox('getItem',indx).value;
	   $("#prevvideo").attr("src", "res/lipsing/"+GetVideoName($("#onewordbox").val())+ "/"+ss);
		$( "#dialog" ).dialog();

	}
	else alert('اختر ملف كيفية النطق الذي تريد عرضه');

});

$("#cmddisplay").click(function(e) {
	 var indx=$("#wordList").jqxListBox("getSelectedIndex");
	if (indx>=0){
   var sss=  $("#wordList").jqxListBox('getItem',indx).value;
   CurrentWord=sss;
   GetWordInfo(sss);
    $('#serchdialog').dialog("close");
	}
		else alert('اختر الكلمة التي تريد عرض بياناتها');

});

$("#cmddeldic").click(function(e) {
	if(	CurrentWord=="") {alert("إختر الكلمة التي تريد حذفها أولا من خلال بحث");retutn;}
	if( $("#onewordbox").val()=="") {alert("من فضلك أكتب الكلمة"); return;}
  

 DeleteWord(1);
 CurrentWord="";
clearboxes();
	
});

$("#cmdexportdic").click(function(e) {
    if( $("#countryboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم الدولة"); return;}
  if( $("#govboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المحافظة"); return;}
  if( $("#regionboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم المنطقة"); return;}
    if( $("#langboxw option:selected" ).text()=="") {alert("من فضلك إختر إسم اللغة"); return;}
 	var jsonObj= new Array();
	item = {};
    item ["order"] = 6;
	item ["lang"] = $("#langboxw").val();
	item ["cntry"] = $("#countryboxw").val();
	item ["gvrn"] = $("#govboxw").val();
    item ["region"] = $("#regionboxw").val();
	jsonObj.push(item);
		var data=GetSetWordData(jsonObj);
		var sss=data[0]["result"];
		if(sss!="done") alert(sss);
		else  window.location.href = 'downloads/dic.zip';
		
});

$("#cmddownload").click(function(e) {
	var jsonObj= new Array();
	item = {};
    item ["order"] = 7
	jsonObj.push(item);
		var data=GetSetWordData(jsonObj);
		var sss=data[0]["result"];
		if(sss!="done") alert(sss);
		else  window.location.href = 'downloads/res.zip';
    
});

  });
  
  
////////////////////////////////////////////////////////////////////////////////////
  
//////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////////////////////
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

function clearboxes()
{
$("#onewordbox").val("");
$("#synonymList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
$("#majorList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
$("#imageList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
$("#videoList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
$("#lipsingList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });
$("#audioList").jqxListBox({ source:["لا يوجد"], width: '200px', height: '150px', theme: 'summer' });

}