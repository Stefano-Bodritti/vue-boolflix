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
            this.searchMovie("movie");
            this.searchMovie("tv");
          } else if ( this.selected == "movie" ) {
            this.searchMovie("movie");
          } else if ( this.selected == "series" ) {
            this.searchMovie("tv");
          }
        }
      },

      setLanguageAndStars: function(movie) {
        // element.forEach((item, i) => {
          movie.stars = Math.ceil(movie.vote_average / 2);
          if ( movie.original_language == "en" ) {
            movie.original_language = "us";
          } else if ( movie.original_language == "ja" ) {
            movie.original_language = "jp";
          }
        // });
      },
      searchMovie: function (category) {
        axios.get("https://api.themoviedb.org/3/search/" + category, {
          params: {
            api_key: "2919db319a3e21c76ac6ca90eacd6463",
            query: this.search,
            language: "it-IT"
          }
        })
        .then( (response) => {
          this.movieList = response.data.results;
          this.movieList.forEach((movie) => {
            this.setLanguageAndStars(movie);
            movie.type = category;
            this.searchList.push(movie);
          });
          this.searchList.sort( (a, b) => b.vote_count - a.vote_count);
        });
      },
      // searchSeries: function () {
      //   axios.get("https://api.themoviedb.org/3/search/tv", {
      //     params: {
      //       api_key: "2919db319a3e21c76ac6ca90eacd6463",
      //       query: this.search,
      //       language: "it-IT"
      //     }
      //   })
      //   .then( (response) => {
      //     this.showsList = response.data.results;
      //     this.setLanguageAndStars(this.showsList);
      //     this.showsList.forEach((show, i) => {
      //       show.type = "series";
      //       this.searchList.push(show);
      //     });
      //     this.searchList.sort( (a, b) => b.vote_count - a.vote_count);
      //   });
      // }
    }
  }
);
