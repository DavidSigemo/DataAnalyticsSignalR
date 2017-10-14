using DataAnalyticsSignalR.Hubs;
using DataAnalyticsSignalR.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataAnalyticsSignalR.Controllers
{
    [AllowAnonymous]
    public class ValuesController : ApiController
    {
        // POST api/values
        public void Post([FromBody]Message Message)
        {
            MessageHub.PushMessage(Message.MessageJSON);
        }
    }
}
