var i = 0;
var imgArray = new Array();

var numInstas = document.querySelectorAll(".instagram-picture");
// var instaGallery = $("instagram-picture");
console.log(numInstas);


for(i=0;i<=numInstas.length; i++){
  imgArray[i] = new Image();
  imgArray[i].src = 'assets/img/insta' + i  +  '.png';
  var color = getRandomColor();
  numInstas[i].style.backgroundImage = "url('assets/img/insta" + i + ".png')";
  // numInstas[i].appendChild(imgArray[i]);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
