<script lang="ts">
	import { Nav, Icon } from '@archetypaltech/ayiui';
	import Packed from '$lib/components/packed.svelte';
	import { onMount } from 'svelte';
	const { data } = $props();

	let w = $state(1024);
	let h = $state(1024);
	onMount(() => {
		w = window.innerWidth;
		h = window.innerHeight;
	});
</script>

{#snippet microcard({
	ip,
	name,
	title,
	repo,
	repo_content,
	version,
	health,
	description,
	tag,
	count,
	dev,
	prod,
	host,
	isPrivate,
	org
}: Site)}
	<div
		class="card border-w-4 flex flex-col gap-2 rounded-lg border-2 p-6 shadow-md backdrop-blur-lg"
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
			{#if prod.length}
				<a href={prod}><Icon ctx="external-link" type="stroke" /></a>
			{:else}
				<a href={dev}><Icon ctx="external-link" type="stroke" /></a>
			{/if}
			<a href={repo}><Icon ctx="github" type="stroke" /></a>
			{#if repo_content.length}
				<a href={repo_content}><Icon ctx="database" type="stroke" /></a>
			{:else}
				<div class="opacity-40"><Icon ctx="database" type="stroke" /></div>
			{/if}
			<div data-health-state={health}></div>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-col items-start">
				<h2 class="font-bold">{title}</h2>
				<h3 class="text-xs">{name}</h3>
			</div>
			<code class="bg-whitesmoke rounded-md border-2 px-2 text-sm text-slate-400">{version}</code>
		</div>
		<div class="flex items-center justify-between">
			<code class="rounded-md border-2 bg-slate-200 px-2">{ip}</code>
			<div class="flex gap-2">
				<a href={dev}>{host}</a>
				<Icon ctx="server" type="stroke" />
			</div>
		</div>
		<div class="flex h-[100%] min-h-0 items-end justify-between">
			<div class="description self-start">{description}</div>
			{#if org === 'ARC'}
				<Icon ctx="Archetypal" type="fill" />
			{:else}
				<img class="sem-logo" src="/semaeopus.png" alt="Semaeopus Ltd." />
			{/if}
		</div>
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
	position="fixed"
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
			{@render microcard(site)}
		{/each}
	</div>
</main>

<style>
	.sem-logo {
		width: 2em;
		height: auto;
	}
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
	:global(nav) {
		padding: 0;
	}
	:global(nav ._icon) {
		padding: 0.5em;
		backdrop-filter: blur(1em);
		border-radius: 50%;
	}
</style>
