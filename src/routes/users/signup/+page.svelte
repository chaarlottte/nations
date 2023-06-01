<script lang="ts">
    import { pb, currentUser } from "$lib/pocketbase";
    import { ClientResponseError } from "pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

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

    async function signUp() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password
            };
            const createdUser = await pb.collection("users").create(data);
            await login();
        } catch(ex) {
            console.log(ex);
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

        <button on:click={signUp}>Sign up</button>

        <p>Already have an account? <a href="/users/login">Log in instead.</a></p>
    </form>

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
{/if}