Blockly.defineBlocksWithJsonArray([

{
    "type": "bp_event",
    "message0": "BP Event %1",
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
        "message0": "BP Event %1 With data: %2",
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
    "message0": "BP Event %1",
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
    "message0": "BP Event %1 With data: %2",
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
  "message0": "BP Event %1",
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
  "message0": "List of BP Events %1 %2",
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
    "message0": "bsync with:%1 Wait %2 Request %3 Block %4 Priority %5",
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
    "message0": "bsync with:%1 Wait %2 Request %3 Block %4 Priority %5",
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
  "type": "bp_bsync_line",
  "message0": "bsync with:%1 Wait %2 Request %3 Block %4 Priority %5",
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
          "name": "PRIORITY",
          "check": "Number"
      }
  ],
  "previousStatement": null,
  "nextStatement": null,
    "inputsInline": true,
    "colour": 27,
  "tooltip": "A single bsync statement",
  "helpUrl": ""
},
{
  "type": "bp_bsync_with_output_line",
  "message0": "bsync with:%1 Wait %2 Request %3 Block %4 Priority %5",
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
          "name": "PRIORITY",
          "check": "Number"
      }
  ],
  "output":"BP_EVENT",
    "inputsInline": true,

    "colour": 27,
  "tooltip": "Use this block if you would like to utilize the value returned by the bsync",
  "helpUrl": ""
},

{
  "type": "bp_register_bthread",
  "message0": "BThread %1 %2",
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
  "type": "bp_eventset",
  "message0": "BP EventSet %1 name: %2 with function: %3",
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
        "message0": "BP EventSet %1 name: %2 with function name: %3",
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
                "name": "VAR",
                "check": "String"
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
        "type": "includes",
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
        "message0": "from object %1 get %2",
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
    "colour": 220,
    "tooltip": "",
    "helpUrl": ""
}
  ]);

//#region BP Basic + Advance Blocks

Blockly.JavaScript['bp_event'] = function(block) {
  var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  if(event_name === '\'\'')
	  event_name = '\'Anonymous event\'';

  var code = 'bp.Event('+event_name+')';

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
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +')';
 
 //return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bp_bsync_line'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
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
    var priority = '';
    if (value_priority !== 'null') {
        priority = ','+value_priority ;
    }

    var code = 'bp.sync({'+set.join(",\n")+'}'+ priority +')';

    return code+';\n';
};

Blockly.JavaScript['bp_bsync_with_output_line'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
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

    var variable = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'bp.EventSet('+event_name+','+eval(variable)+')';

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

Blockly.JavaScript['includes'] = function(block) {
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

//#region Object Blocks
Blockly.JavaScript['object'] = function(block) {
    var property_value = Blockly.JavaScript.statementToCode(block, 'LIST');
    var code = '{'+property_value.slice(0, -1) +'}';
    return [code, Blockly.JavaScript.ORDER_ATOMIC]};

Blockly.JavaScript['property_value'] = function(block) {
    var value_property = Blockly.JavaScript.valueToCode(block, 'PROPERTY', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = ' '+ eval(value_property)+ ':' + value_value + ',';
    return code;
};

Blockly.JavaScript['get_object_value'] = function(block) {
    var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
    var property = Blockly.JavaScript.valueToCode(block, 'PROPERTY', Blockly.JavaScript.ORDER_ATOMIC);

    var code = object+ '.' + eval(property);
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

    /**
     * Standard function for Mutator mixin. It's called to update the block based on contents of the mutator's XML
     * DOM element.
     */
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

    /**
     * Standard function for Mutator mixin. It's called to generate the mutator's XML DOM element based on the content
     * of the block.
     */
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

    /**
     * Standard function for Mutator mixin when the mutator uses the standard mutator UI. It's called to update the
     * block based on changes to the mutator's UI.
     */
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

    /**
     * Standard function for Mutator mixin when the mutator uses the standard mutator UI.  It's called to populate the
     * mutator UI.
     */
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

    /**
     * Standard function for Mutator mixin when the mutator uses the standard mutator UI.  It's called on any changes to
     * the block and is generally used to keep track of input connections (by saving them with their corresponding mutator
     * blocks), so that if the mutator later causes changes to the block it can restore those input connections.
     *
     * We're also using this function to update the mutator block field name values if the user changes the name in the
     * block.
     */
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
    },

};

Blockly.Extensions.registerMutator('controls_create_mutator', objectCreateMutator, null, ['object_field']);

//endregion Object Blocks

//#region Context
var context_name = ["Cell","CornerCell","SpecificCell","EmptyCell","NonEmptyCell","Triple"];
var commands =["UpdateCell","Finish the game"];
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

Blockly.Blocks['context_created'] = {
    // Value input.
    init: function() {
        this.setColour(210);
        this.appendDummyInput()
            .appendField('context created')
            .appendField(new Blockly.FieldDropdown(OPTIONS), 'CONTEXT');
        this.appendStatementInput('FIELDS');
        this.setPreviousStatement(true, 'Input');
        this.setNextStatement(true, 'Input');
        this.setOutput();
        this.setTooltip('context created');
    },
    onchange: function() {
        update_context_created(this);
    }
};

Blockly.JavaScript['context_created'] = function (block) {
    var ctx = block.getFieldValue('CONTEXT').toLowerCase();
    var property = Blockly.JavaScript.statementToCode(block, 'FIELDS');
    return "<< from context " + ctx + ', update properties: \n' + property + ' >>';
};

Blockly.Blocks['context_get_property'] = {
    init: function() {
        this.setColour(210);
        this.appendDummyInput()
            .appendField('from context:')
            .appendField(new Blockly.FieldDropdown(OPTIONS), 'CONTEXT');
        this.appendDummyInput('dropDownField')
            .appendField('get property:')
            .appendField(new Blockly.FieldDropdown(PROPERTIES), 'PROPERTY');
        this.setPreviousStatement(true, 'Input');
        this.setNextStatement(true, 'Input');
        this.setOutput();
        this.setTooltip('context_get_property');
    }
    ,
    onchange: function() {
        update_context(this);
    }

};

Blockly.JavaScript['context_get_property'] = function (block) {
    var ctx = block.getFieldValue('CONTEXT').toLowerCase();
    var property = block.getFieldValue('PROPERTY').toLowerCase();
    return "<< from context " + ctx + ', update properties: \n' + property + ' >>';
};

Blockly.Blocks['ctx_get_instances'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('ctx.getInstances')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'PROPERTY');
        this.setOutput(true, null);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_get_instances'] = function (block) {
    var property = block.getFieldValue('PROPERTY');
    var code = "ctx.getInstances(\""+property+"\")";
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['ctx_update_db'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('CTX.UpdateEvent')
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

Blockly.Blocks['ctx_new_context'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('ctx.NewContextEvent')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'CONTEXT_NAME');
        this.setOutput(true, null);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_new_context'] = function(block) {
    var name = block.getFieldValue('CONTEXT_NAME');

    var code = "ctx.NewContextEvent(\""+name+"\")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_update_db_data'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('CTX.UpdateEvent')
            .appendField(new Blockly.FieldDropdown(COMMAND), 'COMMAND');
        this.appendValueInput("DATA")
            .appendField("with data");
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

Blockly.Blocks['ctx_new_context_data'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendDummyInput('dropDownField')
            .appendField('ctx.NewContextEvent')
            .appendField(new Blockly.FieldDropdown(CONTEXT_NAME), 'CONTEXT_NAME');
        this.appendValueInput("DATA")
            .appendField("with data");
        this.setOutput(true, null);
        this.setInputsInline(true);
        this.setTooltip('get the context name');
    }
};

Blockly.JavaScript['ctx_new_context_data'] = function(block) {
    var name = block.getFieldValue('CONTEXT_NAME');
    var data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "NewContextEvent(\""+name+"\","+data+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['ctx_subscribe'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendValueInput("NAME")
            .appendField("ctx.subscribe");
        this.appendDummyInput('dropDownField')
            .appendField('with context')
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
    var code = 'ctx.subscribe('+name+',\"'+ ctx_name +'\",'+ 'function('+ctx_var_name+'){\n'+statements+'\n});\n';
    return code;
};

Blockly.Blocks['ctx_get_context'] = {
    // Value input.
    init: function () {
        this.setColour(240);
        this.appendValueInput("NAME")
            .appendField("CTX.getContextsOfType");
        this.setOutput(true, null);
        this.setTooltip('get context');
    }
};

Blockly.JavaScript['ctx_get_context'] = function(block) {
    var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "CTX.getContextsOfType("+name+")";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//#endregion Context


