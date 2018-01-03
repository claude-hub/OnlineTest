using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class User
    {
        public User()
        {
            Article = new HashSet<Article>();
            Comment = new HashSet<Comment>();
            Paper = new HashSet<Paper>();
            Result = new HashSet<Result>();
        }

        public int UserId { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string NikeName { get; set; }
        public string Status { get; set; }
        public int IsVerification { get; set; }
        public string VerificationCode { get; set; }
        public DateTime CreateTime { get; set; }

        public ICollection<Article> Article { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<Paper> Paper { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}
