var JCSDLDefinition = (function() {
    "use strict";

    // define some privates
    var

    /**
     * Name of this definition object (for easy differentiation between instances)
     *
     * @type {String}
     */
    name = 'datasift',

    /**
     * List of all possible targets and their fields and their types.
     *
     * @type {Object}
     */
    targets = {
        // general interaction
        interaction : {
            name : 'All',
            fields : {
                content : {name: 'Content', preset: 'string'},
                geo : {name: 'Location', preset: 'geo'},
                link : {name: 'Link', preset: 'url'},
                sample : {name: 'Sample', type: 'float', input: 'slider', operators: ['lowerThan'], displayFormat : function(v) { return v + '%';}},
                source : {name: 'Source', preset: 'string'},
                type : {name: 'Type', type: 'string', input: 'select', operators: ['in'], options: {'2ch':'2channel','amazon':'Amazon','blog':'Blog','board':'Board','dailymotion':'DailyMotion','facebook':'Facebook','flickr':'Flickr','imdb':'IMDb','reddit':'Reddit','topic':'Topix','twitter':'Twitter','video':'Videos','youtube':'YouTube'}},
                title : {name: 'Title', preset: 'string'},
                author : {
                    name: 'Author',
                    icon : 'user',
                    fields: {
                        id : {name: 'ID', icon: 'user-id', preset: 'int'},
                        avatar : {name: 'Avatar', type: 'string', cs: true, input: 'text', operators: ['exists']},
                        link : {name: 'Link', preset: 'url'},
                        name : {name: 'Name', icon: 'fullname', preset: 'string'},
                        username : {name: 'User Name', preset: 'string'}
                    }
                }
            }
        },

        // user
        user : {
            name: 'User',
            fields : {
                email : {name: 'Email', preset: 'string'},
                fullName : {name: 'Full name', preset: 'string'},
                acceptsNewsletter : {name: 'Accepts newsletter', type: 'int', input: 'select', options: {'0':'False', '1':'True'}, operators: ['equals']},
                isTrusted : {name: 'Is trusted', type: 'int', input: 'select', options: {'0':'False', '1':'True'}, operators: ['equals']},
                loyaltyPointsTotal : {name: 'Loyaly points', preset: 'sliderRange', max : 1000, 'default' : 5},
                timezone : {name: 'Time Zone',  preset: 'string'},
                providerName : {name: 'Provider name', preset: 'string'}
            }
        },

        profile : {
            name : 'Profile',
            fields : {
                domains : {name: 'Domains',  preset: 'string'},
                geo : {name: 'Location', preset: 'geo'},
                in_reply_to_screen_name : {name: 'In Reply To',  icon: 'inreply', preset: 'string'},
                links : {name: 'Links', icon: 'link', preset: 'url'},
                mentions : {name: 'Mentions',  preset: 'string'},
                mention_ids : {name: 'Mentions IDs', preset: 'int'},
                source : {name: 'Source',  preset: 'string'},
                status : {name: 'Status', preset: 'singleSelect', options: {'user_protect':'Private Account','user_unprotect':'Public Account','user_suspend':'Suspended Account','user_unsuspend':'Account Released from Suspension','user_delete':'Deleted Account','user_undelete':'Restored Account','user_withheld':'User Withheld','status_withheld':'Status Withheld'}},
                text : {name: 'Tweet', icon: 'tweet', preset: 'string'},
                user : {
                    name: 'User',
                    fields : {
                        description : {name: 'Description', icon: 'user-description', preset: 'string'},
                        followers_count : {name: 'Followers Count', preset: 'sliderRange', max : 50000, 'default' : 1000, step : 100},
                        follower_ratio : {name: 'Follower Ratio', preset: 'sliderRange', type: 'float', max : 10, step : 0.1, 'default' : 2},
                        friends_count : {name: 'Friends Count', preset: 'sliderRange', max : 50000, 'default' : 1000, step : 100},
                        id : {name: 'ID', icon: 'user-id', preset: 'intArray'},
                        lang : {name: 'Language', icon: 'language', type: 'string', input: 'select', optionsSet: 'language', operators: ['exists', 'in']},
                        listed_count : {name: 'Listed Count', preset: 'sliderRange', max : 1000, 'default' : 500},
                        location : {name: 'Location', preset: 'string'},
                        name : {name: 'Name', icon: 'username', preset: 'string'},
                        profile_age : {name: 'Age', icon: 'age', preset: 'sliderRangeEquals', min : 7, max : 100, 'default' : 21},
                        screen_name : {name: 'Screen Name',  preset: 'string'},
                        statuses_count : {name: 'Statuses Count', preset: 'sliderRange', max : 10000, 'default' : 50},
                        time_zone : {name: 'Time Zone',  preset: 'string'},
                        url : {name: 'URL', icon: 'url', preset: 'url'},
                        verified : {name: 'Verified', icon: 'user_verified', type: 'int', input: 'select', options: {'1':'Verified'}, operators: ['equals']}
                    }
                },
                place : {
                    name: 'Place',
                    fields : {
                        attributes : {
                            name: 'Attributes',
                            icon: 'placeattrs',
                            fields : {
                                locality : {name: 'Locality', preset: 'string'},
                                region : {name: 'Region', preset: 'string'},
                                street_address : {name: 'Street Address', preset: 'string'}
                            }
                        },
                        country : {name: 'Country', preset: 'string'},
                        country_code : {name: 'Country Code', preset: 'string'},
                        full_name : {name: 'Full Name', icon: 'fullname', preset: 'string'},
                        name : {name: 'Name', icon: 'placename', preset: 'string'},
                        place_type : {name: 'Place Type', icon: 'type', preset: 'string'},
                        url : {name: 'URL', preset: 'url'}
                    }
                },
                retweet : {
                    name: 'Retweet',
                    fields : {
                        count : {name: 'No. of Retweets', preset: 'sliderRange', max : 10000, 'default' : 100},
                        domains : {name: 'Domains',  preset: 'string'},
                        elapsed : {name: 'Elapsed', preset: 'int'},
                        links : {name: 'Links', icon: 'link', preset: 'url'},
                        source : {name: 'Source',  preset: 'string'},
                        text : {name: 'Tweet', icon: 'tweet', preset: 'string'},
                        mentions : {name: 'Mentions',  preset: 'string'},
                        user : null // look at the bottom of the file
                    }
                },
                retweeted : {
                    name : 'Retweeted',
                    fields : {
                        id : {name: 'ID', preset: 'string'},
                        source : {name: 'Source',  preset: 'string'},
                        place : null, // look at the bottom of the file
                        user : null // look at the bottom of the file
                    }
                }
            }
        }
    },

    /**
     * Target configuration presets.
     *
     * @type {Object}
     */
    presets = {
        'string' : {
            type: 'string',
            cs: true,
            input: 'text',
            operators: ['exists', 'equals', 'substr', 'contains_any', 'all', 'wildcard', 'contains_near', 'different', 'regex_partial', 'regex_exact', 'in'],
            operator: 'contains_any'
        },
        'url' : {
            type: 'string',
            input: 'text',
            operators: ['exists', 'equals', 'substr', 'url_in', 'contains_any', 'all', 'wildcard', 'contains_near', 'different', 'regex_partial', 'regex_exact'],
            operator: 'url_in'
        },
        'singleSelect' : {
            type: 'string',
            input: 'select',
            single: true,
            operators: ['exists', 'equals', 'different']
        },
        'multiSelect' : {
            type: 'string',
            input: 'select',
            operators: ['exists', 'equals', 'different', 'in'],
            operator: 'in'
        },
        'geo' : {
            type: 'geo',
            input: ['geo_box', 'geo_radius', 'geo_polygon'],
            operators: ['exists', 'geo_box', 'geo_radius', 'geo_polygon']
        },
        'int' : {
            type: 'int',
            input: 'number',
            operators: ['exists', 'equals', 'different', 'greaterThan', 'lowerThan']
        },
        'intArray' : {
            type: 'int',
            input: 'number',
            operators: ['exists', 'equals', 'different', 'in'],
            operator: 'in'
        },
        'stringNumber' : {
            type: 'string',
            input: 'text',
            operators: ['exists', 'equals', 'different', 'in']
        },
        'sliderRange' : {
            type: 'int',
            input: 'slider',
            operators: ['greaterThan', 'lowerThan']
        },
        'sliderRangeEquals' : {
            type: 'int',
            input : 'slider',
            operators: ['equals', 'greaterThan', 'lowerThan']
        }
    },

    /**
     * Definition of CSDL operators.
     *
     * @type {Object}
     */
    operators = {
        substr : {
            label : 'Substring',
            description : 'Filter for a sequence of characters that form a word or part of a word.',
            code : 'substr',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=substr'
        },
        all : {
            label : 'Contains All',
            description : 'Filter for all strings in the list of strings.',
            code : 'contains_all',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=contains_all'
        },
        contains_any : {
            label : 'Contains words',
            description : 'Filter for one or more string values from a list of strings.',
            code : 'contains_any',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=contains_any'
        },
        contains_near : {
            label : 'Contains words near',
            description : 'Filter for two or more words that occur near to each other.',
            code : 'contains_near',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=contains_near'
        },
        wildcard : {
            label : 'Wildcard',
            description : 'Filter for strings using a wildcard character *.',
            code : 'wildcard',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=wildcard'
        },
        different : {
            label : 'Different',
            description : 'Not equal to...',
            code : '!=',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=equals-and-not-equals'
        },
        equals : {
            label : 'Equals',
            description : 'Equal to...',
            code : '==',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=equals-and-not-equals'
        },
        'in' : {
            label : 'In',
            description : 'Filter for one or more values from a list.',
            code : 'in',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=in'
        },
        url_in : {
            label : 'URL In',
            description : 'Filter for an exact match with a normalized URL.',
            code : 'url_in',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=url_in'
        },
        greaterThan : {
            label : '&gt;=',
            description : 'Greater than...',
            code : '>='
        },
        lowerThan : {
            label : '&lt;=',
            description : 'Lower than...',
            code : '<=',
        },
        exists : {
            label : 'Exists',
            description : 'Check whether a target is present.',
            code : 'exists',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=exists'
        },
        regex_partial : {
            label : 'Partial Regex',
            description : 'Filter for content by a regular expression that matches any part of the target.',
            code : 'regex_partial',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=regex_partial'
        },
        regex_exact : {
            label : 'Exact Regex',
            description : 'Filter for content by a regular expression that matches the entire target.',
            code : 'regex_exact',
            jsonp : 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id=regex_exact'
        },
        geo_box : {
            label : 'Geo Box',
            description : 'Filter for content originating from geographical locations within a bounding box.',
            code : 'geo_box'
        },
        geo_radius : {
            label : 'Geo Radius',
            description : 'Filter for posts originating inside a circle.',
            code : 'geo_radius'
        },
        geo_polygon : {
            label : 'Geo Polygon',
            description : 'Filter for content originating from geographical locations defined by a polygon with up to 32 vertices.',
            code : 'geo_polygon'
        }
    },

    /**
     * URL pattern for target help API.
     *
     * @type {String}
     */
    targetHelpJsonpSource = 'http://dev.datasift.com/tooltip-endpoint/tooltip/retrieve?callback=jcsdlJSONP&id={target}',

    /**
     * Definition of JCSDL VQB input types.
     *
     * @type {Object}
     */
    inputs = {
        text : {
            // list of operators for which the input field is a "tag" input field
            arrayOperators : ['contains_any', 'all', 'contains_near', 'all', 'in'],
            operator : 'contains_any'
        },
        number : {
            arrayOperators : ['in'],
            operator : 'equals'
        },
        select : {
            operator : 'in',
            sets : {
                language : {'af': 'Afrikaans', 'ar': 'Arabic', 'bg': 'Bulgarian', 'zh': 'Chinese', 'cs': 'Czech', 'da': 'Danish', 'nl': 'Dutch', 'en': 'English', 'et': 'Estonian', 'fi': 'Finnish', 'fr': 'French', 'de': 'German', 'el': 'Greek', 'he': 'Hebrew', 'hu': 'Hungarian', 'is': 'Icelandic', 'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'la': 'Latin', 'lt': 'Lithuanian', 'lv': 'Latvian', 'no': 'Norwegian', 'pl': 'Polish', 'pt': 'Portuguese', 'ro': 'Romanian', 'ru': 'Russian', 'es': 'Spanish', 'sv': 'Swedish', 'tl': 'Tagalog', 'tr': 'Turkish'},
                salienceTopics : {'Advertising':'Advertising','Agriculture':'Agriculture','Art':'Art','Automotive':'Automotive','Aviation':'Aviation','Banking':'Banking','Beverages':'Beverages','Biotechnology':'Biotechnology','Business':'Business','Crime':'Crime','Disasters':'Disasters','Economics':'Economics','Education':'Education','Elections':'Elections','Energy':'Energy','Fashion':'Fashion','Food':'Food','Hardware':'Hardware','Health':'Health','Hotels':'Hotels','Intellectual Property':'Intellectual Property','Investing':'Investing','Labor':'Labor','Law':'Law','Marriage':'Marriage','Mobile Devices':'Mobile Devices','Politics':'Politics','Real Estate':'Real Estate','Renewable Energy':'Renewable Energy','Robotics':'Robotics','Science':'Science','Social Media':'Social Media','Software and Internet':'Software and Internet','Space':'Space','Sports':'Sports','Technology':'Technology','Traditional':'Traditional','Travel':'Travel','Video Games':'Video Games','War':'War','Weather':'Weather'},
                newscredCategories : {'Africa':'Africa', 'Asia':'Asia', 'Business':'Business', 'Entertainment':'Entertainment', 'Environment':'Environment', 'Europe':'Europe', 'Health':'Health', 'Lifestyle':'Lifestyle', 'Other':'Other', 'Politics':'Politics', 'Regional':'Regional', 'Sports':'Sports', 'Technology':'Technology', 'Travel':'Travel', 'U.K.':'U.K.', 'U.S.':'U.S.', 'World':'World'}
            }
        },
        slider : {
            operator : 'greaterThan',
            min : 0,
            max : 100,
            step : 1,
            'default': 50,
            displayFormat : function(v) {return v;}
        },
        geo : {

        },
        geo_box : {
            operators : ['geo_box'],
            instructions : [
                'Click on the map to mark first corner of the box.',
                'Now click on the map to mark the second corner of the box.',
                'You can drag the markers around to change the box coordinates.'
            ]
        },
        geo_radius : {
            operators : ['geo_radius'],
            instructions : [
                'Click on the map to mark the center of the selection.',
                'Click again to set the radius.',
                'You can drag the markers around to move the center of the circle or the radius.'
            ]
        },
        geo_polygon : {
            operators : ['geo_polygon'],
            instructions : [
                'Click on the map to mark first tip of the polygon selection.',
                'Click on the map to mark the second tip of the polygon.',
                'Click on the map to mark the third tip and close the shape.',
                'Click on the map to add new markers or drag them around. Double-click a marker to remove it.'
            ]
        }
    },

    /**
     * The final definition object that is returned.
     *
     * @type {Object}
     */
    definition = {
        name : name,
        targets : {},
        operators : operators,
        targetHelpJsonpSource : targetHelpJsonpSource,
        inputs : inputs
    },

    /**
     * Merge two or more objects together.
     *
     * The rightmost argument has the top priority.
     *
     * @return {Object}
     */
    merge = function() {
        var result = {};

        for (var i in arguments) {
            if (arguments.hasOwnProperty(i)) {
                if (typeof arguments[i] !== 'object') {
                    continue;
                }

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        result[key] = arguments[i][key];
                    }
                }
            }
        }

        return result;
    },

    /**
     * Applies presets defined on target and its subfields and returns it.
     *
     * @param  {Object} target A target definition.
     * @return {Object}
     */
    parseTargetDefinition = function(target) {
        // some targets are null as they should copy from other targets (see bottom of the file)
        if (target === null) {
            return target;
        }

        // if target has subfields then iterate over them and parse them
        if (target.hasOwnProperty('fields')) {
            for (var name in target.fields) {
                if (target.fields.hasOwnProperty(name)) {
                    target.fields[name] = parseTargetDefinition(target.fields[name]);
                }
            }

        // if its a "real" target then apply a preset on it
        } else {
            // but only if it has a preset of course
            if (target.hasOwnProperty('preset')) {
                if (!presets.hasOwnProperty(target.preset)) {
                    throw new Error('Undefined preset "' + target.preset + '" used.');
                }

                target = merge(presets[target.preset], target);
            }
        }

        return target;
    };

    // go through all targets and apply presets on them
    for (var source in targets) {
        if (targets.hasOwnProperty(source)) {
            definition.targets[source] = parseTargetDefinition(targets[source]);
        }
    }


    return definition;

})();