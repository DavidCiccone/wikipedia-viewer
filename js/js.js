
var searchTerm = document.getElementById('search-text');
var selectContentContainer = document.getElementById('content');
var wikiLink = 'https://en.wikipedia.org/wiki/';
//Main search function
function search() {
    
    //Retrives the search term
	searchTerm = document.getElementById('search-text').value;
   
    //call to wikipedia
	$.ajax({
	    url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + searchTerm +'&srwhat=text',
	    dataType: 'jsonp',
	    headers: { 'Api-User-Agent': 'Example/1.0' },   
	    success: function(data) {
	    	console.log(data);
	    	$( "#content" ).empty();
	    	for(var i = 0; i < data.query.search.length; i++){
	    		
	    		//creates the elements to hold the data
	    		var newDiv = document.createElement('div');
	    		    newDiv.id = 'content' + i;
	    		    newDiv.className = 'styles';
                
                var newTitle = document.createElement('a');
	    		    newTitle.className = 'title-styles';
	    		    newTitle.href = wikiLink + data.query.search[i].title;
	    		
	    		var linkSpan = document.createElement('span');
	    		    linkSpan.className = 'links';  
	    		
	    		var newSnip = document.createElement('p');
	    		    newSnip.className = 'snip-styles';
	    		
                //appends new elements to the page
                selectContentContainer.append(newDiv);
                newDiv.appendChild(newTitle);
                newDiv.appendChild(newSnip);
                              
                //appends data to the proper elements
                document.querySelector('#content' + i +' > a.title-styles').innerHTML = data.query.search[i].title;
                document.querySelector('#content' + i +' > p.snip-styles').innerHTML = data.query.search[i].snippet;
                
                //appends a span tag within each link
                newTitle.appendChild(linkSpan);
            }
	    	
	    },
		error: function(){	
			console.log('not working');
		}
	});
}

//Animation
searchTerm.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        search();
        $( ".center" ).animate({ "top": "70px" }, "fast" );
    }
});
