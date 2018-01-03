using OnlineTest_Core.Tasks;
using OnlineTest_Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineTest_Application.Tasks
{
    public class TaskAppService : ITaskAppService
    {
        private readonly TaskService _taskService = new TaskService();
        private OnlineTestContext _onlineTestContext = new OnlineTestContext();

        public bool CreateOption(int questionId, string answerDescription)
        {
            return _taskService.CreateOption(questionId, answerDescription);
        }

        public int CreatePaper(int userId, int subjectId, int paperClass)
        {
            return _taskService.CreatePaper(userId, subjectId, paperClass);
        }

        public bool CreateQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer)
        {
            return _taskService.CreateQuestion(subjectId, questionName, questionAnlysis, questionType, questionClass, rightAnswer);
        }

        public bool CreateSubject(string name)
        {
            return _taskService.CreateSubject(name);
        }

        public bool DeleteQue(int queId)
        {
            return _taskService.DeleteQue(queId);
        }

        public List<Question> GetJpaperById(int pid)
        {
            return _taskService.GetJpaperById(pid);
        }

        public Paper GetPaperById(int pid)
        {
            return _taskService.GetPaperById(pid);
        }

        public object GetQueById(int queId)
        {
            return _taskService.GetQueById(queId);
        }

        public object GetQueList(string query, int currentPage, int pageSize = 15)
        {
            return _taskService.GetQueList(query, currentPage, pageSize);
        }

        public Question GetQuestionBySearch(int subjectId, string searchContent)
        {
            throw new NotImplementedException();
        }

        public List<Subject> GetSubList()
        {
            return _onlineTestContext.Subject.ToList();
        }

        public bool SaveQue(int queId, string queContent, int queClass, string rightAnswer)
        {
            return _taskService.SaveQue(queId, queContent, queClass, rightAnswer);
        }
    }
}
