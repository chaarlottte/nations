import { writable } from "svelte/store";
import { POCKETBASE_URL } from "$lib/pocketbase";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '$env/static/private'
import Client from "pocketbase";

export const adminClient = new Client(POCKETBASE_URL);

adminClient.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);