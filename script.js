$(document).ready(function () {
    var tvshows = ["The Office", "The Simpsons", "Game of Thrones", "Breaking Bad", "The Walking Dead", "Archer", "Arrested Development"];

    function createButtons() {
    $("#buttonplace").empty();
    $("#show-input").val("");
    for (var i = 0; i < tvshows.length; i++) {
        var showbtn = $("<button>");

        
        showbtn.addClass("btn btn-info");
        showbtn.attr("data-showvalue", tvshows[i]);
        showbtn.text(tvshows[i]);
        $("#buttonplace").append(showbtn);
        
    };
    };
    
    function displayShowGifs () {
        $("#imageplace").empty();
        $.ajax ({
            url: "https://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-showvalue")) + "&api_key=BDq2AOUJkOtzjyYBoCb9CGEzyzyO6KaJ&limit=10&rating=pg",
            method: "GET"
        }).then(function (response) {
            for (var j = 0; j < 10; j++) {
                var gifImg = $("<img>");
                gifImg.addClass("gif-image");
                gifImg.attr("src", response.data[j].images.fixed_height_still.url);
                gifImg.attr("data-still", response.data[j].images.fixed_height_still.url);
                gifImg.attr("data-animate", response.data[j].images.fixed_height.url);
                gifImg.attr("data-state", "still");
                gifImg.attr("border", "solid");
                $("#imageplace").append(gifImg);
                $("#imageplace").append("<p>Rating: " + response.data[j].rating + "</p>");

            };
            console.log(response);
            console.log("hyah");
        });

    };

    function tvbox() {
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random?q=television&api_key=BDq2AOUJkOtzjyYBoCb9CGEzyzyO6KaJ&limit=1&rating=pg",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var tvImg = $("<img>");
            tvImg.addClass("tv-image");
            tvImg.attr("src", response.data.images.fixed_height.url);
            tvImg.attr("height", "200px");
            tvImg.attr("width", "300px");
            $("#randomGif").append(tvImg);
        });
    };

    $("#add-show").on("click", function (event) {
        event.preventDefault();
        var userShow = $("#show-input").val().trim();
        tvshows.push(userShow);
        createButtons();
        tvbox();
    });

    $(document).on("click", ".btn", displayShowGifs);

    $(document).on("click", ".gif-image", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

    createButtons();
    tvbox();
    
    

});