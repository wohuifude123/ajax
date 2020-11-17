var request;//异步请求对象
function createXMLHttpRequest() {
    if (window.ActiveXObject) {//IE浏览器
        request = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {//FireFox，netscape等等浏览器
        request = new XMLHttpRequest();
    } else {
        console.log("你的浏览器不支持XMLHTTPRequest，将无使用AJAX功能！");
    }
}
/*现在我们有了请求对象，接下来要考虑的是，XMLHTTPRequest对象发送了请求后，服务器返回的结果应如何处理，即AJAX中的回调方法。*/

//发送请求，绑定回调方法
function sendRequest(options) {
    // 创建XMLHTTPRequest对象
    // createXMLHttpRequest();

    var request;//异步请求对象

    /**
     * 返回值类型默认为json
     **/
    options.dataType = options.dataType || "application/x-www-form-urlencoded";
    /**
     * 默认为异步请求
     **/
    options.async = options.async || true;

    if (window.ActiveXObject) {//IE浏览器
        request = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {//FireFox，netscape等等浏览器
        request = new XMLHttpRequest();
    } else {
        console.log("你的浏览器不支持XMLHTTPRequest，将无使用AJAX功能！");
    }
    //绑定回调方法（因为是异步请求，这句代码指示了请求结果返回后，由那个js函数接收处理），
    request.onreadystatechange = function () {
        // console.log('processResult request == ', request);
        var searchArg = window.location.search;
        if ((request.readyState === 4) && (request.status === 200)) {
            // var str = request.responseText;//获得返回数据
            // console.log('str ==', str);
            options.success && options.success(request.responseText, request.responseXML);
        }
    };
    //设置请求URL
    var url = options.url;
    var sendContent = '';
    if(options.dataType.toLowerCase() === 'json') {
        sendContent = JSON.stringify(options.data);
        options.dataType = 'application/json'
    } else {
        options.dataType = 'application/x-www-form-urlencoded';
        sendContent = dataConvert(options.data);
    }
    //获得输入框中的内容

    //发送get请求
    // request.open("GET", "AccountCheckServlet?username="+username, true);
    //发送Post请求

    if(options.session === true) {
        request.withCredentials = true;
    } else {

    }

    if (options.type === 'POST') {
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", options.dataType);
        request.send(sendContent);
    } else if (options.type === 'GET') {
        var paramsGet = formatParams(options.data);
        var urlGet = options.url + "?" + paramsGet
        // console.log('urlGet == ', urlGet);
        request.open("GET", urlGet, true);
        request.send(null);
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");

}

function stringTrim (data) {
    return data.replace(/(^\s*)|(\s*$)/g, "");
}

function dataConvert(dataObject) {
    var dataString = "";
    var keyString = '';
    for(var key in dataObject) {

        if(Object.prototype.toString.call(dataObject[key]) === '[object Object]') {
            // console.log('有对象');
            keyString = key + "=" + dataObject[key] +"&";

        } else {

            keyString = key + '=' + dataObject[key] +"&";
        }

        dataString = dataString+keyString
    }

    // console.log("common dataString == ", dataString);
    return dataString.substring(0, dataString.length-1);
}


function blankCheck(data) {
    var flag = false;
    if(data.match(/^\s+$/g)){
        //
    } else if(data.match(/^[ ]+$/g)){
        //
    } else if(data.match(/^[ ]*$/g)){
        //
    } else if(data.match(/^\s*$/g)){
        //
    } else {
        flag = true
    }
    return flag;
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function parseUrlToObj(url){ //定义函数
    var pattern = /(\w+)=(\w+)/ig;//定义正则表达式
    var parames = {};//定义数组
    url.replace(pattern, function(a, b, c){
        parames[b] = c;
    });
    return parames;//返回这个数组.
}


//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}
