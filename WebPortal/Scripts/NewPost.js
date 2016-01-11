var newPostApiURL= 'api/PostInfo/'
var postInfo =
    {
        id: "",
        title: "",
        author: "",
        text: "",
        picture: "",
        comments:[],
    }

getDataFromDatabase(newPostApiURL);

function addNewPost()   
{
    document.getElementById('addNewPost').style.display = "block";
}


function newPost()
{       
    postInfo.title  += document.getElementById('title').value;
    postInfo.author += document.getElementById('author').value;
    postInfo.text  += document.getElementById('text').value;
    postInfo.picture  += document.getElementById('picture').value;

    postDataToDatabase(postInfo, newPostApiURL);
    //console.log(title + " " + author + " " + text + " " + picture);
    resetnewPost();
    resetpostInfo();
    document.getElementById('topTenPosts').innerHTML = "";
    getDataFromDatabase(newPostApiURL);
    document.getElementById('addNewPost').style.display = "none";
        
}



//**********Spremanje u bazu podataka*********
function postDataToDatabase(data, url) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify(data),
        success: function (valid) {
            if (valid) {
            } else {
            }
        }
    });
}
//********************************************

//**********Dohvat iz baze podataka*********
function getDataFromDatabase(url) {

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        type: 'GET',
        contentType: 'application/json;',
        success: function (data) {
            if (data) {
                var valid = JSON.parse(data);
                //console.log(valid);
                console.log(valid);
                var i = 0;
                do {
                    // postInfo.author += valid[i].Author;
                    // postInfo.title += valid[i].Title;
                    // postInfo.text += valid[i].Text;
                    // postInfo.picture += valid[i].Picture;
                    document.getElementById('topTenPosts').innerHTML += "<div id='title'>" + valid[i].Title + "</div><br/><div id='author'>" + valid[i].Author + "</div><br/><div id='picture'>" + valid[i].Picture + "</div><br/><div id='text'>" + valid[i].Text + "</div><br/>";
                    i++;
                    console.log(valid.length + "   i=" + i);
                } while (valid.length > i);
            } else {
                console.log("GET DAMN" + valid);
            }
        }
    });
}
//********************************************


//**************RESET FUNCTIONS****************
function resetnewPost() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('text').value = "";
    document.getElementById('picture').value = "";
}

function resetpostInfo()
{
    postInfo.id = "";
    postInfo.title = "";
    postInfo.author = "";
    postInfo.text = "";
    postInfo.picture = "";
    postInfo.comments = "";
}

//*********************************************