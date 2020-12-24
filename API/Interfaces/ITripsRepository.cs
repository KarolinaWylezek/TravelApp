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
    }
}