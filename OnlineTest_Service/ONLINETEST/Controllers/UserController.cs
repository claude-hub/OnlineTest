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
using ONLINETEST_ENTITY.Models;
using ONLINETEST_APPLICATION.Users;
using Newtonsoft.Json;
using System.Net.Mail;
using Microsoft.AspNetCore.Cors;

namespace ONLINETEST.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [EnableCors("any")]
    public class UserController : Controller
    {
        private readonly IUserAppService _userAppService;
        public IConfiguration _configuration;
        public UserController(IUserAppService userAppService, IConfiguration configuration)
        {
            _userAppService = userAppService;
            _configuration = configuration;
        }
        [HttpPost]
        public JsonResult Login(string account, string password)
        {
            string mPassword = _userAppService.Md5Encrypt(password);
            User user = _userAppService.Login(account, mPassword);
            var result = new
            {
                userInfo = new
                {
                    id = user.UserId,
                    account = user.Account,
                    nikename = user.NikeName,
                },
                token = Token(account, mPassword).Result.Value
            };

            return Json(result);


        }
        /// <summary>
        /// 注册
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
        [HttpGet]
        public bool CheckRegister(string account,string validataCode)
        {
            return _userAppService.CheckRegister(account, validataCode);
        }
        [HttpPut]
        public bool ModifyPassword(int userId, string nPassword)
        {
            string mPassword = _userAppService.Md5Encrypt(nPassword);
            return _userAppService.ModifyPassword(userId, mPassword);
        }
       

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
                return Json("") ;
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