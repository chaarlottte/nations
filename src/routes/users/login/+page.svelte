<script lang="ts">
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { ClientResponseError } from "pocketbase";

    let username: string;
    let password: string;
    let error: string;

    async function login() {
        try {
            await pb.collection("users").authWithPassword(username, password);
        } catch(ex) {
            if(ex instanceof ClientResponseError) {
                error = JSON.stringify(ex.response);
            }
        }
    }

    onMount(async () => {
        if($currentUser !== null) {
            goto("/users/@me");
        }
    });
</script>

{#if $currentUser}
    {goto("/users/@me")}
{:else}
    <form on:submit|preventDefault>
        <input
            placeholder="Username"
            type="text"
            bind:value={username}
        />

        <input
            placeholder="Password"
            type="password"
            bind:value={password}
        />

        <button on:click={login}>Login</button>

        <p>Don't have an account? <a href="/users/signup">Sign up instead.</a></p>
    </form>

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
{/if}