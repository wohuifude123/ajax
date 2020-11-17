# Ajax 方法封装

## 使用方法

### 引入文件

```
<script src="assets/scripts/ajax.js"></script>
```

### 使用POST请求

```
var url = 'https://127.0.0.1:48330/easyRtcRouter/v1/post/log';
var objReq = {
	type: "POST", // 请求方式
	url: url, // 请求地址
    data: {
	    'data': {
	    	'our': 123
	    }
    }, // 请求参数
    dataType: "json", // 请求类型
    session: false, // 开始session
    success: function (response, xml) {
    	var dataRes = eval('(' + response + ')');
    	console.log('dataRes == ', dataRes)
    }
}
sendRequest(objReq)
```

### 使用GET请求

```
var url = 'https://127.0.0.1:48330/easyRtcRouter/v1/
var objReq = {
	type: "GET", //请求方式
	url: url,
    data: {},//请求参数
    session: false,
    success: function (response, xml) {
    	var dataRes = eval('(' + response + ')');
    	console.log('dataRes == ', dataRes)
    }
}
sendRequest(objReq)
```