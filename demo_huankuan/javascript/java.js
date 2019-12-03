var check=function(id){
			this.form=document.getElementById(id)
			this.item=this.form.getElementsByTagName('input')
			this.init();
		}
		check.prototype={
			init:function(){
				var that=this
				this.form.setAttribute( "novalidate",true );
				this.form.onsubmit = function(){
					return that.checkAll();
    			}

			},
			checkAll:function(){
				var item=this.item;
				var k=true;
				for(var i=0;i<item.length;i++){
					if(item[i].getAttribute("required")!=""){
						(function(i,back){
							if(item[i].value==""){
								alert(back);
								k=false;
						}else{
							if(!item[i].checkValidity()){
								alert("请输入正确的格式")
								k=false;
							}
						}
						})(i,item[i].getAttribute( "required"))
					}
				}

				return k;
			}
		}