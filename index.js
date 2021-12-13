let state = {
    maxSize: 960,
    size: function(){
        return Math.floor(this.maxSize / this.count)
    },
    count: 16,
    initialPaint: false,
}

if (!state.initialPaint){
    createAndBindBoard();
    applyButtonLogic(); // this only needs to be done one time
    state.initialPaint = true;
}

function createAndBindBoard(){
    updateDom();
    attachEventListenersToBoard();
}


function updateState({count}){
    state.count = count;

    function updateCSSVariables(){
        let root = document.documentElement;
        root.style.setProperty(`--square-size`, `${state.size()}px`)
    }
    updateCSSVariables();

    return state;
}



function updateDom(){

    cleanUpOldDom();
    renderBoard(state.count);

    //cleanUpOldDom and renderBoard are defined below


    function cleanUpOldDom(){
        const gridRows = [...document.querySelectorAll('.grid-row')];
        gridRows.forEach( gridRow => {
            gridRow.remove();
        })
    }


    function renderBoard(count){
        const container = document.querySelector('#grid-container');

        for (let i=0; i< count ; i++){
            container.appendChild(createRow(count))
            //createRow is defined below
        }

        /* 
          creates a div with count-many child divs 
          e.g. createRow(2) creates:
            <div class='grid-row'> 
                <div class="grid-element> </div>
                <div class="grid-element> </div>
            </div>

         */
        function createRow(count){
            const row = document.createElement('div');
            row.classList.add('grid-row');
        
            for (let i=0; i< count; i++){
                let gridElmt = document.createElement('div');
                gridElmt.classList.add('grid-element');
                row.appendChild(gridElmt);
            }
        
            return row;
        }


    }
    
}



function attachEventListenersToBoard(){

    const gridElmts = [...document.querySelectorAll(".grid-element")];

    gridElmts.forEach( gridElmt => {
        gridElmt.addEventListener('mouseover', handleMouseOver)
    })

    function handleMouseOver(e){
        e.target.classList.toggle('hovered',true);
    }

}

function applyButtonLogic(){
    // resetting 
    const resetBtn = document.querySelector('#reset-btn');

    resetBtn.addEventListener('click', handleReset);

    function handleReset(e){
        const gridElmts = [...document.querySelectorAll(".grid-element")];
        gridElmts.forEach( gridElmt => {
            gridElmt.classList.toggle('hovered', false);
        })
    }


    //updating grid

    
    const gridInputBtn = document.querySelector('form>button');

    gridInputBtn.addEventListener('click', handleGridInputClick)

    function handleGridInputClick(e){
        e.preventDefault() // stops page refreshing which also stops state from being reset
        const gridInput = document.querySelector('form>input');
        const value = Math.floor(gridInput.value); //  we use Math.floor() to ensure we are using integer values
        if (value <= 100 && value >= 1){
            updateState({count: value});
            createAndBindBoard();
        }
    }

}









