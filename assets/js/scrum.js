const boards = document.querySelectorAll('.skill-scrum--board');
const skillSquare = document.querySelectorAll('.skill-square')



function buildSkills(skills){
    function findBoardFromSkill(skill){
        const board = document.querySelector(`[data-mastery=${skill.mastery}]`)
        return board;
    }
    skills.forEach(skill =>{
            let skillNode = document.createElement('div');
            skillNode.className = `single-skill ${skill.cat.toLowerCase()}`
            skillNode.innerHTML = ` 
              <div class="single-skill--content">${skill.skill}</div>
              <div class="single-skill--drag">
                <span></span>
                <span></span>
                <span></span>
              </div>`

    let boardToFill = findBoardFromSkill(skill);
    boardToFill.appendChild(skillNode)

 
    })
    matchSkills();
    initDraggers();

}

    function matchSkills() {
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
                })
                square.classList.toggle('skill-square--off');
            })
        })
    }


const parseSkills = async () => {
    let url = 'assets/db/200814_GH_Skills.csv';
    return await d3.dsv(',', url, function (d) {
        return {
            'skill': d.Skill,
            'mastery': d.Mastery,
            'cat': d.Category,
        };
    }).then(result => result)

}

const handleDrop = (ev, elem) => {
    ev.preventDefault();
    event.target.classList.remove('opaque')
    const data = ev.dataTransfer.getData('text/plain');
    elem.appendChild(document.getElementById(data))
}

const handleDragOver = (ev, elem) => {
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

}



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


function initDraggers(){ 
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
} 

parseSkills()
.then(ans => buildSkills(ans))



   


