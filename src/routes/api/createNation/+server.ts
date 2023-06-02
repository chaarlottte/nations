import { adminClient } from "$lib/pocketbase-admin";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const {
        name,
        capital_city,
        government_type,
        denonym,
        continent,
        leader
    } = await request.json();

    let nationData = {
        name,
        capital_city,
        government_type,
        denonym,
        continent,
        leader,
        "stats": {},
        "population": 1000
    };

	try {
        const record = await adminClient.collection("nations").create(nationData);
        return json(record, { status: 201 });
    } catch(ex: any) {
        return json(ex.response, { status: ex.response.code });
    }
}
