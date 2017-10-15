using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace DataAnalyticsSignalR.Hubs
{
    public class MessageHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<MessageHub>();

        public static void PushMessage(string message)
        {
            hubContext.Clients.All.hubMessage(message);
        }
    }
}