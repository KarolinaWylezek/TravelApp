using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TripsRepository : ITripsRepository
    {
        private readonly DataContext _context;
        public TripsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Trip> GetUserTrip(int tripId)
        {
            return await _context.Trips.Include(a => a.Attractions).SingleOrDefaultAsync(x => x.Id == tripId);
        }

        public async Task<IEnumerable<TripDto>> GetUserTrips(int userId)
        {
            var query = _context.Trips.AsQueryable();
           
            query = query.Where(t => t.AppUserId == userId);

            return await query.Select(query => new TripDto{
                Id = query.Id,
                Place = query.Place,
                TripDate = query.TripDate,
                TripFinishDate = query.TripFinishDate
            }).ToListAsync();
        }
    }
}