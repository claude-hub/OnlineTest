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
        object CreatePaperByUser(int uId, int subId,int queClass);
        bool CreatePaperByAdmin(int uId, int subId, int[] queIds);
        object GetPaperList(string query, int currentPage, int pageSize = 15);
        object GetPaperList(int currentPage, int pageSize = 8);
        object GetPaperListByUser(int uId, int currentPage, int pageSize = 10);
        object GetSubjectList(string query, int currentPage, int pageSize = 15);
        object GetSubjectList( int currentPage, int pageSize = 8);
        object GetJPaperById(int pId);
        object GetQueById(int queId);
        object GetQueListBySubId(int subId, int queClass);
        object GetQueList(int subId,string query, int currentPage, int pageSize = 15);
        bool DeleteQue(int queId);
        Object SearchQue(string query, int currentPage = 1, int pageSize = 20);
        bool SaveQue(int queId, string queContent, int queClass, string rightAnswer);
    }
}
