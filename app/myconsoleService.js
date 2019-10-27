'use strict';

angular.module('myApp', [])

.service('myconsole', function() {

    var styleDefault = 'color:#0A0;background:#fff';
    var styleLog = 'color:#0A0;background:#fff';
    var styleInfo = 'color:#00A;background:#fff';
    var active = false;
    var tagChrono = 'countChrono';
    var tagGroup = 'groupInfo';

    /**
     * This function write in console
     * Types of message console log(by default), info, warning, error
     *
     * @param {string} text  
     * @param {object} args {type: by default log, style: style message}  
     *
     * @return {type} Return the message in console.
     */
    function write(text, args) {
        switch (args.type) {
            case 'log':
                console.log('%c' + text, args.style);
                break;
            case 'info':
                console.log('%c' + text, args.style);
                break;
            case 'warning':
                console.warn(text);
                break;
            case 'error':
                console.error(text);
                break;
            default:
                console.log(text);
        }
    }
    /**
     * This function obtain the properties from the parameter args
     *
     * @param {object} args {type: by default log, style: style message}  
     *
     * @return {type} Return the param args fill with the values of properties
     */
    function getProperties(args) {
        if (!args) {
            args = {};
        }
        if (!args.hasOwnProperty('type')) {
            args.type = 'log';
        }
        if (!args.hasOwnProperty('style') || args.style === '') {
            switch (args.type) {
                case 'log':
                    args.style = styleLog;
                    break;
                case 'info':
                    args.style = styleInfo;
                    break;
                default:
                    args.style = styleDefault;
            }
        }
        return args;
    }
    return {
        /**
         * This function write in console
         * Types of message console log(by default), info, warning, error
         *
         * @param {string} text  
         * @param {object} args {type: by default log, style: style message}  
         */
        println: function(text, args) {
            if (!active) return;
            write(text, getProperties(args));
        },
        /**
         * This function active to write in the console
         *
         * @param {boolea} status  
         */
        activate: function(status) {
            active = status;
        },
        /**
         * This function start chronometer to measure the time
         *
         * @param {string} tag  
         */
        startChrono: function(tag = tagChrono) {
            if (!active) return;
            console.time(tag);
        },
        /**
         * This function write measure in a point and continue measuring
         *
         * @param {string} tag  
         */
        logChrono: function(tag = tagChrono) {
            if (!active) return;
            console.timeLog(tag);
        },
        /**
         * This function stop chronometer to measure the time
         *
         * @param {string} tag
         */
        stopChrono: function(tag = tagChrono) {
            if (!active) return;
            console.timeEnd(tag);
        },
        /**
         * This function show console in mode table
         *
         * @param {object} text  
         */
        showTable: function(text) {
            if (!active) return;
            console.table(text);
        },
        /**
         * This function start to group the info
         *
         * @param {object} data
         * @param {boolea} tag
         * @param {object} args {type: by default log, style: style message}    
         */
        startGroup: function(data, tag = tagGroup, args) {
            if (!active) return;
            console.group(tag);
            data.map(p => write(p, getProperties(args)));
        },
        /**
         * This function stop to group the info
         *  
         */
        stopGroup: function() {
            if (!active) return;
            console.groupEnd();
        },
        /**
         * This function retrieve object style listing
         *  
         * @param {string} selector  
         */
        getPropsDom: function(selector) {
            if (!active) return;
            console.dir(eval(selector));
        }
    }
});