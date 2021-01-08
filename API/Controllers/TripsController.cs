using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
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
        private readonly ICityRepository _cityRepository;
        private readonly ICreateTripService _createTripService;
        private readonly DataContext _context;
        public TripsController(IUserRepository userRepository, ITripsRepository tripsRepository, IMapper mapper, ICityRepository cityRepository, 
            ICreateTripService createTripService, DataContext context)
        {
            _context = context;
            _createTripService = createTripService;
            _cityRepository = cityRepository;
            _mapper = mapper;
            _tripsRepository = tripsRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetUserTrips()
        {
            var trips = await _tripsRepository.GetUserTrips(User.GetUserId());

            return Ok(trips);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserTripDto>> GetTrip(int id)
        {
            var trip = await _tripsRepository.GetUserTrip(id);
            return _mapper.Map<UserTripDto>(trip);


        }

        [HttpPost("new-trip")]
        public async Task<ActionResult<UserTripDto>> CreateTrip(CreateTripDto createTripDto)
        { 
           
            var trip = new Trip
            {
                AppUserId = User.GetUserId(),
                Place = createTripDto.Place,
                TripDate = createTripDto.TripDate,
                TripFinishDate = createTripDto.TripFinishDate,
                Attractions = _mapper.Map<ICollection<Attraction>>(await _createTripService.ChooseAttractions(createTripDto))
                
            };

           

             _context.Trips.Add(trip);
             await _context.SaveChangesAsync();

            return _mapper.Map<UserTripDto>(trip);
        }


    }
}