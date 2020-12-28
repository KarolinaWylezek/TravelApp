using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface ICityRepository
    {
         void Update (City city);
         Task<bool> SaveAllAsync();
         Task<IEnumerable<City>> GetCitiesAsync();
         Task<City> GetCityByIdAsync(int id);
         Task<City> GetCityByNameAsync(string name);
         Task<PagedList<CityDto>> GetCitiesDtoAsync(Params cityParams);
         Task<CityDto> GetCityDtoAsync(string name);
         Task<IEnumerable<string>> GetCountriesAsync();
         void DeleteCity(string name);
    }
}