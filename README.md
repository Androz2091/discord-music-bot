# Weeks Bot

The music bot for Chads

## Installation

### Docker 
* Copy the `.env.example` file as `.env` and fill it.
```sh
docker build . -t weeks-bot
docker run -d --env-file .env weeks-bot 
```

|     Name      |            Description             |  Options  |
|:--------------|:----------------------------------:|----------:|
|  **/clear**   |      Clear the current queue.      |           |
|   **/jump**   |      Jump to a specific track      | \<tracks> |
|    **/np**    | See what's currently being played  |           |
|  **/pause**   |       Pause the current song       |           |
|   **/play**   |      Play a song from youtube      | \<query>  |
| **/playnext** | Add a song to the top of the queue | \<query>  |
|  **/queue**   |           See the queue            |  \<page>  |
|  **/remove**  |      Remove a specific track       | \<track>  |
|  **/resume**  |      Resume the current song       |           |
|   **/seek**   |       Seek to the given time       |  \<time>  |
| **/shuffle**  |         Shuffle the queue          |           |
|   **/skip**   |      Skip to the current song      |           |
|   **/stop**   |          Stop the player           |           |
|  **/volume**  |          Set music volume          | \<amount> |# Weeks Bot

The music bot for Chads

## Installation

### Docker 
* Copy the `.env.example` file as `.env` and fill it.
```sh
docker build . -t weeks-bot
docker run -d --env-file .env weeks-bot 
```

