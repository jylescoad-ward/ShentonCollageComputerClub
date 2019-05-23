const CLIENT_ID = 'JPnR9XRRKyd7G0cj';
const version = "v1.0";

document.getElementById("version").innerText = version;

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

var randomNameChecker = getRandomName();
if (randomNameChecker.length > 1){
    randomNameChecker = getRandomName();
}

const drone = new ScaleDrone(CLIENT_ID, {
    data: { // Will be sent out as clientData via events
        name: randomNameChecker,
        color: getRandomColor(),
    },
});

let members = [];

drone.on('open', error => {
    if (error) {
        return console.error(error);
        document.getElementById("status").innterHTML = "An error has occured, please check console log";
        document.getElementById("status").style.color = "#DC0000";
    }
    console.log('Successfully connected to Scaledrone');
    document.getElementById("status").innerHTML = "Connected to Server!";
    document.getElementById("status").style.color = "#89FF89";
    document.getElementById("loadinggif").style.opacity = "0";
    document.getElementById("loadinggif").style.transition = "opacity 0.5s linear";

    const room = drone.subscribe('observable-room');
    room.on('open', error => {
        if (error) {
            return console.error(error);
            document.getElementById("status").innterHTML = "An error has occured, please check console log";
            document.getElementById("status").style.color = "#DC0000";
        }
        console.log('Successfully joined room');
        document.getElementById("messages").innerHTML = "Welcome to the Shenton College Chat Room!<br>Enjoy your stay!<br><br>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ <br><br>";
            document.getElementById("status").innerHTML = "Connected";
            document.getElementById("status").style.color = "#00B300";
    });

    room.on('members', m => {
        members = m;
        updateMembersDOM();
    });

    room.on('member_join', member => {
        members.push(member);
        updateMembersDOM();
    });

    room.on('member_leave', ({id}) => {
        const index = members.findIndex(member => member.id === id);
        members.splice(index, 1);
        updateMembersDOM();
    });

    room.on('data', (text, member) => {
        if (member) {
            addMessageToListDOM(text, member);
        } else {
            // Message is from server
        }
    });
});

drone.on('close', event => {
    console.log('Connection was closed', event);
    document.getElementById("status").innterHTML = "Disconnected from Server.";
});

drone.on('error', error => {
    console.error(error);
});

function getRandomName() {
    const adjs = ["pepsi", "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["man", "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    return (
        adjs[Math.floor(Math.random() * adjs.length)] +
        "_" +
        nouns[Math.floor(Math.random() * nouns.length)]
    );
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
    const value = DOM.input.value;
    if (value === '') {
        return;
    }
    DOM.input.value = '';
    drone.publish({
        room: 'observable-room',
        message: value,
    });
}

function createMemberElement(member) {
    const { name, color } = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
}

function updateMembersDOM() {
    DOM.membersCount.innerText = `${members.length} user connected`;
    DOM.membersCount.style.fontWeight = "bold";
    DOM.membersList.innerHTML = '<strong>Users:</strong><br>';
    members.forEach(member =>
        DOM.membersList.appendChild(createMemberElement(member))
    );
}

function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
}

function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}
