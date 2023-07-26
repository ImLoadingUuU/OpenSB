const express = require("express");
const DiscordOauth2 = require("discord-oauth2");
const oauth2 = new DiscordOauth2()
// router
const router = express.Router();
module.exports = function (client) {

    router.get("/userServers", async (req, res) => {
        if (!req.cookies.token) return res.status(401).json({
            error: "Unauthorized"
        })
        //
        try {
            let result = await (await oauth2.getUserGuilds(req.cookies.token)).filter((guild) => {
            if(client.guilds.cache.get(guild.id)) return true
            })

            res.json(result)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        }



    })
    return router;
}