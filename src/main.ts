const charToSegment = new Map();

charToSegment.set("n", [2, 4, 6]);
charToSegment.set("o", [2, 3, 4, 6]);
charToSegment.set(" ", []);
charToSegment.set("d", [1, 2, 3, 4, 6]);
charToSegment.set("i", [2]);
charToSegment.set("S", [0, 5, 6, 2, 3]);
charToSegment.set("C", [0, 5, 4, 3]);
charToSegment.set("H", [1, 2, 4, 5, 6]);
charToSegment.set("E", [0, 3, 4, 5, 6]);
charToSegment.set("L", [3, 4, 5]);
charToSegment.set("A", [0, 1, 2, 4, 5, 6]);
charToSegment.set("F", [0, 4, 5, 6]);
charToSegment.set("t", [3, 4, 5, 6]);
charToSegment.set("U", [1, 2, 3, 4, 5]);
charToSegment.set("P", [0, 1, 4, 5, 6]);
charToSegment.set("0", [0, 1, 2, 3, 4, 5]);
charToSegment.set("1", [1, 2]);
charToSegment.set("2", [0, 1, 3, 4, 6]);
charToSegment.set("3", [0, 1, 2, 3, 6]);
charToSegment.set("4", [1, 2, 5, 6]);
charToSegment.set("5", [0, 5, 6, 2, 3]);
charToSegment.set("6", [0, 5, 6, 2, 3, 4]);
charToSegment.set("7", [0, 1, 2]);
charToSegment.set("8", [0, 1, 2, 3, 4, 5, 6]);
charToSegment.set("9", [0, 1, 2, 3, 5, 6]);

displayMessage("no diSC");

const cdTray = document.querySelector("#cd-tray") as HTMLInputElement;
var audio: HTMLAudioElement;

cdTray?.addEventListener("change", function(e) {
    if (e.target) {
        let f = e.target as HTMLInputElement;
        if (f.files?.length === 1) {
            audio = new Audio(URL.createObjectURL(f.files[0] as File));
            displayMessage("LoAdEd");
        }
    }
});

{
    const playButton = document.querySelector("#play-button");

    playButton?.addEventListener("click", function() {
        isPlaying = true
        audio.play();
    });
}

{
    const pauseButton = document.querySelector("#pause-button");

    pauseButton?.addEventListener("click", () => {
        isPlaying = false
        audio.pause();
    });
}

var isPlaying = false;
var timeUnderPlay = 0;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
await sleep(2000);
while (true) {
    if (isPlaying) {
        displayMessage(timeUnderPlay.toString().padStart(8, " "));
        timeUnderPlay += 2;
    } else {
        displayMessage("PAUSEd");
    }

    await sleep(2000);
}

function displayMessage(msg: string): void {
    const digits = document.querySelectorAll(".digit");

    if (msg.length > digits.length) {
        throw new Error("Message doesn't fit on display");
    }

    for (const digit of digits) {
        for (const segment of digit.children) {
            segment.classList.remove("lit");
        }
    }

    for (let i = 0; i < msg.length; ++i) {
        for (const segmentIndex of charToSegment.get(msg.at(i))) {
            digits[i]?.children[segmentIndex]?.classList.add("lit");
        }
    }
}
