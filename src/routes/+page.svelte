<script lang="ts">
	import { Nav, Icon } from '@archetypaltech/ayiui';
	import Packed from '$lib/components/packed.svelte';
	import { onMount } from 'svelte';

	// import type { Snippet } from "svelte";
	const { data } = $props();

	let w = $state(1024);
	let h = $state(1024);
	onMount(() => {
		w = window.innerWidth;
		h = window.innerHeight;
	});
</script>

{#snippet microcard(
	{
		ip,
		name,
		title,
		repo_ui,
		repo_content,
		version,
		health,
		description,
		count,
		dev,
		prod,
		host
	}: Site,
	isPrivate: boolean
)}
	<div
		class="card border-w-4 flex flex-col gap-4 rounded-lg border-2 p-6 shadow-md backdrop-blur-lg"
	>
		<div class="flex flex-row items-center justify-between">
			{#if isPrivate}
				<span class="badge bg-green-900 text-xs">private</span>
			{:else}
				<span class="badge bg-indigo-700 text-xs">public</span>
			{/if}
			<div class="flex flex-row gap-1">
				<Icon ctx="coffee" type="stroke" />
				<span class="text-xs">{count}</span>
			</div>
			<a href={prod}><Icon ctx="external-link" type="stroke" /></a>
			<a href={repo_ui}><Icon ctx="github" type="stroke" /></a>
			<div data-health-state={health}></div>
		</div>
		<div class="flex items-center justify-between">
			<h2>{name}</h2>
			<code class="rounded-md border-2 px-2 text-sm text-slate-400">{version}</code>
		</div>
		<div class="flex items-center justify-between">
			<code class="rounded-md border-2 bg-slate-200 px-2">{ip}</code>
			<a href={dev}>{host}</a>
		</div>
		<div class="description">{description}</div>
	</div>
{/snippet}
<Packed
	nodes="MAX"
	width={w}
	height={h}
	nodeSize={50}
	innerMargin={10}
	weight={30}
	margin={20}
	minRadius={100}
	maxRadius={200}
	position="absolute"
	opacity=".125"
	colour="black"
/>
<Nav show={true} logo="Archetypal" port={[]} starboard={[]} />
<main>
	<header>
		<h1 class="my-4 text-center text-3xl font-bold">Microsite Dashboard</h1>
	</header>
	<div class="microsites grow p-3">
		{#each data.collection as site}
			{@render microcard(site, site.private)}
		{/each}
	</div>
</main>

<style>
	.badge {
		color: white;
		padding: 0.25em 0.5em;
		border-radius: 0.5em;
	}

	.card > div:not(:last-child) {
		border-radius: 2em;
		/* background-color: white; */
		/* border: 1px solid black; */
		/* padding: 0.5em; */
	}
	.microsites {
		max-width: 1024px;
		width: 100%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 2em;
	}
	[data-health-state] {
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background-color: yellowgreen;
		border: 0.125em solid black;
	}
	[data-health-state='false'] {
		background-color: red;
	}
</style>
