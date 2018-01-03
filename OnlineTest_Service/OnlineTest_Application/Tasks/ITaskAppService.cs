using OnlineTest_Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Application.Tasks
{
    public interface ITaskAppService
    {
        /// <summary>
        /// 添加科目
        /// </summary>
        /// <param name="name">科目名称</param>
        /// <returns></returns>
        bool CreateSubject(string name);
        /// <summary>
        /// 添加问题
        /// </summary>
        /// <param name="subjectId">科目ID</param>
        /// <param name="questionName">问题描述</param>
        /// <param name="questionAnlysis">题目解析</param>
        /// <param name="questionType">题目类型</param>
        /// <param name="questionClass">题目难度</param>
        /// <param name="rightAnswer">正确答案</param>
        /// <returns></returns>
        bool CreateQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer);
        /// <summary>
        /// 添加答案
        /// </summary>
        /// <param name="questionId">答案所属问题ID</param>
        /// <param name="answerDescription">具体答案</param>
        /// <returns></returns>
        bool CreateOption(int questionId, string answerDescription);
        /// <summary>
        /// 创建用户的试卷
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        int CreatePaper(int userId, int subjectId, int paperClass);

        List<Subject> GetSubList();
        object GetQueById(int queId);
        object GetQueList(string query, int currentPage, int pageSize = 15);
        bool DeleteQue(int queId);
        bool SaveQue(int queId, string queContent, int queClass, string rightAnswer);
        List<Question> GetJpaperById(int pid);
        Paper GetPaperById(int pid);
        Question GetQuestionBySearch(int subjectId, string searchContent);
    }
}
