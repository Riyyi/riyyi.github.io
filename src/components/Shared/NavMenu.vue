<template>
	<BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="dark" fixed="top">
		<BNavbarBrand to="/">
			<IFaHome /> Home
		</BNavbarBrand>
		<BNavbarToggle target="nav-collapse" />
		<BCollapse id="nav-collapse" is-nav>
			<!-- Left aligned nav items -->
			<BNavbarNav>
				<BNavItem to="/articles">Articles</BNavItem>
				<BNavItem to="/todos">Todos</BNavItem>
			</BNavbarNav>
			<!-- Right aligned nav items -->
			<BNavbarNav class="ms-auto mb-2 mb-lg-0">
				<BNavItem href="https://git.riyyi.com/riyyi" target="_blank">
					<IFaCoffee /> Gitea
				</BNavItem>
				<BNavItem href="https://github.com/riyyi" target="_blank">
					<IFaGithub /> Github
				</BNavItem>
				<BNavItem href="https://gitlab.com/riyyi" target="_blank">
					<IFaGitlab /> Gitlab
				</BNavItem>
				<BNavItem href="https://linkedin.com/in/rickvanvonderen" target="_blank">Linked
					<IFaLinkedinSquare />
				</BNavItem>
			</BNavbarNav>
		</BCollapse>
	</BNavbar>
</template>

<style scoped>
nav {
	box-shadow: 0 .25rem .5rem rgba(0, 0, 0, .28);
}

[data-bs-theme=dark] nav {
	box-shadow: 0 .25rem .5rem rgba(255, 0, 0, .28);
}
</style>
