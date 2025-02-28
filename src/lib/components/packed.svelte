<script lang="ts">
	import { onMount } from 'svelte';
	let el: HTMLElement | null = null;
	const uid = crypto.randomUUID();
	const id = `sketch-${uid}`;
	interface Props {
		minRadius?: number;
		maxRadius?: number;
		width?: number;
		height?: number;
		weight?: number;
		margin?: number;
		innerMargin?: number;
		nodeSize?: number;
		colour?: string;
		opacity?: string;
		nodes?: 'MIN' | 'MAX' | 'BOTH' | null;
		position?: null | 'absolute' | 'fixed';
	}

	const {
		minRadius = 15,
		maxRadius = 50,
		width = 800,
		height = 400,
		weight = 4,
		margin = 10,
		colour = 'white',
		innerMargin = 10,
		nodeSize = 10,
		nodes = null,
		position = null,
		opacity = '1'
	}: Props = $props();

	const circles = [];
	const steps = 100000;
	const stepRadius = 1;

	onMount(async () => {
		const p5 = (await import('p5')).default;
		new p5((p) => {
			function collides(x, y, r) {
				if (x - r < margin || x + r > width - margin || y - r < margin || y + r > height + margin)
					return true;
				return circles.find((c) => p.dist(c.x, c.y, x, y) <= c.r + r);
			}
			function drawLines(
				x: number,
				y: number,
				r: number,
				innerMargin: number,
				nodeSize: number | null = null
			) {
				let angle = Math.random() * Math.PI * 2;
				let rm = r - innerMargin;
				let x1 = Math.cos(angle) * rm;
				let y1 = Math.sin(angle) * rm;
				let x2 = Math.cos(angle - Math.PI) * rm;
				let y2 = Math.sin(angle - Math.PI) * rm;
				if (nodeSize) {
					p.circle(x + x1, y + y1, nodeSize);
					p.circle(x + x2, y + y2, nodeSize);
				}
				p.line(x + x1, y + y1, x + x2, y + y2);
			}
			p.setup = () => {
				p.createCanvas(width, height).parent(id);
				p.angleMode = p.DEGREES;
				p.noLoop();
				(el!.children[0] as HTMLElement).style.width = '100%';
				(el!.children[0] as HTMLElement).style.height = '100%';
				if (el && position === 'absolute') {
					el.style.position = 'absolute';
					el.style.zIndex = '-1';
					el.style.opacity = opacity;
					el.style.width = '100%';
				}
				if (el && position === 'fixed') {
					el.style.position = 'fixed';
					el.style.zIndex = '-1';
					el.style.opacity = opacity;
					el.style.width = '100%';
					el.style.top = '0';
				}
			};

			p.draw = () => {
				p.stroke(colour);
				p.strokeWeight(weight);
				for (let i = 0; i < steps; i++) {
					const x = p.lerp(margin, width - margin, p.random());
					const y = p.lerp(margin, height - margin, p.random());

					for (let r = minRadius; r <= maxRadius; r += stepRadius) {
						const col = collides(x, y, r);
						if (col && r == minRadius) break;
						if (col) {
							circles.push({ x, y, r });
							if (nodes === 'BOTH' || nodes === 'MIN') {
								drawLines(x, y, r, innerMargin, nodeSize);
							} else {
								drawLines(x, y, r, innerMargin);
							}
							break;
						}
						if (!col && r == maxRadius) {
							// p.circle(x, y, r * 2);
							circles.push({ x, y, r });
							if (nodes === 'BOTH' || nodes === 'MAX') {
								drawLines(x, y, r, innerMargin, nodeSize);
							} else {
								drawLines(x, y, r, innerMargin);
							}
							break;
							i++;
						}
					}
				}
			};
		});
	});
</script>

<div bind:this={el} {id}></div>
