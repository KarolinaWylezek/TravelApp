using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CityRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _context.Cities.Include(e => e.Events).Include(p => p.Places).ToListAsync();
        }

        public async Task<PagedList<CityDto>> GetCitiesDtoAsync(Params cityParams)
        {
            // var query = _context.Cities.ProjectTo<CityDto>(_mapper.ConfigurationProvider).AsNoTracking();
            // return await PagedList<CityDto>.CreateAsync(query, cityParams.pageNumber, cityParams.PageSize);

            var query = _context.Cities.AsQueryable();
            if (cityParams.SelectedCountry == "All") 
            {
                 return await PagedList<CityDto>.CreateAsync(query.ProjectTo<CityDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                cityParams.pageNumber, cityParams.PageSize);
            }

            query = query.Where(c => c.Country == cityParams.SelectedCountry);

            return await PagedList<CityDto>.CreateAsync(query.ProjectTo<CityDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                cityParams.pageNumber, cityParams.PageSize);
            
        }

        public async Task<City> GetCityByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<City> GetCityByNameAsync(string name)
        {
            return await _context.Cities.Include(e => e.Events).Include(p => p.Places).FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<CityDto> GetCityDtoAsync(string name)
        {
            return await _context.Cities.Where(x => x.Name == name).ProjectTo<CityDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(City city)
        {
            _context.Entry(city).State = EntityState.Modified;
        }
        
        public void DeleteCity(string name)
        {
            var city = _context.Cities.FirstOrDefault(x => x.Name == name);
           _context.Cities.Remove(city);
        }

        public async Task<IEnumerable<string>> GetCountriesAsync()
        {
            return await _context.Cities.Select(c => c.Country).Distinct().ToListAsync();
        }
    }

     

}