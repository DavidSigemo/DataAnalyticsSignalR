'use strict';
var googleGraphLoaded = false;
var delayGraph;
var delayCurrentData = [];

function init() {
    googleGraphLoaded = true;

    drawGraph("");
}

function getDelayChartOptions() {
    var options = {
        hAxis: {
            title: '',
            slantedText: false,
            scaleType: 'log'
        },
        vAxis: {
            title: 'Delay (ms)',
            scaleType: 'log',
            format: 'short'
        },
        legend: {
            position: 'top',
            alignment: 'center'
        },
        backgroundColor: {
            fill: '#E8E8E8'
        },
        chartArea: {
            left: '12%',
            width: '87%',
            top: '12%',
            height: '80%'
        }
    };
    return options;
}

function drawGraph(message) {
    if (delayGraph == undefined)
        delayGraph = new google.visualization.LineChart(document.getElementById('delayGraph'));

    var initDelayOptions = getDelayChartOptions();

    if (message != "") {
        var jsonMessage = JSON.parse(message);
        var newDelayGraphData = jsonMessage.delayGraph;
        updateGraphData(jsonMessage.time, newDelayGraphData);
        if (delayCurrentData.length == 0)
            delayCurrentData.push(["", 0, 0, 0]);
    }

    var initDelayDataTable = new google.visualization.DataTable();

    initDelayDataTable.addColumn('string', 'X');
    initDelayDataTable.addColumn('number', 'Max');
    initDelayDataTable.addColumn('number', 'Delay');
    initDelayDataTable.addColumn('number', 'Average');

    console.log(delayCurrentData);
    initDelayDataTable.addRows(delayCurrentData);

    delayGraph.draw(initDelayDataTable, initDelayOptions);
}

function updateGraphData(newTimeValue, newDelayData) {
    if (delayCurrentData.length !== 0) {
        var newCurrentData = [];
        var newMomentTime = moment(newTimeValue);
        var newMomentCompareTime = newMomentTime.subtract(30, 's');

        delayCurrentData.forEach(function (value, index) {
            var momentTime = moment(value[0]);
            if (momentTime.isAfter(newMomentCompareTime)) { //Remove 30s from the new value time, and if timestamp from the existing data is after we keep it
                newCurrentData.push(value);
            }
        });

        delayCurrentData = newCurrentData;
    }
    delayCurrentData.push([newTimeValue, newDelayData.max, newDelayData.delay, newDelayData.average]);
}

angular.module("DataAnalyticsSignalR", [])
    .service("SignalrService", function () {
        var messageHubProxy = null;

        this.initialize = function () {
            $.connection.hub.logging = true;
            messageHubProxy = $.connection.messageHub;

            messageHubProxy.client.hubMessage = function (message) {
                if (googleGraphLoaded)
                    drawGraph(message);
            };

            $.connection.hub.start().done(function () {
                console.log("connection started");
            }).fail(function (result) {
                console.log(result);
            });
        };
    })

    .controller("AppController", ["SignalrService", function (SignalrService) {
        SignalrService.initialize();
    }]);