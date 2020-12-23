using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public ICollection<TripDto> UserTrips { get; set; }
    }
}