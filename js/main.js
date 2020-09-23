


/******************API_KEY*****************************/
//273d0646cfc5ade7d91008e037afec3d
/*****************API_KEY******************************/



// Milestone 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
// https://api.themoviedb.org/3/search/movie?api_key=273d0646cfc5ade7d91008e037afec3d&language=it-IT&page=1&include_adult=false&
// questa sarà la query string query=il signore degli anelli
// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
$(document).ready(function(){

  $("#button").click(function(){
    var queryString = "query=" + $("#string").val();
    var cont = 0;
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
            "cont": cont
          };
          //Inserisco il contesto nel mio html
          var html = template(context);
          $("ul").append(html);
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
            "cont": cont
          };
          //Inserisco il contesto nel mio html
          var html = template(context);
          $("ul").append(html);
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
