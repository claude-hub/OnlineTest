
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using OnlineTest_Entity.Models;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace OnlineTest_Core.Tasks
{
    public class TaskService
    {
        private readonly OnlineTestContext _onlineTestContext = new OnlineTestContext();
        private readonly int DefaultQueCount = 0;
        private static readonly object locker = new object();   //锁
        public bool CreateSubject(string name)
        {
            Subject subject = _onlineTestContext.Subject.SingleOrDefault(s => s.Name.Equals(name));
            if (subject != null)
                return false;
            else
            {
                Subject newSubject = new Subject()
                {
                    Name = name,
                    QuestionCount = DefaultQueCount
                };
                _onlineTestContext.Subject.Add(newSubject);
                _onlineTestContext.SaveChanges();
                return true;
            }
        }
        public int CreateQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer)
        {
            Question question = _onlineTestContext.Question.SingleOrDefault(q => q.QuestionContent.Equals(questionName));
            if (question != null)
                return -1;
            else
            {
                Question newQuestion = new Question()
                {
                    SubjectId = subjectId,
                    QuestionContent = questionName,
                    QuestionAnlysis = questionAnlysis,
                    QuestionClass = questionClass,
                    QuestionType = questionType,
                    RightAnswer = rightAnswer,
                    IsDelete = false,   //false表示未删除
                };
                _onlineTestContext.Question.Add(newQuestion);
                _onlineTestContext.SaveChanges();
                AddQueCount(subjectId);
                return newQuestion.Id;
            }
        }
        public bool CreateOption(int questionId, string answerDescription)
        {
            var question = _onlineTestContext.Question.SingleOrDefault(a => a.Id==questionId);
            if (question == null)
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
        public void AddQueCount(int subId)
        {
            Subject sub = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == subId);
            sub.QuestionCount++;
            _onlineTestContext.SaveChanges();
        }
        public bool SaveQue(int queId, string queContent, int queClass, string rightAnswer)
        {
            Question que = _onlineTestContext.Question.SingleOrDefault(q => q.Id == queId);
            try
            {
                que.QuestionContent = queContent;
                que.QuestionClass = queClass;
                que.RightAnswer = rightAnswer;
                _onlineTestContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public bool SaveOptions()
        {
            return false;
        }

        public object GetPaperList(string query, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var papList = (from p in _onlineTestContext.Paper
                           where p.PaperName.Contains(query) || p.User.NikeName.Contains(query)
                           select new
                           {
                               paperId = p.Id,
                               paperName = p.PaperName,
                               subName = p.Sub.Name,
                               userName = p.User.NikeName,
                               createTime = p.CreateTime,
                           }).ToList();
            var result = new
            {
                count = papList.Count(),
                paps = papList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetPaperList(int currentPage, int pageSize = 8)
        {
            var paperList = (from p in _onlineTestContext.Paper
                          orderby p.Id descending
                          select new
                          {
                              id = p.Id,
                              name = p.PaperName,
                              subjectName = p.Sub.Name,
                          }).ToList();
            var result = new
            {
                AddQueCount = paperList.Count(),
                paperList = paperList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetPaperListByUser(int uId, int currentPage, int pageSize = 10)
        {
            var paperList = (from p in _onlineTestContext.Paper
                          where p.UserId == uId
                          orderby p.Id descending
                          select new
                          {
                              id = p.Id,
                              name = p.PaperName,
                              subjectName = p.Sub.Name,
                              accuracy = p.Accuracy,
                              createTime = p.CreateTime,
                          }).ToList();
            var result = new
            {
                count = paperList.Count(),
                paperList = paperList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetSubjectList(string query, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var subList = (from s in _onlineTestContext.Subject
                           where s.Name.Contains(query) && !s.IsDelete
                           select new
                           {
                               id = s.Id,
                               name = s.Name,
                               queCount = s.QuestionCount,
                               ques = s.Question.Select(qu => new
                               {
                                   queContent = qu.QuestionContent,
                                   options = qu.Options.Select(op => new
                                   {
                                       description = op.Description
                                   }).ToList()
                               }).ToList()
                           }).ToList();
            var result = new
            {
                count = subList.Count(),
                subs = subList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }
        public object GetSubNames()
        {
            var subList = (from sub in _onlineTestContext.Subject
                           select new
                           {
                               subId = sub.Id,
                               subName = sub.Name,
                           }
                ).ToList();
            return subList;
        }

        public object GetSubjectList(int currentPage, int pageSize = 8)
        {
            var subList = (from s in _onlineTestContext.Subject
                           where !s.IsDelete
                           select new
                           {
                               id = s.Id,
                               name = s.Name,
                               queCount = s.QuestionCount,
                           }).ToList();
            var result = new
            {
                count = subList.Count(),
                subList = subList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetQueById(int queId)
        {
            Question que = _onlineTestContext.Question.SingleOrDefault(q => q.Id == queId && !q.IsDelete);
            var result = new
            {
                subName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == que.SubjectId).Name,
                queName = que.QuestionContent,
                type = que.QuestionType,
                grade = que.QuestionClass,
                rightAnswer = que.RightAnswer,
                options = que.Options.Select(ops => new
                {
                    description = ops.Description,
                    id = ops.Id,
                }).ToList(),
            };
            return result;
        }

        public object GetQueListBySubId(int subId, int queClass,int currentPage,int pageSize,string query)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var queList = (from qu in _onlineTestContext.Question
                          where qu.QuestionContent.Contains(query)&& qu.SubjectId == subId && qu.QuestionClass == queClass && !qu.IsDelete
                          orderby qu.Id descending
                          select new
                          {
                              name = qu.QuestionContent,
                              id = qu.Id,
                              rightAnswer = qu.RightAnswer,
                              options = qu.Options.Select(op => new
                              {
                                  description = op.Description,
                                  optionId = op.Id,
                              }).ToList()
                          }).ToList();
            var result = new
            {
                count = queList.Count(),
                queList = queList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }
        public object SearchQue(string query, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var queList = (from qu in _onlineTestContext.Question
                           where !qu.IsDelete && qu.QuestionContent.Contains(query)
                           select new
                           {
                               id = qu.Id,
                               subName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == qu.SubjectId).Name,
                               queName = qu.QuestionContent,
                               type = qu.QuestionType,
                               grade = qu.QuestionClass,
                               rightAnswer = qu.RightAnswer,
                               options = qu.Options.Select(ops => new
                               {
                                   description = ops.Description,
                                   id = ops.Id,
                               }).ToList(),
                           }).ToList();
            var result = new
            {
                count = queList.Count(),
                ques = queList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetQueList(int subId, string query, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var queList = (from qu in _onlineTestContext.Question
                           where !qu.IsDelete && qu.QuestionContent.Contains(query) && qu.SubjectId == subId
                           select new
                           {
                               id = qu.Id,
                               subName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == qu.SubjectId).Name,
                               queName = qu.QuestionContent,
                               type = qu.QuestionType,
                               grade = qu.QuestionClass,
                               rightAnswer = qu.RightAnswer,
                               options = qu.Options.Select(ops => new
                               {
                                   description = ops.Description,
                                   id = ops.Id,
                               }).ToList(),
                           }).ToList();
            var result = new
            {
                count = queList.Count(),
                ques = queList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public bool DeleteQue(int queId)
        {
            Question que = _onlineTestContext.Question.SingleOrDefault(qu => qu.Id == queId && !qu.IsDelete);
            try
            {
                que.IsDelete = !que.IsDelete;
                _onlineTestContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool CreatePaperByAdmin(int uId, int subId, int[] queIds)
        {
            lock (locker)
            {
                DateTime time = DateTime.Now;
                Paper paper = new Paper()
                {
                    UserId = uId,
                    SubId = subId,
                    Accuracy = 0,
                    CreateTime = time,
                    PaperName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == subId).Name + time + "测试试卷",
                    PaperDeatail = "",
                };
                _onlineTestContext.Paper.Add(paper);
                _onlineTestContext.SaveChanges();
                return CreateJPaperByAdmin(time, subId, queIds);
            }
        }

        public object CreatePaperByUser(int uId, int subId, int queClass)
        {
            lock (locker)
            {
                DateTime time = DateTime.Now;
                Paper paper = new Paper()
                {
                    UserId = uId,
                    SubId = subId,
                    Accuracy = 0,
                    CreateTime = time,
                    PaperName = _onlineTestContext.Subject.SingleOrDefault(s => s.Id == subId).Name + time + "专项测试",
                    PaperDeatail = "",
                };
                _onlineTestContext.Paper.Add(paper);
                _onlineTestContext.SaveChanges();
                int paperId = CreateJPaperByUser(time, queClass, subId);
                return GetJpaperById(paperId);
            }
        }

        private bool CreateJPaperByAdmin(DateTime createTime, int subId, int[] queIds)
        {
            try
            {
                int paperId = _onlineTestContext.Paper.SingleOrDefault(p => p.CreateTime.Equals(createTime) && p.SubId == subId).Id;
                foreach (int id in queIds)
                {
                    Jpaper jpaper = new Jpaper()
                    {
                        PapId = paperId,
                        QueId = id,
                    };
                    _onlineTestContext.Jpaper.Add(jpaper);
                    _onlineTestContext.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
        private int CreateJPaperByUser(DateTime createTime, int queClass, int subId)
        {
            int paperId = _onlineTestContext.Paper.SingleOrDefault(p => p.CreateTime.Equals(createTime) && p.SubId == subId).Id;
            //找到题目ID
            List<Question> testQuestions = GetTestQuestions(subId, queClass);
            foreach (var testQuestion in testQuestions)
            {
                Jpaper jpaper = new Jpaper()
                {
                    PapId = paperId,
                    QueId = testQuestion.Id,
                };
                _onlineTestContext.Jpaper.Add(jpaper);
            }
            _onlineTestContext.SaveChanges();
            return paperId;
        }

        //根据试卷编号获得具体的试卷
        public object GetJpaperById(int pId)
        {
            Paper paper = _onlineTestContext.Paper.SingleOrDefault(p => p.Id == pId);
            List<Jpaper> papers = _onlineTestContext.Jpaper.Where(item => item.PapId == pId).ToList();
            var ques = new List<object>();
            foreach (var item in papers)
            {
               var queItem = GetOptions(item.QueId);
                ques.Add(queItem);
            }
            //var paperResult = (from paper in _onlineTestContext.Jpaper
            //                   where paper.PapId == pId
            //                   select new
            //                   {
            //                       paperName = paper.Pap.PaperName,
            //                       createTime = paper.Pap.CreateTime,
            //                       detail = paper.Pap.PaperDeatail,
            //                       ques = paper.Pap.
            //                   }).ToList();
            //if (paperResult.Count == 0)
            //    return null;
            //var ques = new List<object>();
            //foreach (var item in paperResult)
            //{
            //    ques.Add(item.ques);
            //}
            var result = new
            {
                paperId = pId,
                paperName = paper.PaperName,
                createTime = paper.CreateTime,
                detail = paper.PaperDeatail,
                queCount = ques.Count(),
                ques = ques,
            };
            return result;
        }

        //得到试卷的题目
        public List<Question> GetTestQuestions(int subjectId, int paperClass, int queCount = 15)
        {
            //获取到该科目，该等级未删除的科目数量
            var questions = _onlineTestContext.Question.Where(q => q.SubjectId == subjectId && q.QuestionClass == paperClass && !q.IsDelete).ToList();
            if (questions == null)
                return null;
            //随机获取30个题目
            int[] qIds = GetQuestionId(queCount, questions.Count - 1);
            //筛选30个题目未删除的题目
            var qList = questions.Where(q => qIds.Contains(q.Id)).ToList();
            if (qList.Count() < 10)
            {
                qIds = GetQuestionId(queCount, questions.Count - 1);
                qList = questions.Where(q => qIds.Contains(q.Id)).ToList();
            }
            return qList;
        }

        //随机生成题目编号
        public int[] GetQuestionId(int idCount, int maxId)
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

        private object GetOptions(int queId)
        {
            lock (locker)
            {
                var result = (from que in _onlineTestContext.Question
                              where que.Id == queId
                              select new
                              {
                                  queContent = que.QuestionContent,
                                  queAnlysis = que.QuestionAnlysis,
                                  rightAnswer = que.RightAnswer,
                                  queId = que.Id,
                                  options = que.Options.Select(op => new
                                  {
                                      description = op.Description,
                                      opId = op.Id,
                                  }).ToList(),
                              }).ToList();
                return result;
            }
            
        }

        public object SubmitAnswer(int userId, int paperId, int[] queIds, int[] selectAnswerIds)
        {
            try
            {
                for (int index = 0; index < queIds.Length; index++)
                {
                    Result result = new Result()
                    {
                        UserId = userId,
                        PaperId = paperId,
                        QueId = queIds[index],
                        Content = selectAnswerIds[index],
                        IsRight = _onlineTestContext.Question.SingleOrDefault(q => q.Id == queIds[index]).RightAnswer.
                        Equals(_onlineTestContext.Options.SingleOrDefault(op => op.Id == selectAnswerIds[index]).Description)
                    };
                    _onlineTestContext.Result.Add(result);
                }
                _onlineTestContext.SaveChanges();
                float accuracy = CalculationAccuracy(userId, paperId);
                ChangePaperAccuracy(paperId, accuracy);
                return accuracy;
            }
            catch
            {
                return false;
            }        
            
        }

        private void ChangePaperAccuracy(int paperId,float accuracy)
        {
            Paper paper = _onlineTestContext.Paper.SingleOrDefault(p => p.Id == paperId);
            paper.Accuracy = accuracy;
            _onlineTestContext.SaveChanges();
        }

        private float CalculationAccuracy(int uId,int paperId)
        {
            //获取题目总数
            var queTotal = _onlineTestContext.Result.Where(r => r.PaperId == paperId && r.UserId == uId).ToList();
            //获取正确题目总数
            var rightQue = queTotal.Where(r => r.IsRight).ToList();
            return rightQue.Count() == 0 ? 0 :(float) rightQue.Count / queTotal.Count();
        }

        //private void CreateImage(string content)
        //{
        //    //判断字符串不等于空和null
        //    if (string.IsNullOrEmpty(content))
        //        return;
        //    //创建一个位图对象
        //    Bitmap image = new Bitmap((int)Math.Ceiling((content.Length * 18.0)), 30);
        //    //创建Graphics
        //    Graphics g = Graphics.FromImage(image);
        //    try
        //    {
        //        //清空图片背景颜色
        //        g.Clear(Color.White);
        //        Font font = new Font("Arial", 15.5f, (FontStyle.Bold));
        //        System.Drawing.Drawing2D.LinearGradientBrush brush = new System.Drawing.Drawing2D.LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), Color.Black, Color.DarkRed, 1.2f, true);
        //        g.DrawString(content, font, brush, 2, 2);
        //        //画图片的边框线
        //        g.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);
        //        image.Save("d:/001.jpg");
        //    }
        //    finally
        //    {
        //        g.Dispose();
        //        image.Dispose();
        //    }
        //}

    }
}
