<script lang="ts">
    import { pb, currentUser, getNationData } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    export let data: any;
    let currentNation: any = data.currentNation;

    function signOut() {
        pb.authStore.clear();
        goto("/users/login");
    }

    onMount(async () => {
        if($currentUser === null) 
            await goto("/users/login");
    });
</script>

{#if $currentUser}
    {JSON.stringify(currentNation)}
    <h2>{currentNation.nationData.name}</h2>
    <p>Population: {currentNation.nationData.population}</p>
    <ul>
        {#each currentNation.resources as resource}
            <li>{resource.expand.resourceType.name}: <strong>{resource.quantity}</strong></li>
        {/each}
    </ul>
    <button on:click={signOut}>Sign Out</button>
{/if}