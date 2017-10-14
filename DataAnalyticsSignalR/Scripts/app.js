'use strict';

angular.module("DataAnalyticsSignalR", [])

    .service("SignalrService", function () {
        var messageHubProxy = null;

        this.initialize = function () {
            $.connection.hub.logging = true;
            messageHubProxy = $.connection.messageHub;

            messageHubProxy.client.hello = function () {
                console.log("Hello from ASP.NET Web API");
            };

            messageHubProxy.client.hubMessage = function (message) {
                //var newElement = document.createElement("p");
                //var newElementJquery = $(newElement);
                //newElementJquery.text(message);

                $('#messageDiv').text(message);
            };

            $.connection.hub.start().done(function () {
                console.log("started");
            }).fail(function (result) {
                console.log(result);
            });
        };
    })

    .controller("AppController", ["SignalrService", function (SignalrService) {
        SignalrService.initialize();
    }]);