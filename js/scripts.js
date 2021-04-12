var app = new Vue(
  {
    el: "#app",
    data: {
      search: "",
      movieList: []
    },
    methods: {
      find: function () {
        if ( this.search != "" ) {
          axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
              api_key: "2919db319a3e21c76ac6ca90eacd6463",
              query: this.search,
              language: "it-IT"
            }
          })
          .then( (response) => {
            this.movieList = response.data.results;
            this.movieList.forEach((movie) => {
              movie.stars = Math.ceil(movie.vote_average / 2);
              if ( movie.original_language == "en" ) {
                movie.original_language = "us";
              }
            });
          });
        }
      }
    }
  }
);
