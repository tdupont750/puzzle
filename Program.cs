using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace PuzzleGame
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            using (var host = WebHost
                .CreateDefaultBuilder(args)
                .UseUrls("http://*:80")
                .UseStartup<Startup>()
                .UseContentRoot(Environment.CurrentDirectory)
                .Build())
            {
                host.Run();
            }
        }

        // ReSharper disable once ClassNeverInstantiated.Local
        private class Startup
        {
            // This method gets called by the runtime. Use this method to add services to the container.
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
            public void ConfigureServices(IServiceCollection services)
            {
            }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                app.UseStaticFiles();
                
                if (env.IsDevelopment())
                    app.UseDeveloperExceptionPage();

                app.Run(context =>
                {
                    context.Response.Redirect("/puzzle.html", true);
                    return Task.CompletedTask;
                });
            }
        }
    }
}
