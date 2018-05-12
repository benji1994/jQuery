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

	/* 产品图片放大镜效果 */
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens: true,
		preloadImages: false,
		alwaysOn: false,
		zoomWidth: 340,
		xOffset: 10,
		yOffset: 0,
		position: 'right'
	})

	/* 单击产品小图切换大图 */
	$('#jnProitem ul.imgList li a').bind('click', function() {
		var imgSrc = $(this).find('img').attr('src')
		var i = imgSrc.lastIndexOf('.')
		var unit = imgSrc.substring(i)
		imgSrc = imgSrc.substring(0, i)
		var imgSrc_big = imgSrc + '_big' + unit
		$('#thickImg').attr('href', imgSrc_big)
	})

	/* 产品属性介绍之类的选项卡 */
	var $div_li = $('div.tab_menu ul li')
	$div_li.click(function() {
		$(this).addClass('selected')
			.siblings().removeClass('selected')

		var index = $div_li.index(this)

		$('div.tab_box > div')
			.eq(index).show()
			.siblings().hide()
	}).hover(function() {
		$(this).addClass('hover')
	}, function() {
		$(this).removeClass('hover')
	})

	/* 右侧产品颜色切换 */
	$('.color_change ul li img').click(function() {
		$(this).addClass('hover')
			.parent().siblings().find('img').removeClass('hover')
		var imgSrc = $(this).attr('src')
		var i = imgSrc.lastIndexOf('.')
		var unit = imgSrc.substring(i)
		imgSrc = imgSrc.substring(0, i)
		var imgSrc_small = imgSrc + '_one_small' + unit
		var imgSrc_big = imgSrc + '_one_big' + unit
		$('#bigImg').attr({'src': imgSrc_small})
		$('#thickImg').attr('href', imgSrc_big)
		var alt = $(this).attr('alt')
		$('.color_change strong').text(alt)
		var newImgSrc = imgSrc.replace('images/pro_img/', '')
		$('#jnProitem .imgList li').hide()
		$('#jnProitem .imgList').find('.imgList_' + newImgSrc).show()
		$('#jnProitem .imgList').find('.imgList_' + newImgSrc)
			.eq(0).find('a').click()
	})

	/* 右侧产品尺寸切换 */
	$('.pro_size li').click(function() {
		$(this).addClass('cur').siblings().removeClass('cur')
		$(this).parents('ul').siblings('strong')
			.text( $(this).text() )
	})

	/* 右侧产品数量和价格联动 */
	var $span = $('.pro_price strong')
	var price = $span.text()
	$('#num_sort').change(function() {
		var num = $(this).val()
		var amount = num * price
		$span.text( amount )
	}).change()

	/* 右侧给产品评分的效果 */
	$('ul.rating li a').click(function() {
		var title = $(this).attr('title')
		alert('您给此商品的评分是：' + title)
		var cl = $(this).parent().attr('class')
		$(this).parent().parent().removeClass().addClass('rating ' + cl + 'star')
		$(this).blur()
		return false
	})

	/* 右侧放入购物车 */
	var $product = $('.jnProDetail')
	$('#cart a').click(function() {
		var pro_name = $product.find('h4:first').text()
		var pro_size = $product.find('.pro_size strong').text()
		var pro_color = $('.color_change strong').text()
		var pro_num = $product.find('#num_sort').val()
		var pro_price = $product.find('.pro_price strong').text()
		var dialog = '感谢您的购买。\n您购买的\n' +
					'产品是：' + pro_name + '；\n' +
					'尺寸是：' + pro_size + '；\n' +
					'颜色是：' + pro_color + '；\n' +
					'数量是：' + pro_num + '；\n' +
					'总价是：' + pro_price + '元。'
		alert(dialog)
		return false
	})

})