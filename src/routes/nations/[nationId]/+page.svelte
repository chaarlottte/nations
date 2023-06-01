<script lang="ts">
    import { POCKETBASE_URL, pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    export let data;
    let nation = data.nation;
    nation.leader = nation?.expand.leader;

    onMount(async () => {
        if($currentUser === null) {
            goto("/users/login");
        }
    });

    function getGovernemtAdjective() {
        switch(nation?.government_type) {
            case "socialism":
                return "socialist";
            case "capitalism":
                return "capitalist";
            case "authoritarianism":
                return "authoritarian"
        }
    }
</script>

{#if $currentUser}
    <p>{JSON.stringify(data)}</p>
    {#if nation?.flag === ""}
        <img
            class="avatar"
            src={`https://avatars.dicebear.com/api/identicon/${nation?.flag}.svg`}
            alt="avatar"
            width="40px"
        />
    {:else}
        <img
            class="avatar"
            src={`${POCKETBASE_URL}/api/files/${nation?.collectionId}/${nation?.id}/${nation?.flag}`}
            alt="avatar"
            width="40px"
        />
    {/if}
    <h1>{nation?.name}</h1>

    <p style="font-size: larger;">{nation?.name} is a <strong>{getGovernemtAdjective()}</strong> nation ruled by 
        <strong><a href={`/users/@${nation?.leader.username}`}>{nation?.leader.username}</a></strong>, 
        who resides at the capital city of <strong>{nation?.capital_city}</strong>. 
        It has a population of <strong>{nation?.population}</strong>.</p>
{/if}