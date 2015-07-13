/*
 * boxScroll 0.1
 * 兼容IE8,FF,Chrome等常见浏览器
 */
 ;(function($,window,document,undefined){
 	//定义构造函数
 	var BoxObj=function(ele,opt){
 		this.$element=ele; //最外层对象
 		this.defaults={
 			'style': 0 ,//滚动样式选择,默认为普通效果
 			'speed': 1 ,//默认为1s
 			'direction': 'left'//默认为向左边滚动
 		},
 	
 		this.options=$.extend({},this.defaults,opt );
 		//这里可以添加一些通用方法	
 	}

 	//给构造函数添加方法
 	BoxObj.prototype={

 		commonScroll:function(){
 			//接收对象属性
 			var obj=this.$element;
 			var boxWindow=$(this.$element).children('ul');
 			var speed=this.defaults.speed;
 			var style=this.defaults.style;
 			var direction=(this.defaults.direction=='left')? 1 : -1;
 			var lists=$(boxWindow).children('li');
 			var len=$(lists).length;
 			var boxWidth=$(lists[0]).width();
 			var timer;
 			var step=(this.defaults.direction=='left')? 0 : boxWidth;

 			function move(style,speed,direction){
 				if (style==0) {
 					if (direction==1) {
 						step+=1;
 						if(step>boxWidth){
 							step-=boxWidth;
 							$(boxWindow).append($(boxWindow).children().eq(0));//将第一项放在最后，相当于push(0),shift()
 						}else{
 							$(obj).scrollLeft(step);
 						}
 					}else if (direction== -1) {
 						step-=1;
 						if(step<0){
 							step+=boxWidth;
 							$(boxWindow).prepend($(boxWindow).children().eq(len-1));//将最后一项放在最前，相当于pop(last),unshift()
 						}else{
 							$(obj).scrollLeft(step);
 						}
 					}else{//不执行之外的数值

 					}
 				}else{//留待扩展,多了改switch

 				}
 			}

 			timer=setInterval(function(){
 				move(style,speed,direction);
 			},10*speed);

			$(lists).each(function() {//鼠标移上暂停
				$(this).hover(function() {
					clearInterval(timer);
				}, function() {
					clearInterval(timer);
					timer=setInterval(function(){
	 					move(style,speed,direction);
	 				},10*speed);
				});
			});
 		}
 			
 	}

 	$.fn.marquee=function(options){
 		//创建实体
 		var boxObj=new BoxObj(this,options);
 		//用尾调的形式调用对象方法
 		return boxObj.commonScroll();
 	}
 })(jQuery,window,document);
