using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Entity.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string UserName { get; set; }
        public string Content { get; set; }
        public int ArticleId { get; set; }
        public int PraiseNum { get; set; }
        public int TrampleNum { get; set; }
        public DateTime CreateTime { get; set; }
        public List<Comments> Children { get; set; }
    }
}
