$(document).ready(function () {
    var tvshows = ["The Office", "The Simpsons", "Game of Thrones", "Breaking Bad", "The Walking Dead", "Archer", "Arrested Development"];

    function createButtons() {
    $("#buttonplace").empty();
    $("#add-show").empty();
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
            url: "https://api.giphy.com/v1/gifs/search?q=" + ($(this).attr("data-showvalue")) + "&api_key=BDq2AOUJkOtzjyYBoCb9CGEzyzyO6KaJ&limit=10",
            method: "GET"
        }).then(function (response) {
            for (var j = 0; j < 10; j++) {
                var gifImg = $("<img>");
                gifImg.addClass("gif-image");
                gifImg.attr("src", response.data[j].images.fixed_height_still.url);
                gifImg.attr("data-still", response.data[j].images.fixed_height_still.url);
                gifImg.attr("data-animate", response.data[j].images.fixed_height.url);
                gifImg.attr("data-state", "still");
                $("#imageplace").append(gifImg);
                $("#imageplace").append("<p>Rating: " + response.data[j].rating + "</p>");

            };
            console.log(response);
            console.log("hyah");
        });

    };

    $("#add-show").on("click", function (event) {
        event.preventDefault();
        var userShow = $("#show-input").val().trim();
        tvshows.push(userShow);
        createButtons();
    });

    $(document).on("click", ".btn", displayShowGifs);

    $(document).on("click", ".gif-image", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "animate");
        };
    });

    createButtons();
    
    

});