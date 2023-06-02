import { pb } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load() {
    const continents  = await pb.collection("continents").getList(1, 50, {
        sort: "difficulty",
    });

    return {
        continents: continents.items
    }
}