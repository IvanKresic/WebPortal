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
    postInfo.title   += document.getElementById('formTitle').value;
    postInfo.author  += document.getElementById('formAuthor').value;
    postInfo.text    += document.getElementById('formText').value;
    postInfo.picture += document.getElementById('formPicture').value;

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
                    document.getElementById('topTenPosts').innerHTML += "<div id='" 
                        + valid[i].id + "' class='main_div'><div id='title'><b><h3>Title:</b> " 
                        + valid[i].Title + "</h3></div><br/><div id='author'><b>Author:</b> " 
                        + valid[i].Author + "</div><br/><div id='parent'><div id='picture'>" 
                        + valid[i].Picture + "</div><br/><div id='text'><b>Text:</b> " 
                        + valid[i].Text + "</div></div><br/><input type='text' class='input-sm' id="
                        + valid[i]._id + " style='width:350px;'><button onclick='newComment(" +'"'+ valid[i]._id +'"'+ ")' class='btn' style='margin-left:5px;margin-top:-5px;'>Add comment</button></div>";
                    i++;
                    //console.log(valid.length + "   i=" + i);
                } while (valid.length > i);
            } else {
                console.log("GET DAMN" + valid);
            }
        }
    });
}
//********************************************

var comment =
    {
        id: "",
        comment:""
}

function newComment(id)
{
    var test = document.getElementById(id).value;
    comment.id += id;
    comment.comment += test;    
    var newCommentUrl = 'api/PostInfo/' + comment;
    postDataToDatabase(comment, newCommentUrl);
}

//**************RESET FUNCTIONS****************
function resetnewPost() {
    document.getElementById('formTitle').value= "";
    document.getElementById('formAuthor').value = "";
    document.getElementById('formText').value= "";
    document.getElementById('formPicture').value = "";
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