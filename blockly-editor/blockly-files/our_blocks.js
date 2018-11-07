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
    var code = 'bp.sync({'+set.join(",\n")+'})';
 
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


