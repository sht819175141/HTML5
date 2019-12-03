$(function(){
	function request(urls,obj,callback){
		$.ajax({
			url:urls,
			data:obj,
			dataType:'jsonp',
			success:function(data){
				callback(data);

			}
		})
	}
	//渲染导航
	function render(data){
		var data=data.data;
		var str='';
		$.each(data,function(index,val){
			if(index%4==0){
				str+='<li>'
			}
			str+='<a>'+val. tag_name+'</a>';
			if(index%4-3==0){
				str+='</li>';
			}
		})
		$(".list").append($(str));
	}

	//用函数渲染列表
	request('http://leboapi.baidu.com/leboapi/tag',{
		type:"getRootTagList",
		edit:0,
		apiver:2,
		from:"lebowebapp",
		terminal:"pcweb",
		app:121
	},render);

	//调用函数渲染小编推荐
	request('http://leboapi.baidu.com/leboapi/business',{
		type:"getHotList",
		limit:6,
		args:"album.*,song.*,song.album.*,song.pic,tag,song.album.tag",
		terminal:"android",
		apiver:2,
		from:"lebowebapp",
		app:121
	},list);
	//渲染新晋节目榜
	request('http://leboapi.baidu.com/leboapi/rank',{
		type:"getRanking",
		rank_type:2,
		args:"album.*,album.album_end, album.pic",
		start:1,
		limit:10,
		apiver:2,
		from:"lebowebapp",
		terminal:"pcweb",
		app:121
	},program);
	function program(data){
		var data=data.data;
		console.log(data);
		var str='';
		$.each(data,function(index,item){
			console.log(item);
			str+='<dl albumId="'+item.album_id+'">\
				<dt><img src="'+item.album_pic[1].pi_link+'" alt=""></dt>\
				<dd>\
					<h3>'+item.album_title+'</h3>\
					<h4>'+item.artist_name+'</h4>\
				<p><span>';
					for(var i=0;i<item.tag.length;i++){
						str+='<a href="">'+item.tag[i].tag_name+'</a>'
					}
					str+='</span><span></span></p>\
				</dd>\
			</dl>'
		});
		$(".pic1").append($(str));
	}

	function list(data){
		var data=data.data,
			str='',
			title;
		$.each(data,function(index,item){
			console.log(item)
			 if(item.type==1){
			 	title=item.song_title;
			 	pic=item.song_pic[0].pi_link;
			 }else{
			 	title=item.album_title;
			 	pic=item.album_pic[0].pi_link;
			 }
			 //console.log(pic);
			if(index%3==0){
				str+='<div>'
			}
			str+='<dl ><dt><img src="'+pic+'" alt="" /></dt><dd>'+title+'</dd></dl>';
			if(index%3-2==0){
				str+='</div>';
			}
		})
		$(".pic").append($(str));
	}
})