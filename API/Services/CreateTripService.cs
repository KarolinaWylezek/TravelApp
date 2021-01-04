using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
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
            var city = await _cityRepository.GetCityByNameAsync(createTripDto.Place);

            var cityId = city.Id;

             var events =(await _tripsRepository.GetSCategoryEvents(createTripDto.Subcategory, cityId))
                .Where(e => (e.StartTime >= createTripDto.TripDate && e.StartTime <= createTripDto.TripFinishDate)
                    || (e.FinishTime >= createTripDto.TripDate && e.StartTime <= createTripDto.TripFinishDate));

            // var events = _mapper.Map<ICollection<AttractionDto>>((await _tripsRepository.GetSCategoryEvents(createTripDto.Subcategory, cityId))
            //     .Where(e => (e.StartTime >= createTripDto.TripDate && e.StartTime <= createTripDto.TripFinishDate)
            //         || (e.FinishTime >= createTripDto.TripDate && e.StartTime <= createTripDto.TripFinishDate)));
            //  || (e.StartTime >= createTripDto.TripDate && e.FinishTime <= createTripDto.TripFinishDate)
            // || (e.StartTime <= createTripDto.TripDate && e.FinishTime >= createTripDto.TripFinishDate));

             var placesWithPromotions =(await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
             .Where(x => x.Promotion == true);



            // var placesWithPromotions = _mapper.Map<ICollection<AttractionDto>>((await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
            //  .Where(x => x.Promotion == true));

             var otherPlaces = (await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
             .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating);

            // var otherPlaces = _mapper.Map<ICollection<AttractionDto>>((await _tripsRepository.GetSCategoryPlaces(createTripDto.Subcategory, cityId))
            //  .Where(x => x.Promotion == false).OrderByDescending(x => x.Rating));


            //var attractions = events.Concat(placesWithPromotions).Concat(otherPlaces).ToList();

            ICollection<AttractionDto> attractions = new Collection<AttractionDto>();

            IEnumerable<EventDto> eventsToReturn = new Collection<EventDto>();

            DateTime startTime = DateTime.ParseExact(createTripDto.StartOfSightseeing, "HH:mm", CultureInfo.InvariantCulture);
            DateTime finishTime = DateTime.ParseExact(createTripDto.FinishOfSightseeing, "HH:mm", CultureInfo.InvariantCulture);

            TimeSpan routeBreak = new TimeSpan(0, 30, 0);
            int checker = 0;

            // AttractionDto attr = _mapper.Map<AttractionDto>(placesWithPromotions.ElementAt<PlaceDto>(0));

            // attractions.Add(attr);

            


            while (startTime < finishTime)
            {
                foreach (var item in events)
                {
                    if (item.StartTime <= DateTime.ParseExact((createTripDto.TripDate.ToString("dd.MM.yyyy") + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture))
                    {
                        AttractionDto att = _mapper.Map<AttractionDto>(item);
                        if(attractions.Any(x => x.Name == att.Name))
                            continue;
                            else
                            {
                                att.DateTimeOfVisit = DateTime.ParseExact((createTripDto.TripDate.ToString("dd.MM.yyyy") + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);
                                attractions.Add(att);
                                startTime = startTime + TimeSpan.Parse(item.ExpectedTimeSpent) + routeBreak;
                            }
                        
                    }
                }

                if(startTime > finishTime)
                    break;

                foreach (var place in placesWithPromotions)
                {
                    if ( DateTime.ParseExact(place.OpenTime, "HH:mm", CultureInfo.InvariantCulture) <= startTime && 
                        startTime <=  DateTime.ParseExact(place.CloseTime, "HH:mm", CultureInfo.InvariantCulture) -  TimeSpan.Parse(place.ExpectedTimeSpent))
                        {
                            AttractionDto att = _mapper.Map<AttractionDto>(place);
                            if(attractions.Any(x => x.Name == att.Name))
                            continue;
                            else{
                                att.DateTimeOfVisit = DateTime.ParseExact((createTripDto.TripDate.ToString("dd.MM.yyyy") + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);
                                attractions.Add(att);
                                startTime = startTime + TimeSpan.Parse(place.ExpectedTimeSpent) + routeBreak;
                            }
                            
                            
                                
                        }
                }

                if(startTime > finishTime)
                    break;

                foreach (var place in otherPlaces)
                {
                    if ( DateTime.ParseExact(place.OpenTime, "HH:mm", CultureInfo.InvariantCulture) <= startTime && 
                        startTime <=  DateTime.ParseExact(place.CloseTime, "HH:mm", CultureInfo.InvariantCulture) -  TimeSpan.Parse(place.ExpectedTimeSpent))
                        {
                            AttractionDto att = _mapper.Map<AttractionDto>(place);
                            if(attractions.Any(x => x.Name == att.Name))
                            continue;
                            else{
                                att.DateTimeOfVisit = DateTime.ParseExact((createTripDto.TripDate.ToString("dd.MM.yyyy") + " " + startTime.ToString("HH:mm")), "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture);
                                attractions.Add(att);
                                startTime = startTime + TimeSpan.Parse(place.ExpectedTimeSpent) + routeBreak;
                            }
                            
                            
                                
                        }
                }
               checker++;
               if(checker > 5)
                startTime += routeBreak;
               if(checker == 20) break;
            }


             return attractions;
        }
    }
}