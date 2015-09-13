// JavaScript Document
var CurrentUser="";
function validEmail(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}


function GetSetData(jsonobj)
{
	var jsonstr = JSON.stringify(jsonobj);
	ajaxData=[];
	console.log(jsonobj);
	console.log(jsonstr);
	
			$.ajaxSetup({async:false});

 $.post("php/key.php",{param:jsonstr },function(data) {
	
      try {ajaxData = $.parseJSON(data); } catch (e) { };	  
	  });
	  return ajaxData;
}
//////////////////////////////////////////////////////////////////////////////////
function InsertKey()
{
	var jsonObj= new Array();
		item = {};
        item ["order"] = 2;
		item ["uname"] =$("#userbox").val();
		item ["company"] = $("#companybox").val();
		item ["phone"] = $("#phonebox").val();
		item ["email"] =$("#emailbox").val();
		//item ["key"] = $("#keybox").val();
		item ["expdate"] = $("#expdate").val();
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);	
		ClearBoxes();	

}

//////////////////////////////////////////////////////////////////
function UpdateUser()
{
	var jsonObj= new Array();
		item = {};
        item ["order"] = 3;
		item ["uname"] =$("#userbox").val();
		item ["company"] = $("#companybox").val();
		item ["phone"] = $("#phonebox").val();
		item ["email"] =$("#emailbox").val();
		item ["key"] = $("#keybox").val();
		item ["expdate"] = $("#expdate").val();
		item ["olduname"] =CurrentUser;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);	
		ClearBoxes();	

}
//////////////////////////////////////////////////////////////////////////////////
function ClearBoxes()
{
		$("#userbox").val("");
		$("#companybox").val("");
		$("#phonebox").val("");
		$("#emailbox").val("");
		$("#keybox").val("");
     	$("#expdate").datepicker('setDate', null);

}
/////////////////////////////////////////////////////////////////////////////////////////
function GetUserInfo(uname)
{
	var jsonObj= new Array();
		item = {};
        item ["order"] = 4;
		item ["uname"] =uname;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		$("#userbox").val(data[0]["uname"]);
		$("#companybox").val(data[0]["company"]);
		$("#phonebox").val(data[0]["phone"]);
		$("#emailbox").val(data[0]["email"]);
		$("#keybox").val(data[0]["key"]);
	//	$("#expdate").val(data[0]["expdate"]);
		var dt1=(new Date()).getTime();
var dt=Date.parse(data[0]["expdate"]);
var timeDiff= (dt- dt1);
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
$('#expdate').datepicker({dateFormat: "yyyy-mm-dd"});
$('#expdate').datepicker('setDate', '+'+diffDays);

}
/////////////////////////////////////////////////////////////////////
function DelUser()
{
var jsonObj= new Array();
		item = {};
        item ["order"] = 5;
		item ["uname"] =CurrentUser;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);	
        CurrentUser="";
		ClearBoxes();
}
////////////////////////////////////////////////////////////////////

function GetAllUsers()
{
		var jsonObj= new Array();
	    item = {};
        item ["order"] = 1;		
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var ddd=[];
		
		for(var i=0;i<data.length;i++)
		 {
		 var sss=data[i]["user"];
		 ddd.push(sss);
		 }
return ddd
}

$(document).ready(function(e) {
    $(".date_picker").datepicker();
$(".date_picker").datepicker("option", "dateFormat", "yy-mm-dd");

	$("#cmdadd").click(function(e) {
        if($("#userbox").val()=="") {alert("من فضلك أدخل اسم المستخدم");return;}
		if($("#companybox").val()=="") {alert("من فضلك  اسم الشركة");return;}
		if($("#phonebox").val()=="") {alert("من فضلك أدخل رقم التليفون");return;}
		if($("#email").val()=="") {alert("من فضلك أدخل البريد الالكتروني");return;}
		if($("#expdate").val()=="") {alert("من فضلك أدخل تاريخ الانتهاء");return;}
		if (!validEmail($("#emailbox").val())) {alert("أكتب الصيغة الصحيحة للبريد الالكتروني");return;}
        InsertKey();
    });
	
	
	$("#cmdsearch").click(function(e) {
		
    var ddd=GetAllUsers();
   $("#userList").jqxListBox({ source:ddd, width: '150px', height: '150px', theme: 'summer' });
   $("#searchdialog").dialog();
 
    });

////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
	$("#cmddisplay").click(function(e) {
		
    var indx=$("#userList").jqxListBox("getSelectedIndex");
	if (indx>=0){
   var sss=  $("#userList").jqxListBox('getItem',indx).value;
   CurrentUser=sss;
   GetUserInfo(sss);
    $('#serchdialog').dialog("close");
	}
		else alert('اختر المستخدم الذي تريد عرض بياناته');

    });
	$("#cmddel").click(function(e) {
        if(CurrentUser=="") {alert("إختر المستخدم الذي تريد حذفه من خلال شاشة بحث") ;return;}
		DelUser();
    });
	
	$("#cmdmodify").click(function(e) {
        if(CurrentUser=="") {alert("إختر المستخدم الذي تريد تعديل بياناته من خلال شاشة بحث") ;return;}
          UpdateUser();
    });
});