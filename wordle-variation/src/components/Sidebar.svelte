<script lang="ts">
	import { activeVariation, sidebarOpen } from "../stores";
	import { variations } from "../variations";

	const enabledVariations = variations;

	function select(id: string) {
		$activeVariation = id;
		$sidebarOpen = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $sidebarOpen}
	<div class="backdrop" on:click={() => ($sidebarOpen = false)} />
{/if}

<nav class:open={$sidebarOpen}>
	<div class="variations">
		{#each enabledVariations as variation}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="variation-item"
				class:active={$activeVariation === variation.id}
				on:click={() => select(variation.id)}
				title={variation.description}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d={variation.icon} />
				</svg>
				<span class="label">{variation.name}</span>
			</div>
		{/each}
	</div>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: var(--sidebar-width);
		background: var(--bg-secondary);
		border-right: 1px solid var(--border-primary);
		display: flex;
		flex-direction: column;
		z-index: 10;
		overflow-y: auto;
	}

	.variations {
		display: flex;
		flex-direction: column;
		padding: 8px 0;
	}

	.variation-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 12px 4px;
		cursor: pointer;
		color: var(--fg-secondary);
		transition: color 0.15s ease, background-color 0.15s ease;
		border-left: 3px solid transparent;

		&:hover {
			color: var(--fg-primary);
			background: var(--bg-primary);
		}

		&.active {
			color: var(--color-correct);
			border-left-color: var(--color-correct);
			background: var(--bg-primary);
		}

		svg {
			width: 24px;
			height: 24px;
		}

		.label {
			font-size: 10px;
			margin-top: 4px;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-weight: 600;
		}
	}

	.backdrop {
		display: none;
	}

	@media (max-width: 599px) {
		nav {
			width: 200px;
			transform: translateX(-100%);
			transition: transform 0.2s ease;
			box-shadow: none;

			&.open {
				transform: translateX(0);
				box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
			}
		}

		.variation-item {
			flex-direction: row;
			padding: 14px 16px;
			gap: 12px;

			.label {
				font-size: 14px;
				margin-top: 0;
			}
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 9;
		}
	}
</style>
