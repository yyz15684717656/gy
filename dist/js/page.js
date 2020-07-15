"use strict";function Page(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=1<arguments.length?arguments[1]:void 0;this.options=e,this.default={language:{first:"首页",previous:"上一页",list:null,next:"下一页",last:"末页"},pageData:{total:100,pageSize:10}},this.fn=t||function(){},this.currentPage=1,this.list=null,this.box=null,this.setDefault(),this.totalPage=Math.ceil(this.default.pageData.total/this.default.pageData.pageSize),this.createTag(),this.createPage(),this.click(),this.setDisabled(),this.createGo(),this.fn(this.currentPage)}Page.prototype.createGo=function(){var e=document.createElement("input");e.setAttribute("type","number"),this.box.appendChild(e),this.setStyle(e,{width:"50px",height:"18px",margin:"0 5px"});var t=document.createElement("button");t.innerText="GO",this.setStyle(t,{height:"24px",margin:"0 5px"}),this.box.appendChild(t)},Page.prototype.setDisabled=function(){1==this.currentPage?(this.box.children[0].style.background="grey",this.box.children[1].style.background="grey",this.box.children[0].setAttribute("disabled","true"),this.box.children[1].setAttribute("disabled","true")):(this.box.children[0].style.background="white",this.box.children[1].style.background="white",this.box.children[0].setAttribute("disabled","false"),this.box.children[1].setAttribute("disabled","false")),this.currentPage==this.totalPage?(this.box.children[3].style.background="grey",this.box.children[4].style.background="grey",this.box.children[3].setAttribute("disabled","true"),this.box.children[4].setAttribute("disabled","true")):(this.box.children[3].style.background="white",this.box.children[4].style.background="white",this.box.children[3].setAttribute("disabled","false"),this.box.children[4].setAttribute("disabled","false"))},Page.prototype.click=function(){var t=this;this.box.onclick=function(e){"first"==(e=e||window.event).target.className&&"true"!=e.target.getAttribute("disabled")?(t.currentPage=1,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage)):"last"==e.target.className&&"true"!=e.target.getAttribute("disabled")?(t.currentPage=t.totalPage,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage)):"previous"==e.target.className&&"true"!=e.target.getAttribute("disabled")?(t.currentPage=t.currentPage-1,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage)):"next"==e.target.className&&"true"!=e.target.getAttribute("disabled")?(t.currentPage=t.currentPage+1,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage)):"P"==e.target.nodeName&&t.currentPage!=+e.target.innerText?(t.currentPage=+e.target.innerText,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage)):"BUTTON"==e.target.nodeName&&""!=e.target.previousElementSibling.value&&1<=e.target.previousElementSibling.value&&e.target.previousElementSibling.value<=t.totalPage&&e.target.previousElementSibling.value!=t.currentPage&&(t.currentPage=+e.target.previousElementSibling.value,t.list.innerHTML="",t.createPage(),t.setDisabled(),t.fn(t.currentPage))}},Page.prototype.createPage=function(){if(this.totalPage<=5)for(var e=1;e<=this.totalPage;e++){(t=document.createElement("p")).innerText=e,this.setStyle(t,{padding:"0 5px",margin:"0 5px",border:"1px solid #000"}),this.currentPage==e&&(t.style.backgroundColor="orange"),this.list.appendChild(t)}else if(this.currentPage<=3)for(e=1;e<=5;e++){(t=document.createElement("p")).innerText=e,this.setStyle(t,{padding:"0 5px",margin:"0 5px",border:"1px solid #000"}),this.currentPage==e&&(t.style.backgroundColor="orange"),this.list.appendChild(t)}else if(this.currentPage>=this.totalPage-2)for(e=this.totalPage-4;e<=this.totalPage;e++){(t=document.createElement("p")).innerText=e,this.setStyle(t,{padding:"0 5px",margin:"0 5px",border:"1px solid #000"}),this.currentPage==e&&(t.style.backgroundColor="orange"),this.list.appendChild(t)}else for(var t,e=this.currentPage-2;e<=this.currentPage+2;e++){(t=document.createElement("p")).innerText=e,this.setStyle(t,{padding:"0 5px",margin:"0 5px",border:"1px solid #000"}),this.currentPage==e&&(t.style.backgroundColor="orange"),this.list.appendChild(t)}},Page.prototype.createTag=function(){for(var e in this.box=document.createElement("div"),this.box.className="box",this.setStyle(this.box,{width:"800px",height:"50px",border:"1px solid #000",display:"flex","justify-content":"center",alignItems:"center"}),document.body.appendChild(this.box),this.default.language){var t=document.createElement("div");t.innerText=this.default.language[e],"list"!=(t.className=e)?this.setStyle(t,{padding:"0 5px",margin:"0 5px",border:"1px solid #000"}):(this.list=t,this.setStyle(t,{display:"flex","justify-content":"center",alignItems:"center"})),this.box.appendChild(t)}},Page.prototype.setStyle=function(e,t){for(var i in t)e.style[i]=t[i]},Page.prototype.setDefault=function(){for(var e in this.options.language)this.default.language[e]=this.options.language[e];for(var e in this.options.pageData)this.default.pageData[e]=this.options.pageData[e]};