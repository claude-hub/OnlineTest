using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using OnlineTest_Application.Tasks;
using OnlineTest_Entity.Models;

namespace OnlineTest.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class TaskController : Controller
    {
        private readonly ITaskAppService _taskAppService;
        
        public TaskController(ITaskAppService taskAppService)
        {
            _taskAppService = taskAppService;
        }

        #region 公共
        

        /// <summary>
        /// 通过编号找到问题
        /// </summary>
        /// <param name="queId">问题编号</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetQueById(int queId)
        {
            var result = _taskAppService.GetQueById(queId);
            return Json(result);
        }
        #endregion

        #region 前台

        /// <summary>
        /// 搜索题目
        /// </summary>
        /// <param name="query"></param>
        /// <param name="currentPage">当前页</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult SearchQue(string query,int currentPage = 1,int pageSize = 20)
        {
            var result = _taskAppService.SearchQue(query, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 首页、专项练习部分显示科目列表（前）
        /// </summary>
        /// <param name="currentPage">当前页</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetSubjects(int currentPage, int pageSize = 8)
        {
            var result = _taskAppService.GetSubjectList(currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 获取答题之前可供选择的试卷列表（前）
        /// </summary>
        /// <param name="currentPage">当前页/param>
        /// <param name="pageSize">页面数量</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetPapers(int currentPage, int pageSize = 8)
        {
            var result = _taskAppService.GetPaperList(currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 用户通过专项练习选择科目创建试卷进行专项测试（前）
        /// </summary>
        /// <param name="uId"></param>
        /// <param name="subId"></param>
        /// <param name="queClass">题目等级</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult StartSpecialExercise(int uId,int subId,int queClass)
        {
            var result = _taskAppService.CreatePaperByUser(uId, subId, queClass);
            return Json(result);
        }
        /// <summary>
        /// 获取到用户选择试卷的题目及其选项（前）
        /// </summary>
        /// <param name="pId">试卷编号</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult StartExerciseByPId(int pId)
        {
            var result = _taskAppService.GetJPaperById(pId);
            return Json(result);
        }
        #endregion


        #region 后台管理

        /// <summary>
        /// 添加试卷时，根据所选科目，难度显示题目（后台管理）
        /// </summary>
        /// <param name="subId">科目编号</param>
        /// <param name="queClass">题目难度</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetQueListBySubId(int subId,int queClass)
        {
            var result = _taskAppService.GetQueListBySubId(subId, queClass);
            return Json(result);
        }

        /// <summary>
        /// 管理员选择题目后提交创建试卷（后台管理）
        /// </summary>
        /// <param name="uId">用户ID</param>
        /// <param name="subId">科目ID</param>
        /// <param name="queIds">问题id</param>
        /// <returns></returns>
        [HttpPost]
        public bool CreatePaper(int uId, int subId, int[] queIds)
        {
            return _taskAppService.CreatePaperByAdmin(uId, subId, queIds);
        }

        /// <summary>
        /// 添加科目(后台管理)
        /// </summary>
        /// <param name="subjectName">科目名称</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public bool AddSubject(string subjectName)
        {
            return _taskAppService.CreateSubject(subjectName);
        }

        /// <summary>
        /// 添加问题(后台管理)
        /// </summary>
        /// <param name="subjectId">科目ID</param>
        /// <param name="questionName">题目描述</param>
        /// <param name="questionAnlysis">题目解析</param>
        /// <param name="questionType">题目类型</param>
        /// <param name="questionClass">题目难度</param>
        /// <param name="rightAnswer">题目正确答案</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public int AddQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer)
        {
            return _taskAppService.CreateQuestion(subjectId, questionName, questionAnlysis, questionType, questionClass,rightAnswer);
        }

        /// <summary>
        /// 添加问题答案(后台管理)
        /// </summary>
        /// <param name="questionId">所属问题ID</param>
        /// <param name="answerDescription">答案</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public JsonResult AddOptions(int questionId, string answerDescription)
        {
            try
            {
                return Json(_taskAppService.CreateOption(questionId, answerDescription));
            }
            catch (Exception e)
            {
                return Json("添加选项失败！");
            }

        }

        /// <summary>
        /// 获取到试卷列表/按试卷名搜索（后台管理）
        /// </summary>
        /// <param name="query">搜索内容</param>
        /// <param name="currentPage">当前页码</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetPaperList(string query, int currentPage, int pageSize = 15)
        {
            var result = _taskAppService.GetPaperList(query, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 获取到科目列表/搜索科目（后台管理）
        /// </summary>
        /// <param name="query">搜索内容</param>
        /// <param name="currentPage">当前页码</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetSubjectList(string query, int currentPage, int pageSize = 15)
        {
            var result = _taskAppService.GetSubjectList(query, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 获取到题目列表/根据题目搜索(后台管理)
        /// </summary>
        /// <param name="subId">科目编号</param>
        /// <param name="query">搜索内容</param>
        /// <param name="currentPage">当前页码</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        ///[Authorize]
        [Authorize]
        [HttpGet]
        public JsonResult GetQueList(int subId,string query, int currentPage, int pageSize = 15)
        {
            var result = _taskAppService.GetQueList(subId,query, currentPage, pageSize);
            return Json(result);
        }



        /// <summary>
        /// 保存编辑的问题(后台管理)
        /// </summary>
        /// <param name="queId">问题编号</param>
        /// <param name="queContent">问题描述</param>
        /// <param name="queClass">问题等级</param>
        /// <param name="rightAnswer">正确答案</param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        public bool SaveQue(int queId,string queContent,int queClass,string rightAnswer)
        {

            return _taskAppService.SaveQue(queId, queContent, queClass, rightAnswer);
        }

        /// <summary>
        /// 根据id删除题目(后台管理)
        /// </summary>
        /// <param name="queId">题目编号</param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        public bool DeleteQue(int queId)
        {
            return _taskAppService.DeleteQue(queId);
        }
        #endregion
     
        
        
        
       
    }
}