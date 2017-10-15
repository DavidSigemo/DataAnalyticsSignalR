using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAnalyticsSignalR.Models
{
    public class DelayGraph
    {
        public int max { get; set; }
        public int delay { get; set; }
        public int average { get; set; }
    }

    public class GaugeGraph
    {
        public int risk { get; set; }
    }

    public class StatusCodes
    {
        public int status300 { get; set; }
        public int status700 { get; set; }
        public int timeout { get; set; }
        public int other { get; set; }
    }

    public class Message
    {
        public string time { get; set; }
        public DelayGraph delayGraph { get; set; }
        public GaugeGraph gaugeGraph { get; set; }
        public StatusCodes statusCodes { get; set; }
    }
}