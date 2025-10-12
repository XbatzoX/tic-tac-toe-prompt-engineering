let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle';

const WINNING_COMBINATIONS = [
    [0,1,2], [3,4,5], [6,7,8], // Reihen
    [0,3,6], [1,4,7], [2,5,8], // Spalten
    [0,4,8], [2,4,6]           // Diagonalen
];


function init(){
    render();
}

function handleClick(index, cell) {
    // Spielerzug speichern
    fields[index] = currentPlayer;

    // SVG in die angeklickte Zelle einfügen
    if (currentPlayer === 'circle') {
        cell.innerHTML = generateCircleSVG();
        currentPlayer = 'cross'; // Spieler wechseln
    } else {
        cell.innerHTML = generateCrossSVG();
        currentPlayer = 'circle';
    }

    // Klick deaktivieren
    cell.onclick = null;

    const winnerCombo = checkWin();
    if (winnerCombo) {
        drawWinLine(winnerCombo);
    }

}

function checkWin() {
    for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (fields[a] && (fields[a] === fields[b]) && (fields[a] === fields[c])) {
            return combo; // Gewinner-Kombination zurückgeben
        }
    }
    return null;
}

function drawWinLine([a, b, c]) {
    const container = document.getElementById('content');

    // SVG Overlay erzeugen
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none'; // Klicks nicht blockieren

    const svg = `
        <svg width="100%" height="100%">
            <line 
                x1="${getCellCenterX(a)}" y1="${getCellCenterY(a)}"
                x2="${getCellCenterX(c)}" y2="${getCellCenterY(c)}"
                stroke="white" stroke-width="5px" stroke-linecap="round"
            />
        </svg>
    `;

    overlay.innerHTML = svg;
    container.style.position = 'relative';
    container.appendChild(overlay);
}

function getCellCenterX(index) {
    const col = index % 3;        // 0,1,2
    return col * 100 + 50;        // 50, 150, 250
}

function getCellCenterY(index) {
    const row = Math.floor(index / 3);  // 0,1,2
    return row * 100 + 50;              // 50, 150, 250
}




function render() {
    const container = document.getElementById('content');
    let html = '<table class="tictactoe">';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            // onclick hinzufügen nur wenn Feld frei
            const clickAttr = fields[index] === null ? `onclick="handleClick(${index}, this)"` : '';
            html += `<td ${clickAttr}>${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    container.innerHTML = html;
}

function generateCircleSVG() {
    return `
        <svg width="70px" height="70px" viewBox="0 0 70 70">
            <circle 
                cx="35" cy="35" r="30"
                fill="none"
                stroke="#00B0EF"
                stroke-width="8"
                stroke-dasharray="190"
                stroke-dashoffset="190"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="190" 
                    to="0" 
                    dur="1.5s" 
                    fill="freeze"
                />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <!-- Erste Linie des Kreuzes -->
            <line 
                x1="15" y1="15" x2="55" y2="55" 
                stroke="#FFC000" 
                stroke-width="8" 
                stroke-linecap="round"
                stroke-dasharray="56" 
                stroke-dashoffset="56"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56" 
                    to="0" 
                    dur="0.8s" 
                    fill="freeze"
                />
            </line>

            <!-- Zweite Linie des Kreuzes -->
            <line 
                x1="55" y1="15" x2="15" y2="55" 
                stroke="#FFC000" 
                stroke-width="0" 
                stroke-linecap="round"
                stroke-dasharray="56" 
                stroke-dashoffset="56"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56" 
                    to="0" 
                    dur="0.8s" 
                    begin="0.4s"
                    fill="freeze"
                />
                <animate 
                    attributeName="stroke-width"
                    from="0"
                    to="8"
                    dur="0.1s"
                    begin="0.4s"
                    fill="freeze"
                />
            </line>
        </svg>
    `;
}

function restartGame(){
    fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
    ];

    render();
}
