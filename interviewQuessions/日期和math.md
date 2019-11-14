# 题目

## 获取 2017-06-10 格式的日期

```
function formatDate(dt){
	if(!dt){
		dt = new Date()
	}

	var year  = dt.getFullYear()
	var month = dt.getMonth() + 1
	var date  = dt.getDate()

	if(month < 10){
		//强制类型转换
		month = '0' + month
	}

	if(date < 10){
		//强制类型转换
		date = '0' + date
	}
	//强制类型转换
	return year + '-' + month + '-' + date
}

var dt = new Date()
var formatDate = formatDate(dt)
console.log(formatDate)

```

## 获取随机数，要求是长度一致的字符串格式

```
var random = Math.random() + '0000000000';
var random = random.slice(0,10);

```

> Math.random()返回 0.0（包含） ~ 1.0（不包含） 之间的一个伪随机数。
> 取得介于 1 到 10 之间的一个随机数：

```
Math.floor((Math.random()*10)+1);
```

> 取得介于 1 到 100 之间的一个随机数

```
Math.floor((Math.random()*100)+1);
```

> 以下函数返回 min（包含）～ max（不包含）之间的数字:

```
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
```

> 以下函数返回 min（包含）～ max（包含）之间的数字:

```
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
```

## 写一个能遍历 对象和数组的通用 forEach 函数

```
function forEach(obj,fn){
	var key
	if(obj instanceof Array){
    	//准备判断是不是数组
    	obj.forEach(function(item,index){
    		fn(index,item)
    	})
	}else{
    	//不是数组就是对象
    	for(key in obj){
    		fn(key,obj[k])
    	}
	}
}


```
