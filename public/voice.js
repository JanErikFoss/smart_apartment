if(!annyang) console.log("No annyang")
else console.log("Annyang working")

annyang.setLanguage("no-NO")

const success = () => {
 console.log("success")
 const sound = new Audio('ding.mp3')
 sound.play();
}

const wrap = promise => promise.then(success).catch(console.log)

const command = cmd => fetch("http://localhost:3000/" + cmd)

const say = phrase => {
console.log("Saying \"" + phrase + "\"")
 const msg = new SpeechSynthesisUtterance(phrase)
 window.speechSynthesis.speak(msg)
}

const commands = {
	"toggle lights": () => wrap(command("toggle")),
	"lights on": () => wrap(command("on")),
	"lights off": () => wrap(command("off")),
	"disco yo": () => console.log("Hell yeah, we havin a disco") || wrap(command("disco")),
	
	"på og av": () => wrap(command("toggle").then(command("toggle"))),
	"av og på": () => wrap(command("toggle").then(command("toggle"))),
	"let there be light": () => wrap(command("on")),
	"lys": () => wrap(command("toggle")),
        "endre lys": () => wrap(command("toggle")),
	"lys på": () => wrap(command("on")),
	"lys av": () => wrap(command("off")),
	"start disco": () => console.log("Hell yeah, we havin a disco") || wrap(command("disco")),
}

// Add our commands to annyang
annyang.addCommands(commands);

// Start listening.
annyang.start();
