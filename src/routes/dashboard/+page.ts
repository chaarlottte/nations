import { pb, currentUser, getNationData } from "$lib/pocketbase";

export async function load({ params }) {
    const currentNation = await getNationData();
    return { currentNation }
};

export const ssr = false;