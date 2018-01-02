
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ONLINETEST_ENTITY.Models;
using Microsoft.EntityFrameworkCore;

namespace ONLINETEST_CORE.Tasks
{
    public class TaskService
    {
        private readonly OnlineTextContext _onlineTestContext = new OnlineTextContext();
        public bool CreateSubject(string name)
        {
            Subject subject = _onlineTestContext.Subject.SingleOrDefault(s => s.Name.Equals(name));
            if (subject != null)
                return false;
            else
            {
                Subject newSubject = new Subject()
                {
                    Name = name
                };
                _onlineTestContext.Subject.Add(newSubject);
                _onlineTestContext.SaveChanges();
                return true;
            }
        }
        public bool CreateQuestion(int subjectId, string questionName,string questionAnlysis, int questionType, int questionClass)
        {
            Question question = _onlineTestContext.Question.SingleOrDefault(q => q.QuestionContent.Equals(questionName));
            if (question != null)
                return false;
            else
            {
                Question newQuestion = new Question()
                {
                    SubjectId = subjectId,
                    QuestionContent = questionName,
                    QuestionAnlysis = questionAnlysis,
                    QuestionClass = questionClass,
                    QuestionType = questionType,
                };
                _onlineTestContext.Question.Add(newQuestion);
                _onlineTestContext.SaveChanges();
                return true;
            }
        }
        public bool CreateOption(int questionId, string answerDescription)
        {
            Options option = _onlineTestContext.Options.SingleOrDefault(a => a.Description.Equals(answerDescription));
            if (option != null)
                return false;
            else
            {
                Options newOption = new Options()
                {
                    QueId = questionId,
                    Description = answerDescription,
                };
                _onlineTestContext.Options.Add(newOption);
                _onlineTestContext.SaveChanges();
                return true;
            }
        }
#region   保存试卷到数据库
        /// <summary>
        /// 创建用户的试卷
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subjectId"></param>
        /// <param name="paperClass">难度等级</param>
        /// <returns></returns>
        public int CreatePaper(int userId,int subjectId,int paperClass)
        {
            DateTime time = DateTime.Now;
            Paper paper = new Paper()
            {
                UserId = userId,
                SubId = subjectId,
                Accuracy = 0,
                CreateTime = time,
                PaperName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == subjectId).Name + time,
                PaperDeatail = "",
            };
            _onlineTestContext.Paper.Add(paper);
            _onlineTestContext.SaveChanges();
            int paperId = CreateSpecificPaper(time, subjectId, paperClass);
            return paperId;
        }

        public int CreateSpecificPaper(DateTime createTime,int subjectId,int paperClass)
        {
            //找到题目
            List<Question> testQuestions = GetTestQuestions(subjectId, paperClass);
            var paperId = _onlineTestContext.Paper.SingleOrDefault(p => p.CreateTime.Equals(createTime)).Id;
            foreach(var testQuestion in testQuestions)
            {
                Jpaper jpaper = new Jpaper()
                {
                    PapId = paperId,
                    QueId = testQuestion.Id,
                };
            }
            _onlineTestContext.SaveChanges();
            return paperId;
        }
        public List<Question> GetTestQuestions(int subjectId,int paperClass,int queCount = 30)
        {
            var questions = _onlineTestContext.Question.Where(q => q.SubjectId == subjectId&&q.QuestionClass==paperClass).ToList();
            int[] qId = GetQuestionId(queCount, questions.Count-1);
            List<Question> testQuestions = new List<Question>();
            foreach(int id in qId)
                testQuestions.Add(questions[id]);
            return testQuestions;
        }
        //随机生成题目编号
        public int[] GetQuestionId(int idCount,int maxId)
        {
            int[] index = new int[maxId];
            for (int i = 0; i < maxId; i++)
                index[i] = i;
            Random r = new Random();            
            int[] result = new int[idCount];//用来保存随机生成的不重复的10个数 
            int id;
            for (int j = 0; j < 10; j++)
            {
                id = r.Next(0, maxId - 1);                
                result[j] = index[id]; //在随机位置取出一个数，保存到结果数组                 
                index[id] = index[maxId - 1];//最后一个数复制到当前位置                 
                maxId--;//位置的上限减少一
            }
            return result;
        }
#endregion
        public List<Question> GetJpaperById(int pid)
        {
            //得到题目ID
            List<Jpaper> jps = _onlineTestContext.Jpaper.Where(jp => jp.PapId == pid).ToList();
            List<Question> questions = new List<Question>();
            foreach(var jp in jps)
            {
                var question = _onlineTestContext.Question.Include(qu =>qu.Options).SingleOrDefault(q => q.Id == jp.QueId);
                var result = GetQuestion(question);
                questions.Add(result);
            }
            return questions;
            
        }
        public Paper GetPaperById(int pid)
        {
            return  _onlineTestContext.Paper.SingleOrDefault(p => p.Id == pid);
        }
        public Question GetQuestion(Question question)
        {
            Question result = new Question()
            {
                QuestionContent = question.QuestionContent,
                QuestionAnlysis = question.QuestionAnlysis,
                RightAnswer = question.RightAnswer,
                Id = question.Id,
                Options = question.Options.Select(op => new Options()
                {
                    Description = op.Description,
                    Id = op.Id,
                }).ToList(),
            };
            return result;
        }
        public List<Question> GetQuestionBySearch(int subjectId,string searchContent)
        {
            var result = _onlineTestContext.Question.Include(qu => qu.Options).Where(q => q.SubjectId == subjectId && 
            q.QuestionContent.Contains(searchContent)).ToList();
            return result;
        }
    }
}
