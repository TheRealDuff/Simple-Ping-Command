const talkedRecently = new Set();
module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['beep'],
	execute(message, args, client, fs) {
		const help = args.join(" ");
		if (help == 'help') {
			message.channel.send({
				embed: {
					color: 1752220,
					title: 'Command !ping',
					description: '**Description:** Ping the bot\n**Cooldown:** None\n**Usage:** !ping',
					timestamp: new Date(),
					footer: {
						text: "© Duffman1"
					}

				}
			})
		} else if (talkedRecently.has(message.author.id)) {
			message.reply("Please wait 5 seconds before using this command again!")
		} else {
			async function pinging() {
				let botMsg = await message.channel.send("〽️ Pinging")

				botMsg.edit({
					embed: {
						title: "📶 Ping",
						description: [
							"**Server**: `" + (botMsg.createdAt - message.createdAt) + " ms`",
							"**API**: `" + Math.round(client.ws.ping) + " ms`",
							"**Uptime**: `" + msToTime(client.uptime) + "`"
						].join("\n"),
						color: 000000,
						footer: {
							text: "Made by © Duffman1 | Requested by " + message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				}).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
			}

			function msToTime(ms) {
				days = Math.floor(ms / 86400000); // 24*60*60*1000
				daysms = ms % 86400000; // 24*60*60*1000
				hours = Math.floor(daysms / 3600000); // 60*60*1000
				hoursms = ms % 3600000; // 60*60*1000
				minutes = Math.floor(hoursms / 60000); // 60*1000
				minutesms = ms % 60000; // 60*1000
				sec = Math.floor(minutesms / 1000);

				let str = "";
				if (days) str = str + days + "d";
				if (hours) str = str + hours + "h";
				if (minutes) str = str + minutes + "m";
				if (sec) str = str + sec + "s";

				return str;
			}
			pinging();

			talkedRecently.add(message.author.id);

			setTimeout(() => {
				// Removes the user from the set after a minute
				talkedRecently.delete(message.author.id);
			}, 5000);
		}
	}
}
