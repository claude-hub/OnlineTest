using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class User
    {
        public User()
        {
            Paper = new HashSet<Paper>();
            Result = new HashSet<Result>();
        }

        public int UserId { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string NikeName { get; set; }
        public string Status { get; set; }
        public string VerificationCode { get; set; }
        public int IsVerification { get; set; }

        public ICollection<Paper> Paper { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}
