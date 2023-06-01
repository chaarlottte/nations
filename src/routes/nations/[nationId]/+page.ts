import { pb } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const nationId = params.nationId;

    const record = await pb.collection("nations").getOne(nationId, {
        expand: "leader",
    });

    if(record) {
        return {
            nation: record
        }
    }

    throw error(404, "Nation not found.");
}