using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineTest_Application.Communicate;
using Microsoft.AspNetCore.Authorization;

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
        /// 创建文章（前）
        /// </summary>
        /// <param name="uId">用户ID</param>
        /// <param name="title">文章名</param>
        /// <param name="content">文章内容</param>
        /// <param name="label">文章标签</param>
        /// isPublish: 发布：true
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public bool CreateArticle(int uId,string title,string content,string label)
        {
            return _communicateAppService.CreateArticle(uId, title, content, label);
        }

        /// <summary>
        /// 获取文章列表（前）
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetArticles(int currentPage,int pageSize = 10)
        {
            var result = _communicateAppService.GetArticleList(currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 获取文章的评论（前）
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetCommentByArtId(int artId)
        {
            var result = _communicateAppService.GetCommentByArtId(artId);
            return Json(result);
        }

        /// <summary>
        /// 增加文章赞数目（前）
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool AddArticlePraiseNum(int artId)
        {
            return _communicateAppService.AddArticlePraiseNum(artId);
        }

        /// <summary>
        /// 增加文章踩数目（前）
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool AddArticleTrampleNum(int artId)
        {
            return _communicateAppService.AddArticleTrampleNum(artId);
        }

        /// <summary>
        /// 增加评论赞数目（前）
        /// </summary>
        /// <param name="comId">评论编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool AddCommentPraiseNum(int comId)
        {
            return _communicateAppService.AddCommentPraiseNum(comId);
        }

        /// <summary>
        /// 增加评论踩数目（前）
        /// </summary>
        /// <param name="comId">评论编号</param>
        /// <returns></returns>
        [HttpPut]
        public bool AddCommentTrampleNum(int comId)
        {
            return _communicateAppService.AddCommentTrampleNum(comId);
        }

        /// <summary>
        /// 添加评论（前）
        /// </summary>
        /// <param name="uId">评论者ID</param>
        /// <param name="parentId">被评论者ID，默认0</param>
        /// <param name="artId">文章ID</param>
        /// <param name="content">评论内容</param>
        /// <returns></returns>
        [HttpPost]
        public bool AddComment(int uId, int artId, string content, int parentId = 0)
        { 
            return _communicateAppService.AddComment(uId, artId, content, parentId);
        }
            #endregion
            #region 后台管理
            /// <summary>
            /// 获取到已发布、未发布的文章(后台管理)
            /// </summary>
            /// <param name="query">搜索内容</param>
            /// <param name="isPublish">状态</param>
            /// <param name="currentPage">当前页码</param>
            /// <param name="pageSize">页面数量</param>
            /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetArticleList(string query,bool isPublish, int currentPage, int pageSize = 15)
        {
            var result = _communicateAppService.GetArticleList(query, isPublish, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 发布文章(后台管理)
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        public bool PublishArticle(int artId)
        {
            return _communicateAppService.PublishArticle(artId);
        }

        /// <summary>
        /// 撤销发布文章(后台管理)
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        public bool UnPublishArticle(int artId)
        {
            return _communicateAppService.UnPublishArticle(artId);
        }

        /// <summary>
        /// 删除文章(后台管理)
        /// </summary>
        /// <param name="artId">文章编号</param>
        /// IsDelete: 未删除：false
        /// <returns></returns>
        [Authorize]
        [HttpDelete]
        public JsonResult DeleteArticle(int artId)
        {
            var result = _communicateAppService.DeleteArticle(artId);
            return Json(result);
        }
#endregion
    }
}
