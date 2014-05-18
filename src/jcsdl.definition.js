var JCSDLDefinition = (function() {
    'use strict';

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
            icon : 'fa fa-certificate',
            fields : {
                content : {name: 'Content', preset: 'string'},
                geo : {name: 'Location', icon: 'fa fa-map-marker', preset: 'geo'},
                link : {name: 'Link', preset: 'url'},
                sample : {name: 'Sample', type: 'float', input: 'slider', operators: ['lowerThan'], displayFormat : function(v) { return v + '%';}},
                source : {name: 'Source', preset: 'string'},
                type : {name: 'Type', type: 'string', input: 'select', operators: ['in'], options: {'2ch':'2channel','amazon':'Amazon','blog':'Blog','board':'Board','dailymotion':'DailyMotion','facebook':'Facebook','flickr':'Flickr','imdb':'IMDb','reddit':'Reddit','topic':'Topix','twitter':'Twitter','video':'Videos','youtube':'YouTube'}},
                title : {name: 'Title', preset: 'string'},
                author : {
                    name: 'Author',
                    icon : 'fa fa-user',
                    fields: {
                        id : {name: 'ID', preset: 'int'},
                        avatar : {name: 'Avatar', type: 'string', cs: true, input: 'text', operators: ['exists']},
                        link : {name: 'Link', preset: 'url'},
                        name : {name: 'Name', preset: 'string'},
                        username : {name: 'User Name', preset: 'string'}
                    }
                }
            }
        },

        // twitter
        twitter : {
            name : 'Twitter',
            icon : 'fa fa-twitter-square',
            fields : {
                domains : {name: 'Domains',  preset: 'string'},
                geo : {name: 'Location', preset: 'geo'},
                in_reply_to_screen_name : {name: 'In Reply To',  icon: 'fa fa-reply', preset: 'string'},
                links : {name: 'Links', icon: 'fa fa-external-link', preset: 'url'},
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
                        id : {name: 'ID', preset: 'intArray'},
                        lang : {name: 'Language', icon: 'fa fa-language', type: 'string', input: 'select', optionsSet: 'language', operators: ['exists', 'in']},
                        listed_count : {name: 'Listed Count', preset: 'sliderRange', max : 1000, 'default' : 500},
                        location : {name: 'Location', preset: 'string'},
                        name : {name: 'Name', preset: 'string'},
                        profile_age : {name: 'Age', icon: 'age', preset: 'sliderRangeEquals', min : 7, max : 100, 'default' : 21},
                        screen_name : {name: 'Screen Name',  preset: 'string'},
                        statuses_count : {name: 'Statuses Count', preset: 'sliderRange', max : 10000, 'default' : 50},
                        time_zone : {name: 'Time Zone',  preset: 'string'},
                        url : {name: 'URL', icon: 'url', preset: 'url'},
                        verified : {name: 'Verified', type: 'int', input: 'select', options: {'1':'Verified'}, operators: ['equals']}
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
                        country : {name: 'Country', icon: 'fa fa-flag', preset: 'string'},
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
                        elapsed : {name: 'Elapsed', icon: 'fa fa-clock', preset: 'int'},
                        links : {name: 'Links', icon: 'fa fa-external-link', preset: 'url'},
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
        },

        // facebook
        facebook : {
            name : 'Facebook',
            icon : 'fa fa-facebook-square',
            fields : {
                application : {name: 'Application', preset: 'string'},
                caption : {name: 'Caption', preset: 'string'},
                'likes-names' : {name: 'Likes Names', preset: 'string'},
                link : {name: 'Link', preset: 'url'},
                message : {name: 'Message',preset: 'string'},
                name : {name: 'Name', icon: 'fullname', preset: 'string'},
                og : {
                    name : 'Open Graph',
                    icon : 'opengraph',
                    fields : {
                        description : {name: 'Description', icon: 'description', preset: 'string'},
                        //length : {name: 'Length', icon: 'og-length', preset: 'string'},
                        photos : {name: 'Photos', icon: 'photos', preset: 'string'},
                        title : {name: 'Title', preset: 'string'},
                        type : {name: 'Type', preset: 'string'}
                    }
                },
                source : {name: 'Source',preset: 'string'},
                type : {name: 'Type', preset: 'string'}
            }
        },

        blog : {
            name : 'Blog',
            icon : 'fa fa-pencil-square',
            fields : {
                author : {
                    name : 'Author',
                    icon : 'fa fa-user',
                    fields : {
                        avatar : {name: 'Avatar', preset: 'string'},
                        link : {name: 'Author Link', preset: 'url'},
                        name : {name: 'Author Name', icon: 'author-name', preset: 'string'},
                        username : {name: 'User Name', preset: 'string'}
                    }
                },
                content : {name: 'Content', preset: 'string'},
                contenttype : {name: 'Content Type', preset: 'singleSelect', options: {'HTML':'html'}},
                domain : {name: 'Domain', preset: 'string'},
                link : {name: 'Link', preset: 'url'},
                post : {
                    name : 'Post',
                    fields : {
                        link : {name: 'Link', preset: 'url'},
                        title : {name: 'Title', preset: 'string'}
                    }
                },
                title : {name: 'Title', preset: 'string'},
                type : {name: 'Type', preset: 'singleSelect', options: {'thread':'Thread','post':'Post'}}
            }
        },

        reddit : {
            name : 'Reddit',
            icon : 'fa fa-reddit',
            fields : {
                author : {
                    name : 'Author',
                    icon : 'fa fa-user',
                    fields : {
                        link : {name: 'Author Link', preset: 'url'},
                        name : {name: 'Author Name', icon: 'author-name', preset: 'string'}
                    }
                },
                content : {name: 'Content', preset: 'string'},
                contenttype : {name: 'Content Type', preset: 'singleSelect', options: {'HTML':'html'}},
                link : {name: 'Link', preset: 'url'},
                thread : {name: 'Thread', preset: 'string'},
                title : {name: 'Title', preset: 'string'},
                type : {name: 'Type', preset: 'singleSelect', options: {'thread':'Thread','post':'Post'}}
            }
        },

        youtube : {
            name : 'YouTube',
            icon : 'fa fa-youtube',
            fields : {
                author : {
                    name : 'Author',
                    icon : 'fa fa-user',
                    fields : {
                        link : {name: 'Author Link', preset: 'url'},
                        name : {name: 'Author Name', icon: 'author-name', preset: 'string'}
                    }
                },
                category : {name: 'Category', preset: 'string'},
                commentslink : {name: 'Comments Link', preset: 'url'},
                content : {name: 'Content', preset: 'string'},
                duration : {name: 'Duration', preset: 'sliderRangeEquals', min : 0, max : 10800, 'default' : 3600, displayFormat : function(v) {return v + 's';}},
                tags : {name: 'Tags', preset: 'string'},
                thumbnail : {name: 'Thumbnail', preset: 'string'},
                title : {name: 'Title', preset: 'string'},
                type : {name: 'Type', type: 'string', preset: 'singleSelect', options: {'video':'Video','comment':'Comment'}},
                videolink : {name: 'Video Link', preset: 'url'}
            }
        },

        tumblr : {
            name : 'Tumblr',
            icon : 'fa fa-tumblr-square',
            fields : {
                activity : {name: 'Activity', icon: 'tumblractivity', preset: 'singleSelect', options: {'CreatePost':'Create Post', 'UpdatePost':'Update Post', 'DeletePost':'Delete Post', 'Likes':'Likes', 'Unlikes':'Unlikes'}},
                type : {name: 'Type', icon: 'tumblrtype', preset: 'singleSelect', options: {'photo':'Photo','video':'Video','audio':'Audio','text':'Text','chat':'Chat','quote':'Quote','answer':'Answer','link':'Link'}},
                state : {name: 'State', preset: 'singleSelect', options: {'published':'Published','queued':'Queued','draft':'Draft','private':'Private'}},
                'source-blogid' : {name: 'Source Blog ID', preset: 'stringNumber'},
                'dest-blogid' : {name: 'Destination Blog ID', preset: 'stringNumber'},
                'dest-postid' : {name: 'Destination Post ID', preset: 'stringNumber'},
                'root-blogid' : {name: 'Root Blog ID', preset: 'stringNumber'},
                'root-postid' : {name: 'Root Post ID', preset: 'stringNumber'},
                blogid : {name: 'Blog ID', preset: 'stringNumber'},
                blog_name : {name: 'Blog Name', preset: 'string'},
                title : {name: 'Title', icon: 'tumblrtitle', preset: 'string'},
                body : {name: 'Body', preset: 'string'},
                format : {name: 'Format', preset: 'singleSelect', options: {'html':'HTML','markdown':'Markdown'}},
                post_url : {name: 'Post URL', preset: 'url'},
                slug : {name: 'URL Slug', preset: 'string'},
                text : {name: 'Quote Text', preset: 'string'},
                source_html : {name: 'Quote HTML Source', preset: 'string'},
                source_url : {name: 'Source URL', preset: 'url'},
                source_title : {name: 'Source Title', preset: 'string'},
                tags : {name: 'Tags', preset: 'string'},
                note_count : {name: 'Note Count', preset: 'sliderRange', min: 0, max: 10000, 'default': 50},
                question : {name: 'Question', preset: 'string'},
                answer : {name: 'Answer', preset: 'string'},
                asking_name : {name: 'Asking Name', preset: 'string'},
                asking_url : {name: 'Asking URL', preset: 'url'},
                video_url : {name: 'Video URL', preset: 'url'},
                duration : {name: 'Video Duration', preset: 'stringNumber'},
                artist : {name: 'Artist', preset: 'string'},
                track_name : {name: 'Track Name', preset: 'string'},
                album : {name: 'Track Album', preset: 'string'},
                plays : {name: 'Track Plays', preset: 'sliderRangeEquals', min: 0, max: 10000, 'default': 50},
                audio_url : {name: 'Track URL', preset: 'url'},
                link : {name: 'Photo Link', preset: 'url'},
                description : {name: 'Link Description', preset: 'string'},
                caption : {name: 'Caption', preset: 'string'},
                meta : {
                    name : 'Meta',
                    fields : {
                        url : {name: 'URL', preset: 'url'},
                        type : {name: 'Type', preset: 'singleSelect', options: {'photo':'Photo','video':'Video','audio':'Audio','text':'Text','chat':'Chat','quote':'Quote','answer':'Answer','link':'Link'}},
                        description : {name: 'Description', preset: 'string'},
                        likes_local : {name: 'Local Likes', preset: 'sliderRangeEquals', min: 0, max: 10000, 'default': 50},
                        likes_global : {name: 'Global Likes', preset: 'sliderRangeEquals', min: 0, max: 10000, 'default': 50},
                        reblogged_global : {name: 'Reblogged', preset: 'sliderRangeEquals', min: 0, max: 10000, 'default': 50}
                    }
                },
                reblogged : {
                    name : 'Reblogged',
                    fields : {
                        'from-id' : {name: 'From ID', preset: 'stringNumber'},
                        'from-url' : {name: 'From URL', preset: 'string'},
                        'from-name' : {name: 'From Name', preset: 'string'},
                        'from-title' : {name: 'From Title', preset: 'string'},
                        'root-id' : {name: 'Root ID', preset: 'stringNumber'},
                        'root-url' : {name: 'Root URL', preset: 'url'},
                        'root-name' : {name: 'Root Name', preset: 'string'},
                        'root-title' : {name: 'Root Title', preset: 'string'}
                    }
                }
            }
        },

        googleplus : {
            name : 'Google+',
            icon : 'fa fa-google-plus',
            fields : {
                url : {name: 'URL', preset: 'url'},
                type : {name: 'Type', preset: 'singleSelect', options: {'activity':'Activity','comment':'Comment','plusone':'+1'}},
                verb : {name: 'Verb', preset: 'string'},
                title : {name: 'Title', preset: 'string'},
                'actor-id' : {name: 'Author ID', input: 'text', operators: ['exists', 'equals', 'different']},
                'actor-display_name' : {name: 'Author Name', preset: 'string'},
                'actor-url': {name: 'URL', preset: 'url'},
                'object' : {
                    name : 'Object',
                    fields : {
                        object_type : {name: 'Object Type', icon: 'type', preset: 'string'},
                        content : {name: 'Content', preset: 'string'},
                        url : {name: 'URL', preset: 'url'},
                        attachments : {
                            name : 'Attachments',
                            icon : 'attachment',
                            fields : {
                                object_type : {name: 'Type', icon: 'type', preset: 'string'},
                                display_name : {name: 'Display Name', icon: 'name', preset: 'string'},
                                content : {name: 'Content', preset: 'string'},
                                url : {name: 'URL', preset: 'url'}
                            }
                        }
                    }
                },
                'in_reply_to-id' : {name: 'In Reply To: ID', preset: 'stringNumber'},
                'in_reply_to-url' : {name: 'In Reply To: URL', preset: 'url'},
                provider_title : {name: 'Provider Title', preset: 'string'}
            }
        },

        instagram : {
            name : 'Instagram',
            icon : 'fa fa-instagram',
            fields : {
                type : {name: 'Type', preset: 'singleSelect', options: {'image':'Image','video':'Video','comment':'Comment','like':'Like'}},
                tags : {name: 'Tags', preset: 'string'},
                filter : {name: 'Filter', preset: 'string'},
                link : {name: 'Link', icon: 'url', preset: 'url'},
                images : {
                    name : 'Images',
                    icon : 'image',
                    fields : {
                        low_resolution : {
                            name : 'Low Resolution',
                            fields : {
                                url : {name: 'URL', preset: 'url'},
                                width : {name: 'Width', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640},
                                height : {name: 'Height', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640}
                            }
                        },
                        thumbnail : {
                            name : 'Thumbnail',
                            fields : {
                                url : {name: 'URL', preset: 'url'},
                                width : {name: 'Width', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640},
                                height : {name: 'Height', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640}
                            }
                        },
                        standard_resolution : {
                            name : 'Standard Resolution',
                            fields : {
                                url : {name: 'URL', preset: 'url'},
                                width : {name: 'Width', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640},
                                height : {name: 'Height', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640}
                            }
                        }
                    }
                },
                videos : {
                    name : 'Videos',
                    icon : 'video',
                    fields : {
                        low_resolution : {
                            name : 'Low Resolution',
                            fields : {
                                url : {name: 'URL', preset: 'url'},
                                width : {name: 'Width', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640},
                                height : {name: 'Height', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640}
                            }
                        },
                        standard_resolution : {
                            name : 'Standard Resolution',
                            fields : {
                                url : {name: 'URL', preset: 'url'},
                                width : {name: 'Width', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640},
                                height : {name: 'Height', preset: 'sliderRangeEquals', min: 0, max: 1024, 'default': 640}
                            }
                        }
                    }
                },
                caption : {
                    name : 'Caption',
                    fields : {
                        text : {name: 'Text', preset: 'string'},
                        'from-id' : {name: 'From ID', preset: 'stringNumber'},
                        'from-username' : {name: 'From Username', preset: 'string'},
                        'from-full_name' : {name: 'From Full Name', icon: 'fullname', preset: 'string'}
                    }
                },
                from : {
                    name : 'From',
                    fields : {
                        id : {name: 'ID', preset: 'stringNumber'},
                        username : {name: 'Username', preset: 'string'},
                        full_name : {name: 'Full Name', icon: 'fullname', preset: 'string'},
                        bio : {name: 'Bio', preset: 'string'},
                    }
                },
                'location-id' : {name: 'Location ID', preset: 'stringNumber'},
                'location-name' : {name: 'Location Name', preset: 'string'},
                users_in_photo : {
                    name: 'Users in Photo',
                    fields : {
                        id : {name: 'ID', preset: 'stringNumber'},
                        full_name : {name: 'Full Name', icon: 'fullname', preset: 'string'},
                        username : {name: 'Username', preset: 'string'},
                    }
                },
                'attribution-name' : {name: 'Attribution Name', preset: 'string'},
                'attribution-website' : {name: 'Attribution Website', preset: 'url'},
                text : {name: 'Text', preset: 'string'},
                media : {
                    name : 'Media',
                    fields : {
                        caption : {name: 'Caption', preset: 'string'},
                        tags : {name: 'Tags', preset: 'string'},
                        type : {name: 'Type', preset: 'string'},
                        link : {name: 'Link', preset: 'url'},
                        id : {name: 'ID', preset: 'stringNumber'},
                        username : {name: 'Username', preset: 'string'}
                    }
                },
                geo : {name: 'Geo', preset: 'geo'}
            }
        },

        wordpress : {
            name : 'Wordpress',
            icon : 'fa fa-wordpress',
            fields : {
                article : {
                    name : 'Article',
                    fields : {
                        author : {
                            name : 'Author',
                            fields : {
                                id : {name: 'Author ID', preset: 'stringNumber'},
                                link : {name: 'Author Link', preset: 'url'},
                                username : {name: 'Author Username', preset: 'string'}
                            }
                        },
                        blog_id : {name: 'Blog ID', icon: 'blogid', preset: 'stringNumber'},
                        comment_count : {name: 'Comment Count', icon: 'comments-count', preset: 'sliderRange', min: 0, max: 1000},
                        id : {name: 'ID', preset: 'stringNumber'},
                        lang : {name: 'Language', icon: 'fa fa-language', preset: 'multiSelect', optionsSet: 'language'},
                        link : {name: 'Link', preset: 'url'},
                        post_id : {name: 'Post ID', preset: 'stringNumber'},
                        summary : {name: 'Summary', icon: 'description', preset: 'string'},
                        title : {name: 'Title', preset: 'string'}
                    }
                },
                author : {
                    name : 'Author',
                    fields : {
                        id : {name: 'Author ID', preset: 'stringNumber'},
                        link : {name: 'Author Link', preset: 'url'},
                        username : {name: 'Author Username', preset: 'string'}
                    }
                },
                content : {name: 'Content', preset: 'string'},
                tags : {name: 'Tags', preset: 'string'},
                categories : {name: 'Categories', icon: 'category', preset: 'string'},
                inreplyto : {name: 'In Reply To', icon: 'fa fa-reply', preset: 'string'},
                link : {name: 'Link', preset: 'url'},
                permalink : {name: 'Permalink', preset: 'url'},
                title : {name: 'Title', preset: 'string'},
                type : {name: 'Type', preset: 'singleSelect', options: {'comment':'Comment','post':'Post','like':'Like'}},
                blog : {
                    name : 'Blog',
                    fields : {
                        name : {name: 'Name', preset: 'string'},
                        link : {name: 'Link', preset: 'url'},
                        id : {name: 'ID', preset: 'stringNumber'},
                        lang : {name: 'Language', icon: 'fa fa-language', preset: 'multiSelect', optionsSet: 'language'},
                        summary : {name: 'Summary', icon: 'description', preset: 'string'}
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

    // and finally copy some targets to others, as they're identical
    definition.targets.twitter.fields.retweet.fields.user = definition.targets.twitter.fields.user;
    definition.targets.twitter.fields.retweeted.fields.place = definition.targets.twitter.fields.place;
    definition.targets.twitter.fields.retweeted.fields.user = definition.targets.twitter.fields.user;


    return definition;

})();