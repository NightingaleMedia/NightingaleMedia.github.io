const fillHeart = (heart) => {
  heart.addEventListener('click', () => {
  heart.classList.toggle('fas');
  heart.classList.toggle('red');
});
}

const fillBookMark = (bookmark) => {
    bookmark.addEventListener('click', () => {
    bookmark.classList.toggle('fas');
    bookmark.classList.toggle('yellow');
    });
  }

  const heartIndex = document.querySelectorAll('.heart');
  heartIndex.forEach(fillHeart);

  const bookmarkIndex = document.querySelectorAll('.bookmark');
  bookmarkIndex.forEach(fillBookMark);
