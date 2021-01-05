using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ITripsRepository
    {
         Task<Trip> GetUserTrip(int tripId);
         Task<IEnumerable<TripDto>> GetUserTrips(int userId);
         Task<IEnumerable<AttractionDto>> GetAttractions(int tripId);
         Task<IEnumerable<EventDto>> GetSCategoryEvents(string sCategory, int cityId);
         Task<IEnumerable<PlaceDto>> GetSCategoryPlaces (string sCategory, int cityId);
         Task<IEnumerable<EventDto>> GetCategoryEvents(string sCategory, int cityId);
         Task<IEnumerable<PlaceDto>> GetCategoryPlaces (string sCategory, int cityId);
         Task<IEnumerable<PlaceDto>> GetOtherPlaces (int cityId);
    }
}