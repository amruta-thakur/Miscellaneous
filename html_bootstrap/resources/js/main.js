$(function(){
    $("#preview-button").on("click", function(event){
        var content;
        $.getJSON("resources/json/data.json", function (json) {
            content = json[0].content;
            $(".modal-content").append(content);
            $("#mobile-preview-container").css("width","377px");
        });    
    });
    
})
