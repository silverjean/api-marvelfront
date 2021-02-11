import api from './services/api';

import FindCharacters from './classes/FindCharacters';

class App {
  constructor() {
    this.offset = 0;
    this.tableBody = document.querySelector('.characters');
    this.pag = document.querySelector('.pagination');
    this.character;

    this.found = new FindCharacters();
  }
  async getAllCharacters() {
    try {
      // const url = `https://gateway.marvel.com/v1/public/characters?apikey=07f05d67192c439bf8203269fc153fdd&hash=a2110823d4049282bfbe666bd8e79fff&ts=1609890812920&limit=100&offset=${this.offset}`;
      const result = await api.get(`/characters?offset=${this.offset}`);

      this.populate(result.data.data.results);
      this.paginate(result.data.data.total);
    } catch (error) {
      console.log(error);
    }
  }
  populate(data) {
    this.tableBody.innerHTML = '';
    data.forEach((element) => {
      const imgs = `<img data-toggle="tooltip" data-placement="bottom" class="test" title="${element.name}" src='${element.thumbnail.path}.${element.thumbnail.extension}'>
                    `;
      this.tableBody.innerHTML += imgs;
    });
  }
  paginate(total) {
    this.pag.innerHTML = '';
    const pages = Math.ceil(total / 100);

    for (let i = 1; i <= pages; i++) {
      const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      this.pag.innerHTML += li;
    }

    for (let link of document.getElementsByClassName('page-link')) {
      link.onclick = (event) => {
        const page = event.target.dataset.page;

        this.offset = (parseInt(page) - 1) * 100;

        this.getAllCharacters();
      };
    }
  }
}
const app = new App();
app.getAllCharacters();
