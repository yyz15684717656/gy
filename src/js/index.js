var er=document.querySelector(".er");      
var arr=[
    {id:0,name:'女装/男装/内衣'},
    {id:1,name:'女鞋/男鞋/箱包'},
    {id:2,name:'护肤彩妆/个护'},
    {id:3,name:'运动户外'},
    {id:4,name:'家电数码'},
    {id:5,name:'母婴童装'},
    {id:6,name:'手表配饰'},
    {id:7,name:'居家用品'},
    {id:8,name:'唯品生活'},
    {id:9,name:'唯品国际/唯品奢'},
    {id:10,name:'医药健康'},
]
for(var i=0;i<arr.length;i++){
    var li=document.createElement("li");
    var a=document.createElement("a");
    a.setAttribute("href","#")
    a.setAttribute("id",arr[i].id)
    a.innerHTML =arr[i].name;
    li.appendChild(a);
    er.appendChild(li);
}

var popcard =document.querySelector(".popcard");
console.log(popcard)
$.get('../assets/index.json', function(data) {
    popcard.onmouseenter=function(){
        popcard.style.display="block";
        er.style.display="block"
      
    }
    popcard.onmouseleave=function(){
        popcard.style.display="none";
        er.style.display="none"
    }
    document.querySelector(".fenlei").onmouseenter=function(){
        er.style.display="block"
    }
    er.onmouseover =function(e){ 
        console.log(e.target)
     popcard.style.display="block"
     var result = data.filter(function(v){
     return v["id"]==e.target.id;
      
    })
    er.onmouseleave=function(){
        er.style.display="none"
        popcard.style.display="none"
       
    }
   popcard.innerHTML='' 
 for(let j=0;j<result[0].data.length;j++){
     var dl =document.createElement("dl");
     var dt=document.createElement("dt");
     dt.innerText=result[0].data[j].title;
     var span =document.createElement("span");
     var dd=document.createElement("dd");
     for(var k=0;k<result[0].data[j].content.length;k++){
         var a=document.createElement("a");
         a.innerHTML =result[0].data[j].content[k];
         dd.appendChild(a);
         a.setAttribute("href","#")
     }
     span.innerText=">";
     dt.appendChild(span);
     dl.appendChild(dt);
     dl.appendChild(dd);
     popcard.appendChild(dl)
 }
} 

})

// branch代码
function branch(){
   console.log(123)
   var branch =document.querySelector(".branch");
   pAjax({
    url:"../assets/info.json",
    type:"get",
   }).then(function(res){
      console.log(res)
      var str=''
      for(var i=0;i<res.length;i++){
          str+=`
          <li>
          <a href="list.html?id=${res[i].id}">
          <img src="${res[i].brandImage}" alt=""> 
          <div class="branch-info">
              <span>${res[i].salesName}</span>
              <p>${res[i].agio}</p>
          </div>
          </a>
      </li>
          `
      }
      document.querySelector(".branch").innerHTML=str;
    
  });
}
branch()

//lowprice代码
function lowprice(){
    pAjax({
        url:"../assets/index-price.json",
        type:"get",
       }).then(function(res){
          var str='';
          console.log(res)
          for(var i=0;i<res.length;i++){
            str+=`
            <li>
            <div class="front">
               <img class="Limg" src="${res[i].front.img}">
               <img class="smallimg" src="${res[i].front.smallimg}">
               <img class="paiImg" src="${res[i].front.paiImg}">
               <img class="Licon" src="${res[i].front.icon}">
               <span class="Lprice">${res[i].front.price}</span>
            </div>
            <div class="back">
                <img class="Limg"  src="${res[i].back.img}">
                <img class="smallimg" src="${res[i].back.smallimg}">
                <img class="paiImg" src="${res[i].back.paiImg}">
                <img class="Licon" src="${res[i].back.icon}">
                <span class="Lprice">${res[i].back.price}</span>
            </div>
            </li>`
          }
          document.querySelector(".lowprice ul").innerHTML=str;
       })

}
lowprice()



  