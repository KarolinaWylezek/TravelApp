using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if(users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }
            
            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }

        public static async Task SeedCities(DataContext context)
        {
            if (await context.Cities.AnyAsync()) return;

            var cityData = await System.IO.File.ReadAllTextAsync("Data/CitySeedData.json");
            var cities = JsonSerializer.Deserialize<List<City>>(cityData);

             foreach (var city in cities)
            {
                city.Name = city.Name.ToLower();
                context.Cities.Add(city);
            }
            await context.SaveChangesAsync();

        }

         public static async Task SeedCategories(DataContext context)
        {
            if (await context.Categories.AnyAsync()) return;

            var categoryData = await System.IO.File.ReadAllTextAsync("Data/CategorySeedData.json");
            var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

             foreach (var category in categories)
            {
                category.Name = category.Name.ToLower();
                context.Categories.Add(category);
            }
            await context.SaveChangesAsync();

        }
    }
}