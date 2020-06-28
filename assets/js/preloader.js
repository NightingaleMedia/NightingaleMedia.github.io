const preloader = document.querySelector('#preloader')
let i = 0;
const perfData = performance.getEntries(0);

function updatePercentage(p){
    const loaded = document.querySelector('.preloader-loaded')
    if(p > 100){ 
         loaded.style.width = `100%`
        loaded.firstElementChild.innerText = `Not Exactly The Best Connection...`
    } else {
          loaded.firstElementChild.innerText = `${p}%`
          loaded.style.width = `${p}%`
    }
  

}

setInterval(()=>{
 
    // let estTime = (perfData.loadEventEnd - perfData.navigationStart);
    // let time = parseInt((estTime / 100) % 60) * 100;
    console.log(perfData)
 
    updatePercentage(i)
    i++
}, 100)


    // preloader.innerHTML = `<h1 class="black">${time}</h1>`


window.addEventListener('load', ()=>{
    const preloader = document.querySelector('#preloader')

    preloader.classList.add('loaded')

})
