/* src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
$.ajax({
    url:"https://api.spoonacular.com/recipes/random?apiKey=70a97873cc6e4b75a56be10cd2d56e5f&number=10",
    success:function(res){
        console.log(res.recipes);
        for (var i = 0; i < 10; i++) {
            document.getElementById("output" + i).innerHTML="<h1>"+res.recipes[i].title+"</h1><br><img src='"+res.recipes[i].image+"'width='400'/> <br> Summary: "+res.recipes[i].summary+" <br> <br>" 
        }
    }
}); */
