//Search images for fetching images
const accessKey = 'OaDDRTbWLI_LxnUwR3f7ChBafloQjKpldCd7YGtiXmY';  //unsplash accessKey

//imported all elements from index.html file
const formElement = document.querySelector('form');
const inputElement = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData = "";  //store all the keywords which user type in search 
let page = 1;  //default page no, if user click on show more button then page no will increase

//if user-type something in search&click search-btn then our API will take that
//keyword and based on that keyword API will fetch imgs from unsplash.com,so for 
//doing that we've to create dynamic URL
async function searchImages(){ 
    inputData = inputElement.value;  //will store all the keywords which user is typing input section 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=
    ${inputData}&client_id=${accessKey}`  //dynamic var use(``)   1st query initialize pageno bcoz want to get imgs from first page and page no will be dynamic so inside dynamic var we need to use ${}
                        //  after that we use something so &      2nd query will be inputData  
                        //  then we need to use API,so add client 3rd will be accesskey, get our API access from our accessKey
    
                        /*depending on our URL our page our inputData and URl will fetch data from Unsplash APIand show those images inside our website
    so for doing we need to use fetch and response() and for doing we make func async*/
    const response = await fetch(url); //fetch all the data from inside our url var
    const data = await response.json(); //need to get data, convert data into JSON format, data is inside response var

    const results = data.results; //data holding json data, onvert those json data into img and this text for doing,store it in a var
    //store in results 
    
    if(page === 1) { //after this we need to initialize page number
        searchResults.innerHTML = "";
    }
    //all the results inside results var, inside results there are lots of images,we need to show images text one by one so we need to map this results var
    results.map((result) => {
        const imageWrapper = document.createElement('div'); //push all the data inside container
        imageWrapper.classList.add("search-result"); //create class div
        const image = document.createElement('img'); //create img
        image.src = result.urls.small; //create src
        image.alt = result.alt_description; //create description    
        const imageLink = document.createElement('a'); //create a tag
        imageLink.href = result.links.html;  //create href 
        imageLink.target = "_blank"; //add target
        imageLink.textContent = result.alt_description;  //push text  (make same as html div in js)
         
        imageWrapper.appendChild(image);  //appendElemnts in html page
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++;  //after showing 1st page we need to inc page number
    if (page > 1){
        showMore.style.display = "block"; //if img query more than 1 then we need to display, showMore button 
    }
}

// added listener on form, if any1 type query we hve to create eventListener for this input
formElement.addEventListener('submit', (event) => {  //function for form element
    event.preventDefault();
    page = 1;
    searchImages();
});
//added listener on click->showMore, 
showMore.addEventListener('click', () => { // when click on showMore button then call searchImg()
    searchImages();
});