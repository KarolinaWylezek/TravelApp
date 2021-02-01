using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;

namespace API.Services
{
    public class CreateTripService : ICreateTripService
    {
        private readonly ICityRepository _cityRepository;
        private readonly ITripsRepository _tripsRepository;
        private readonly IMapper _mapper;
        public CreateTripService(ICityRepository cityRepository, ITripsRepository tripsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _tripsRepository = tripsRepository;
            _cityRepository = cityRepository;
        }

        public async Task<ICollection<AttractionDto>> ChooseAttractions(CreateTripDto createTripDto)
        {
            var city = await _cityRepository.GetCityByNameAsync(createTripDto.Place.ToLower());

            var cityId = city.Id;

             IEnumerable<EventDto> events = new Collection<EventDto>();
             IEnumerable<PlaceDto> subcategoryPlacesPromo = new Collection<PlaceDto>();
             IEnumerable<PlaceDto> subcategoryPlacesOthers = new Collection<PlaceDto>();


             DateTime sightseeingFinish = DateTime.ParseExact(createTripDto.FinishOfSightseeing, "HH:mm", CultureInfo.InvariantCulture);

             DateTime finishOfTrip = DateTime.ParseExact((createTripDto.TripFinishDate.ToString("dd.MM.yyyy") + " " 
                + sightseeingFinish.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);


            for (int i = 0; i < createTripDto.Subcategory.Count; i++)
            {
                events = events.Concat((await _tripsRepository.GetSCategoryEvents(createTripDto.Subcategory[i], cityId))
                .Where(e => (e.StartTime >= createTripDto.TripDate && e.StartTime <= finishOfTrip)
                    || (e.FinishTime >= createTripDto.TripDate && e.StartTime <= finishOfTrip)));


                subcategoryPlacesPromo = subcategoryPlacesPromo.Concat((await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory[i], cityId))
                    .Where(x => x.Promotion == true));

                subcategoryPlacesOthers = subcategoryPlacesOthers.Concat((await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory[i], cityId))
                    .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating));
            }

            IEnumerable<PlaceDto> categoryPlacesPromo = new Collection<PlaceDto>();
            IEnumerable<PlaceDto> categoryPlacesOthers = new Collection<PlaceDto>();


            for (int i = 0; i < createTripDto.Category.Count; i++)
            {
                categoryPlacesPromo = categoryPlacesPromo.Concat((await _tripsRepository.GetCategoryPlaces(createTripDto.Category[i], cityId))
                    .Where(x => x.Promotion == true));

                categoryPlacesOthers = categoryPlacesOthers.Concat((await _tripsRepository.GetCategoryPlaces(createTripDto.Category[i], cityId))
                    .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating));
            }

             var otherPlacesPromo = (await _tripsRepository.GetOtherPlaces(cityId))
             .Where(x => x.Promotion == true);

             var otherPlaces = (await _tripsRepository.GetOtherPlaces(cityId))
             .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating);

             var places = subcategoryPlacesPromo.Concat(subcategoryPlacesOthers).Concat(categoryPlacesPromo).Concat(categoryPlacesOthers)
                .Concat(otherPlacesPromo).Concat(otherPlaces);


            ICollection<AttractionDto> attractions = new Collection<AttractionDto>();

            TimeSpan routeBreak = new TimeSpan(0, 30, 0);
            

            int tripDay = 0;

            int noOfDays = (int)(createTripDto.TripFinishDate - createTripDto.TripDate).TotalDays;
           

            
            while (tripDay <= noOfDays)
            {
                int checker = 0;
                DateTime startTime = DateTime.ParseExact(createTripDto.StartOfSightseeing, "HH:mm", CultureInfo.InvariantCulture);
                DateTime finishTime = DateTime.ParseExact(createTripDto.FinishOfSightseeing, "HH:mm", CultureInfo.InvariantCulture);

                 while (startTime < finishTime)
                {
                    foreach (var item in events)
                    {
                        if (item.StartTime <= DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy") 
                                + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture)
                            && item.FinishTime >= DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy") 
                                + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture))
                        {
                            AttractionDto att = _mapper.Map<AttractionDto>(item);
                            if(attractions.Any(x => x.Name == att.Name))
                                continue;
                            else
                            {
                                att.DateTimeOfVisit = DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy") 
                                    + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);
                                attractions.Add(att);
                                startTime = startTime + TimeSpan.Parse(item.ExpectedTimeSpent) + routeBreak;
                               
                            }
                        
                        }

                        else if( item.StartTime <= DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy") 
                                    + " " + (startTime.AddHours(3)).ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture)
                                && item.FinishTime >= DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy") 
                                    + " " + (startTime.AddHours(3)).ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture))
                        {
                            AttractionDto att = _mapper.Map<AttractionDto>(item);
                            if(attractions.Any(x => x.Name == att.Name))
                                continue;
                            else
                            {
                                att.DateTimeOfVisit = item.StartTime;
                                attractions.Add(att);
                                TimeSpan delay = DateTime.ParseExact(item.StartTime.ToString("HH:mm"), "HH:mm", CultureInfo.InvariantCulture) - startTime;
                                startTime = startTime + TimeSpan.Parse(item.ExpectedTimeSpent) + routeBreak + delay;
                            }
                        }
                    }

                    if(startTime > finishTime)
                        break;

                    foreach (var place in places)
                    {
                        if ( DateTime.ParseExact(place.OpenTime, "HH:mm", CultureInfo.InvariantCulture) <= startTime && 
                            startTime <=  DateTime.ParseExact(place.CloseTime, "HH:mm", CultureInfo.InvariantCulture) -  TimeSpan.Parse(place.ExpectedTimeSpent))
                            {
                                AttractionDto att = _mapper.Map<AttractionDto>(place);
                                if(attractions.Any(x => x.Name == att.Name))
                                    continue;
                                else{
                                    att.DateTimeOfVisit = DateTime.ParseExact(((createTripDto.TripDate.AddDays(tripDay)).ToString("dd.MM.yyyy")
                                         + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);
                                    attractions.Add(att);
                                    startTime = startTime + TimeSpan.Parse(place.ExpectedTimeSpent) + routeBreak;
                                    break;
                                }
                            }
                    }

                    checker++;
                    if(checker > 20)
                        startTime += routeBreak;
                    if(checker == 100) break;

                }

            tripDay++;

            }

             return attractions;
        }
    }
}