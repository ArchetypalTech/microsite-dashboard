import PocketBase from 'pocketbase';
import { PB_USER, PB_SECRET } from '$env/static/private';
const ENDPOINT = process.env?.npm_package_config_ENDPOINT;
const COLLECTION = process.env.npm_package_config_COLLECTION!;
const pb = new PocketBase(ENDPOINT);
await pb.collection('users').authWithPassword(PB_USER, PB_SECRET);

export async function load() {
	const collection: Site[] = await pb.collection(COLLECTION).getFullList({ sort: '-updated' });
	return { collection };
}
