<script lang="ts">
    import { POCKETBASE_URL, pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    export let data;
    
    let user = data.user;
    
    if(user?.nation !== "") {
        user.nation = user?.expand.nation;
    }
    
    onMount(async () => {
        if($currentUser === null) {
            goto("/users/login");
        }
    });
</script>

{#if $currentUser}
    <p>{JSON.stringify(data)}</p>
    {#if user?.avatar === ""}
        <img
            class="avatar"
            src={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
            alt="avatar"
            width="40px"
        />
    {:else}
        <img
            class="avatar"
            src={`${POCKETBASE_URL}/api/files/${user?.collectionId}/${user?.id}/${user?.avatar}`}
            alt="avatar"
            width="40px"
        />
    {/if}
    <h2>@{user?.username}</h2>

    {#if user?.nation !== ""}
        Leader of <a href={`/nations/${user?.nation.id}`}>{user?.nation.name}</a>
    {/if}
{/if}