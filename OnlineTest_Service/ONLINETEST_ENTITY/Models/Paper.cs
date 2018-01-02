using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class Paper
    {
        public Paper()
        {
            Jpaper = new HashSet<Jpaper>();
            Result = new HashSet<Result>();
        }

        public int Id { get; set; }
        public int? SubId { get; set; }
        public int? UserId { get; set; }
        public double Accuracy { get; set; }
        public DateTime CreateTime { get; set; }
        public string PaperName { get; set; }
        public string PaperDeatail { get; set; }

        public Subject Sub { get; set; }
        public User User { get; set; }
        public ICollection<Jpaper> Jpaper { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}
