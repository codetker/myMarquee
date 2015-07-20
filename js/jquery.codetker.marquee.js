/*
 * boxScroll 0.1
 * 兼容IE8,FF,Chrome等常见浏览器
 */
;
(function($, window, document, undefined) {
	//定义构造函数
	var BoxObj = function(ele, opt) {
		this.$element = ele; //最外层对象
		this.defaults = {
				'style': 0, //滚动样式选择,默认为普通效果
				'stepTime': 10,
				'direction': 'left' //默认为向左边滚动
			},

			this.options = $.extend({}, this.defaults, opt);
		//这里可以添加一些通用方法	
	}

	//给构造函数添加方法
	BoxObj.prototype = {

		commonScroll: function() {
			//接收对象属性
			var obj = this.$element,
				boxWindow = $(this.$element).children('ul'),
				stepTime = this.options.stepTime,
				style = this.options.style,
				direction,
				lists = $(boxWindow).children('li'),
				len = $(lists).length,
				boxWidth = $(lists[0]).width(),
				boxHeight = $(lists[0]).height(),
				timer,
				step;

			switch (this.options.direction) {
				case 'left':
					direction = 1;
					step = 0;
					break;
				case 'right':
					direction = -1;
					step = boxWidth;
					break;
				case 'top':
					direction = true;
					step = 0;
					break;
				case 'bottom':
					direction = false;
					step = boxHeight;
					break;
				default:
					;
			}

			function move(style, stepTime, direction) {
				if (style == 0) {
					switch (direction) {
						case 1:
							step += 1;
							if (step > boxWidth) {
								step -= boxWidth;
								$(boxWindow).append($(boxWindow).children().eq(0)); //将第一项放在最后，相当于push(0),shift()
							} else {
								$(obj).scrollLeft(step);
							}
							break;
						case -1:
							step -= 1;
							if (step < 0) {
								step += boxWidth;
								$(boxWindow).prepend($(boxWindow).children().eq(len - 1)); //将最后一项放在最前，相当于pop(last),unshift()
							} else {
								$(obj).scrollLeft(step);
							}
							break;
						case true:
							step += 1;
							if (step > boxHeight) {
								step -= boxHeight;
								$(boxWindow).append($(boxWindow).children().eq(0)); //将第一项放在最后，相当于push(0),shift()
							} else {
								$(obj).scrollTop(step);
							}
							break;
						case false:
							step -= 1;
							if (step < 0) {
								step += boxHeight;
								$(boxWindow).prepend($(boxWindow).children().eq(len - 1)); //将最后一项放在最前，相当于pop(last),unshift()
							} else {
								$(obj).scrollTop(step);
							}
							break;
						default:
							;
					}
				} else { //留待扩展

				}
			}

			if ((($(obj).width() < boxWidth * len) && ((direction == 1) || (direction == -1))) || (($(obj).height() < boxHeight * len)) && ((direction == true) || (direction == false))) {
				timer = setInterval(function() {
					move(style, stepTime, direction);
				}, 1 * stepTime);

				$(lists).each(function() { //鼠标移上暂停
					$(this).hover(function() {
						clearInterval(timer);
					}, function() {
						clearInterval(timer);
						timer = setInterval(function() {
							move(style, stepTime, direction);
						}, 1 * stepTime);
					});
				});
			}
		}

	}

	$.fn.marquee = function(options) {
		//创建实体
		var boxObj = new BoxObj(this, options);
		//用尾调的形式调用对象方法
		return boxObj.commonScroll();
	}
})(jQuery, window, document);