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
#endregion
    }
}
