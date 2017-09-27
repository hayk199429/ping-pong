$(document).ready(menu);

function menu() {

    $("<div/>").attr("id", "main").appendTo("body");
    $("<img/>").attr("src", "images/menu.jpg").appendTo("#main");
    $("<button/>").attr("id", "play").text("Play").appendTo("#main");
    $("<button/>").attr("id", "play")
    $("<img/>").attr("id", "sound").attr("src", "images/sound.png").appendTo("#main");

    $("#play").click(function () {
        $("body").empty();
        game();
    });
    $("#sound").click(function () {
        $("#sound").attr("src", "images/mute.png");
    });





$("audio").prop('muted', true);

  $("#mute-audio").click( function (){
    if( $("audio").prop('muted') ) {
          $("audio").prop('muted', false);
    } else {
      $("audio").prop('muted', true);
    }
  });





};