		
		function FormValue(formid,options){
			this.ID=formid;
			this.formId=document.querySelector(formid);
			//获取表单中的元素   返回一个类数组  可进行遍历
			this.formList=this.formId.querySelectorAll("input,select,textare");
			this.regs=options;
			this.render()
			//console.log(this.regs)
			this.init();
		}

		FormValue.prototype={
			init : function(){
				var that=this;
				var formList=that.formList;
				this.formId.setAttribute("novalidate",true);//取消验证格式

				this.formId.onsubmit=function(){
					var arr=[],arr1=[],obj={};
					//return that.clickAll();
					if(that.clickAll()){
						for(var i=0;i<formList.length;i++){
							arr.push(formList[i].name)
							arr1.push(formList[i].value)
						}
			
						for(var k=0;k<arr.length;k++){
							obj[arr[k]]=arr1[k]
						}

						localStorage.setItem(that.ID,JSON.stringify(obj))
						return true;
					}
					else{
						return false;
					}
					
				}
				
				//给表单添加  取消表单验证
				
			},
			//渲染正则
			render : function(){
				var formList=this.formList;
				for(var i=0;i<formList.length;i++){
					var type=formList[i].name;
					var span=document.createElement("span");//创建一个span标签准备存放提示内容
						span.className="tip";

						formList[i].parentNode.appendChild(span)
					//console.log(this.regs[type])
					if(this.regs[type]){

						if(!formList[i].getAttribute("pattern")){

							formList[i].setAttribute("pattern",this.regs[type].pattern)
							formList[i].setAttribute("baocuo",this.regs[type].cont)
						}
						else if(!formList[i].getAttribute("baocuo")){

							formList[i].setAttribute("baocuo",this.regs[type].cont)
						}
						
					}
				}
			},
			
			click : function(item){
				//console.log(item)
				var str=item.getAttribute("required")
				if(str==null){//判断是否有required属性
						if(item.value==""){//并且此时表单内容值为空时
							return {
								type:"a",
								click:false
							}
						}
						else{
							return {//不为空时验证格式
								type:"b",
								click:item.checkValidity()//验证格式
							}
						}
					}
					else{

						if(item.value==""){//如果有required属性 判断内容是否为空 
							return {
								type:"a",
								click:false
							}
						}
						else{
							if(item.checkValidity()){//有内容了再验证格式
								return {
									type:"sdsfsdsdd",
									click:true
								}
							}
							else{
								return {
									type:"b",
									click:false
								}
							}
						}
					}
			},
			clickAll: function(){
				var formList=this.formList;
				var error=true;
				//console.log(len)
				for(var i=0;i<formList.length;i++){
					var str=this.click(formList[i])
					
					if(!str.click){
						//出错
						this.bug(formList[i],str)
						error=false
					}
					else{
						formList[i].parentNode.querySelector(".tip").innerText=""
					}
				}
				return error;

			},
			bug :function(item,str){
				//console.log(item)
				if(str.type=="a"){
					item.parentNode.querySelector(".tip").innerText="内容空"
				}
				else if(str.type=="b"){
					console.log(4567890)
					item.parentNode.querySelector(".tip").innerHTML=item.getAttribute("baocuo")
					//console.log("格式出错")
				}
			}

		}
		$.fn.FormValue=function(opt){
			new FormValue(this.selector,opt)
		}

/*		new FormValue("myForm",{
			one:{
				pattern:"[0-9]{15,20}",
				cont:"格式错误"
			},
			two:{
				pattern:pattern:"[\u4e00-\u9fa5]+",
				cont:"格式错误"
			},
			three:{
				pattern:"[0-9]{11}",
				cont:"格式错误"
			}
		})*/