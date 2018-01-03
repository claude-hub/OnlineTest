using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class Subject
    {
        public Subject()
        {
            Paper = new HashSet<Paper>();
            Question = new HashSet<Question>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionCount { get; set; }

        public ICollection<Paper> Paper { get; set; }
        public ICollection<Question> Question { get; set; }
    }
}
