


/******************API_KEY*****************************/
//273d0646cfc5ade7d91008e037afec3d
/*****************API_KEY******************************/

// URL base delle immagini: https://image.tmdb.org/t/p/w185/l'url finale dell'immagine

$(document).ready(function(){

  $("#button").click(function(){
    var queryString = "query=" + $("#string").val();
    var cont = 0;
    var urlBase = "https://image.tmdb.org/t/p/w400/";
    $("ul").text("");
    //Chiamata per i film
    $.ajax(
    {
      url : "https://api.themoviedb.org/3/search/movie?api_key=273d0646cfc5ade7d91008e037afec3d&language=it-IT&page=1&include_adult=false&" + queryString,

      method: "GET",

      success: function(data,stato){
        console.log(data.results);

        for(var i = 0; i < data.results.length; i++){
          //Prendo l'html relativo
          var source = $("#movie-template").html();
          //Lo compilo
          var template = Handlebars.compile(source);
          //Creo un contesto
          data.results[i].vote_average = Math.ceil(data.results[i].vote_average/2);
          var context = {
            "vote_average": data.results[i].vote_average,
            "title": data.results[i].title,
            "original_language": flags(data.results[i].original_language),
            "original_title": data.results[i].original_title,
            "cont": cont,
            "image": urlBase + data.results[i].backdrop_path
          };
          //Inserisco il contesto nel mio html
          var html = template(context);
          $("#movie").append(html);
          starFiller(data.results[i].vote_average,cont);
          cont ++;
        }
      },

      error: function(richiesta,stato,errore){
        console.log("Errore --> " + errore);
      }
    });

    // Chiamata per le serie
    $.ajax(
    {
      url : "https://api.themoviedb.org/3/search/tv?page=1&include_adult=false&api_key=273d0646cfc5ade7d91008e037afec3d&language=it-IT&" + queryString,

      method: "GET",

      success: function(data,stato){
        console.log(data.results);

        for(var i = 0; i < data.results.length; i++){
          //Prendo l'html relativo
          var source = $("#series-template").html();
          //Lo compilo
          var template = Handlebars.compile(source);
          //Creo un contesto
          data.results[i].vote_average = Math.ceil(data.results[i].vote_average/2);
          var context = {
            "name": data.results[i].name,
            "original_name": data.results[i].original_name,
            "original_language": flags(data.results[i].original_language),
            "vote_average":data.results[i].vote_average,
            "cont": cont,
            "image": urlBase + data.results[i].backdrop_path
          };
          //Inserisco il contesto nel mio html
          var html = template(context);
          $("#series").append(html);
          starFiller(data.results[i].vote_average,cont);
          cont ++;
        }
     },

      error: function(richiesta,stato,errore){
        console.log("Errore --> " + errore);
      }
    });

  });

  function starFiller(voto,cont){
    for(var i = 1; i <= voto; i ++){
      $(".star-container[data-number=" + cont +"] i:nth-of-type(" + i + ")").addClass("fas");
    }
  };

  function flags(lingua){
    switch(lingua){
      case "en": return "united-kingdom-flag-icon-128.png";
      case "fr": return "france-flag-icon-128.png";
      case "it": return "italy-flag-icon-64.png";
      case "sp": return "spain-flag-icon-128.png";
    }
  }

});
