var app = new Vue(
  {
    el: "#app",
    data: {
      search: "",
      movieList: [],
      showsList: [],
      movieTempList: []
    },
    methods: {
      find: function () {
        this.movieList = [];
        if ( this.search != "" ) {
          axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
              api_key: "2919db319a3e21c76ac6ca90eacd6463",
              query: this.search,
              language: "it-IT"
            }
          })
          .then( (response) => {
            this.movieTempList = response.data.results;
            this.setLanguageAndStars(this.movieTempList);
            this.movieTempList.forEach((movie) => {
              movie.type = "movie";
              this.movieList.push(movie);
            });
          });

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
              this.movieList.push(show);
            });
          });
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

      }
    }
  }
);
