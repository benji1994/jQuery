$(function() {
	/* 搜索框文字效果 */
	$('#inputSearch').focus(function() {
		$(this).addClass('focus')
		if($(this).val() == this.defaultValue) {
			$(this).val('')
		}
	}).blur(function() {
		$(this).removeClass('focus')
			if($(this).val() == '') {
				$(this).val(this.defaultValue)
			}
	}).keyup(function(e) {
		if(e.which == 13) {
			alert('回车提交表单！')
		}
	})

	/* 网页换肤 */
	var $li = $('#skin li')
	$li.click(function(){
		switchSkin(this.id)
	})
	var cookie_skin = $.cookie('MyCssSkin')

	if(cookie_skin) {
		switchSkin(cookie_skin)
	}
	function switchSkin(skinName) {
		$('#' + skinName).addClass('selected')
			.siblings().removeClass('selected')
		$('#cssfile').attr('href', 'styles/skin/' + skinName + '.css')
		$.cookie('MyCssSkin', skinName, {path: '/', expires: 10})
	}

	/* 导航效果 */
	$('#nav li').hover(function() {
		$(this).find('.jnNav').show()
	}, function() {
		$(this).find('.jnNav').hide()
	})

	/* 左侧商品分类热销效果 */
	$('.jnCatainfo .promoted').append('<s class="hot"></s>')

	/* 右侧上部产品广告效果 */
	var $imgrolls = $('#jnImageroll div a')
	$imgrolls.css('opacity', '0.7')
	var index = 0
	$('#jnImageroll div a').mouseover(function() {
		index = $('#jnImageroll div a').index(this)
		showImg(index)
	}).eq(0).mouseover()
	function showImg(index) {
		var $rollobj = $('#jnImageroll')
		var $rolllist = $rollobj.find('div a')
		var newhref = $rolllist.eq(index).attr('href')
		$('#JS_imgWrap').attr('href', newhref)
			.find('img').eq(index).stop(true, true ).fadeIn()
			.siblings().fadeOut()
		$rolllist.removeClass('chos').css('opacity', '0.7')
			.eq(index).addClass('chos').css('opacity', '1')
	}
	var len = $imgrolls.length
	var adTimer = null
	$('#jnImageroll').hover(function() {
		if(adTimer) {
			clearInterval(adTimer)
		}
	}, function() {
		adTimer = setInterval(function() {
			showImg(index)
			index++
			if(index == len) {
				index = 0
			}
		}, 5000)
	}).trigger('mouseleave')

	/* 右侧最新动态模块内容添加超链接提示 */
	var x = 10 
	var y = 20
	$('a.tooltip').mouseover(function(e) {
		this.myTitle = this.title
		this.title = ''
		var tooltip = '<div id="tooltip">' + this.myTitle + '</div>'
		$('body').append(tooltip)
		$('#tooltip')
			.css({
				'top': (e.pageY + y) + 'px',
				'left': (e.pageX + x) + 'px'
			}).show('fast')
	}).mouseout(function() {
		this.title = this.myTitle
		$('#tooltip').remove()
	}).mousemove(function(e) {
		$('#tooltip')
			.css({
				'top': e.pageY + y + 'px',
				'left': e.pageX + x + 'px'
			})
	})

	/* 右侧下部品牌活动横向滚动效果 */
	$('#jnBrandTab li a').click(function() {
		$(this).parent().addClass('chos')
			.siblings().removeClass('chos')
		var idx = $('#jnBrandTab li a').index(this)
		showBrandList(idx)
	}).eq(0).click()
	function showBrandList(index) {
		var $rollobj = $('#jnBrandList')
		var rollWidth = $rollobj.find('li').outerWidth()
		rollWidth = rollWidth * 4
		$rollobj.stop(true, false).animate({left: -rollWidth * index}, 1000)
	}

	/* 右侧下部光标滑过产品列表效果 */
	$('#jnBrandList li').each(function(index) {
		var $img = $(this).find('img')
		var img_w = $img.width()
		var img_h = $img.height()
		var spanHtml = `<span style="position: absolute;top: 0;left: 5px;width:${img_w}px;height:${img_h}px;" class="imageMask"></span>`
		$(spanHtml).appendTo(this)
	})
	$('#jnBrandList').on('mouseover', '.imageMask', function(e) {
		$(this).toggleClass('imageOver')
	}).on('mouseout', '.imageMask', function(e) {
		$(this).toggleClass('imageOver')
	})
})