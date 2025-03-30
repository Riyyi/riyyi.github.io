<template>
	<ExampleComponent>
		<template v-slot:namedslot>
			<h1>named slot</h1>
		</template>
		default slot goes here
	</ExampleComponent>

	<ExampleComponent>
		<template #namedslot>
			<h1>named slot</h1>
		</template>
		default slot goes here
	</ExampleComponent>

	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget
	nibh eget mi interdum porta eu at eros. Integer nec magna ligula.
	Nulla turpis turpis, vulputate in gravida ac, euismod ullamcorper
	mi. Pellentesque ornare leo lorem, eu mollis nisi congue feugiat.
	Vestibulum eget interdum sem, ut eleifend quam. Sed cursus consequat
	ex, quis sodales nunc gravida faucibus. Fusce et velit sed turpis
	accumsan interdum sed ut enim. Suspendisse vehicula mi ac tellus
	fermentum feugiat. Nullam volutpat tempor nunc, ac tincidunt nisi.
	Sed varius est a nisi lobortis, vel gravida dui efficitur. Vivamus
	in ipsum quis mi bibendum venenatis ac sed erat. Pellentesque id
	ligula sapien. Vivamus elit mauris, volutpat eu venenatis ac,
	condimentum et velit. Morbi ullamcorper tellus non magna faucibus,
	et molestie erat euismod.

	Ut posuere libero sed finibus bibendum. Integer non est eu sapien
	gravida fringilla. Aliquam lobortis, ipsum in volutpat ullamcorper,
	nunc augue consequat risus, id ultrices diam erat eu enim. Cras at
	nibh turpis. Donec facilisis massa ante, et volutpat ante faucibus
	nec. Nullam at dictum erat, eu iaculis nibh. Integer ac velit eget
	dolor consequat tristique. Praesent interdum nisi eget libero
	euismod congue ac vitae mi. Aliquam in ex quam. Sed id nisi in diam
	lacinia dignissim a dapibus magna. Vivamus vestibulum suscipit
	sapien. Aenean luctus orci at hendrerit rhoncus. Nam nec ligula nec
	justo pellentesque finibus vitae id elit.

	Cras posuere neque at pharetra lacinia. Etiam id suscipit dolor,
	quis ullamcorper diam. Donec semper feugiat risus, sit amet maximus
	risus lacinia in. Aenean auctor iaculis dui, et commodo ex
	consectetur ac. Morbi elementum, est eget condimentum placerat,
	sapien felis molestie neque, cursus tempus purus lectus at eros. Nam
	in lorem eu magna elementum viverra ut nec lorem. Fusce auctor arcu
	sodales nibh iaculis ultrices. Nunc mi elit, pulvinar ut quam eu,
	iaculis gravida mauris. Sed ultrices, orci vitae pretium
	condimentum, felis dolor auctor velit, vel viverra nulla lacus vel
	lectus. Cras eros turpis, dignissim sit amet rutrum gravida,
	placerat non nulla.

	Curabitur at sodales lectus, vulputate accumsan tortor. Duis in
	efficitur ex. Mauris imperdiet nibh urna, eu elementum erat
	elementum a. Curabitur id magna ac risus euismod aliquet. Nullam
	hendrerit gravida nisl, ac sodales nibh tempor mattis. Orci varius
	natoque penatibus et magnis dis parturient montes, nascetur
	ridiculus mus. Aenean viverra semper sapien. Nulla finibus nec metus
	id molestie. Proin scelerisque venenatis enim, et maximus velit
	imperdiet vel. Vestibulum sit amet nisi vel justo pharetra efficitur
	sit amet ac elit. Donec feugiat id ante sit amet fermentum.
	Pellentesque rhoncus ultricies erat, sit amet ultrices magna
	condimentum ut. Donec vulputate efficitur augue a placerat.

	Integer pulvinar erat ut ipsum ultrices, in posuere urna rhoncus.
	Sed vestibulum nisl a magna volutpat, quis sodales leo vehicula.
	Morbi tincidunt urna sed nisl feugiat, vel commodo nulla tincidunt.
	Cras gravida massa et rutrum imperdiet. Proin eget iaculis urna. In
	hac habitasse platea dictumst. Nullam consectetur ante sit amet
	tortor ornare porttitor. Duis quis eros lorem. Morbi pulvinar
	elementum purus, eget eleifend felis eleifend luctus. Sed iaculis
	feugiat ligula, a hendrerit dui aliquet at. Aliquam erat volutpat.
	Suspendisse id volutpat nisl, id iaculis ex. Morbi vehicula tellus a
	arcu efficitur, et vehicula lectus vestibulum. Praesent sed
	imperdiet dolor.

	Nunc condimentum odio nec placerat auctor. Nam posuere condimentum
	velit quis porttitor. Phasellus vitae enim et ex sodales lobortis
	vel quis sapien. Maecenas at venenatis ante, sit amet elementum
	risus. In lorem magna, fringilla fermentum diam sit amet, imperdiet
	sollicitudin dui. Quisque eros magna, auctor ac hendrerit venenatis,
	porta a lacus. Donec neque ligula, euismod nec mauris et, varius
	commodo dolor. Etiam pharetra libero massa, eu congue metus
	venenatis et. Nullam eu efficitur ligula. Suspendisse at scelerisque
	libero, nec consequat nisl. In dignissim finibus nisl, volutpat
	efficitur tellus scelerisque vitae. Phasellus quam mauris, bibendum
	ac pretium nec, venenatis eget ipsum.

	Fusce eu risus porttitor eros venenatis ornare vel nec dui. Integer
	feugiat non diam a molestie. Donec convallis turpis at orci
	lobortis, id bibendum turpis posuere. Aenean quis lacus elementum,
	condimentum elit ut, eleifend tortor. Ut dapibus ut nibh nec
	pharetra. Suspendisse quis pulvinar tortor, in congue sapien. In hac
	habitasse platea dictumst. Pellentesque tincidunt blandit tellus, in
	mattis nulla luctus sit amet. Aliquam erat volutpat. Nunc elit
	tortor, sagittis ut porta eleifend, congue quis orci. Nam a turpis
	eu nulla sagittis ullamcorper eu vitae lectus. Vestibulum bibendum
	vel mi vel gravida.

	Curabitur non maximus tortor. Aliquam ac est et enim vestibulum
	cursus ut et magna. Class aptent taciti sociosqu ad litora torquent
	per conubia nostra, per inceptos himenaeos. Sed nec nulla non ex
	fringilla fringilla. Praesent accumsan eros tellus, ac venenatis
	eros maximus in. Etiam ipsum felis, congue ut risus in, feugiat
	ornare ante. Aliquam sed fringilla lectus. Aenean semper, odio vel
	ultricies laoreet, est erat faucibus mi, sit amet tincidunt nunc dui
	sit amet arcu. Proin feugiat augue diam, sed rutrum dui congue ac.
	Nullam laoreet neque nunc, sed volutpat justo maximus ac. Sed eu
	turpis aliquam, laoreet orci vitae, dictum ipsum. Quisque at
	placerat orci. Suspendisse vulputate, erat eget pretium placerat,
	metus magna consectetur metus, id rutrum neque est sed turpis. Nulla
	pretium et lacus vel cursus.

	Maecenas quis libero mollis, commodo mi id, placerat nisl. Sed a
	neque vel dui faucibus semper. Duis ullamcorper, libero at porta
	convallis, lectus odio malesuada nunc, a tempus turpis ipsum at ex.
	Nullam enim leo, hendrerit a quam vel, finibus auctor dui. Mauris
	quis sem in nulla ornare pharetra vitae ut augue. Vivamus quis
	tincidunt tortor, at imperdiet augue. Mauris augue augue, varius
	vitae sapien et, efficitur rhoncus mi. Orci varius natoque penatibus
	et magnis dis parturient montes, nascetur ridiculus mus. Cras ac
	enim at est molestie elementum.

	Duis viverra quam ut nibh sodales accumsan. In hac habitasse platea
	dictumst. Sed a eros id elit malesuada ultrices. Quisque et diam
	justo. Pellentesque eu placerat ante, sit amet sagittis sapien. Nam
	sed sollicitudin urna. Proin non libero ut metus eleifend tempus.
	Sed in augue ligula. Suspendisse potenti. In eu fermentum augue.
	Aliquam sem ex, congue a condimentum ac, maximus a est. Integer in
	dui non lectus molestie auctor. Nullam mollis pellentesque semper.
	Etiam id neque facilisis, tristique sem et, porttitor purus.
	Praesent aliquam, nisi vel porttitor blandit, risus felis lobortis
	arcu, eu porttitor orci enim nec tortor. Maecenas id ante eget nisl
	pulvinar feugiat ac vel ante.

	Nam porttitor eleifend nisl. Vivamus ac aliquam lacus. Suspendisse
	facilisis arcu vel consectetur efficitur. Fusce sodales mollis
	auctor. Aenean nec sem a elit lobortis maximus tincidunt ac lorem.
	Proin dolor quam, volutpat id aliquet eu, faucibus ut urna. Quisque
	orci eros, blandit ut consequat vitae, convallis egestas libero.
	Nunc interdum elit id dui congue consequat. Maecenas volutpat odio
	diam. In tincidunt efficitur ultrices. Orci varius natoque penatibus
	et magnis dis parturient montes, nascetur ridiculus mus. Mauris eget
	faucibus leo. Cras rhoncus accumsan ante nec tempor. Class aptent
	taciti sociosqu ad litora torquent per conubia nostra, per inceptos
	himenaeos.

	Cras sit amet blandit mi. Cras ac mi pulvinar, aliquet ex quis,
	mollis nisi. Duis a interdum libero. Vivamus sit amet felis in ante
	cursus gravida eget quis lectus. Praesent vehicula tortor accumsan
	lectus pellentesque, in facilisis nisi fermentum. Mauris faucibus
	vulputate sapien non semper. Vestibulum tristique interdum dolor, id
	accumsan dolor malesuada et. Donec a porta augue.

	Nunc eu urna quis nulla consequat sagittis. Nullam eleifend
	tincidunt sapien in mattis. Praesent faucibus nibh at tortor
	malesuada, ut lobortis nisi pulvinar. Morbi congue ullamcorper
	ipsum, nec accumsan est imperdiet eu. Aenean sit amet finibus erat,
	quis porta felis. Sed sollicitudin erat nec consequat faucibus. Nam
	eleifend rutrum orci at commodo. Quisque est mi, gravida ut ultrices
	sit amet, hendrerit quis velit. Aenean dignissim consequat magna,
	non ornare lectus facilisis eu.

	Maecenas vel risus fringilla, fermentum lacus vel, laoreet leo. Sed
	ultricies, odio id ullamcorper consectetur, elit massa maximus
	ligula, vitae lacinia libero est sed justo. Integer eget lectus eu
	augue iaculis egestas. Nullam feugiat nisl metus, quis mollis dolor
	suscipit at. Nulla ac nulla ultricies, fermentum turpis sit amet,
	aliquam augue. Nulla quis vulputate nisi. Morbi dolor lectus,
	lacinia vitae leo id, fringilla porttitor sapien.

	Donec vestibulum, est sit amet auctor vestibulum, eros orci iaculis
	lacus, a efficitur lectus odio non mi. Nullam cursus purus vitae
	ante cursus, sed pulvinar magna condimentum. Suspendisse dignissim
	lorem non lacus cursus, quis lacinia eros semper. Integer aliquam
	felis iaculis sollicitudin vestibulum. Pellentesque ornare mi quam,
	ac pellentesque mi molestie vel. Mauris vel sapien ultricies mauris
	hendrerit vestibulum in at ligula. Morbi id velit vitae libero
	molestie elementum. Vivamus maximus orci vel ante sodales, ut
	pharetra erat egestas. Vivamus lacinia congue purus, nec volutpat
	felis pulvinar egestas. Nam blandit venenatis aliquam. Nullam a
	lorem et est sollicitudin pretium sed eget ex. Vivamus a quam est.
	Aliquam tristique volutpat magna, aliquet volutpat lorem fermentum
	sagittis.
</template>
