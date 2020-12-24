class ProjectBuilder {
  constructor(project) {
    this.article = document.createElement("article");

    this.article.className = "single__project proj-shifted";
    this.color = this.getColor(project.category);
    this.spans = this.buildSpans(project.tags);

    this.article.innerHTML = `<div class="single__project--tag" style="background-color:${this.color};"></div>
      <div class="single__project--bg">
        <div class="single__project--picture-wrap" >
          <span></span>
          <span></span>
          <div class="single__project--picture" id="${project.picLink}">
          <div class="loading-picture">
            <span></span>
            <span>Loading. . . </span>
          </div>
          </div>

        </div>
      </div>
      <div class="single__project--text">
        <h3>${project.title}</h3>
        <p>${project.date}</p>
        <p class="single__project--desc">${project.desc}
        </p>
          <span class="single__project--button">
          <a href="${project.liveLink}"> See it Live </a>
          </span>
         
        <div class="single__project--list">
          ${this.spans}
        </div>
      </div>`;
  }

  buildSpans(tags) {
    let tagList = tags.split("|");
    let spans = [];
    tagList.forEach((tag) => {
      spans.push(`<span>${tag}</span>`);
    });
    return spans.join("");
  }

  getColor(category) {
    let colors = {
      frontend: "#a80fdf",
      backend: "#ff204b",
      creative: "#0084f5",
      music: "#f78e1e",
      other: "#dbd4e5",
    };
    return colors[category];
  }

  //   updateImage(p) {
  //     let image = this.article.querySelector(".single__project--picture");
  //     image.style.backgroundImage = `url('assets/img/projects/${p}')`;
  //   }
  render() {
    return this.article;
  }
}
const parse = async () => {
  let url = "assets/db/Projects.csv";
  return await d3
    .dsv(",", url, function (d) {
      return {
        title: d.Title,
        date: d.Date,
        desc: d.Description,
        picLink: d.PicLink,
        liveLink: d.LiveLink,
        category: d.Category,
        tags: d.Tags,
      };
    })
    .then((result) => result);
};

async function build(items) {
  const section = document.querySelector(".section__projects");
  items.forEach((item) => {
    let itemBuild = new ProjectBuilder(item);
    // itemBuild.getAsyncBg(item.picLink);
    section.append(itemBuild.render());
  });
}

function handleArticles() {
  const articleProject = document.querySelectorAll(
    ".section__projects > article"
  );

  articleProject.forEach((article) => {
    if (window.innerWidth < 900) {
      article.classList.remove("proj-shifted");
    } else {
      article
        .querySelector(".single__project--bg")
        .addEventListener("click", function () {
          if (window.innerWidth < 900) {
            return;
          } else {
            this.parentElement.classList.toggle("proj-shifted");
          }
        });
    }
  });
}

async function handleLoad() {
  console.log("loaded");
  let allPics = document.querySelectorAll(".single__project--picture");
  allPics.forEach((pic) => {
    console.log(pic);

    let loading = new Image();
    loading.src = `assets/img/projects/${pic.id}`;

    loading.onload = function () {
      pic.innerHTML = ``;
      pic.style.backgroundImage = `url("assets/img/projects/${pic.id}")`;
    };
  });
}

parse()
  .then((ans) => build(ans))
  .then(handleArticles)
  .then(handleLoad);
