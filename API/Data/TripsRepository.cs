using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TripsRepository : ITripsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TripsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<AttractionDto>> GetAttractions(int tripId)
        {
            var query = _context.Attractions.AsQueryable();

            query = query.Where(a => a.TripId == tripId);

            return await query.Select(query => new AttractionDto
            {
                Id = query.Id,
                Name = query.Name,
                Address = query.Address,
                Type = query.Type,
                Theme = query.Theme,
                Subtheme = query.Subtheme
                
            }).ToListAsync();
        }

        public async Task<Trip> GetUserTrip(int tripId)
        {
            return await _context.Trips.Include(a => a.Attractions).SingleOrDefaultAsync(x => x.Id == tripId);
        }

        public async Task<IEnumerable<TripDto>> GetUserTrips(int userId)
        {
            var query = _context.Trips.AsQueryable();

            query = query.Where(t => t.AppUserId == userId);

            return await query.Select(query => new TripDto
            {
                Id = query.Id,
                Place = query.Place,
                TripDate = query.TripDate,
                TripFinishDate = query.TripFinishDate
            }).ToListAsync();
        }
    }
}