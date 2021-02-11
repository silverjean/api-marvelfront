import Swal from 'sweetalert2';

import api from '../services/api';

class FindCharacters {
  constructor(key) {
    this.key = key;

    this.pag = document.querySelector('#pag');

    this.search = document.querySelector('#search-input');

    this.btnSearch = document.querySelector('#search');

    this.registerEvent();
  }

  registerEvent() {
    this.btnSearch.onclick = () => this.charactersSearch(this.search.value);
  }

  async charactersSearch(name) {
    try {
      if (!this.search.value) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Digite um nome valido!',
        });
      } else {
        this.pag.innerHTML = '';

        const { data } = await api.get(`/characters?nameStartsWith=${name}`);
        console.log(data);

        data.data.results.forEach((element) => {
          const result = `<img data-toggle="tooltip" data-placement="bottom" class="test" title="${element.name}" src='${element.thumbnail.path}.${element.thumbnail.extension}'>`;
          this.pag.innerHTML += result;
          console.log(result);
        });
      }

      // for (const character of data.data.results) {
      //   this.pag.innerHTML = `<img data-toggle="tooltip" data-placement="bottom" class="test" title="${character.name}" src='${character.thumbnail.path}.${character.thumbnail.extension}'>`;
      // }
      this.search.innerHTML = '';

      return;
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}

export default FindCharacters;
