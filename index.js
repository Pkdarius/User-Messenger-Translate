const login = require("facebook-chat-api");
const {
    Translate
} = require('@google-cloud/translate');

const projectId = 'translate-1540900296733';

const translate = new Translate({
    projectId: projectId,
    key: "AIzaSyCsOQyIYYaD-hUorrgg18qKOvyRiBOX0XU"
});

login({
    email: process.env.USERNAME,
    password: process.env.PASSWORD
}, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, message) => {
        let text = message.body;
        let target = 'vi';

        translate
            .translate(text, target)
            .then(results => {
                let translation = results[0];
                api.sendMessage(translation, message.threadID);
            })
            .catch(err => {
                api.sendMessage('Co loi xay ra, thu lai sau...', message.threadID);
            })
    });
});