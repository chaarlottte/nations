<script lang="ts">
    import { pb, currentUser } from "$lib/pocketbase";
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    export let data: any;

    let continents = data?.continents;

    let nation: any = "";
    let stage: number = 0;
    let error = "";

    let files: FileList;

    let nationData = {
        name: "",
        capital_city: "",
        government_type: "socialism", // set Socialism as the default economical system.
        denonym: "",
        continent: "0jpnbvdt14odhvg", // set Westburg as the default continent.
        "leader": $currentUser?.id,
    };

    if($currentUser?.nation !== "") {
        nation = $currentUser?.expand.nation;
    }

    async function createNation() {
        // const record = await pb.collection("nations").create(nationData);
        const response = await fetch("/api/createNation", {
            method: "POST",
            body: JSON.stringify(nationData)
        });
        const respJson = await response.json();

        if(response.ok) {
            // goto(`/nations/${respJson.id}`);
            await goto("/dashboard");
        } else {
            if(respJson.data.name) {
                if(respJson.data.name.code === "validation_not_unique")
                    error = error + "Nation name is already taken.<br>";
                else if(respJson.data.name.code === "validation_required")
                    error = error + "You need to add a name for your nation!<br>";
            }
            
            if(respJson.data.denonym) {
                if(respJson.data.denonym.code === "validation_required")
                    error = error + "You need to add a denonym!<br>";
            }
        }
    }

    onMount(async () => {
        if($currentUser === null) 
            goto("/users/login");
    });
</script>

{$currentUser?.nation}
{#if $currentUser?.nation === ""}
    <p>Allowed to create nation</p>
    {#if stage == 0}
        <!--Nation naming stage-->
        <div class="input-box">
            <p>Nation Name</p>
            <input
                placeholder="Nation Name"
                type="text"
                bind:value={nationData.name}
            />
        </div>

        <div class="input-box">
            <p>Capitol City</p>
            <input
                placeholder="Capitol City"
                type="text"
                bind:value={nationData.capital_city}
            />
        </div>

        <div class="input-box">
            <p>Denonym</p>
            <input
                placeholder="Denonym"
                type="text"
                bind:value={nationData.denonym}
            />
        </div>
    {:else if stage == 1}
        <div class="input-box">
            <p>Government Structure</p>
            <select
                bind:value={nationData.government_type}
            >
                <option value="socialism" selected>Socialism</option>
                <option value="capitalism">Capitalism</option>
                <option value="authoritarianism">Authoritarianism</option>
            </select>
        </div>

        <div class="input-box">
            <p>Location</p>
            <select
                bind:value={nationData.continent}
            >
                {#each continents as cont}
                    <option value={cont.id}>
                        {cont.name}
                    </option>
                {/each}
            </select>
        </div>
    {:else if stage == 2}
        <div class="input-box">
            <p>Nation's Flag</p>
            <input
                accept="image/png, image/jpeg"
                bind:files
                id="nation_flag"
                name="nation_flag"
                type="file"
            />
        </div>
    {:else if stage == 3}
        <div class="input-box">
            Ready to create the brand new nation of {nationData.name}, {$currentUser.nickname}?
            <button
                on:click={createNation}
            >
                Let's do it!
            </button>
        </div>
    {/if}

    <button 
        class="input-box-leftonly" 
        on:click={() => {
            if(stage > 0) stage--;
            error = "";
        }}
        disabled={stage <= 0}
    >
        Back
    </button>

    <button 
        class="input-box-leftonly" 
        on:click={() => {
            if(stage < 3) stage++;
            error = "";
        }}
        disabled={stage >= 3}
    >
        Next
    </button>

    {#if error}
        <p style="color: red;" class="input-box-leftonly">{@html error}</p>
    {/if}
{:else}
    <p>You already have a nation!</p>
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