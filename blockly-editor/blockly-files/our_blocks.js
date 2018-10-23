Blockly.defineBlocksWithJsonArray([

{
    "type": "bp_event",
    "message0": "BP Event %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME",
        "check": "String"
      },
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
  "message0": "bsync with:%1 Wait %2 Request %3 Block %4",
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
  "message0": "bsync with:%1 Wait %2 Request %3 Block %4",
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
    }
  ],
  "output":"BP_EVENT",
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
  "type": "toString",
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
        "colour": 65,
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
    }


  ]);
  
  
Blockly.JavaScript['bp_event'] = function(block) {
  var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  if(event_name == '\'\'')
	  event_name = '\'Anonymous event\'';

  var code = 'bp.Event('+event_name+')';

  return [code, Blockly.JavaScript.ORDER_ATOMIC]};

Blockly.JavaScript['bp_event_with_data'] = function(block) {
    var event_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    if(event_name == '\'\'')
        event_name = '\'Anonymous event\'';
    var event_data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_ATOMIC);

        var code = 'bp.Event('+event_name+','+')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC]};
  
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
    var code = 'bsync({'+set.join(",\n")+'})';
  //if(value_wait == 'null' || value_wait.includes('bp.EventSet'))
	//  return code+';\n';
  
  
  //generated_line_format = '//Auto-generated code for dynamic event detection:\nbp.log.info(\"EVENT_DETECTED: \"+'
  //if waitFor is a list of events, generate a bp.log.info line for each of them, for the downstream application
  // if (value_wait.startsWith('[')){
	// value_wait = value_wait.substring(1,value_wait.length-1);//remove brackets
	// split = value_wait.split(',');
	// split.forEach(function(entry){
	// 	code=generated_line_format+getEventName(entry.trim())+');\n'+code;
	// });
  // }
  // else
	// code=generated_line_format+getEventName(value_wait.trim())+');\n'+code;
  
  return code+';\n';
};

Blockly.JavaScript['bp_bsync_with_output'] = function(block) {
  var value_wait = Blockly.JavaScript.valueToCode(block, 'WAIT', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_request = Blockly.JavaScript.valueToCode(block, 'REQUEST', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
  var value_block = Blockly.JavaScript.valueToCode(block, 'BLOCK', Blockly.JavaScript.ORDER_ATOMIC) || 'null';

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
    var code = 'bsync({'+set.join(",\n")+'})';
 
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

Blockly.JavaScript['text_startswith'] = function(block) {
  var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
  var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
  var code = a+'.startsWith('+b+')';
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

Blockly.JavaScript['toString'] = function(block) {
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

Blockly.Blocks['procedures_defreturn2'] = {
    init: function() {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        if ((this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                    this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
            this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
        }
        this.setColour(Blockly.Msg['PROCEDURES_HUE']);
        this.setOutput(true, null);
        this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
        this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    getProcedureDef: function() {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
    displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
};


Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('procedures_defreturn2');
