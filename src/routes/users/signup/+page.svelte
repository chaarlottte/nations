<script lang="ts">
    import { pb, currentUser } from "$lib/pocketbase";
    import { ClientResponseError } from "pocketbase";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let username: string;
    let nickname: string;
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

    async function register() {
        if(username.includes(" ")) {
            error = "Username must be lowercase.";
            return;
        }
        const userData = {
            "username": username,
            // "email": "test@example.com",
            // "emailVisibility": false,
            "password": password,
            "passwordConfirm": password,
            "nickname": nickname
        };

        await pb.collection("users").create(userData);
        await login();
        await goto("/users/@me");
    }

    function checkUsernameEvent(event: any) {
        if (event.srcElement.value.includes(" ")) {
            error = "Username canot contain spaces!";
        } else {
            error = "";
        }
    }

    const setName = (event: any) => {
        username = event.target.value.toLowerCase();
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
                on:input={setName}
            />
            {#if username}
                <p style="font-size: medium;">Your username will be <strong>@{username}</strong></p>
            {/if}
        </div>

        <div class="input-box">
            <input
                placeholder="Nickname"
                type="text"
                bind:value={nickname}
            />
        </div>

        <div class="input-box">
            <input
                placeholder="Password"
                type="password"
                bind:value={password}
            />
        </div>

        <button class="input-box-leftonly" on:click={register}>Sign up</button>

        <p class="input-box-leftonly">Already have an account? <a href="/users/login">Log in instead.</a></p>
    </form>

    {#if error}
        <p style="color: red;" class="input-box-leftonly">{error}</p>
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