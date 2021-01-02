using System.Collections.Generic;
using System.Linq;
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
        private readonly ICityRepository _cityRepository;
        public TripsController(IUserRepository userRepository, ITripsRepository tripsRepository, IMapper mapper, ICityRepository cityRepository)
        {
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
        public async Task<ActionResult<TripDto>> CreateTrip(CreateTripDto createTripDto)
        {
            var trip = new Trip
            {
                Place = createTripDto.Place,
                TripDate = createTripDto.TripDate,
                TripFinishDate = createTripDto.TripFinishDate,
                Attractions = await this.GetAttractions(createTripDto)
                //  (_mapper.Map<ICollection<Attraction>>(await _tripsRepository.GetSCategoryEvents(createTripDto.Subcategory, cityId)))
                //      .Concat(_mapper.Map<ICollection<Attraction>>(await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))).ToList()
            };

            return _mapper.Map<TripDto>(trip);
        }

        private async Task<ICollection<Attraction>> GetAttractions(CreateTripDto createTripDto)
        {
            var city = await _cityRepository.GetCityByNameAsync(createTripDto.Place);

            var cityId = city.Id;

            var events = _mapper.Map<ICollection<Attraction>>(await _tripsRepository.GetSCategoryEvents(createTripDto.Subcategory, cityId));
            
            var placesWithPromotions = _mapper.Map<ICollection<Attraction>>(await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
             .Where(x => x.Promotion == true);

            var otherPlaces = _mapper.Map<ICollection<Attraction>>(await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
             .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating);


            var attractions = events.Concat(placesWithPromotions).Concat(otherPlaces).ToList();

            return attractions;

        }
    }
}