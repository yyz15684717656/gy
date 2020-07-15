var params=location.search;
var reg = /id=(\d+)/;
var id = params.match(reg)[1];
console.log(id)

function compare(property,desc) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if(desc==true){
            // 升序排列
            return value1 - value2;
        }else{
            // 降序排列
            return value2 - value1;
        }
    }
}

sendAjax({
    url:"../assets/list.json", // 必须传
    type:"get",
    success:function(res){ // 成功时执行的函数
       var arr=res.filter(function(v){
           return v.id ==id;
       })
     
        
       var total = arr[0].data.length;
       var pageSize = 5;
       new Page({
        pageData:{
            total:total,
            pageSize:pageSize
        },
        language:{
            first:"首页",
            previous:"上一页",
            next:"下一页",
            last:"尾页"
        }
    },function(currentPage){
        
        var sold=document.querySelector(".sold");
        var price=document.querySelector(".price");
        var newArr=arr[0].data.sort(compare("sold",false))
        var result = newArr.slice((currentPage-1)*pageSize,currentPage*pageSize);
        DOD(result)
        sold.onclick=function(){
            $(this)[0].style.border="1px solid red";
            $(this).siblings()[0].style.border="none"
            newArr=arr[0].data.sort(compare("sold",false))
            var result = newArr.slice((currentPage-1)*pageSize,currentPage*pageSize);
            DOD(result)
        }
        price.onclick=function(){
            $(this)[0].style.border="1px solid red";
            $(this).siblings()[0].style.border="none"
            newArr=arr[0].data.sort(compare("price",true))
            var result = newArr.slice((currentPage-1)*pageSize,currentPage*pageSize);
            DOD(result)
            
        }
      
     
        })
  
         
     },
})

function DOD(result){
    var str ='';
    document.querySelector(".select ul").innerHTML=''
        for(var i=0;i<result.length;i++){
                   str+=` 
                   <li>
                   <img src="${result[i].img}" alt="">
                   <div class="good-title">
                       <div>
                           <span>${result[i].tip}</span> 
                       </div>
                      <b>￥${result[i].price}</b> 
                      <p>${result[i].oldprice}</p>
                      <em>${result[i].discount}</em>
                   </div>
                   <div class="good-info">
                   ${result[i].title}
                   </div>
               </li>`
        }
        document.querySelector(".select ul").innerHTML=str;
}
