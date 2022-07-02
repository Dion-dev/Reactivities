using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Presistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using AutoMapper;
using Application.Core;
using Application.Activities;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services,IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
        
            services.AddDbContext<DataContext>(optionsAction =>
            {
                optionsAction.UseSqlite(config.GetConnectionString("Default Connection"));
            });
            services.AddCors(opt =>
                {
                    opt.AddPolicy("CorsPolicy",policy =>{
                        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                    });
                }
            
            );
            services.AddMediatR(typeof(List.Handler).Assembly);     
            services.AddAutoMapper(typeof(MappingProfiles).Assembly); 
            return services;
        }
    }
}