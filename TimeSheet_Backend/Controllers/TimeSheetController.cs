using Microsoft.AspNetCore.Mvc;
using TimeSheetFullStack.Model;
using TimeSheetFullStack.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TimeSheetFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        private IDateSerivces _dateSerivces;

        public TimeSheetController(IDateSerivces dateSerivces)
        {
            _dateSerivces = dateSerivces;
        }

        // GET: api/<TimeSheetController>
        [HttpGet]
        public IEnumerable<Date> Get()
        {
            return _dateSerivces.GetActivityServices();
        }


        // POST api/<TimeSheetController>
        [HttpPost]
        public void Post([FromBody] Date date)
        {
            _dateSerivces.AddActivityServices(date);
        }

        //// PUT api/<TimeSheetController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<TimeSheetController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        // GET api/<TimeSheetController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
    }
}
