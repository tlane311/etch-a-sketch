const container = document.querySelector('#grid-container');

function createRow(size){
    const row = document.createElement('div');
    row.classList.add('grid-row');

    for (let i=0; i< size; i++){
        let gridElmt = document.createElement('div');
        gridElmt.classList.add('grid-element');
        row.appendChild(gridElmt);
    }

    return row;
}

const size = 16;
for (let i=0; i< size ; i++){
    container.appendChild(createRow(16))
}

const gridElmts = [...document.querySelectorAll(".grid-element")];

gridElmts.forEach( gridElmt => {
    gridElmt.addEventListener('mouseover', handleHover)
})

function handleHover(e){
    e.target.classList.toggle('hovered');
}