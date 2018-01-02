using System;
using System.Collections.Generic;

namespace ONLINETEST_ENTITY.Models
{
    public partial class Jpaper
    {
        public int Id { get; set; }
        public int? PapId { get; set; }
        public int? QueId { get; set; }

        public Paper Pap { get; set; }
        public Question Que { get; set; }
    }
}
