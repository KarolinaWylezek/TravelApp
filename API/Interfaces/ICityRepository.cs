using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICityRepository
    {
         void Update (City city);
         Task<bool> SaveAllAsync();
         Task<IEnumerable<City>> GetCitiesAsync();
         Task<City> GetCityByIdAsync(int id);
         Task<City> GetCityByNameAsync(string name);
         Task<IEnumerable<CityDto>> GetCitiesDtoAsync();
         Task<CityDto> GetCityDtoAsync(string name);
    }
}