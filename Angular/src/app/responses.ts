
export let SetupObject = {
    children: [
        [
            0,
            1,
            2,
            3,
            4
        ],
        3
    ],
    subfeatureStartIndex: 2,
    items: [
        {
            children: [
                [
                    0,
                    1,
                    2
                ],
                [
                    {
                        index: 4,
                        frontendName: "Toilet Building Location",
                        nullable: false,
                        information: "location info"
                    }
                ],
                [],
                []
            ],
            frontendName: "Toilet",
            information: "Toilet info"
        },
        {
            children: [
                [
                    3,
                    4
                ],
                [
                    {
                        index: 2,
                        frontendName: "Valve",
                        nullable: false,
                        information: "valve info"
                    }
                ],
                [],
                []
            ],
            frontendName: "Boiler",
            information: "boiler info"
        },
        {
            children: [
                [
                    5,
                    6
                ],
                [],
                [],
                []
            ],
            frontendName: "Valve",
            information: "valve info"
        },
        {
            children: [
                [
                    7,
                    8,
                    9
                ],
                [],
                [],
                []
            ],
            frontendName: "Global",
            information: "non feature-specific columns"
        },
        {
            children: [
                [
                ],
                [],
                [],
                []
            ],
            frontendName: "Building",
            information: "building!"
        }
    ],
    features: [
        {
            children: [
                [
                    0,
                    1,
                    2
                ],
                [10],
                0
            ],
            frontendName: "Toilet",
            information: "Use pressurized water to cast away evil",
            featureChildren: [3, 4]
        },
        {
            children: [
                [
                    3,
                    4
                ],
                [],
                1
            ],
            frontendName: "Boiler",
            information: "boil boil boil",
            featureChildren: [
                2
            ]
        },
        {
            children: [
                [
                    5,
                    6
                ],
                [],
                2
            ],
            frontendName: "Valve",
            information: "valve valve",
            featureChildren: []
        },
        {
            children: [
                [],
                [],
                -1
            ],
            frontendName: "Sensor",
            information: "A motion/infrared sensor that triggers flush",
            featureChildren: []
        },
        {
            children: [
                [],
                [],
                -1
            ],
            frontendName: "Restroom Stall",
            information: "Privacy barrier separating toilet from restroom common space",
            featureChildren: []
        },
    ],
    columns: [
        {
            default: true,
            frontendName: "GPF",
            filterSelector: {
                selectorKey: "numericChoice",
                selectorValue: null
            },
            inputSelector: "numericEqual",
            datatypeKey: 0,
            nullable: false,
            information: "GPF stands for Gallons Per Flush",
            accuracy: 95.6
        },
        {
            default: true,
            frontendName: "SOP",
            filterSelector: null,
            inputSelector: {
                selectorKey: "dropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 1,
            nullable: false,
            information: "SOP stands for Standard Operating Procedure",
            accuracy: 100.0
        },
        {
            default: true,
            frontendName: "Basin Brand",
            filterSelector: {
                selectorKey: "dropdown",
                selectorValue: "QUERYSTRING"
            },
            inputSelector: {
                selectorKey: "dropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 0,
            nullable: true,
            information: "Company that sold basin end-product",
            accuracy: 100.0
        },
        {
            default: true,
            frontendName: "PSI",
            filterSelector: {
                selectorKey: "numericChoice",
                selectorValue: null
            },
            inputSelector: "numericEqual",
            datatypeKey: 0,
            nullable: true,
            information: "PSI stands for pounds per square inch",
            accuracy: 98.3
        },
        {
            default: true,
            frontendName: "SOP",
            filterSelector: null,
            inputSelector: {
                selectorKey: "dropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 1,
            nullable: false,
            information: "SOP stands for Standard Operating Procedure",
            accuracy: 100.0
        },
        {
            default: true,
            frontendName: "Leaking",
            filterSelector: {
                selectorKey: "bool",
                selectorValue: null
            },
            inputSelector: "bool",
            datatypeKey: 2,
            nullable: false,
            information: "Water loss",
            accuracy: 100.00
        },
        {
            default: true,
            frontendName: "Flow Rate",
            filterSelector: {
                selectorKey: "numericChoice",
                selectorValue: null
            },
            inputSelector: "numericEqual",
            datatypeKey: 0,
            nullable: true
        },
        {
            default: true,
            frontendName: "Date Submitted",
            filterSelector: {
                selectorKey: "calendarRange",
                selectorValue: null
            },
            inputSelector: {
                selectorKey: "calendarEqual",
                selectorValue: null
            },
            datatypeKey: 0,
            nullable: false,
            information: "The date the audit submission was uploaded",
            accuracy: 92.3
        },
        {
            default: true,
            frontendName: "Organization",
            filterSelector: {
                selectorKey: "searchableDropdown",
                selectorValue: "QUERYSTRING"
            },
            inputSelector: {
                selectorKey: "searchableDropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 1,
            nullable: false,
            information: "The organization that made the measurements",
            accuracy: 76.4
        },
        {
            default: false,
            frontendName: "Some Numeric Choice Selector",
            filterSelector: {
                selectorKey: "numericChoice",
                selectorValue: "QUERYSTRING"
            },
            inputSelector: {
                selectorKey: "searchableDropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 1,
            nullable: false,
            information: "The organization that made the measurements",
            accuracy: 76.4
        },
        {
            default: false,
            frontendName: "Some Toilet Attribute",
            filterSelector: {
                selectorKey: "numericEqual",
                selectorValue: "QUERYSTRING"
            },
            inputSelector: {
                selectorKey: "searchableDropdown",
                selectorValue: "QUERYSTRING"
            },
            datatypeKey: 1,
            nullable: false,
            information: "something about the toilet that cannot be observed by audit",
            accuracy: 76.4
        }
    ],
    returnableIDToTreeID: {
        "10": "1>0>0",  //Date Submitted
        "11": "0>0>0>0",//gpf
        "12": "1>0>1",  //Org
        "13": "0>0>0>2",//basin brand
        "14": "0>1>0>0",//psi
        "15": "0>2>0>0", //leaking
        "16": "0>2>0>1", //flow rate
        "17": "1>0>2"  //Numeric choice
    },
    treeIDToReturnableID: {
        "1>0>0": "10",
        "0>0>0>0": "11",
        "1>0>1": "12",
        "0>0>0>2": "13",
        "0>1>0>0": "14",
        "0>2>0>0": "15",
        "0>2>0>1": "16",
        "1>0>2": "17"
    },
    setupLastModified: 1596004069,
    datatypes: [
        "string",
        "hyperlink",
        "bool"
    ]
}




export let TableObject = {
    returnableIDs: [
        12, //Org
        13, //basin brand
        11, //gpf
        10, //date submitted
        14, //psi
        15  //leaking
    ],
    rowData: [
        [
            {
                displayString: "Bruin Home Solutions",
                URL: "https://bruinhomesolutions.com/"
            },
            "Basin Brand 1",
            33.6,
            1596104069,
            // {
            //     displayString: "Restroom SOP v1",
            //     URL: "https://agar.io/"
            // },
            0.643,
            0
        ],
        [
            {
                displayString: "Renewable Energy Association",
                URL: "https://rea.seas.ucla.edu/"
            },
            "Basin Brand 2",
            63.4,
            1596034069,
            // {
            //     displayString: "REA BIODIESEL TEAM 1.2",
            //     URL: "https://agar.io/"
            // },
            2.53,
            1
        ],
        [
            {
                displayString: "UCLA Facilities Management",
                URL: "https://www.facilities.ucla.edu/"
            },
            "Basin Brand 3",
            34.5,
            1596030069,
            // {
            //     displayString: "FM SOP",
            //     URL: "https://agar.io/"
            // },
            0.01,
            1
        ],
        [
            {
                displayString: "Clean Consulting",
                URL: "https://cleanconsulting.org/"
            },
            "Basin Brand 4",
            45.4,
            1595030069,
            // {
            //     displayString: "Aiden’s SOP",
            //     URL: "https://agar.io/"
            // },
            0.45,
            0
        ]
    ]
}