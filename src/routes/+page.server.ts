import PocketBase from 'pocketbase';
import { PB_USER, PB_SECRET } from '$env/static/private';
import { PUBLIC_ENDPOINT, PUBLIC_COLLECTION } from '$env/static/public';

const pb = new PocketBase(PUBLIC_ENDPOINT);
await pb.collection('users').authWithPassword(PB_USER, PB_SECRET);

export async function load() {
	const collection: Site[] = await pb
		.collection(PUBLIC_COLLECTION)
		.getFullList({ sort: '-updated' });
	return { collection };
}
