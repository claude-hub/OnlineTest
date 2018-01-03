using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class Article
    {
        public Article()
        {
            Comment = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public string Label { get; set; }
        public int PraiseNum { get; set; }
        public int TrampleNum { get; set; }
        public int CommentNum { get; set; }
        public bool IsPublish { get; set; }

        public User User { get; set; }
        public ICollection<Comment> Comment { get; set; }
    }
}
