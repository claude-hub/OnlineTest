using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ONLINETEST_APPLICATION.Tasks;
using ONLINETEST_ENTITY.Models;

namespace ONLINETEST.Controllers
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
        [HttpGet]
        public JsonResult GetSubjectList()
        {
            var subject = _taskAppService.GetSubList();
            //var subList;
            //foreach(var item in subject)
            //{
            //    var sub = new
            //    {
            //        id = item.Id,
            //        name = item.Name,
            //        queCount = item.QuestionCount,
            //    };
            //    subList.Add(sub);
            //}
            //var result = new {
            //    count = subject.Count(),
            //    sub = subList,
            //};

            //return Json(result);
            return Json(subject);
        }
#endregion

        #region 前台

        #endregion


        #region 后台管理

        /// <summary>
        /// 添加科目
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
        /// 添加问题
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
        public bool AddQuestion(int subjectId, string questionName, string questionAnlysis, int questionType, int questionClass, string rightAnswer)
        {
            return _taskAppService.CreateQuestion(subjectId, questionName, questionAnlysis, questionType, questionClass,rightAnswer);
        }

        /// <summary>
        /// 添加问题答案
        /// </summary>
        /// <param name="questionId">所属问题ID</param>
        /// <param name="answerDescription">答案</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public JsonResult AddAnswer(int questionId, string answerDescription)
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
        #endregion

        #region get
        /// <summary>
        /// 根据试卷ID获取试卷
        /// </summary>
        /// <param name="pId">试卷id</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetPaperByPid(int pId)
        {
            Paper paper = _taskAppService.GetPaperById(pId);
            var result = new
            {
                paperName = paper.PaperName,
                createTime = paper.CreateTime,
                question = _taskAppService.GetJpaperById(pId)
            };
            return Json(result);
        }
        #endregion
        #region add
        
        
        
        /// <summary>
        /// 创建用户的试卷
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="subjectId">试卷科目ID</param>
        /// <param name="paperClass">试卷题目难度</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public JsonResult CreatePaper(int userId, int subjectId, int paperClass)
        {
            try
            {
                int paperId = _taskAppService.CreatePaper(userId, subjectId, paperClass);
                return Json(paperId);
            }
            catch (Exception e)
            {
                return Json("创建试卷失败！");
            }
        }
        #endregion

        #region update
        #endregion

        #region delete
        /// <summary>
        /// 删除题目
        /// </summary>
        /// <param name="questionId"></param>
        /// <returns></returns>
        [HttpPost("DeleteQuestion")]
        public string DeleteQuestion(int questionId)
        {
            //同时删除对应的题目的答案
            return "ww";
        }
        #endregion

        #region search
        /// <summary>
        /// 按照科目来模糊查找问题并给出正确答案
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="searchContent"></param>
        /// <returns></returns>
        [HttpGet("SearchQuestion")]
        public string SearchQuestion(int subjectId, string searchContent)
        {

            return "ww";
        }
        /// <summary>
        /// 根据题目ID查看题目详情
        /// </summary>
        /// <param name="questionId"></param>
        /// <returns></returns>
        [HttpPost("GetQuestionByQId")]
        public string GetQuestionByQId(int questionId)
        {
            //并找到答案
            return "ww";
        }
        #endregion
        #region other
        /// <summary>
        /// 用户查看已经做过的某一题目的正确率
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="questionId"></param>
        /// <returns></returns>
        [HttpPost("CalculationAccuracy")]
        public string CalculationAccuracy(int userId, int questionId)
        {
            return "ww";
        }
        /// <summary>
        /// 判断用户提交的试卷测试答案是否正确
        /// </summary>
        /// <returns></returns>
        [HttpPost("JudgeIsRight")]
        public string JudgeIsRight()
        {
            return "ww";
        }
        /// <summary>
        /// 后台管理：根据科目找到所有的题目
        /// </summary>
        /// <param name="subjectId"></param>
        /// <returns></returns>

        [HttpPost("GetQuestionsBySubjectId")]
        public string GetQuestionsBySubjectId(int subjectId)
        {
            return "ww";
        }
        #endregion
    }
}