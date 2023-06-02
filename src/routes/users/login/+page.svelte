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
            await pb.collection("users").authWithPassword(username, password, {}, {
                expand: "nation"
            });
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
        <div class="input-box">
            <input
                placeholder="Username"
                type="text"
                bind:value={username}
            />
        </div>

        <div class="input-box">
            <input
                placeholder="Password"
                type="password"
                bind:value={password}
            />
        </div>

        <button class="input-box-leftonly" on:click={login}>Login</button>

        <p class="input-box-leftonly">Don't have an account? <a href="/users/signup">Sign up instead.</a></p>
    </form>

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
{/if}

<style>
    .input-box {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    .input-box-leftonly {
        margin-left: 10px;
    }
</style>