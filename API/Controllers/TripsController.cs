using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TripsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ITripsRepository _tripsRepository;
        private readonly IMapper _mapper;
        public TripsController(IUserRepository userRepository, ITripsRepository tripsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _tripsRepository = tripsRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetUserTrips()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);
            var userId = user.Id;
            var trips = await _tripsRepository.GetUserTrips(userId);

            return Ok(trips);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTripDto>> GetTrip(int id)
        {
            var trip = await _tripsRepository.GetUserTrip(id);
            return _mapper.Map<UserTripDto>(trip);


        }
    }
}