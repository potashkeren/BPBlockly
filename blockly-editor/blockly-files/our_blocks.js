Blockly.defineBlocksWithJsonArray([

{
    "type": "bp_event",
    "message0": "Event %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME",
        "check": "String"
      }
    ],
    "output" : "BP_EVENT",
	"colour": 0,
    "tooltip": "A BP Event"
  },
{
        "type": "bp_event_with_data",
        "message0": "Event %1 data: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "DATA"
            }
        ],
        "output" : "BP_EVENT",
        "colour": 0,
        "tooltip": "A BP Event"
    },
{
    "type": "bp_event_no_output",
    "message0": "Event %1",
    "args0": [
        {
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "A BP Event"
},
{
    "type": "bp_event_with_data_no_output",
    "message0": "Event %1 data: %2",
    "args0": [
        {
            "type": "input_value",
            "name": "NAME",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "DATA"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "A BP Event"
},
{
  "type": "bp_event_of_list",
  "message0": "Event %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": "BP_EVENT",
  "output": "BP_EVENT",
  "colour": 0,
  "tooltip": "Use this block if you are using the list of BP Events block",
  "helpUrl": ""
},
{
  "type": "bp_event_list",
  "message0": "List of Events %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "LIST",
      "check": "BP_EVENT"
    }
  ],
  "output": ["BP_EVENT_LIST","Array","BP_EVENT_SET"],
  "colour": 15,
  "tooltip": "A list of BP Events",
  "helpUrl": ""
},
{
    "type": "bp_bsync",
    "message0": "bsync %1 Wait %2 Request %3 Block %4 Interrupt %5 Priority %6",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "WAIT",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "REQUEST",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "BLOCK",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "INTERRUPT",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "PRIORITY",
            "check": "Number"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "tooltip": "A single bsync statement",
    "helpUrl": ""
},
{
    "type": "bp_bsync_with_output",
    "message0": "bsync %1 Wait %2 Request %3 Block %4 Interrupt %5 Priority %6",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "WAIT",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "REQUEST",
            "check": "BP_EVENT"
        },
        {
            "type": "input_value",
            "name": "BLOCK",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "INTERRUPT",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        },
        {
            "type": "input_value",
            "name": "PRIORITY",
            "check": "Number"
        }
    ],
    "output":"BP_EVENT",
    "colour": 27,
    "tooltip": "Use this block if you would like to utilize the value returned by the bsync",
    "helpUrl": ""
},
{
  "type": "bp_register_bthread",
  "message0": "b-thread %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME"
    },
    {
      "type": "input_statement",
      "name": "CONTENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 55,
  "tooltip": "A single BThread",
  "helpUrl": ""
},
{
  "type": "bp_event_name",
  "message0": "The event's name",
  "output": "String",
  "colour": 0,
  "tooltip": "The name of the event considered for selection",
  "helpUrl": ""
},
{
    "type": "bp_event_data",
    "message0": "The event's data",
    "output": "String",
    "colour": 0,
    "tooltip": "The data of the event considered for selection",
    "helpUrl": ""
},
{
  "type": "bp_eventset",
  "message0": "EventSet %1 name: %2 function(e): %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
          "type": "input_value",
          "name": "NAME",
          "check": "String"
    },
    {
      "type": "input_value",
      "name": "COND",
      "check": "Boolean"
    }
  ],
  "inputsInline": false,
  "output": "BP_EVENT_SET",
  "colour": 355,
  "tooltip": "Define a predicate over the events' name",
  "helpUrl": ""
},
{
        "type": "bp_eventset_var",
        "message0": "EventSet %1 name: %2 function(e): %3 return: %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            },
            {
                "type": "input_statement",
                "name": "CONTENT"
            },
            {
                "type": "input_value",
                "name": "RETURN"
            }
        ],
        "inputsInline": false,
        "output": "BP_EVENT_SET",
        "colour": 355,
        "tooltip": "Define a predicate over the events' name",
        "helpUrl": ""
    },
{
  "type": "text_startswith",
  "message0": "%1 Starts with %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "String"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 160,
  "tooltip": "Check whether or not a string begins with another string",
  "helpUrl": ""
},
{
  "type": "text_concatenate",
  "message0": "%1 + %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "A",
      "check": "String"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "B",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "output": "String",
  "colour": 165,
  "tooltip": "String concatenation",
  "helpUrl": ""
},
{
  "type": "text_toString",
  "message0": "toString() %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "Number"
    }
  ],
  "output": "String",
  "colour": 160,
  "tooltip": "Turn a integer to an string",
  "helpUrl": ""
},
{
    "type": "text_comment",
    "message0": " %1",
    "args0": [
        {
            "type": "input_value",
            "name": "TEXT"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "comment block",
    "helpUrl": ""
},
{
    "type": "text_includes",
    "message0": "%1 includes %2",
    "args0": [
        {
            "type": "input_value",
            "name": "VAR",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 160,
    "tooltip": "Check if one string may be found within another string, returning true or false",
    "helpUrl": ""
},
{
        "type": "text_parseint",
        "message0": "parse to number %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TEXT"
            }
        ],
        "output": "Number",
        "colour": 160,
        "tooltip": "Turn a string to an integer",
        "helpUrl": ""
    },
{
    "type": "list_includes",
    "message0": "%1 includes %2",
    "args0": [
        {
            "type": "input_value",
            "name": "VAR1",
            "check": "Array"
        },
        {
            "type": "input_value",
            "name": "VAR2"
        }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 255,
    "tooltip": "Check if one item exists in the list, return true or false",
    "helpUrl": ""
},
{
    "type": "list_push",
    "message0": "%1 push %2",
    "args0": [
        {
            "type": "input_value",
            "name": "VAR1"
        },
        {
            "type": "input_value",
            "name": "VAR2"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "push element to the list",
    "helpUrl": ""
},
{
        "type": "mathFloor",
        "message0": "Math.Floor %1",
        "args0": [
            {
                "type": "input_value",
                "name": "floor",
                "check": "Number"
            }
        ],
        "output": "Number",
        "colour": 240,
        "tooltip": "",
        "helpUrl": ""
    },
{
    "type": "is_nan",
    "message0": "Is not a number %1",
    "args0": [
        {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }
    ],
    "output": "Boolean",
    "colour": 230,
    "tooltip": "Is the given string a number (includes negative and decimals)",
    "helpUrl": ""
    },
{
    "type": "object",
    "message0": "create an object %1 %2",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "LIST"
        }
    ],
    "output": null,
    "colour": 240,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "property_value",
    "message0": "property: %1 value: %2",
    "args0": [
        {
            "type": "input_value",
            "name": "PROPERTY",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "VALUE"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": "property_value",
    "colour": 220,
    "tooltip": "",
    "helpUrl": ""
},
{
        "type": "get_object_value",
        "message0": "object %1 get %2",
        "args0": [
            {
                "type": "input_value",
                "name": "OBJECT"
            },
            {
                "type": "input_value",
                "name": "PROPERTY",
                "check": "String"
            }
        ],
        "inputsInline": true,
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
{
    "type": "equals",
    "message0": " %1 equals to: %2",
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE1",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "VALUE2",
            "check": "String"
        }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "get_array_list",
    "message0": "Collection %1 get %2",
    "args0": [
        {
            "type": "input_value",
            "name": "OBJECT"
        },
        {
            "type": "input_value",
            "name": "PROPERTY",
            "check": "Number"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bp_wait",
    "message0": "Wait %1",
    "args0": [
        {
            "type": "input_value",
            "name": "Wait",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "tooltip": "wait",
    "helpUrl": ""
},
{
    "type": "bp_request",
    "message0": "Request %1",
    "args0": [
        {
            "type": "input_value",
            "name": "Request",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "tooltip": "Request",
    "helpUrl": ""
},
{
    "type": "bp_block",
    "message0": "Block %1",
    "args0": [
        {
            "type": "input_value",
            "name": "Block",
            "check": ["BP_EVENT","BP_EVENT_LIST","Array","BP_EVENT_SET"]
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "tooltip": "Block",
    "helpUrl": ""
},
{
    "type": "bp_data",
    "message0": "Priority %1",
    "args0": [
        {
            "type": "input_value",
            "name": "Data"
        }
    ],
    "previousStatement": null,
    "colour": 27,
    "tooltip": "priority",
    "helpUrl": ""
},
{
    "type": "bp_interrupt",
    "message0": "Interrupt %1",
    "args0": [
        {
            "type": "input_value",
            "name": "Data"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "tooltip": "interrupt",
    "helpUrl": ""
},
{
    "type": "bp_basic_bsync",
    "message0": "bsync %1",
    "args0": [
        {
            "type": "input_dummy"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 27,
    "mutator": "bsync_mutator",
    "tooltip": "A basic bsync statement",
    "helpUrl": ""
},
{
    "type": "bp_basic_bsync_output",
    "message0": "bsync %1",
    "args0": [
        {
            "type": "input_dummy"
        }
    ],
    "output":"BP_EVENT",
    "nextStatement": null,
    "colour": 27,
    "mutator": "bsync_mutator_output",
    "tooltip": "A basic bsync statement",
    "helpUrl": ""
    },
{
    "type": "setTimeout",
    "message0": "set timeout %1 function: %2 milliseconds: %3",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "FUNC"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 195,
    "tooltip": "set timeout",
    "helpUrl": ""
},
{
    "type": "setInterval",
    "message0": "set interval %1 function: %2 milliseconds: %3",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "FUNC"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 195,
    "tooltip": "set interval",
    "helpUrl": ""
},
{
    "type": "setTimeout_return",
    "message0": "set timeout %1 function: %2 milliseconds: %3",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "FUNC"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }
    ],
    "inputsInline": false,
    "output": null,
    "colour": 195,
    "tooltip": "set timeout",
    "helpUrl": ""
},
{
    "type": "setInterval_return",
    "message0": "set interval %1 function: %2 milliseconds: %3",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "FUNC"
        },
        {
            "type": "input_value",
            "name": "TIME",
            "check": "Number"
        }
    ],
    "inputsInline": false,
    "output": null,
    "colour": 195,
    "tooltip": "set interval",
    "helpUrl": ""
},
{
    "type": "clearTimeout",
    "message0": "clear timeout %1 var: %2 ",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "VAR"
        }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 195,
    "tooltip": "set timeout",
    "helpUrl": ""
},
{
    "type": "clearInterval",
    "message0": "clear interval %1 var: %2",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "VAR"
        }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 195,
    "tooltip": "set interval",
    "helpUrl": ""
},
{
    "type": "date",
    "message0": "Date",
    "output": null,
    "colour": 195,
    "tooltip": "create new date",
    "helpUrl": ""
},
{
    "type": "get_hour",
    "message0": "get the hour %1",
    "args0": [
        {
            "type": "input_value",
            "name": "DATE"
        }
    ],
    "output": "Number",
    "colour": 195,
    "tooltip": "get the hour from date",
    "helpUrl": ""
},
{
    "type": "ctx_object_tick",
    "message0": "%1 tick",
    "args0": [
        {
            "type": "input_value",
            "name": "OBJECT"
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bp_assert",
    "message0": "BP ASSERT %1 %2",
    "args0": [
        {
            "type": "input_value",
            "name": "VAR1"
        },
        {
            "type": "input_value",
            "name": "VAR2"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "BP ASSERT"
},
{
    "type": "bp_simulateExternalData",
    "message0": "BP simulateExternalData %1",
    "args0": [
        {
            "type": "input_value",
            "name": "NAME"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "BP simulateExternalData"
},
{
    "type": "bp_simulateExternalData_data",
    "message0": "BP simulateExternalData %1 data: %2",
    "args0": [
        {
            "type": "input_value",
            "name": "NAME"
        },
        {
            "type": "input_value",
            "name": "DATA"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 0,
    "tooltip": "BP simulateExternalData"
}
  ]);

//#region BP Basic + Advance Blocks

Blockly.JavaScript['bp_event'] = function(block) {
  var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  if(event_name === '\'\'')
	  event_name = '\'Anonymous event\'';

  var code = 'bp.Event('+event_name+')';

    var thisBlock = this;
    this.setTooltip( function() {
        var color = Blockly.JavaScript.valueToCode(thisBlock, 'NAME',
            Blockly.JavaScript.ORDER_NONE) || '0';
        return color;
    });

    return [code, Blockly.JavaScript.ORDER_ATOMIC]};

Blockly.JavaScript['bp_event_with_data'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name === '\'\'')
        event_name = '\'Anonymous event\'';
    var event_data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

        var code = 'bp.Event('+event_name+','+event_data+')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC]};

Blockly.JavaScript['bp_event_no_output'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name === '\'\'')
        event_name = '\'Anonymous event\'';

    var code = 'bp.Event('+event_name+')';

    return code
};

Blockly.JavaScript['bp_event_with_data_no_output'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name === '\'\'')
        event_name = '\'Anonymous event\'';
    var event_data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'bp.Event('+event_name+','+event_data+')';
    return code
};
  
Blockly.JavaScript['bp_event_of_list'] =  Blockly.JavaScript['bp_event'];

Blockly.JavaScript['bp_event_list'] = function(block) {
  var events_string = Blockly.JavaScript.statementToCode(block, 'LIST');
  events = breakEventsString(events_string);
  var code = '';
  events.forEach(function(entry){
	code+=entry+',\n';
  });
  code=code.substring(0,code.length-2);
  code = '['+code+']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC]};
  
var breakEventsString = function(events_string){
	result = [];
	split = events_string.split('bp.Event');
	split.forEach(function(entry){
		if(entry.startsWith('(')){
			new_entry = entry;
			while(true)
				if(new_entry.endsWith(',0')){
					new_entry = new_entry.substring(0,new_entry.length-2);
				}
				else
					break;
			result.push('bp.Event'+new_entry);
	}}); 
	
	return result
  };

function getEventName(dirty){
	return dirty.substring(9,dirty.length-1);//erase the bp.Event(" and the ")
  }	  

Blockly.JavaScript['bp_bsync'] = function(block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_interrupt = Blockly.JavaScript.valueToCode(block, 'INTERRUPT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_priority = Blockly.JavaScript.valueToCode(block, 'PRIORITY', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
	
    var set=[];

    if (value_wait !== 'null') {
        //check for EventSet and array of events
        set.push('waitFor: '+value_wait);
    }
    if (value_request !== 'null') {
        //check for EventSet and array of events
        set.push('request: '+value_request);
    }
    if (value_block !== 'null') {
        //check for EventSet and array of events
        set.push('block: '+value_block);
    }
    if (value_interrupt !== 'null') {
        //check for EventSet and array of events
        set.push('interrupt: '+value_interrupt);
    }
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +')';

  return code+';\n';
};

Blockly.JavaScript['bp_bsync_with_output'] = function(block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_interrupt = Blockly.JavaScript.valueToCode(block, 'INTERRUPT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_priority = Blockly.JavaScript.valueToCode(block, 'PRIORITY', Blockly.JavaScript.ORDER_ATOMIC) || 'null';

    var set=[];

    if (value_wait !== 'null') {
        //check for EventSet and array of events
        set.push('waitFor: '+value_wait);
    }
    if (value_request !== 'null') {
        //check for EventSet and array of events
        set.push('request: '+value_request);
    }
    if (value_block !== 'null') {
        //check for EventSet and array of events
        set.push('block: '+value_block);
    }
    if (value_interrupt !== 'null') {
        //check for EventSet and array of events
        set.push('interrupt: '+value_interrupt);
    }
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +')';
 
 //return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bp_register_bthread'] = function(block) {
  var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
  var code = 'bp.registerBThread('+name+', function(){\n'+statements+'\n});\n';
  return code;
};

Blockly.JavaScript['bp_event_name'] = function(block) {
  var code = 'e.name';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bp_event_data'] = function(block) {
    var code = 'e.data';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

//just to make the EventSet names unique
var eventset_counter = 0;

Blockly.JavaScript['bp_eventset'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name == '\'\''){
        event_name = 'es'+ eventset_counter;
        eventset_counter++;
    }

  var cond = Blockly.JavaScript.valueToCode(block, 'COND', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'bp.EventSet('+event_name+', function(e) {\n  return '+cond+';\n})';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bp_eventset_var'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name == '\'\''){
        event_name = 'es'+ eventset_counter;
        eventset_counter++;
    }
    var statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
    var cond = Blockly.JavaScript.valueToCode(block, 'RETURN', Blockly.JavaScript.ORDER_NONE);

    var code = 'bp.EventSet('+event_name+', function(e) {\n '
        + statements +
        ' return '+ cond +';\n })';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bp_basic_bsync'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'Wait', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_request = Blockly.JavaScript.valueToCode(block, 'Request', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_block = Blockly.JavaScript.valueToCode(block, 'Block', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_interrupt = Blockly.JavaScript.valueToCode(block, 'Interrupt', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_priority = Blockly.JavaScript.valueToCode(block, 'Priority', Blockly.JavaScript.ORDER_ATOMIC) || 'null';

    var set=[];

    if (value_wait !== 'null') {
        //check for EventSet and array of events
        set.push('waitFor: '+value_wait);
    }
    if (value_request !== 'null') {
        //check for EventSet and array of events
        set.push('request: '+value_request);
    }
    if (value_block !== 'null') {
        //check for EventSet and array of events
        set.push('block: '+value_block);
    }
    if (value_interrupt !== 'null') {
        //check for EventSet and array of events
        set.push('interrupt: '+value_interrupt);
    }
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +');\n';

    return code;
};

Blockly.JavaScript['bp_basic_bsync_output'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'Wait', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_request = Blockly.JavaScript.valueToCode(block, 'Request', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_block = Blockly.JavaScript.valueToCode(block, 'Block', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_interrupt = Blockly.JavaScript.valueToCode(block, 'Interrupt', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_priority = Blockly.JavaScript.valueToCode(block, 'Priority', Blockly.JavaScript.ORDER_ATOMIC) || 'null';

    var set=[];

    if (value_wait !== 'null') {
        //check for EventSet and array of events
        set.push('waitFor: '+value_wait);
    }
    if (value_request !== 'null') {
        //check for EventSet and array of events
        set.push('request: '+value_request);
    }
    if (value_block !== 'null') {
        //check for EventSet and array of events
        set.push('block: '+value_block);
    }
    if (value_interrupt !== 'null') {
        //check for EventSet and array of events
        set.push('interrupt: '+value_interrupt);
    }
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +')';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//#endregion  BP Basic + Advance Blocks

//#region Text Blocks
Blockly.JavaScript['text_startswith'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
    var code = a+'.startsWith('+b+')';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_concatenate'] = function(block) {
  var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var code = a+'+'+b;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_parseint'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'parseInt('+text+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_toString'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = text+'.toString()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_includes'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var _var = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);
    var code = _var+'.includes('+text+')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_parse'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'parseInt('+text+')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_comment'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = '//'+ eval(text) +'\n';
    return code;
};

//#endregion Text Blocks

//#region Math Blocks
Blockly.JavaScript['mathFloor'] = function(block) {
    var value_floor = Blockly.JavaScript.valueToCode(block, 'floor', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'Math.floor('+ value_floor + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['is_nan'] = function(block) {
    var s = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'isNaN('+ s + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
//#endregion Math Blocks

//#region Scheduling Blocks
Blockly.JavaScript['setTimeout'] = function(block) {
    var func = Blockly.JavaScript.statementToCode(block, 'FUNC').replace(';','').replace(/(\r\n|\n|\r)/gm, "").trim();
    var miliscnd = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'setTimeout('+func+','+miliscnd+');\n';

    return code;
};

Blockly.JavaScript['setInterval'] = function(block) {
    var func = Blockly.JavaScript.statementToCode(block, 'FUNC').replace(';','').replace(/(\r\n|\n|\r)/gm, "").trim();
    var miliscnd = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'setInterval('+func+','+miliscnd+');\n';

    return code;
};

Blockly.JavaScript['setTimeout_return'] = function(block) {
    var func = Blockly.JavaScript.statementToCode(block, 'FUNC').replace(';','').replace(/(\r\n|\n|\r)/gm, "").trim();
    var miliscnd = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'setTimeout('+func+','+miliscnd+');';

    return [code, Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['setInterval_return'] = function(block) {
    var func = Blockly.JavaScript.statementToCode(block, 'FUNC').replace(';','').replace(/(\r\n|\n|\r)/gm, "").trim();
    var miliscnd = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'setInterval('+func+','+miliscnd+');';

    return [code, Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['clearTimeout'] = function(block) {
    var vari = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'clearTimeout('+vari+');\n';

    return code;
};

Blockly.JavaScript['clearInterval'] = function(block) {
    var vari = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'clearInterval('+vari+');\n';

    return code;
};

Blockly.JavaScript['date'] = function(block) {
    var code = 'new Date()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_hour'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'DATE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = text+'.getHours()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
//#endregion Scheduling Blocks

//#region List Blocks
Blockly.JavaScript['list_includes'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'VAR2', Blockly.JavaScript.ORDER_ATOMIC);
    var _var = Blockly.JavaScript.valueToCode(block, 'VAR1', Blockly.JavaScript.ORDER_ATOMIC);
    var code = _var+'.includes('+text+')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['list_push'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'VAR2', Blockly.JavaScript.ORDER_ATOMIC);
    var _var = Blockly.JavaScript.valueToCode(block, 'VAR1', Blockly.JavaScript.ORDER_ATOMIC);
    var code = _var+'.push('+text+')';
    return code;
};
//#endregion List Blocks

//#region Test Blocks
Blockly.JavaScript['bp_assert'] = function(block) {
    var var1 = Blockly.JavaScript.valueToCode(block, 'VAR1', Blockly.JavaScript.ORDER_ATOMIC);
    var var2 = Blockly.JavaScript.valueToCode(block, 'VAR2', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'bp.ASSERT('+var1+','+var2+');';
    return code
};

Blockly.JavaScript['bp_simulateExternalData'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name === '\'\'')
        event_name = '\'Anonymous event\'';

    var code = 'bp.Event('+event_name+')';

    return code
};

Blockly.JavaScript['bp_simulateExternalData_data'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name === '\'\'')
        event_name = '\'Anonymous event\'';
    var event_data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'bp.Event('+event_name+','+event_data+')';
    return code
};

//#endregion Scheduling Blocks

//#region Object Blocks
Blockly.JavaScript['object'] = function(block) {
    var property_value = Blockly.JavaScript.statementToCode(block, 'LIST');
    var code = '{'+property_value.slice(0, -2) +'}';
    return [code, Blockly.JavaScript.ORDER_ATOMIC]};

Blockly.JavaScript['property_value'] = function(block) {
    var value_property = Blockly.JavaScript.valueToCode(block, 'PROPERTY', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = eval(value_property)+ ':' + value_value + ', ';
    return code;
};

Blockly.JavaScript['get_object_value'] = function(block) {
    var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
    var property = Blockly.JavaScript.valueToCode(block, 'PROPERTY', Blockly.JavaScript.ORDER_ATOMIC);

    var code = object+ '.' + eval(property);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_array_list'] = function(block) {
    var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
    var property = Blockly.JavaScript.valueToCode(block, 'PROPERTY', Blockly.JavaScript.ORDER_ATOMIC);

    var code = object+ '.get(' + property+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['ctx_object_tick'] = function(block) {
    var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);

    var code = object+ '.tick';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['object_create'] = function(block) {
    if (!block.numFields) {
        return ['{}', Blockly.JavaScript.ORDER_NONE];
    }
    var fieldInitCode = '';
    for (var i = 1; i <= block.numFields; i++) {
        const fieldName = block.getFieldValue('field' + i);
        const fieldValue = Blockly.JavaScript.valueToCode(block, 'field_input' + i, Blockly.JavaScript.ORDER_ATOMIC);
        fieldInitCode += fieldName+ ":" +fieldValue+","
    }
    const code = "{" +fieldInitCode+ "}";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['new_object'] = function(block) {
    var object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
    if (!block.numFields) {
        return ['new '+eval(object_name)+'()', Blockly.JavaScript.ORDER_NONE];
    }

    var fieldInitCode = '';
    var i = 1;
    while( i <= block.numFields -1){
        const fieldName = Blockly.JavaScript.valueToCode(block, 'field_input' + i, Blockly.JavaScript.ORDER_ATOMIC);
        fieldInitCode += eval(fieldName)+ ", ";
        i++
    }
    const fieldName = Blockly.JavaScript.valueToCode(block, 'field_input' + i, Blockly.JavaScript.ORDER_ATOMIC);
    fieldInitCode += eval(fieldName);

    const code = "new " +eval(object_name)+'('+fieldInitCode+ ")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['equals'] = function(block) {
    var value1 = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_ATOMIC);
    var value2 = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value1 + '.equals(' + value2 + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC]
};

const CUSTOM_OBJECT_CREATE_BLOCK_NAME = 'object_create';
const CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME = 'object_field';
const CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME = 'object_create_mutator_top';

const objectCreateBlockDef = {
    "type": "object_create",
    "message0": "create object",
    "output": "Object",
    "mutator": "controls_create_mutator",
    "colour": 250,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[CUSTOM_OBJECT_CREATE_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(objectCreateBlockDef);
    }
};

const objectFieldBlockDef = {
    "type": "object_field",
    "message0": "%1 %2",
    "args0": [
        {
            "type": "field_input",
            "name": "field_name",
            "text": "property name"
        },
        {
            "type": "input_value",
            "name": "field_value"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(objectFieldBlockDef);
    }
};

const objectCreateMutatorBlockDef = {
    "type": "object_create_mutator",
    "message0": "create object",
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(objectCreateMutatorBlockDef);
    }
};

const objectCreateMutator = {
    numFields: 0,
    fields: [],

    domToMutation: function(xmlElement) {
        this.fields = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'field') {
                this.fields.push(childNode.getAttribute('name'));
            }
        }
        this.numFields = this.fields.length;
        this.updateShape();
    },

    mutationToDom: function() {
        if (!this.numFields) {
            return null;
        }
        const container = document.createElement('mutation');
        container.setAttribute('num_fields', '' + this.numFields);
        for (var i = 0; i < this.fields.length; i++) {
            const field = document.createElement('field');
            field.setAttribute('name', this.fields[i]);
            container.appendChild(field);
        }
        return container;
    },

    compose: function(topBlock) {
        var fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
        this.numFields = 0;
        this.fields = [];
        var connectionsToRestore = [null];
        while (fieldBlock) {
            this.fields.push(fieldBlock.getFieldValue('field_name'));
            this.numFields++;
            connectionsToRestore.push(fieldBlock.savedConnection);
            fieldBlock = fieldBlock.nextConnection && fieldBlock.nextConnection.targetBlock();
        }
        this.updateShape();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.numFields; i++) {
            Blockly.Mutator.reconnect(connectionsToRestore[i], this, 'field_input' + i);
        }
    },

    decompose: function(workspace) {
        const topBlock = workspace.newBlock(CUSTOM_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME);
        topBlock.initSvg();
        var connection = topBlock.nextConnection;
        for (var i = 0; i < this.fields.length; i++) {
            const fieldBlock = workspace.newBlock(CUSTOM_OBJECT_MUTATOR_FIELD_BLOCK_NAME);
            fieldBlock.initSvg();
            fieldBlock.setFieldValue(this.fields[i], 'field_name');
            connection.connect(fieldBlock.previousConnection);
            connection = fieldBlock.nextConnection;
        }
        return topBlock;
    },

    saveConnections: function(topBlock) {
        var fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
        var i = 1;
        while (fieldBlock) {
            const input = this.getInput('field_input' + i);
            fieldBlock.savedConnection = input && input.connection.targetConnection;
            // Set mutator block field name from the corresponding 'real' Object.create block
            fieldBlock.setFieldValue(this.getFieldValue('field' + i), 'field_name');
            i++;
            fieldBlock = fieldBlock.nextConnection &&
                fieldBlock.nextConnection.targetBlock();
        }
    },

    updateShape: function() {
        // Delete everything.
        if (this.getInput('with')) {
            this.removeInput('with');
        }
        var i = 1;
        while (this.getInput('field_input' + i)) {
            this.removeInput('field_input' + i);
            i++;
        }
        // Rebuild block.
        if (this.numFields > 0) {
            this.appendDummyInput('with')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("with fields");
        }
        for (var i = 1; i <= this.numFields; i++) {
            const fieldName = this.fields[i - 1];
            this.appendValueInput("field_input" + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldTextInput(fieldName), "field" + i);
        }
    }

};

Blockly.Extensions.registerMutator('controls_create_mutator', objectCreateMutator, null, ['object_field']);

//new object
const NEW_OBJECT_CREATE_BLOCK_NAME = 'new_object';
const NEW_OBJECT_MUTATOR_FIELD_BLOCK_NAME = 'new_object_field';
const NEW_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME = 'new_object_create_mutator_top';

const new_objectCreateBlockDef = {
    "type": "new_object",
    "message0": "new %1",
    "args0": [
        {
            "type": "input_value",
            "name": "object_name",
            "text": "object name"
        }
    ],
    "output": "Object",
    "mutator": "controls_newObject_mutator",
    "colour": 250,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[NEW_OBJECT_CREATE_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(new_objectCreateBlockDef);
    }
};

const new_objectFieldBlockDef = {
    "type": "new_object_field",
    "message0": "%1",
    "args0": [
        {
            "type": "field_input",
            "name": "field_name"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[NEW_OBJECT_MUTATOR_FIELD_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(new_objectFieldBlockDef);
    }
};

const new_objectCreateMutatorBlockDef = {
    "type": "object_create_mutator",
    "message0": "new %1",
    "args0": [
        {
            "type": "input_value",
            "name": "object_name",
            "text": "object name"
        }
    ],
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks[NEW_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME] = {
    init: function () {
        this.jsonInit(new_objectCreateMutatorBlockDef);
    }
};

const new_objectCreateMutator = {
    numFields: 0,
    fields: [],

    domToMutation: function(xmlElement) {
        this.fields = [];
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'field') {
                this.fields.push(childNode.getAttribute('name'));
            }
        }
        this.numFields = this.fields.length;
        this.updateShape();
    },

    mutationToDom: function() {
        if (!this.numFields) {
            return null;
        }
        const container = document.createElement('mutation');
        container.setAttribute('num_fields', '' + this.numFields);
        for (var i = 0; i < this.fields.length; i++) {
            const field = document.createElement('field');
            field.setAttribute('name', this.fields[i]);
            container.appendChild(field);
        }
        return container;
    },

    compose: function(topBlock) {
        var fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
        this.numFields = 0;
        this.fields = [];
        var connectionsToRestore = [null];
        while (fieldBlock) {
            this.fields.push(fieldBlock.getFieldValue('field_name'));
            this.numFields++;
            connectionsToRestore.push(fieldBlock.savedConnection);
            fieldBlock = fieldBlock.nextConnection && fieldBlock.nextConnection.targetBlock();
        }
        this.updateShape();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.numFields; i++) {
            Blockly.Mutator.reconnect(connectionsToRestore[i], this, 'field_input' + i);
        }
    },

    decompose: function(workspace) {
        const topBlock = workspace.newBlock(NEW_OBJECT_CREATE_MUTATOR_TOP_BLOCK_NAME);
        topBlock.initSvg();
        var connection = topBlock.nextConnection;
        for (var i = 0; i < this.fields.length; i++) {
            const fieldBlock = workspace.newBlock(NEW_OBJECT_MUTATOR_FIELD_BLOCK_NAME);
            fieldBlock.initSvg();
            fieldBlock.setFieldValue(this.fields[i], 'field_name');
            connection.connect(fieldBlock.previousConnection);
            connection = fieldBlock.nextConnection;
        }
        return topBlock;
    },

    saveConnections: function(topBlock) {
        var fieldBlock = topBlock.nextConnection && topBlock.nextConnection.targetBlock();
        var i = 1;
        while (fieldBlock) {
            const input = this.getInput('field_input' + i);
            fieldBlock.savedConnection = input && input.connection.targetConnection;
            // Set mutator block field name from the corresponding 'real' Object.create block
            fieldBlock.setFieldValue(this.getFieldValue('field' + i), 'field_name');
            i++;
            fieldBlock = fieldBlock.nextConnection &&
                fieldBlock.nextConnection.targetBlock();
        }
    },

    updateShape: function() {
        // Delete everything.
        if (this.getInput('with')) {
            this.removeInput('with');
        }
        var i = 1;
        while (this.getInput('field_input' + i)) {
            this.removeInput('field_input' + i);
            i++;
        }
        // Rebuild block.
        if (this.numFields > 0) {
            this.appendDummyInput('with')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("with");
        }
        for (var i = 1; i <= this.numFields; i++) {
            const fieldName = this.fields[i - 1];
            this.appendValueInput("field_input" + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(new Blockly.FieldTextInput(fieldName), "field" + i);
        }
    }

};

Blockly.Extensions.registerMutator('controls_newObject_mutator', new_objectCreateMutator, null, ['new_object_field']);

//endregion Object Blocks

//#region Context
 var context_name = ["NoStatusLabs", "MostVacantLab","Lab", "OpenLab", "LockedLab" , "NonEmptyLab", "EmptyLab","FreeLearningOpenLab", "FreeLearningEmptyLab",
     "LabNeedToBeEvacuated", "IsOccupied", "NotOccupied", "Schedule", "TodaySchedules", "LabInPractice", "BeforePractice",
    "AfterPractice", "BeforePracticeFreeLearningLab", "BeforePracticeLockedLab", "EmergencyLab"];
//var context_name = ["Context_#1","Context_#2","Context_#3"];
//var commands = ["update_command_#1","update_command_#2","update_command_#3"];
var commands =["OpenLab","CloseLab", "EvacuateTheLab","NotEvacuateTheLab", "FreeLearningLab","NotFreeLearningLab","TurnLightOff",
    "TurnLightOn","MotionDetected","MotionStopped", "LabIsEmpty","LabIsNotEmpty", "MarkUnlocked", "MarkLocked"];
//var context_name = ["Cell","CornerCell","SpecificCell","EmptyCell","NonEmptyCell","Triple"];
//var commands =["UpdateCell","Finish the game"];
var context= {
    office: ['Motion Detector','Air Condition','Smoke Detector'],
    restroom:['Smart Light'],
    emergency: ['true', 'false'],
    kitchen : ['Motion Detector','Smart Light','Air Condition']
};
var CONTEXT_OPTIONS = function(context){
    result = [];
    var keys = Object.keys(context);
    keys.forEach(function(element) {
        new_entry=[element, element.toUpperCase()]
        result.push(new_entry);
    });
    return result
};
var PROPRTY_OPTIONS = function(selected_context){
    result = [];
    var properties = context[selected_context];
    properties.forEach(function(element) {
        new_entry=[element, element.toUpperCase()]
        result.push(new_entry);
    });
    return result
};
var CREATE_OPTIONS = function(contexts){
    result = [];
    contexts.forEach(function(element) {
        new_entry=[element, element];
        result.push(new_entry);
    });
    return result
};

var OPTIONS = CONTEXT_OPTIONS(context);
var PROPERTIES = PROPRTY_OPTIONS("office");
var CONTEXT_NAME =CREATE_OPTIONS(context_name);
var COMMAND = CREATE_OPTIONS(commands);

function update_context_created(referenceBlock) {
    var statement = referenceBlock.getInput('FIELDS');
    if (statement.connection.targetConnection) {
        var get_var = statement.connection.targetConnection.sourceBlock_;
            var get_context_property = get_var.childBlocks_[0];

            if (get_context_property.getInput('dropDownField')) {
                // calculate new options
                var ctx = referenceBlock.getFieldValue('CONTEXT').toLowerCase();
                var newOptions = PROPRTY_OPTIONS(ctx);

                // load current options from the drop down
                var dropdown = get_context_property.getInput('dropDownField').fieldRow[1];
                var oldOptions = dropdown.menuGenerator_;
                if (newOptions != null) {
                    if (oldOptions == null || !equalContext(oldOptions, newOptions)) {
                        try {
                            get_context_property.removeInput('dropDownField');
                            get_context_property.appendDummyInput('dropDownField')
                                .appendField('get property:')
                                .appendField(new Blockly.FieldDropdown(newOptions), 'PROPERTY');
                        }
                        catch (e) {
                        }
                    }
                }
            }
    }
};
function equalContext (a,b){
    if (!a || !b)
        return false;
    if (a.length !== b.length)
        return false;

    for (var i = 0; i < a.length ; i++){
        if (a[i][0] !== b[i][0])
            return false;
    }

    return true;
}
function update_context(referenceBlock) {
    if (referenceBlock.getInput('dropDownField') ){
        // calculate new options
        var ctx = referenceBlock.getFieldValue('CONTEXT').toLowerCase();
        var newOptions=PROPRTY_OPTIONS(ctx);

        // load current options from the drop down
        var dropdown = referenceBlock.getInput('dropDownField').fieldRow[1];
        var oldOptions = dropdown.menuGenerator_;
        if (newOptions != null) {
            if (oldOptions == null || !equalContext(oldOptions, newOptions)) {
                try {
                    referenceBlock.removeInput('dropDownField');
                    referenceBlock.appendDummyInput('dropDownField')
                        .appendField('get property:')
                        .appendField(new Blockly.FieldDropdown(newOptions), 'PROPERTY');
                }
                catch(e){}
            }
        }
    }
};



Blockly.Blocks['ctx_get_instances'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('GetContextInstances')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'PROPERTY');
        this.setOutput(true, null);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_get_instances'] = function (block) {
    var property = block.getFieldValue('PROPERTY');
    var code = "CTX.getContextInstances(\""+property+"\")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_update_db'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('Update')
            .appendField(new Blockly.FieldDropdown(COMMAND), 'COMMAND');
        this.setOutput(true, null);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_update_db'] = function(block) {
    var command = block.getFieldValue('COMMAND');

    var code = "CTX.UpdateEvent(\""+command+"\")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.Blocks['ctx_update_db_data'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('Update')
            .appendField(new Blockly.FieldDropdown(COMMAND), 'COMMAND');
        this.appendValueInput("DATA")
            .appendField("data");
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_update_db_data'] = function(block) {
    var command = block.getFieldValue('COMMAND');
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.UpdateEvent(\""+command+"\","+data+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_update_db_new'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('Update')
            .appendField(new Blockly.FieldDropdown(COMMAND), 'COMMAND');
        this.appendStatementInput("CONTENT")
            .appendField("data");
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_update_db_new'] = function(block) {
    var command = block.getFieldValue('COMMAND');
    var data = Blockly.JavaScript.statementToCode(block, 'CONTENT');
    var slice_data = '{'+data.slice(0, -2) +'}';

    var code = "CTX.UpdateEvent(\""+command+"\","+slice_data+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_new_context_data'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('NewContext')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'CONTEXT_NAME');
        this.appendValueInput("DATA")
            .appendField("data");
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_new_context_data'] = function(block) {
    var name = block.getFieldValue('CONTEXT_NAME');
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.AnyNewContextEvent(\""+name+"\","+data+".data)";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_subscribe'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendValueInput("NAME")
            .appendField("b-thread");
        this.appendDummyInput('dropDownField')
            .appendField('context')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'CTX_NAME');
        this.appendValueInput("CTX_VAR_NAME")
            .appendField("function:");
        this.appendStatementInput("CONTENT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('subscribe the context');
    }
};

Blockly.JavaScript['ctx_subscribe'] = function(block) {
    var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var ctx_name = block.getFieldValue('CTX_NAME');
    var ctx_var_name = Blockly.JavaScript.valueToCode(block, 'CTX_VAR_NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var statements = Blockly.JavaScript.statementToCode(block, 'CONTENT');
    var code = 'CTX.subscribe('+name+',\"'+ ctx_name +'\",'+ 'function('+ctx_var_name+'){\n'+statements+'\n});\n';
    return code;
};


Blockly.Blocks['ctx_context_ended'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('ContextEnded')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'COMMAND');
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('check when the context event was ended');
    }
};

Blockly.JavaScript['ctx_context_ended'] = function(block) {
    var command = block.getFieldValue('COMMAND');

    var code = "CTX.AnyContextEndedEvent(\""+command+"\")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_context_ended_data'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('ContextEnded')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'COMMAND');
        this.appendValueInput("DATA")
            .appendField("data");
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('check when the context event was ended');
    }
};

Blockly.JavaScript['ctx_context_ended_data'] = function(block) {
    var command = block.getFieldValue('COMMAND');
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.AnyContextEndedEvent(\""+command+"\","+data+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_any_new_context'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('NewContext')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'COMMAND');
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('check when the context event was ended');
    }
};

Blockly.JavaScript['ctx_any_new_context'] = function(block) {
    var command = block.getFieldValue('COMMAND');

    var code = "CTX.AnyNewContextEvent(\""+command+"\")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['ctx_tick'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendValueInput("NAME")
            .appendField("CTX.TickEvent");
        this.setOutput(true, null);
        this.setTooltip('Tick event');
    }
};

Blockly.JavaScript['ctx_tick'] = function(block) {
    var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.TickEvent("+name+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_insert'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendValueInput("NAME")
            .appendField("InsertEvent");
        this.setOutput(true, null);
        this.setTooltip('CTX.InsertEvent');
    }
};

Blockly.JavaScript['ctx_insert'] = function(block) {
    var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.InsertEvent("+name+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//#endregion Context



const objectCreateMutatorBsync = {
    waitCount_: 0,
    requestCount_: 0,
    blockCount_: 0,
    interruptCount_: 0,
    dataCount_: 0,

    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.waitCount_ && !this.requestCount_ && !this.blockCount_ && !this.interruptCount_&& !this.dataCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.waitCount_) {
            container.setAttribute('wait', 1);
        }
        if (this.requestCount_) {
            container.setAttribute('request', 1);
        }
        if (this.blockCount_) {
            container.setAttribute('block', 1);
        }
        if (this.interruptCount_) {
            container.setAttribute('interrupt', 1);
        }
        if (this.dataCount_) {
            container.setAttribute('data', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.waitCount_ = parseInt(xmlElement.getAttribute('wait'), 10) || 0;
        this.requestCount_ = parseInt(xmlElement.getAttribute('request'), 10) || 0;
        this.blockCount_ = parseInt(xmlElement.getAttribute('block'), 10) || 0;
        this.interruptCount_ = parseInt(xmlElement.getAttribute('interrupt'), 10) || 0;
        this.dataCount_ = parseInt(xmlElement.getAttribute('data'), 10) || 0;
        this.rebuildShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('bp_basic_bsync');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        if (this.waitCount_) {
            var elseifBlock = workspace.newBlock('bp_wait');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.requestCount_) {
            var requestBlock = workspace.newBlock('bp_request');
            requestBlock.initSvg();
            connection.connect(requestBlock.previousConnection);
            connection = requestBlock.nextConnection;
        }
        if (this.blockCount_) {
            var blockBlock = workspace.newBlock('bp_block');
            blockBlock.initSvg();
            connection.connect(blockBlock.previousConnection);
            connection = blockBlock.nextConnection;
        }
        if (this.interruptCount_) {
            var interruptBlock = workspace.newBlock('bp_interrupt');
            interruptBlock.initSvg();
            connection.connect(interruptBlock.previousConnection);
            connection = interruptBlock.nextConnection;
        }
        if (this.dataCount_) {
            var elseBlock = workspace.newBlock('bp_data');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.waitCount_ = 0;
        this.requestCount_ = 0;
        this.blockCount_ = 0;
        this.interruptCount_ = 0;
        this.dataCount_ = 0;
        var valueConnections = null;
        var requestConnections = null;
        var blockConnections = null;
        var interruptConnections = null;
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'bp_wait':
                    this.waitCount_++;
                    valueConnections = clauseBlock.valueConnection_;
                    break;
                case 'bp_request':
                    this.requestCount_++;
                    requestConnections = clauseBlock.requestConnection_;
                    break;
                case 'bp_block':
                    this.blockCount_++;
                    blockConnections = clauseBlock.blockConnection_;
                    break;
                case 'bp_interrupt':
                    this.interruptCount_++;
                    interruptConnections = clauseBlock.blockConnection_;
                    break;
                case 'bp_data':
                    this.dataCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections, requestConnections, blockConnections,
            interruptConnections, elseStatementConnection);
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'bp_wait':
                    var inputIf = this.getInput('Wait');
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    break;
                case 'bp_request':
                    var inputRequest = this.getInput('Request');
                    clauseBlock.requestConnection_ =
                        inputRequest && inputRequest.connection.targetConnection;
                    break;
                case 'bp_block':
                    var inputBlock = this.getInput('Block');
                    clauseBlock.blockConnection_ =
                        inputBlock && inputBlock.connection.targetConnection;
                    break;
                case 'bp_interrupt':
                    var inputInterrupt = this.getInput('Interrupt');
                    clauseBlock.interruptConnection_ =
                        inputInterrupt && inputInterrupt.connection.targetConnection;
                    break;
                case 'bp_data':
                    var inputDo = this.getInput('Priority');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function() {
        var valueConnections = null;
        var requestConnections = null;
        var blockConnections = null;
        var interruptConnections = null;
        var elseStatementConnection = null;

        if (this.getInput('Priority')) {
            elseStatementConnection = this.getInput('Priority').connection.targetConnection;
        }
        if (this.getInput('Block')) {
            blockConnections = this.getInput('Block').connection.targetConnection;
        }
        if (this.getInput('Interrupt')) {
            interruptConnections = this.getInput('Interrupt').connection.targetConnection;
        }
        if (this.getInput('Request')) {
            requestConnections = this.getInput('Request').connection.targetConnection;
        }
        if (this.getInput('Wait')) {
            valueConnections= this.getInput('Wait').connection.targetConnection;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, requestConnections, blockConnections,
            interruptConnections, elseStatementConnection);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function() {
        // Delete everything.
        if (this.getInput('Priority')) {
            this.removeInput('Priority');
        }
        if (this.getInput('Interrupt')) {
            this.removeInput('Interrupt');
        }
        if (this.getInput('Block')) {
            this.removeInput('Block');
        }
        if (this.getInput('Request')) {
            this.removeInput('Request');
        }
        if (this.getInput('Wait')) {
            this.removeInput('Wait');
        }
        // Rebuild block.
        if( this.waitCount_) {
            this.appendValueInput('Wait')
                .appendField('Wait');
        }
        if( this.requestCount_) {
            this.appendValueInput('Request')
                .appendField('Request');
        }
        if( this.blockCount_) {
            this.appendValueInput('Block')
                .appendField('Block');
        }
        if( this.interruptCount_) {
            this.appendValueInput('Interrupt')
                .appendField('Interrupt');
        }
        if (this.dataCount_) {
            this.appendValueInput('Priority')
                .appendField('Priority');
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function(valueConnections, requestConnections, blockConnections,
                                    interruptConnections, elseStatementConnection) {
        Blockly.Mutator.reconnect(valueConnections, this, 'Wait');
        Blockly.Mutator.reconnect(requestConnections, this, 'Request');
        Blockly.Mutator.reconnect(blockConnections, this, 'Block');
        Blockly.Mutator.reconnect(interruptConnections, this, 'Interrupt');
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'Priority');
    }
};

Blockly.Extensions.registerMutator('bsync_mutator',
    objectCreateMutatorBsync, null, ['bp_wait','bp_request','bp_block', 'bp_interrupt', 'bp_data']);

const objectCreateMutatorBsyncOutput = {
    waitCount_: 0,
    requestCount_: 0,
    blockCount_: 0,
    interruptCount_: 0,
    dataCount_: 0,

    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.waitCount_ && !this.requestCount_ && !this.blockCount_ && !this.interruptCount_ && !this.dataCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.waitCount_) {
            container.setAttribute('wait', 1);
        }
        if (this.requestCount_) {
            container.setAttribute('request', 1);
        }
        if (this.blockCount_) {
            container.setAttribute('block', 1);
        }
        if (this.interruptCount_) {
            container.setAttribute('interrupt', 1);
        }
        if (this.dataCount_) {
            container.setAttribute('data', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.waitCount_ = parseInt(xmlElement.getAttribute('wait'), 10) || 0;
        this.requestCount_ = parseInt(xmlElement.getAttribute('request'), 10) || 0;
        this.blockCount_ = parseInt(xmlElement.getAttribute('block'), 10) || 0;
        this.interruptCount_ = parseInt(xmlElement.getAttribute('interrupt'), 10) || 0;
        this.dataCount_ = parseInt(xmlElement.getAttribute('data'), 10) || 0;
        this.rebuildShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('bp_basic_bsync_output');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        if (this.waitCount_) {
            var elseifBlock = workspace.newBlock('bp_wait');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.requestCount_) {
            var requestBlock = workspace.newBlock('bp_request');
            requestBlock.initSvg();
            connection.connect(requestBlock.previousConnection);
            connection = requestBlock.nextConnection;
        }
        if (this.blockCount_) {
            var blockBlock = workspace.newBlock('bp_block');
            blockBlock.initSvg();
            connection.connect(blockBlock.previousConnection);
            connection = blockBlock.nextConnection;
        }
        if (this.interruptCount_) {
            var interruptBlock = workspace.newBlock('bp_interrupt');
            interruptBlock.initSvg();
            connection.connect(interruptBlock.previousConnection);
            connection = interruptBlock.nextConnection;
        }
        if (this.dataCount_) {
            var elseBlock = workspace.newBlock('bp_data');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.waitCount_ = 0;
        this.requestCount_ = 0;
        this.blockCount_ = 0;
        this.interruptCount_ = 0;
        this.dataCount_ = 0;
        var valueConnections = null;
        var requestConnections = null;
        var blockConnections = null;
        var interruptConnections = null;
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'bp_wait':
                    this.waitCount_++;
                    valueConnections = clauseBlock.valueConnection_;
                    break;
                case 'bp_request':
                    this.requestCount_++;
                    requestConnections = clauseBlock.requestConnection_;
                    break;
                case 'bp_block':
                    this.blockCount_++;
                    blockConnections = clauseBlock.blockConnection_;
                    break;
                case 'bp_interrupt':
                    this.interruptCount_++;
                    interruptConnections = clauseBlock.blockConnection_;
                    break;
                case 'bp_data':
                    this.dataCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections, requestConnections, blockConnections,
            interruptConnections, elseStatementConnection);
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'bp_wait':
                    var inputIf = this.getInput('Wait');
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    break;
                case 'bp_request':
                    var inputRequest = this.getInput('Request');
                    clauseBlock.requestConnection_ =
                        inputRequest && inputRequest.connection.targetConnection;
                    break;
                case 'bp_block':
                    var inputBlock = this.getInput('Block');
                    clauseBlock.blockConnection_ =
                        inputBlock && inputBlock.connection.targetConnection;
                    break;
                case 'bp_interrupt':
                    var inputInterrupt = this.getInput('Interrupt');
                    clauseBlock.interruptConnection_ =
                        inputInterrupt && inputInterrupt.connection.targetConnection;
                    break;
                case 'bp_data':
                    var inputDo = this.getInput('Priority');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function() {
        var valueConnections = null;
        var requestConnections = null;
        var blockConnections = null;
        var interruptConnections = null;
        var elseStatementConnection = null;

        if (this.getInput('Priority')) {
            elseStatementConnection = this.getInput('Priority').connection.targetConnection;
        }
        if (this.getInput('Interrupt')) {
            interruptConnections = this.getInput('Interrupt').connection.targetConnection;
        }
        if (this.getInput('Block')) {
            blockConnections = this.getInput('Block').connection.targetConnection;
        }
        if (this.getInput('Request')) {
            requestConnections = this.getInput('Request').connection.targetConnection;
        }
        if (this.getInput('Wait')) {
            valueConnections= this.getInput('Wait').connection.targetConnection;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, requestConnections, blockConnections,
            interruptConnections, elseStatementConnection);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function() {
        // Delete everything.
        if (this.getInput('Priority')) {
            this.removeInput('Priority');
        }
        if (this.getInput('Interrupt')) {
            this.removeInput('Interrupt');
        }
        if (this.getInput('Block')) {
            this.removeInput('Block');
        }
        if (this.getInput('Request')) {
            this.removeInput('Request');
        }
        if (this.getInput('Wait')) {
            this.removeInput('Wait');
        }
        // Rebuild block.
        if( this.waitCount_) {
            this.appendValueInput('Wait')
                .appendField('Wait');
        }
        if( this.requestCount_) {
            this.appendValueInput('Request')
                .appendField('Request');
        }
        if( this.blockCount_) {
            this.appendValueInput('Block')
                .appendField('Block');
        }
        if( this.interruptCount_) {
            this.appendValueInput('Interrupt')
                .appendField('Interrupt');
        }
        if (this.dataCount_) {
            this.appendValueInput('Priority')
                .appendField('Priority');
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function(valueConnections, requestConnections, blockConnections,
                                    interruptConnections , elseStatementConnection) {
        Blockly.Mutator.reconnect(valueConnections, this, 'Wait');
        Blockly.Mutator.reconnect(requestConnections, this, 'Request');
        Blockly.Mutator.reconnect(blockConnections, this, 'Block');
        Blockly.Mutator.reconnect(interruptConnections, this, 'Interrupt');
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'Priority');
    }
};

Blockly.Extensions.registerMutator('bsync_mutator_output',
    objectCreateMutatorBsyncOutput, null, ['bp_wait','bp_request','bp_block', 'bp_interrupt', 'bp_data']);

Blockly.JavaScript['ctx_transaction'] = function(block) {
    if (!block.itemCount_ ) {
        return ['CTX.TransactionEvent()', Blockly.JavaScript.ORDER_NONE];
    }

    var fieldInitCode = '';
    var i = 1;
    while( i <= block.itemCount_ -1){
        const fieldValue = Blockly.JavaScript.valueToCode(block, 'item' + i, Blockly.JavaScript.ORDER_ATOMIC);
        fieldInitCode +="\t"+ fieldValue+",\n";
        i++;
    }
    const fieldValue = Blockly.JavaScript.valueToCode(block, 'item' + i, Blockly.JavaScript.ORDER_ATOMIC);
    fieldInitCode +="\t"+ fieldValue;

    const code = "CTX.TransactionEvent(\n" +fieldInitCode+ ")\n";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

const transactionDef = {
    "type": "ctx_transaction",
    "message0": "Transaction",
    "output": null,
    "mutator": "transaction_mutator",
    "colour": 240,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks['ctx_transaction'] = {
    init: function () {
        this.jsonInit(transactionDef);
    }
};

const fieldBlockDef = {
    "type": "ctx_field",
    "message0": "%1",
    "args0": [
        {
            "type": "input_value",
            "name": "field_value"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 240,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks['ctx_field'] = {
    init: function () {
        this.jsonInit(fieldBlockDef);
    }
};

const ctxTransactionMutatorBlockDef = {
    "type": "ctx_transaction_mutator",
    "message0": "Transaction",
    "nextStatement": null,
    "colour": 240,
    "tooltip": "",
    "helpUrl": ""
};

Blockly.Blocks['ctx_transaction_mutator'] = {
    init: function () {
        this.jsonInit(ctxTransactionMutatorBlockDef);
    }
};

const transactionCreateMutator = {
    itemCount_: 0,

    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.itemCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.itemCount_) {
            container.setAttribute('item', this.itemCount_);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('item'), 10) || 0;
        this.rebuildShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('ctx_transaction_mutator');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.itemCount_; i++) {
            var elseifBlock = workspace.newBlock('ctx_field');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.itemCount_ = 0;
        var valueConnections = [null];
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'ctx_field':
                    this.itemCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections);
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'ctx_field':
                    var inputIf = this.getInput('item' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    i++;
                    break;
                default:
                    throw TypeError('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function() {
        var valueConnections = [null];

        var i = 1;
        while (this.getInput('item' + i)) {
            var inputIf = this.getInput('item' + i);
            valueConnections.push(inputIf.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function() {
        // Delete everything.
        var i = 1;
        while (this.getInput('item' + i)) {
            this.removeInput('item' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.itemCount_; i++) {
            this.appendValueInput('item' + i)
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function(valueConnections) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'item' + i);
        }
    }
};

Blockly.Extensions.registerMutator('transaction_mutator', transactionCreateMutator, null, ['ctx_field']);



