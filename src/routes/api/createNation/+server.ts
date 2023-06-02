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
        "inventory": {},
        "population": 1000
    };

	try {
        const record = await adminClient.collection("nations").create(nationData);
        await adminClient.collection("users").update(leader, { nation: record.id });
        return json(record, { status: 201 });
    } catch(ex: any) {
        console.log(ex)
        return json(ex.response, { status: ex.response.code });
    }
}
