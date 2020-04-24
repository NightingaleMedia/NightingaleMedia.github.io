
    const handleDrop = (ev, elem) => {
        ev.preventDefault();
        event.target.classList.remove('opaque')
        const data = ev.dataTransfer.getData('text/plain');
        elem.appendChild(document.getElementById(data))

    }

const handleDragOver = (ev, elem) => {
    // document.style.cursor = "grabbing";
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

const handleDrag = (ev, elem) => {


    const elemWidth = elem.offsetWidth;
    ed = ev.dataTransfer;

    elem.classList.add('dragging');
    ed.setData("text/plain", elem.id);
    ed.setDragImage(elem, `${elemWidth - 20}`, 20);
    ed.effectAllowed = "move";
    ed.dropEffect = "move";
    console.log(ed)
}

const boards = document.querySelectorAll('.skill-scrum--board');
boards.forEach(board => {

    board.ondrop = (event) => {
        handleDrop(event, board)
        board.classList.remove('opaque')
        event.dataTransfer.clearData();
    };

    board.ondragover = (event) => {
        board.classList.add('opaque')
        handleDragOver(event)
    };
    board.ondragleave = (event) => {
        board.classList.remove('opaque')
    }
})

const draggers = document.querySelectorAll('.single-skill--drag');
draggers.forEach(sticky => {
    let fullSticky = sticky.parentElement
    fullSticky.id = `draggy-${sticky.previousElementSibling.innerText}`
    sticky.parentElement.ondrop = (e) => {
        return false
    }
    sticky.setAttribute('draggable', true)
    sticky.addEventListener('dragstart', (e) => {
        fullSticky.setAttribute('draggable', true)
        handleDrag(e, fullSticky)
    })
    sticky.addEventListener('dragend', (e) => {
        sticky.parentElement.classList.remove('dragging')
    })
})

const skillSquare = document.querySelectorAll('.skill-square')
const allSkills = document.querySelectorAll('.single-skill')

skillSquare.forEach(square => {
        let correspondingSkills = [];
        allSkills.forEach(skill => {
            if (square.classList[1] == skill.classList[1])
                correspondingSkills.push(skill)
        })

        square.addEventListener('click', () => {
            correspondingSkills.forEach(skill => {
                skill.classList.toggle('single-skill--off')
                // square.addEventListener('transitionend',()=>{
                //     skill.classList.toggle('d-none')
                // })
            })
            square.classList.toggle('skill-square--off');
        })
    }) 