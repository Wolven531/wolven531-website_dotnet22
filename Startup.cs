using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
//using Newtonsoft.Json.Converters;
//using Newtonsoft.Json.Serialization;
using System;
using wolven531WebsiteDotnet22.Models;
using wolven531WebsiteDotnet22.Services;

namespace wolven531WebsiteDotnet22
{
    public class Startup
    {
        private readonly IInfoService _infoService;
        private readonly ILogger _logger;

        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            Configuration = configuration;

            _infoService = new InfoService();
            _logger = logger;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.TryAddSingleton(_infoService);
            services.TryAddSingleton<IUnitStore, InMemoryUnitStore>();

            services.Configure<BookstoreDatabaseSettings>(Configuration.GetSection(nameof(BookstoreDatabaseSettings)));

            services.AddSingleton<IBookstoreDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<BookstoreDatabaseSettings>>().Value);

            services.AddSingleton<IBookService, BookService>();

            // TODO: this does NOT allow API web access after publish...
            //services.AddCors();
            //services.AddCors(builder => builder.AllowAnyHeader());
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddWebApiConventions();

            // NOTE: these settings did NOT change JSON serialization for Unit model, but the AddJsonOptions() below does
            //services.AddMvc().AddJsonOptions(options =>
            //{
            ////options.SerializerSettings.Converters.Clear();
            //options.SerializerSettings.Converters.Add(new StringEnumConverter(false));
            ////options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //});

            services.AddMvc()
                .AddJsonOptions(options => options.UseMemberCasing())
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            // unique page hit middleware
            //app.Use(async (context, next) =>
            //{
            //    if (context.Request.Method.Equals("get", StringComparison.OrdinalIgnoreCase) &&
            //        // TODO: would like to use StartsWithSegments here:
            //        context.Request.Path.HasValue &&
            //        context.Request.Path.Value.Contains("js", StringComparison.OrdinalIgnoreCase) &&
            //        context.Request.Path.Value.Contains("main.", StringComparison.OrdinalIgnoreCase))
            //    {
            //        _logger.LogDebug("[MIDDLEWARE FOR UNIQUE]\t\t\tMarking UNIQUE visit and calling next...");
            //        _infoService.AddUniquePageHit();
            //    }

            //    await next();// Call the next delegate/middleware in the pipeline
            //});

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // TODO: this does NOT allow API web access after publish...
            //app.UseCors();
            //app.UseMiddleware();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
                //routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
