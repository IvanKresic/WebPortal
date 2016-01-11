﻿using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using WebPortal.Models;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Script.Serialization;
using System.Collections;
using System.Collections.Generic;

namespace WebPortal.Controllers
{
    public class PostInfoController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        //Dohvati podatke
        [HttpGet]
        [Route("api/PostInfo/")]
        [ResponseType(typeof(PostInfo))]
        public async Task<string> Get()
        {
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("nmbp");
            //string post_id = '"' + postID + '"';

            
            var collection = mongoDbServer.GetCollection<BsonDocument>("post");
            List<PostInfo> postInfo = new List<PostInfo>();
            var filter = new BsonDocument();
            var count = 0;
            using (var cursor = await collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var batch = cursor.Current;
                    foreach (var item in batch)
                    {
                        PostInfo post = new PostInfo();
                        post._id = item.GetElement("_id").Value.ToString();
                        post.id = item.GetElement("post_id").Value.ToInt32();
                        post.Title = item.GetElement("post_title").Value.ToString();
                        post.Author = item.GetElement("post_author").Value.ToString();
                        post.Text = item.GetElement("post_text").Value.ToString();
                        post.Picture = item.GetElement("post_picture").Value.ToString();
                        //post.Comments = item.GetElement("post_comments").Value.ToString();
                        postInfo.Add(post);
                        count++;
                    }
                }
            }
            var json = new JavaScriptSerializer().Serialize(postInfo);
            return json;
        }

        //Dodaj u bazu nove podatke
        // POST api/values
        [HttpPost]
        [Route("api/PostInfo/")]
        public void Post(PostInfo model)
        {
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("nmbp");

            var document = new BsonDocument
            {
                //{ "post_ID",  model._id.ToString()  },
                { "post_id",  model.id  },
                { "post_title",  model.Title  },
                { "post_text",  model.Text  },
                { "post_author",  model.Author  },
                { "post_picture",  model.Picture  },
                //{ "post_comments",  model.Comments  },
            };

            var collection = mongoDbServer.GetCollection<BsonDocument>("post");
            collection.InsertOneAsync(document);
        }

        [HttpPost]
        [Route("api/PostInfo/{Comment}")]
        public async void Post(Comment comment)
        {
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("nmbp");
            var collection = mongoDbServer.GetCollection<BsonDocument>("post");
            var filter = Builders<PostInfo>.Filter.Eq(e => e._id, comment.id);

            var update = Builders<PostInfo>.Update.Push<string>(e => e.Comments, comment.comment);
            await collection.FindOneAndUpdateAsync(filter, update);

            //***********
            //***********
            //await collection.Update(Query.EQ("_id", temp[0]), Update.Push("komentar", temp[1]));
        }

    }
}