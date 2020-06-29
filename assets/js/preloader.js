const preloader = document.querySelector('#preloader')
let i = 0;
let loadedBool = false;
const perfData = performance.getEntries(0);
const loaded = document.querySelector('.preloader-loaded')

function updatePercentage(p) {

    if (p > 90) {
        loaded.style.width = `100%`
        loaded.firstElementChild.innerText = `Not Exactly The Best Connection...`
    } else {
        loaded.firstElementChild.innerText = `${p}%`
        loaded.style.width = `${p + 10}%`
    }
}

setInterval(() => {
    loadedBool ? null : updatePercentage(i);
    i++
}, 80)

window.addEventListener('load', () => {
    loadedBool = true;
 const preloader = document.querySelector('#preloader')
    loaded.firstElementChild.innerText = `Hi, I'm Al`
    loaded.style.width = `100%`
   
    setTimeout(() => {
        preloader.classList.add('loaded')
        window.scrollTo(0,0)    
    }, 1500)

})