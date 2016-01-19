var newPostApiURL= 'api/PostInfo/'
var postInfo =
    {
        id: "",
        title: "",
        author: "",
        text: "",
        picture: "",
        date:""
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
    var temp = document.getElementById('formPicture').value;
    var fileName = temp.match(/[^\/\\]+$/);
    postInfo.picture += fileName[0];

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
                    document.getElementById('topTenPosts').innerHTML += "<div id='' class='main_div' style='margin-top:50px;'><div id='title'><b><h2> "
                                                                         + valid[i].Title + "</b></h2></div><br/><div id='author'><b>Author:</b> "
                                                                         + valid[i].Author + "</br>"+ valid[i].Date +"</div><br/><div id='parent'><div id='picture'><img src='nmbp1/"
                                                                         + valid[i].Picture + "'></div><br/><div id='text'><b>Text:</b> "
                                                                         + valid[i].Text + "</div></div></div><ul id='comments'><div id='c" + valid[i]._id + "'>";
                    console.log(valid[i]._id);
                    valid[i].Comments.forEach(function (data) {
                         document.getElementById("c" + valid[i]._id).innerHTML += "<li>" + data + "</li>";

                        console.log(data);
                    });
                    document.getElementById('topTenPosts').innerHTML += "</ul><br/><input type='text' class='input-sm' id="
                        + valid[i]._id + " style='width:350px;margin-left:25%;'><button onclick='newComment(" +'"'+ valid[i]._id +'"'+ ")' class='btn' style='margin-left:5px;margin-top:-5px;'>Add comment</button></div></div>";
                    i++;
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
    resetComment();
    console.log(id);    
    comment.id += id;
    comment.comment += test;
    var newCommentUrl = 'api/PostInfo/' + comment;
    postDataToDatabase(comment, newCommentUrl);
    //********
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: newPostApiURL,
        type: 'GET',
        contentType: 'application/json;',
        success: function (data) {            
            if (data) {
                var valid = JSON.parse(data);
                var i = 0;

                do {
                    document.getElementById("c"+valid[i]._id).innerHTML = "";
                    valid[i].Comments.forEach(function (data) {
                        document.getElementById("c"+valid[i]._id).innerHTML += "<li>" + data + "</li>";
                        console.log(data);                        
                    });
                    i++;
                    }while (valid.length > i);
                };
            }
        });
    //********
    document.getElementById(id).value = "";
}

//**************RESET FUNCTIONS****************
function resetnewPost() {
    document.getElementById('formTitle').value= "";
    document.getElementById('formAuthor').value = "";
    document.getElementById('formText').value= "";
    document.getElementById('formPicture').value = "";
    document.getElementById('addNewPost').style.display = "none";
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

function resetComment()
{
    comment.id = "";
    comment.comment = "";
}

//*********************************************