let fields = [
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null
];

function init(){
    render();
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
                symbol = generateCrossSVG();;
            }

            html += `<td>${symbol}</td>`;
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


