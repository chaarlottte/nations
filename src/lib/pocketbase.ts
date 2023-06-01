import { writable } from "svelte/store";
import Client from "pocketbase";

export const POCKETBASE_URL = "http://127.0.0.1:8090";

export const pb = new Client(POCKETBASE_URL);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log(`New user: ${auth}`);
    currentUser.set(pb.authStore.model);
})