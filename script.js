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
                symbol = 'o';
            } else if (fields[index] === 'cross') {
                symbol = 'x';
            }

            html += `<td>${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    container.innerHTML = html;
}
