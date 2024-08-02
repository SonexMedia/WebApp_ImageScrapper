//****************************************************
//*********** GET๋ฐฉ์?์ผ๋ก ์ ์กํ๊ธฐ
//****************************************************
function httpRequest( target_url, functionReference) {

	try {
		if( window.XMLHttpRequest ) {	// FireFox(2005.11ํ์ฌ win์ฉ์ผ๋ก var 1.0.7), Mac OS X ์? Safari 1.3, Opera 8.5์?์ ๋?์
			http2Obj = new XMLHttpRequest();
		} else if( window.ActiveXObject) {	// IE์?์ ๋?์. IE์?๋ XMLHttpRequest์ค๋ธ์ ?ํธ๊ฐ ์๋ค.
			http2Obj = new ActiveXObject( "Microsoft.XMLHTTP" );
		} else {
			http2Obj = false;
		}
	} catch( e ) {
		http2Obj = false;
	}
	if( !http2Obj ) {
		httpObjGenerateFail();
	}

	//timerId = setInterval( 'timeoutCheck()', 1000 );
	
	http2Obj.open( "GET", target_url, true );

	// onreadystatechange : ์ค๋ธ์ ?ํธ์? ์?ํ๊ฐ ๋ณ๊ฒฝ๋?์์? ๋ fire๋?๋ค.
	// ์ฆ ์ฌ๊ธฐ์๋ httpObj์ค๋ธ์ ?ํธ์? ์?ํ๊ฐ ๋ณ๊ฒฝ๋?์์? ๋ ์ด๋? ํจ์๋ฅผ ํธ์ถํ๊ฒ ๋๊ฐ๋ฅผ ์ง์ .
	http2Obj.onreadystatechange = function() {

		// readyState : request์? ์ฒ๋ฆฌ์?ํ๋ฅผ ํ์ํ๋ ๊ฐ.
		// ์ฆ	0 : ๋ฏธ์ด๊ธฐํ์?ํ(์ค๋ธ์ ?ํธ๋ ์?์ฑ๋? ์์ง๋ง open method๋ ํธ์ถ๋?์ง ์์? ์?ํ)
		//		1 : request์ค๋น(open method๋ ํธ์ถ๋?์์ง๋ง send methhod๋ก ์ง๋ฌธ์?ด ์ก์ ๋?์ง ์์? ์?ํ)
		//		2 : ์ง์?์๋ฃ(send method ๋ก ์ง์?๋ ์ก์ ๋?๊ณ  ๋ด์ฌ๊ธฐ๋ก ๋ถํฐ ์?๋ต์? ๊ธฐ๋ค๋ฆฌ๊ณ  ์๋ ์?ํ)
		//		3 : ์์ ์ค(๋ด์ฌ๊ธฐ๋ก ๋ถํฐ ์?๋ต์? ์์ ํ๊ณ  ์๋ ์?ํ. ์?ด ๋จ๊ณ์?์๋ ์์ ํ ์?๋ฃ๋ฅผ ์ทจ๊ธํ ์๋ ์๋ค)
		//		4 : ์์ ์๋ฃ(๋ด์ฌ๊ธฐ๋ก ๋ถํฐ ๋ชจ๋  ์?๋ต์? ์์ ํ ์?ํ.)
		// status : http protocol์?์ ๋ฆฌ์ฉ๋?๋ ์?๋ต์ฝ๋.
		// ์ฆ	200 : ์ ์?, 401 : unauthorised, 403 : Forbidden, 404 : Not Found, 500 : Internal Sever Error.
		// http2Obj.status(์?๋ต์ฝ๋), http2Obj.statusText(์?๋ต๋ฉ์ธ์ง. ๋ถ๋?ผ์ฐ์ ์? ๋ฐ๋?ผ ์?ด ๊ฐ์?ด undefind์?ผ์๋?)
		if ( http2Obj.readyState == 4 ) {
			//clearInterval( timerId);
			if ( http2Obj.status == 200 ) {
				functionReference( http2Obj.responseText );
			} else {
				alert( http2Obj.status + ':' + http2Obj.statusText );
				return false;
			}
		}
	}

	// GET์?ธ ๊ฒฝ์ฐ์?๋ ๋ด์ฌ๊ธฐ์? ๋ณด๋ด๋ ์?๋ฃ๊ฐ ์๋ค. POST์?ธ ๊ฒฝ์ฐ ์?ธ์๋ฅผ ๋ฆฌ์ฉํ์ฌ ๋ด์ฌ๊ธฐ์? ๋ณด๋ผ ์?๋ฃ๋ฅผ ์ ์?.
	http2Obj.send(null);
}

//์ฝค๋ณด๋ณต์ค์? ์๋ฒ์?์ ๋ณด๋ด์จ ์ ๋ณด๋ฅผ ํ์
function server_requerst ( target_url, obj ) {

	var funcRef = function( msg ) {
		var array_list = msg.split("#");
		var count = array_list.length-1;

		//์?ด๋ฏธ ๋ค์ด๊ฐ ์๋? ๋ด์ฉ์? ์ญ์ ํ๊ณ 
		var optgroups = obj.childNodes;
		for(i = optgroups.length - 1 ; i >= 0 ; i--)
		{
			obj.removeChild(optgroups[i]);
		}

		//์ ํญ๋ชฉ์? ์ถ๊ฐํ๋ค
		//๋ฆฌ์คํธ๋ณต์ค์? ์ฒ์? ๋์? ๋น์ฌ์์ด์ผ ํจ
		var new_node = document.createElement("option");
		
		try {
			obj.add(new_node, null); // standards compliant; doesn't work in IE
		}
		catch(ex) {
			obj.add(new_node); // IE only
		}

		new_node.text = '';
		new_node.value = 0;

		for (i=0; i<count; i++) {
			var new_node = document.createElement("option");

			var tmp_array_list =  array_list[i].split("|");
			var id = tmp_array_list[0];
			var val = tmp_array_list[1];

			//์ต์ํ๊ฐ ์ถ๊ฐ
			try {
				obj.add(new_node, null); // standards compliant; doesn't work in IE
			}
			catch(ex) {
				obj.add(new_node); // IE only
			}
			new_node.text = val;
			new_node.value = id;
		}
	}
	httpRequest( target_url, funcRef );
}

//****************************************************
//*********** POST๋ฐฉ์?์ผ๋ก ์ ์กํ๊ธฐ
//****************************************************

function newXMLHTTP() {
	if(window.XMLHttpRequest) {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch(e) {
			alert("XMLHTTP๋ฅผ ์ด๊ธฐํํ  ์์์ต๋๋ค.");
			return false;
		}
	} else if(window.ActiveXObject) {
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				alert("XMLHTTP๋ฅผ ์ด๊ธฐํํ ์ ์์ต๋๋ค.");
				return false;
			}
		}
	} else {
		alert("XMLHTTP๋ฅผ ์ด๊ธฐํํ ์ ์์ต๋๋ค.");
		return false;

	}
	return xmlhttp;
}

function postForm(obj, callback) {
	// XMLHTTP ๊ฐ?์ฒด ์?์ฑ
	var xmlhttp = newXMLHTTP();
	if(!xmlhttp) return false;

	var child = obj.elements;
	var data = new Array();
	for(i = 0; i < child.length;i++) {

		//ํ?ผ ๊ด๋ จ ํ๊ทธ๊ฐ ์๋ ๊ฒฝ์ฐ ๋ฌด์
		if(child[i].tagName != "INPUT" && child[i].tagName != "TEXTAREA" && child[i].tagName != "SELECT") continue;

		//button ๋ฌด์
		if(child[i].type == "submit" || child[i].type == "button" || child[i].type == "reset") continue;

		//CHECK, RADIO๋จ์ถ ์ฒ๋ฆฌ
		if((child[i].type == "radio" || child[i].type == "checkbox") && !child[i].checked) continue;

		//text,password type์? input์?ด๋ select์?์ required="required"์?ผ๋ value๊ฐ ์์ผ๋ฉด ์ค์ 
		if(child[i].getAttributeNode("required") && !child[i].value) {
			child[i].style.backgroundColor = "#FF9";
			child[i].focus();
			alert("ํด๋น ํญ๋ชฉ์? ๊ฐ์?ด ์๊ฑฐ๋ ์๋ชป๋?์์ต๋๋ค.");
			return false;
		}

	   	data.push ( child[i].name+"="+child[i].value);

	}

	senddata = data.join("&");

	xmlhttp.open("POST", obj.action,true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(senddata);

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				callback(xmlhttp); //์ฝ๋ฐฑ ํจ์๋ก ์์ 
			} else {
				alert("์?๋ฃ ์ ์ก์ค ์ค๋ฅ๊ฐ ๋ฐ์?ํ์ต๋๋ค:\r\n\r\n"+xmlhttp.status+" "+xmlhttp.statusText);
			}
		}
	}
}
