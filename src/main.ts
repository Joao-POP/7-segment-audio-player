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

displayMessage("no diSC");

const cdTray = document.querySelector("#cd-tray");

cdTray?.addEventListener("change", () => {
    displayMessage("LoAdEd");
});

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
