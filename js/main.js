// Milestone 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
// API KEY: 273d0646cfc5ade7d91008e037afec3d
// https://api.themoviedb.org/3/search/movie?api_key=273d0646cfc5ade7d91008e037afec3d&language=it-IT&page=1&include_adult=false&
// questa sarà la query string query=il signore degli anelli

$(document).ready(function(){

  $("#button").click(function(){
    var queryString = "query=" + $("#string").val();
    $("ul").text("");
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
          var context = data.results[i];
          //Inserisco il contesto nel mio html
          var html = template(context);

          $("ul").append(html);
        }
      },

      error: function(richiesta,stato,errore){
        console.log("Errore --> " + errore);
      }
    });

  });

});
