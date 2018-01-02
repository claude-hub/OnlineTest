
using ONLINETEST_CORE.Tasks;
using System;
using System.Collections.Generic;
using System.Text;
using ONLINETEST_ENTITY.Models;

namespace ONLINETEST_APPLICATION.Tasks
{
    public class TaskAppService : ITaskAppService
    {
        private readonly TaskService _taskService = new TaskService();

        public bool CreateOption(int questionId, string answerDescription)
        {
            return _taskService.CreateOption(questionId, answerDescription);
        }

        public int CreatePaper(int userId, int subjectId,int paperClass)
        {
            return _taskService.CreatePaper(userId, subjectId, paperClass);
        }

        public bool CreateQuestion(int subjectId, string questionName,string questionAnlysis, int questionType, int questionClass)
        {
            return _taskService.CreateQuestion(subjectId, questionName, questionAnlysis, questionType, questionClass);
        }

        public bool CreateSubject(string name)
        {
            return _taskService.CreateSubject(name);
        }

        public List<Question> GetJpaperById(int pid)
        {
            return _taskService.GetJpaperById(pid);
        }

        public Paper GetPaperById(int pid)
        {
            return _taskService.GetPaperById(pid);
        }

        public Question GetQuestionBySearch(int subjectId, string searchContent)
        {
            throw new NotImplementedException();
        }
    }
}
