# nations
A text-based web-based multiplayer game. Inspired by [NationStates](https://nationstates.net) and the defunct [NationsGame](https://nationsgame.fandom.com/wiki/NationsGame).

## Background
From mid-2019 to around late-2020, I played the game NationsGame a *lot*. Unfortunately, I fell out of the good graces of the community, and I was forced to quit.
A little over a year later, the game went offline for maintenance, and it has not come back online. The creator has stated that they will likely not revive the game, and considering its been radio silence from them since 2021, I think it is a safe bet to assume that the game is not coming back.

I've thought about remaking Nations for a while now, but I didn't know enough about web technologies and it was somewhat daunting to me. I decided that I'd finally go ahead and give it a shot, even if it ends in failure eventually.

As of right now, you can't play this. You can barely even sign in. I hope to eventually release this to the public, and I hope that the NationsGame community can be revived in some way.

## Technologies
The project uses [Pocketbase](https://pocketbase.io/) to handle authentication and the database.

On the frontend, the project uses [SvelteKit](https://kit.svelte.dev/). There is currently no CSS in place, as the project is in a *very* early stage.

## Plans
Below is the database schema that ChatGPT told me to make (lmao). I've been following it for the basic outline, but I'll probably rework it a bit later on.

```
### Table: Players
| Column             | Example                |
| ------------------ | ---------------------- |
| player_id          | 1                      |
| username           | player123              |
| password           | *hashed password*      |
| email              | player123@example.com  |
| registration_date  | 2023-05-15             |

### Table: Nations
| Column             | Example               |
| ------------------ | --------------------- |
| nation_id          | 1                     |
| player_id          | 1                     |
| nation_name        | Republic of Example    |
| population         | 100,000               |
| capital_city       | Capital City          |
| government_type    | Democracy             |
| currency           | Example Dollar        |

### Table: Resources
| Column             | Example                |
| ------------------ | ---------------------- |
| resource_id        | 1                      |
| nation_id          | 1                      |
| resource_name      | Oil                    |
| amount             | 1,000                  |

### Table: Military Units
| Column             | Example                |
| ------------------ | ---------------------- |
| unit_id            | 1                      |
| nation_id          | 1                      |
| unit_name          | Infantry Division      |
| quantity           | 500                    |
| attack_power       | 50                     |
| defense_power      | 40                     |

### Table: Diplomacy
| Column                 | Example                |
| ---------------------- | ---------------------- |
| diplomacy_id           | 1                      |
| nation1_id              | 1                      |
| nation2_id              | 2                      |
| relationship_status    | Allied                 |
| last_interaction_date  | 2023-05-30             |
```

Again, these are very early concepts, and they will most certainly need to be reworked.