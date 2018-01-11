using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using OnlineTest_Entity.Models;
using OnlineTest_Application.Users;
using Newtonsoft.Json;
using System.Net.Mail;
using Microsoft.AspNetCore.Cors;
using OnlineTest_Application.Tasks;
using OnlineTest_Application.Communicate;

namespace OnlineTest.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("any")]
    public class UserController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ITaskAppService _taskAppService;
        private readonly ICommunicateAppService _communicateAppService;
        public IConfiguration _configuration;
        private readonly string AdminUser = "Admin";
        public UserController(IUserAppService userAppService,ITaskAppService taskAppService,ICommunicateAppService communicateAppService, IConfiguration configuration)
        {
            _userAppService = userAppService;
            _taskAppService = taskAppService;
            _communicateAppService = communicateAppService;
            _configuration = configuration;
        }

        #region 公共
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <param name="nPassword">新密码</param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        public bool ModifyPassword(int userId, string nPassword)
        {
            string mPassword = _userAppService.Md5Encrypt(nPassword);
            return _userAppService.ModifyPassword(userId, mPassword);
        }

        /// <summary>
        /// 修改昵称
        /// </summary>
        /// <param name="uId">用户编号</param>
        /// <param name="nikeName">昵称</param>
        /// <returns></returns>
        [Authorize]
        [HttpPut]
        public bool ModifyNikeName(int uId,string nikeName)
        {
            return _userAppService.ModifyNikeName(uId, nikeName);
        }

        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="account"></param>
        /// <param name="validataCode">验证码</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public bool CheckRegister(string account, string validataCode)
        {
            return _userAppService.CheckRegister(account, validataCode);
        }

        [Authorize]
        [HttpGet]
        public JsonResult GetUserById(int uId)
        {
            return Json(_userAppService.GetUserById(uId));
        }
        #endregion

        #region 前台

        /// <summary>
        /// 994185184@qq.com 普通用户登录接口（前）
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Login(string account, string password)
        {
            string mPassword = _userAppService.Md5Encrypt(password);
            User user = _userAppService.Login(account, mPassword);
            if (user == null)
                return Json(false);
            else
            {
                var result = new
                {
                    userInfo = new
                    {
                        id = user.UserId,
                        account = user.Account,
                        nikename = user.NikeName,
                        isVerification = user.IsVerification,
                    },
                    token = Token(account, mPassword).Result.Value
                };
                return Json(result);
            }           
        }

        /// <summary>
        /// 注册（前）
        /// </summary>
        /// <param name="account">使用邮箱作为注册账号</param>
        /// <param name="password"></param>
        /// <param name="nikename"></param>
        /// <returns></returns>
        [HttpPost]
        public bool Register(string account, string password, string nikename)
        {
            string mPassword = _userAppService.Md5Encrypt(password);
            return _userAppService.CreateUser(account, mPassword, nikename);
        }

        /// <summary>
        /// 个人中心显示所做的试卷（前）
        /// </summary>
        /// <param name="uId">用户编号</param>
        /// <param name="currentPage">当前页</param>
        /// <param name="pageSize">每页数量，默认10</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetPaperListByUser(int uId,int currentPage,int pageSize = 8)
        {
            var result = _taskAppService.GetPaperListByUser(uId, currentPage, pageSize);
            return Json(result);
        }

        /// <summary>
        /// 个人中心显示所发布的文章(前)
        /// </summary>
        /// <param name="uId">用户编号</param>
        /// <param name="currentPage">当前页</param>
        /// <param name="pageSize">每页数量，默认10</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetArticleListByUser(int uId,int currentPage,int pageSize = 8)
        {
            var result = _communicateAppService.GetArticleListByUser(uId, currentPage, pageSize);
            return Json(result);
        }
        #endregion

        #region 后台管理

        /// <summary>
        /// 1298520866@qq.com 3263250353@qq.com 管理员登录接口  (后台管理)
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AdminLogin(string account, string password)
        {
            string mPassword = _userAppService.Md5Encrypt(password);
            User user = _userAppService.AdminLogin(account, mPassword);
            if(user != null)
            {
                var result = new
                {
                    userInfo = new
                    {
                        id = user.UserId,
                        account = user.Account,
                        nikename = user.NikeName,
                        isVerification = user.IsVerification,
                    },
                    token = Token(account, mPassword).Result.Value
                };
                return Json(result);
            }
            else
            {
                return Json(false);
            }
            
        }
        /// <summary>
        /// 添加管理员(后台管理)
        /// </summary>
        /// <param name="account">使用邮箱注册</param>
        /// <param name="password">密码</param>
        /// <param name="nikename">昵称</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public bool AddAdmin(string account,string password,string nikename)
        {
            string mPassword = _userAppService.Md5Encrypt(password);
            return _userAppService.CreateUser(account, mPassword, nikename,AdminUser);
        }

        /// <summary>
        /// 根据角色获取到用户列表(后台管理)/搜索
        /// </summary>
        /// <param name="query">搜索内容</param>
        /// <param name="status">角色：Common,Admin</param>
        /// <param name="currentPage">当前页数</param>
        /// <param name="pageSize">每页数量</param>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public JsonResult GetUserList(string query,string status,int currentPage,int pageSize = 15)
        {
            var userList = _userAppService.GetUserListByStatus(query,status,currentPage,pageSize);
            return Json(userList);
        }

        
        #endregion





        #region jwt
        [HttpPost]

        public async Task<JsonResult> Token(string account, string password)
        {
            var context = HttpContext;
            var userClaims = await GetTokenClaims(account, password);
            if (userClaims == null)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(JsonConvert.SerializeObject("账号或密码错误!"));
                return Json("");
            }
            var audienceConfig = _configuration.GetSection("TokenAuthentication:Audience").Value;
            var symmetricKeyAsBase64 = _configuration.GetSection("TokenAuthentication:SecretKey").Value;
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);
            var jwtToken = new JwtSecurityToken(
                issuer: audienceConfig,
                audience: audienceConfig,
                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: new SigningCredentials(
                    signingKey,
                    SecurityAlgorithms.HmacSha256)
               );
            var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            var token_bearer = "Bearer " + token;
            var response = new
            {
                IsSuccess = true,
                Data = new
                {
                    token = token_bearer,
                    expiration = jwtToken.ValidTo
                }
            };
            //context.Response.ContentType = "application/json";
            //await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings
            //{
            //    Formatting = Formatting.Indented
            //}));
            return Json(response);
        }

        [HttpGet]

        private async Task<IEnumerable<Claim>> GetTokenClaims(string account, string password)
        {
            if (_userAppService.Login(account, password) != null)
                return new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, account)
                    };
            return null;
        }

        [HttpGet]

        [Authorize]

        public async Task<JsonResult> Values()
        {
            return Json(new List<string> { "values1", "values2" });
        }
        #endregion
    }
}