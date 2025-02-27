// @ts-nocheck
import PocketBase from 'pocketbase';
import { PB_USER, PB_SECRET } from '$env/staic/private';
const ENDPOINT = process.env?.npm_package_config_ENDPOINT;
const COLLECTION = process.env.npm_package_config_COLLECTION!;
const pb = new PocketBase('https://pb.cycocyan.xyz');
await pb.collection('users').authWithPassword(PB_USER, PB_SECRET);

export async function load() {
	const collection: Site[] = await pb
		.collection('Microsite_Meta')
		.getFullList({ sort: '-updated' });
	return { collection };
}
