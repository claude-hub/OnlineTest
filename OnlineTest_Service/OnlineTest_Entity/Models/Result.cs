using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class Result
    {
        public int Id { get; set; }
        public int QueId { get; set; }
        public int Content { get; set; }
        public bool IsRight { get; set; }
        public int PaperId { get; set; }
        public int UserId { get; set; }

        public Options ContentNavigation { get; set; }
        public Paper Paper { get; set; }
        public Question Que { get; set; }
        public User User { get; set; }
    }
}
