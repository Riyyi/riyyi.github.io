<template>
	<nav class="navbar navbar-expand-lg fixed-top bg-dark" data-bs-theme="dark">
		<div class="container-fluid">
			<NuxtLink class="navbar-brand" to="/"><IFaHome /> Home</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
				aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<!-- Left aligned nav items -->
				<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
					<li class="nav-item"><NuxtLink to="/articles" class="nav-link">Articles</NuxtLink></li>
					<li class="nav-item"><NuxtLink to="/todos" class="nav-link">Todos</NuxtLink></li>
				</ul>
				<!-- Right aligned nav items -->
				<ul class="navbar-nav">
					<li class="nav-item"><a href="https://git.riyyi.com/riyyi" class="nav-link" target="_blank">Gitea <IFaCoffee /></a></li>
					<li class="nav-item"><a href="https://github.com/riyyi" class="nav-link" target="_blank">Github <IFaGithub /></a></li>
					<li class="nav-item"><a href="https://gitlab.com/riyyi" class="nav-link" target="_blank">Gitlab <IFaGitlab /></a></li>
					<li class="nav-item"><a href="https://linkedin.com/in/rickvanvonderen" class="nav-link" target="_blank">Linked<IFaLinkedinSquare /></a></li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style scoped>
nav {
	box-shadow: 0 .25rem .5rem rgba(0, 0, 0, .28);
}

[data-bs-theme=dark] nav {
	box-shadow: 0 .25rem .5rem rgba(0, 0, 0, .23);
}
</style>
