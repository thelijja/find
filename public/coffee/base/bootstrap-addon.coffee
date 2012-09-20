jQuery ->
	$('.navbar li a').click (e)->
		$('.navbar ul.nav > li').removeClass 'active'
		$(@).parent('li').addClass 'active'
		