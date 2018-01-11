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

        public bool CreatePaperByAdmin(int uId, int subId, int[] queIds)
        {
            return _taskService.CreatePaperByAdmin(uId, subId, queIds);
        }

        public object CreatePaperByUser(int uId, int subId,int queClass)
        {
            return _taskService.CreatePaperByUser(uId, subId, queClass);
        }

        public int CreateQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer)
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

        public object GetJPaperById(int pId)
        {
            return _taskService.GetJpaperById(pId);
        }

        public object GetPaperList(string query, int currentPage, int pageSize = 15)
        {
            return _taskService.GetPaperList(query, currentPage, pageSize);
        }

        public object GetPaperList(int currentPage, int pageSize = 8)
        {
            return _taskService.GetPaperList(currentPage, pageSize);
        }

        public object GetPaperListByUser(int uId, int currentPage, int pageSize = 10)
        {
            return _taskService.GetPaperListByUser(uId, currentPage, pageSize);
        }

        public object GetQueById(int queId)
        {
            return _taskService.GetQueById(queId);
        }

        public object GetQueList(int subId,string query, int currentPage, int pageSize = 15)
        {
            return _taskService.GetQueList(subId,query, currentPage, pageSize);
        }

        public object GetQueListBySubId(int subId, int queClass, int currentPage, int pageSize, string query)
        {
            return _taskService.GetQueListBySubId(subId, queClass,currentPage,pageSize,query);
        }
        public object GetSubjectList(string query, int currentPage, int pageSize = 15)
        {
            return _taskService.GetSubjectList(query, currentPage, pageSize);
        }

        public object GetSubjectList(int currentPage, int pageSize = 8)
        {
            return _taskService.GetSubjectList(currentPage, pageSize);
        }

        public object GetSubNames()
        {
            return _taskService.GetSubNames();
        }

        public bool SaveQue(int queId, string queContent, int queClass, string rightAnswer)
        {
            return _taskService.SaveQue(queId, queContent, queClass, rightAnswer);
        }

        public object SearchQue(string query, int currentPage = 1, int pageSize = 20)
        {
            return _taskService.SearchQue(query, currentPage, pageSize);
        }
    }
}
