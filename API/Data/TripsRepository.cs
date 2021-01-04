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
                Subtheme = query.Subtheme,
                DateTimeOfVisit = query.DateTimeOfVisit
                
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

        public async Task<IEnumerable<EventDto>> GetSCategoryEvents(string sCategory, int cityId)
        {
            var events = _context.Events.AsQueryable();
            events = events.Where(c => c.Subtheme == sCategory).Where(c => c.CityId == cityId);
            return await events.Select(events => new EventDto
            {
                Id = events.Id,
                Name = events.Name,
                Address = events.Address,
                StartTime = events.StartTime,
                FinishTime = events.FinishTime,
                Theme = events.Theme,
                Subtheme = events.Subtheme,
                ExpectedTimeSpent = events.ExpectedTimeSpent
            }).ToListAsync();
        }

        public async Task<IEnumerable<PlaceDto>> GetSCategoryPlaces (string sCategory, int cityId)
        {
            var places = _context.Places.AsQueryable();
            places = places.Where(c => c.Subtheme == sCategory);
            places = places.Where(c => c.CityId == cityId);
            return await places.Select(places => new PlaceDto
            {
                Id = places.Id,
                Name = places.Name,
                Address = places.Address,
                OpenTime = places.OpenTime,
                CloseTime = places.CloseTime,
                Theme = places.Theme,
                Subtheme = places.Subtheme,
                Rating = places.Rating,
                Promotion = places.Promotion,
                ExpectedTimeSpent = places.ExpectedTimeSpent
            }).ToListAsync();
        }

         public async Task<IEnumerable<EventDto>> GetCategoryEvents(string Category, int cityId)
        {
            var events = _context.Events.AsQueryable();
            events = events.Where(c => c.Theme == Category).Where(c => c.CityId == cityId);
            return await events.Select(events => new EventDto
            {
                Id = events.Id,
                Name = events.Name,
                Address = events.Address,
                StartTime = events.StartTime,
                FinishTime = events.FinishTime,
                Theme = events.Theme,
                Subtheme = events.Subtheme,
                ExpectedTimeSpent = events.ExpectedTimeSpent
            }).ToListAsync();
        }

        public async Task<IEnumerable<PlaceDto>> GetCategoryPlaces (string Category, int cityId)
        {
            var places = _context.Places.AsQueryable();
            places = places.Where(c => c.Theme == Category);
            places = places.Where(c => c.CityId == cityId);
            return await places.Select(places => new PlaceDto
            {
                Id = places.Id,
                Name = places.Name,
                Address = places.Address,
                OpenTime = places.OpenTime,
                CloseTime = places.CloseTime,
                Theme = places.Theme,
                Subtheme = places.Subtheme,
                Rating = places.Rating,
                Promotion = places.Promotion,
                ExpectedTimeSpent = places.ExpectedTimeSpent
            }).ToListAsync();
        }

        public async Task<IEnumerable<PlaceDto>> GetOtherPlaces (string Category, int cityId)
        {
            var places = _context.Places.AsQueryable();
            places = places.Where(c => c.Theme != Category);
            places = places.Where(c => c.CityId == cityId);
            return await places.Select(places => new PlaceDto
            {
                Id = places.Id,
                Name = places.Name,
                Address = places.Address,
                OpenTime = places.OpenTime,
                CloseTime = places.CloseTime,
                Theme = places.Theme,
                Subtheme = places.Subtheme,
                Rating = places.Rating,
                Promotion = places.Promotion,
                ExpectedTimeSpent = places.ExpectedTimeSpent
            }).ToListAsync();
        }

        
    }
}