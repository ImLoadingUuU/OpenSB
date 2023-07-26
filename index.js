const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Shoukaku, Connectors } = require('shoukaku');
const express = require("express");
const cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser())
const Nodes = [{
    name: 'DBH Free Node',
    url: '69.197.129.206:1223',
    auth: 'DBH'
}];
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const {Kazagumo}= require("kazagumo");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const fs = require('fs');
const config = require('./config.json');
const exp = require('constants');
const Deezer = require('stone-deezer');
require('dotenv').config() // remove this line if you are using replit
const kazagumo = new Kazagumo( {
    plugins: [
      new Deezer({
        playlistLimit: 20
      }),
    ],
  },new Connectors.DiscordJS(client), Nodes);
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.players=  {}
client.prefix = config.prefix;
client.kazagumo = kazagumo
client.isannoying = false;
kazagumo.on('error', (_, error) => console.error(error));

module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});
app.use(express.static("./dashboard"))
app.get("/auth",async (req,res) => {
	if(req.query.code) {
     // send servers.html
	 let result = await oauth.tokenRequest({
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		code:  req.query.code,
		scope: "identify email guilds",
		grantType: "authorization_code",
		redirectUri: "http://localhost:3000/auth",
	})
	res.cookie("token",result.access_token)
	res.cookie("refresh_token",result.refresh_token)
	res.sendFile(__dirname + "/dashboard/servers.html")
	res.redirect("servers.html")
	}
})

app.get("/invite",(req,res) => {
	// redirect
	res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=email%20guilds`)
})
client.login(process.env.TOKEN)
app.use(require("./dashboard_backend/readServers")(client))
app.listen(3000)