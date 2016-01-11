﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace WebPortal.Models
{
    public class PostInfo
    {
        public object _id { get; set; }

        public int id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public string Author { get; set; }

        public string Picture { get; set; }

        public string Comments { get; set; }
    }
}