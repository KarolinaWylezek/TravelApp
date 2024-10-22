using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Trip> UserTrips { get; set; }
        
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}