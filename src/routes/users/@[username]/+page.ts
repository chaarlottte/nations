import { pb } from "$lib/pocketbase";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const username = params.username;

    const resultList = await pb.collection("users").getList(1, 1, {
        filter: `username = "${username}"`,
        expand: "nation"
    });

    if(resultList.totalItems > 0) {
        const user = resultList.items[0];
        return {
            user: user
        }
    }

    throw error(404, "Username not found.");
}