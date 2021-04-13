var app = new Vue(
  {
    el: "#app",
    data: {
      search: "",
      searchList: [],
      showsList: [],
      movieList: [],
      selected: "all"
    },
    methods: {
      find: function () {
        this.searchList = [];
        if ( this.search != "" ) {
          if ( this.selected == "all" ) {
            this.searchMovie();
            this.searchSeries();
          } else if ( this.selected == "movie" ) {
            this.searchMovie();
          } else if ( this.selected == "series" ) {
            this.searchSeries();
          }
        }
      },

      setLanguageAndStars: function(element) {
        element.forEach((item, i) => {
          item.stars = Math.ceil(item.vote_average / 2);
          if ( item.original_language == "en" ) {
            item.original_language = "us";
          } else if ( item.original_language == "ja" ) {
            item.original_language = "jp";
          }
        });
      },
      searchMovie: function () {
        axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "2919db319a3e21c76ac6ca90eacd6463",
            query: this.search,
            language: "it-IT"
          }
        })
        .then( (response) => {
          this.movieList = response.data.results;
          this.setLanguageAndStars(this.movieList);
          this.movieList.forEach((movie) => {
            movie.type = "movie";
            this.searchList.push(movie);
          });
          this.searchList.sort( (a, b) => b.vote_count - a.vote_count);
        });
      },
      searchSeries: function () {
        axios.get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: "2919db319a3e21c76ac6ca90eacd6463",
            query: this.search,
            language: "it-IT"
          }
        })
        .then( (response) => {
          this.showsList = response.data.results;
          this.setLanguageAndStars(this.showsList);
          this.showsList.forEach((show, i) => {
            show.type = "series";
            this.searchList.push(show);
          });
          this.searchList.sort( (a, b) => b.vote_count - a.vote_count);
        });
      }
    }
  }
);
