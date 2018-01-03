using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;
using Swashbuckle.AspNetCore.Swagger;
using OnlineTest.Authorization;
using OnlineTest_Entity.Models;
using OnlineTest_Application.Users;
using OnlineTest_Application.Tasks;
using OnlineTest_Application.Communicate;

namespace OnlineTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        /// <summary>
        /// jwt添加
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureJwtAuthService(IServiceCollection services)
        {
            var audienceConfig = Configuration.GetSection("TokenAuthentication:Audience").Value;
            var symmetricKeyAsBase64 = Configuration.GetSection("TokenAuthentication:SecretKey").Value;
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!  
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                // Validate the JWT Issuer (iss) claim  
                ValidateIssuer = true,
                ValidIssuer = audienceConfig,

                // Validate the JWT Audience (aud) claim  
                ValidateAudience = true,
                ValidAudience = audienceConfig,

                // Validate the token expiry  
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = tokenValidationParameters;
            });
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureJwtAuthService(services);
            #region 跨域
            //配置跨域处理
            services.AddCors(options =>
            {
                options.AddPolicy("any", builder =>
                {
                    builder.AllowAnyOrigin() //允许任何来源的主机访问
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();//指定处理cookie
                });
            });
            /**/

            #endregion
            services.AddMvc();

            #region Swagger配置

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",

                    Title = "OnlineTest接口文档",

                    Description = "RESTful API for OnlineTest",

                    TermsOfService = "None",

                    Contact = new Swashbuckle.AspNetCore.Swagger.Contact { Name = "Alvin_Su", Email = "asdasdasd@outlook.com", Url = "" }
                });
                //Set the comments path for the swagger json and ui.
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var xmlPath = Path.Combine(basePath, "OnlineTest.xml");
                c.IncludeXmlComments(xmlPath);
                c.OperationFilter<HttpHeaderOperation>(); // 添加httpHeader参数
            });

            #endregion
            //依赖注入
            services.AddTransient<IUserAppService, UserAppService>();
            services.AddTransient<ITaskAppService, TaskAppService>();
            services.AddTransient<ICommunicateAppService, CommunicateAppService>();
            services.AddScoped<OnlineTestContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //配置Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineTest API V1");
                c.ShowRequestHeaders();
            });

            //用户身份认证
            app.UseAuthentication();
            app.UseStaticFiles();
            //全局调用
            app.UseCors("any");
            app.UseMvc();
        }
    }
}
