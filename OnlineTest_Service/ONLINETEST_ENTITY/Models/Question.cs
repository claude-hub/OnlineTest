using System;
using System.Collections.Generic;

namespace OnlineTest_Entity.Models
{
    public partial class Question
    {
        public Question()
        {
            Jpaper = new HashSet<Jpaper>();
            Options = new HashSet<Options>();
            Result = new HashSet<Result>();
        }

        public int Id { get; set; }
        public int SubjectId { get; set; }
        public string QuestionContent { get; set; }
        public int QuestionType { get; set; }
        public int QuestionClass { get; set; }
        public string QuestionAnlysis { get; set; }
        public string RightAnswer { get; set; }
        public bool IsDelete { get; set; }

        public Subject Subject { get; set; }
        public ICollection<Jpaper> Jpaper { get; set; }
        public ICollection<Options> Options { get; set; }
        public ICollection<Result> Result { get; set; }
    }
}
