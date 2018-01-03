using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int OwnerId { get; set; }
        public string Content { get; set; }
        public int ArticleId { get; set; }
        public int PraiseNum { get; set; }
        public int TrampleNum { get; set; }
        public DateTime CreateTime { get; set; }

        public Article Article { get; set; }
        public User Owner { get; set; }
    }
}
