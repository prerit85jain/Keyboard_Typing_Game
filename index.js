document.addEventListener("DOMContentLoaded", () => {
    const keys = Array.from(document.querySelectorAll("button"));
    const content = document.getElementById("content").innerText.toLowerCase();
    const submitButton = document.getElementById("submit");
    let typedIndex = 0;
    let correctCount = 0;
    
    let contentHTML = '';
    for(let i = 0; i < content.length; i++) {
        contentHTML += `<span id="char-${i}">${content[i]}</span>`;
    }
    document.getElementById("content").innerHTML = contentHTML;

    keys.forEach(key => {
        key.addEventListener("click", () => {
            handleTyping(key.innerText);
        });
    });

    document.addEventListener("keypress", (event) => {
        handleTyping(event.key.toLowerCase());
    });

    function handleTyping(char) {
        if (typedIndex < content.length) {
            if (char === content[typedIndex]) {
                correctCount++;
                highlightKey(char, "lightgreen");
                document.getElementById(`char-${typedIndex}`).classList.add("correct");
            } else {
                highlightKey(char, "red");
                document.getElementById(`char-${typedIndex}`).classList.add("incorrect");
            }
            typedIndex++;
            moveCursor();
        }
        
        if (typedIndex === content.length) {
            alert("You have typed the entire paragraph!");
        }
    }

    function highlightKey(char, color) {
        keys.forEach(key => {
            if (key.innerText === char) {
                key.style.backgroundColor = color;
            }
        });

        setTimeout(() => {
            keys.forEach(key => {
                key.style.backgroundColor = "aliceblue";
            });
        }, 500);
    }

    function moveCursor() {
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        document.querySelector(".cursor")?.classList.remove("cursor");
        if (typedIndex < content.length) {
            document.getElementById(`char-${typedIndex}`).insertAdjacentElement('afterend', cursor);
        } else {
            document.getElementById(`char-${typedIndex - 1}`).appendChild(cursor);
        }
    }

    submitButton.addEventListener("click", () => {
        const accuracy = (correctCount / content.length) * 100;
        alert(`Your accuracy score is ${accuracy.toFixed(2)}%.`);
    });

    moveCursor(); // Initialize cursor position
});