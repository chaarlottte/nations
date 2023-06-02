import { writable } from "svelte/store";
import Client from "pocketbase";

export const POCKETBASE_URL = "http://127.0.0.1:8090";

export const pb = new Client(POCKETBASE_URL);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log(`New user: ${auth}`);
    currentUser.set(pb.authStore.model);
});

// Authentication related functions
export async function register(
    username: string,
    password: string,
    confirmPassword: string,
    nickname: string,
    loginAfter = true
) {
    const userData = {
        "username": username,
        // "email": "test@example.com",
        // "emailVisibility": false,
        "password": password,
        "passwordConfirm": confirmPassword,
        "nickname": nickname
    };

    await pb.collection("users").create(userData);
    await login(username, password);
}

export async function login(
    username: string,
    password: string
) {
    await pb.collection("users").authWithPassword(username, password);
}

export function logout() { pb.authStore.clear(); }

export async function save(collection: string, record: any) {
    // convert obj to FormData in case one of the fields is instanceof FileList
    const data = object2formdata(record);
    if (record.id) {
        return await pb.collection(collection).update(record.id, data);
    } else {
        return await pb.collection(collection).create(data);
    }
}

function object2formdata(obj: {}) {
    // check if any field's value is an instanceof FileList
    if (!Object.values(obj).some((val) => val instanceof FileList)) {
        // if not, just return the original object
        return obj;
    }
    // otherwise, build FormData from obj
    const fd = new FormData();
    for (const [key, val] of Object.entries(obj)) {
        if (val instanceof FileList) {
            for (const file of val) {
                fd.append(key, file);
            }
        } else {
            fd.append(key, val as any);
        }
    }
    return fd;
}
  