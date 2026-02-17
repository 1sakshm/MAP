<script context="module" lang="ts">
	import { Settings } from "./utils";
	import { settings, activeVariation } from "./stores";
	import { setContext } from "svelte";
	import { variations } from "./variations";
	import Sidebar from "./components/Sidebar.svelte";
</script>

<script lang="ts">
	export let version: string;
	setContext("version", version);
	localStorage.setItem("version", version);

	settings.set(new Settings(localStorage.getItem("settings")));
	settings.subscribe((s) => localStorage.setItem("settings", JSON.stringify(s)));

	$: currentVariation = variations.find((v) => v.id === $activeVariation) || variations[0];
</script>

<div class="app-shell">
	<Sidebar />
	<div class="content">
		<svelte:component this={currentVariation.component} />
	</div>
</div>

<style lang="scss">
	.app-shell {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.content {
		flex: 1;
		height: 100%;
		margin-left: var(--sidebar-width);
		overflow: hidden;
	}
	@media (max-width: 599px) {
		.content {
			margin-left: 0;
		}
	}
</style>
