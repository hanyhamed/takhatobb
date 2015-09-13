// JavaScript Document


function GetSetData(jsonobj)
{
	var jsonstr = JSON.stringify(jsonobj);
	ajaxData=[];
	console.log(jsonobj);
	console.log(jsonstr);
	
			$.ajaxSetup({async:false});

 $.post("php/drev.php",{param:jsonstr },function(data) {
	
      try {ajaxData = $.parseJSON(data); } catch (e) { };	  
	  });
	  return ajaxData;
}
///////////////////////////////////////////////////////////////////////
function Reconcan(str)
{
	var zzz=str;
	

var zzz1= zzz.replace('|', '~');
var zzz2= zzz1.replace('|', '~');
var zzz3= zzz2.replace('|', '~');
var zzz4= zzz3.replace('|', '~');
var zzz5= zzz4.replace('|', '~');
var zzz6= zzz5.replace('|', '~');
var zzz7= zzz6.replace('|', '~');
var zzz8= zzz7.replace('|', '~');
var zzz9= zzz8.replace('|', '~');
return RemoveSpaces(zzz9);
}
///////////////////////////////////////////////////////////////////////
function RemoveSpaces(str)
{
	var zzz=str;
	

var zzz1= zzz.replace('~ ', '~');
var zzz2= zzz1.replace('~ ', '~');
var zzz3= zzz2.replace('~ ', '~');
var zzz4= zzz3.replace('~ ', '~');
var zzz5= zzz4.replace('~ ', '~');
var zzz6= zzz5.replace('~ ', '~');
var zzz7= zzz6.replace('~ ', '~');
var zzz8= zzz7.replace('~ ', '~');
var zzz9= zzz8.replace('~ ', '~');
var zzz10= zzz9.replace('~ ', '~');
var zzz11= zzz10.replace(' ~', '~');
var zzz12= zzz11.replace(' ~', '~');
var zzz13= zzz12.replace(' ~', '~');
var zzz14= zzz13.replace(' ~', '~');
var zzz15= zzz14.replace(' ~', '~');
var zzz16 =zzz15.replace(' ~', '~');
var zzz17= zzz16.replace(' ~', '~');
var zzz18= zzz17.replace(' ~', '~');


	return zzz18;
}

///////////////////////////////////////////////////////////////////////

function InsertDrev(drevnames,drev,verb)
{
	if(drev=="" || drevnames=="" || verb=="") return;
	var jsonObj= new Array();
	item = {};
        item ["order"] = 1;
		item ["drevname"] = drevnames;
		item ["drev"] = drev;
		item ["verb"] = verb;	
        jsonObj.push(item);		
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);

}
///////////////////////////////////////////////////////////////////////////

$(document).ready(function(e) {
	
$("#dervbutton").click(function(e) {
		
$('#drevframe').attr('src', "http://afkar.microsoft.com/SarfAccelrator/SarfService.svc/GetData?value="+$("#frmInput").val());
	$('#drevframe').attr('src', $('#drevframe').attr('src'));
		    });
			
			$("#dbbutton").click(function(e) {
				
                var sss= $("#darea").val();
				var ss=sss.split("\n");
				var drevname=[];
				var drev=[];
				var dname="";
				var ditself="";
				var verb="";
				var ccc="";
				for(var i=0; i< ss.length;i++)
				{
					if(ss[i].indexOf("-")>0)
					{
					var zew=ss[i].split("-");
					verb=zew[1];	 
					if(ss[i+1].trim()=="فعل ماض مجرد" && ccc=="") ccc="مجرد";
					if(ss[i+1].trim()=="فعل ماض مزيد" && ccc=="") ccc="مزيد";
					}
				}
				var ddd="";
				if (ccc=="مزيد") ddd="مجرد";
				if (ccc=="مجرد") ddd="مزيد";
				if(ccc=="" && ddd=="") {alert("أدخل مشتقات فعل ماضي");return;}
			 for(var i=0; i< ss.length;i++)
			{
				
				var xx=ss[i].indexOf(":");
				if(xx>0) 
				{
					var uu=ss[i].split(":");
					if(uu[0].indexOf(ddd)<0 && uu[0].indexOf("سمات")<0 && uu[0].indexOf("مشتقات")<0  && uu[0].indexOf("صناعيّ")<0   && uu[0].indexOf("تكسير")<0 )
				{
				
				drevname.push(uu[0].trim())	;
				drev.push(Reconcan(uu[1].trim()));
				if(dname=="") dname=uu[0].trim();
				else dname=dname+","+ uu[0].trim();
				
				if(ditself=="") ditself=Reconcan(uu[1].trim());
				else ditself=ditself+","+ Reconcan(uu[1].trim());
				
				}
					
			      		
					}
				
			}
			
			var str="";
				for(var i=0;i<drevname.length; i++)	{str=str+drevname[i]+"<->"+ drev[i]+"\n";}
				$("#darea").val(str);
				
				InsertDrev(dname,ditself,verb);
            });
////////////////////////////////////////////////////////////////////////////////////////////////////
$("#exportbutton").click(function(e) {
	var jsonObj= new Array();
	item = {};
    item ["order"] = 2;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		if(sss!="done") alert(sss);
		else  window.location.href = 'downloads/derivatives.zip';
				
                            });
							
/////////////////////////////////////////////////////////////////////////////////							
	$("#delbutton").click(function(e) {
	    var jsonObj= new Array();
        item = {};
        item ["order"] = 3;
		jsonObj.push(item);
		var data=GetSetData(jsonObj);
		var sss=data[0]["result"];
		alert(sss);
    });
//////////////////////////////////////////////////////////////////////////////
	
////////////////////////////////////////////////////////////////////////
							
});
