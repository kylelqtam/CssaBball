window.onload = function(){
        
    var $article = $('<article/>', {
    });
        
    var $name = $('<h2/>', {
    });
    
    $article.append($name);
    
    $('#results').append($article);
};


$("#all_articles").click(function(){
    console.log(1);
    $('#results').empty();
    var server_data = $.ajax({
        url: "/data?v=1",
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){  
        // Check the data (comment out/move as needed)
        console.log(data);
        var json_data = JSON.parse(data.responseText);
        for (var j in json_data){
            console.log(json_data[j]);
            var $article = $('<article/>', {
            });

            var $title = $('<h2/>', {
                text: json_data[j].title
            });

            var $details = $('<p/>', {
                text: "Abstract: " + json_data[j].abstract
            });
            
            var $p_date = $('<p/>', {
                text: "Published date: " + json_data[j].published_date
            });
            
            var $short_url = $('<a/>', {
                text: json_data[j].short_url,
                href: json_data[j].short_url
            });

            $article.append($title);
            $article.append($details);
            $article.append($p_date);
            $article.append($short_url);

            $('#results').append($article);
                
        }
    })/*
    .fail(function( jqXHR, textStatus )
    {
        alert( "Request failed: " + textStatus );
    })*/;
});

$("#list_authors").click(function(){
    console.log("2");
    console.log();
    $('#results').empty();
    $.ajax({
        url: "/data?v=2",
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){
        console.log(data);
        var json_data = JSON.parse(data.responseText);
        var $article = $('<article/>', {});
        for (var j in json_data){
            console.log(json_data[j]);

            var $name = $('<h2/>', {
                text: json_data[j]
            });

            $article.append($name);
        }
        $('#results').append($article);
    });
});

$("#list_url").click(function(){
    console.log(3);
    console.log();
    $('#results').empty();
    $.ajax(
    {
        url: "/data?v=3",
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){
        console.log(data);
        var json_data = JSON.parse(data.responseText);
        var $article = $('<article/>', {

            });
        for (var j in json_data){
            console.log(json_data[j]);

            var $link = $('<a/>', {
                href: json_data[j]
            });
            
            var $url = $('<h2/>', {
                text: json_data[j]
            });
            
            $link.append($url);
            $article.append($link);
        }
        $('#results').append($article);
    });
});

$("#list_des_facet").click(function(){
    console.log(4);
    console.log();
    $('#results').empty();
    $.ajax(
    {
        url: "/data?v=4",
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){
        console.log(data);
        var json_data = JSON.parse(data.responseText);
        var $article = $('<article/>', {});
        var $paragraph = $('<p/>', {});
        for (var j in json_data){
            console.log(json_data[j]);

            var $tag = $('<span/>', {
                text: j + ",   "
            });
            
            var f_size = 18 + (json_data[j] * 4);
            $tag.css("font-size", f_size);

            $paragraph.append($tag);
        }
        $article.append($paragraph);
            
        $('#results').append($article);
    });
});

$("#details").click(function(){
    console.log(5);
    var num = "0" + $("#detail_in").val();
    console.log("num" + num);
    $('#results').empty();
    $.ajax(
    {
        url: "/data?v=5&?n=" + num,
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){
        if (data.responseText == "nonum"){
            alert("Cant find article : " + num);
        }else{
            console.log(data);    
            var json_data = JSON.parse(data.responseText);
            console.log(json_data);   
            var $article = $('<article/>', {});

            var $title = $('<h2/>', {
                text: json_data.title
            });
            
            var $byline = $('<p/>', {
                text: json_data.byline
            });
            
            
            var $section = $('<p/>', {
                text: "Section: " + json_data.section
            });
            
            var $subsection = $('<p/>', {
                text: "Subsection: " + json_data.subsection
            });
            
            var $abstract = $('<p/>', {
                text: "Abstract: " + json_data.abstract
            });  
            
            var $published_date = $('<p/>', {
                text: "Published Date: " + json_data.published_date
            });    
            
            var $tag_title = $('<h3/>', {
                text: "Tags:"
            });
            var $tags = $('<article/>', {});
            for (var j in json_data.des_facet){
                console.log(json_data[j]);

                var $tag = $('<p/>', {
                    text: json_data.des_facet[j]
                });
                $tags.append($tag);
            }
            
            $article.append($title);
            $article.append($byline);
            $article.append($section);
            $article.append($subsection);
            $article.append($abstract);
            $article.append($tag_title);
            $article.append($tags);

            $('#results').append($article);
        }
    });
});


$("#hyperlinks").click(function(){
    console.log(6);
    console.log();
    $('#results').empty();
    $.ajax(
    {
        url: "/data?v=6",
        method: "GET",
        dataType: "text/plain"
    })
    .always(function(data){
        console.log(data);
        var json_data = JSON.parse(data.responseText);
        var $article = $('<article/>', {});
        for (var j in json_data){
            console.log(json_data[j][0]);

            var $link = $('<a/>', {
                href: j
            });
            
            if(json_data[j][0]){
                var $thumb = $('<h2/>', {
                    text: ""
                });
                
                var multi_media = json_data[j][0]
                var $thumbnail = $('<img/>', {
                    src: multi_media.url
                });
                
                var $title = $('<span/>', {
                    text: json_data[j][1]
                });
                $thumb.append($thumbnail);
                $thumb.append($title);   
            } else {
                var $thumb = $('<h2/>', {
                    text: json_data[j][1]
                });
            }
            
            $link.append($thumb);
                
            $article.append($link);
        }
        $('#results').append($article);
    });
});