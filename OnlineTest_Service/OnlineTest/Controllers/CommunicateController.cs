using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTest_Application.Communicate;

namespace OnlineTest.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class CommunicateController : Controller
    {
        // GET: api/Communicate
        private readonly ICommunicateAppService _communicateAppService;
        public CommunicateController(ICommunicateAppService communicateAppService)
        {
            _communicateAppService = communicateAppService;
        }
        #region 公共
        /// <summary>
        /// 根据文章编号获取到文章
        /// </summary>
        /// <param name="artId"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetArticleById(int artId)
        {
            var result = _communicateAppService.GetArticleById(artId);
            return Json(result);
        }
        #endregion
        #region 前台
        /// <summary>
        /// 创建文章
        /// </summary>
        /// <param name="uId">用户ID</param>
        /// <param name="title">文章名</param>
        /// <param name="content">文章内容</param>
        /// <param name="label">文章标签</param>
        /// isPublish: 发布：true
        /// <returns></returns>
        [HttpPost]
        public bool CreateArticle(int uId,string title,string content,string label)
        {
            return _communicateAppService.CreateArticle(uId, title, content, label);
        }
        #endregion
        #region 后台管理
        /// <summary>
        /// 获取到已发布、未发布的文章
        /// </summary>
        /// <param name="query">搜索内容</param>
        /// <param name="isPublish">状态</param>
        /// <param name="currentPage">当前页码</param>
        /// <param name="pageSize">页面数量</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetArticleList(string query,bool isPublish, int currentPage, int pageSize = 15)
        {
            var result = _communicateAppService.GetArticleList(query, isPublish, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 发布文章
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool PublishArticle(int artId)
        {
            return _communicateAppService.PublishArticle(artId);
        }

        /// <summary>
        /// 撤销文章
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool UnPublishArticle(int artId)
        {
            return _communicateAppService.UnPublishArticle(artId);
        }
#endregion
    }
}
