// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Site {
		ip: string;
		host: string;
		isPrivate: boolean;
		dev: string;
		prod: string;
		health: boolean;
		version: string;
		repo: string;
		repo_content: string;
		title: string;
		description: string;
		tag: string[];
		name: string;
		count: number;
	}
}

export {};
