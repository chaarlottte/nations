<script lang="ts">
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    function signOut() {
        pb.authStore.clear();
        goto("/users/login");
    }

    onMount(async () => {
        if($currentUser === null) {
            goto("/users/login");
        }
    });
</script>

{#if $currentUser}
    <h2>Hello, {$currentUser?.nickname}!</h2>
    <button on:click={signOut}>Sign Out</button>
{/if}