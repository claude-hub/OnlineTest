using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class Options
    {
        public Options()
        {
            Result = new HashSet<Result>();
        }

        public int Id { get; set; }
        public int? QueId { get; set; }
        public string Description { get; set; }

        public Question Que { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}
