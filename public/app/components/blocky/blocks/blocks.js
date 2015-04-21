var VALUE_COLOR = 190,
  VAR_COLOR = 260,
  FLOW_COLOR = 210,
  LOOP_COLOR = 160,
  MATH_COLOR = 230,
  PROCEDURE_COLOR = 100,
  STATEMENT_COLOR = 330,
  COMMENT_COLOR = 58,
  ARRAY_COLOR = 290;

var valValidator = function (e) {
  return e.replace(/[^a-z0-9_]/gi, '');
};
var varValidator = function (e) {
  return e.replace(/^[0-9]+|[^a-z0-9_]/gi, '');
};

Blockly.Blocks['COMMENT'] = {
  init: function () {
    this.setColour(COMMENT_COLOR);
    this.appendDummyInput()
      .appendField('note:')
      .appendField(new Blockly.FieldTextInput(''), 'COMMENT');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['VAL'] = {
  init: function () {
    this.setColour(VALUE_COLOR);
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('0', Blockly.Serpent.smartVal), 'VAL');
    this.setOutput(true);
  }
};

Blockly.Blocks['TX'] = {
  init: function () {
    this.setColour(VALUE_COLOR);
    this.appendDummyInput()
      .appendField('tx')
      .appendField(new Blockly.FieldDropdown([['amount', 'callvalue'], ['origin', 'origin'], ['gas left', 'gas'],
        ['gas price', 'gasprice']]), 'PROP');
    this.setOutput(true);
  }
};

Blockly.Blocks['CONTRACT'] = {
  init: function () {
    this.setColour(VALUE_COLOR);
    this.appendDummyInput()
      .appendField('contract')
      .appendField(new Blockly.FieldDropdown([['caller', 'caller'], ['address', 'address'], ['balance', 'balance'],
        ['1st input', '1st_input'], ['input count', 'input_count']]), 'PROP');
    this.setOutput(true);
  }
};

Blockly.Blocks['BLOCKINFO'] = {
  init: function () {
    this.setColour(VALUE_COLOR);
    this.appendDummyInput()
      .appendField('block')
      .appendField(new Blockly.FieldDropdown([['timestamp', 'timestamp'], ['number', 'number'],
        ['previous hash', 'prevhash'], ['coinbase', 'coinbase'], ['difficulty', 'difficulty'],
        ['total gas', 'gaslimit']]), 'PROP');
    this.setOutput(true);
  }
};

Blockly.Blocks['MATH'] = {
  init: function () {
    var dropdown = [
      ['+', '+'],
      ['*', '*'],
      ['-', '-'],
      ['/', '/'],
      ['raised to', '^'],
      ['modulo', '%']
    ];

    this.setColour(MATH_COLOR);
    this.setOutput(true);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(true);
  }
};

Blockly.Blocks['COMPARE'] = {
  init: function () {
    var dropdown = [
      ['=', '=='],
      ['>', '>'],
      ['<', '<'],
      ['!=', '!='],
      ['<=', '<='],
      ['>=', '>=']
    ];
    this.setColour(MATH_COLOR);
    this.setOutput(true);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(true);
  }
};

Blockly.Blocks['LOGIC'] = {
  init: function () {
    var dropdown = [
      ['or', 'or'],
      ['and', 'and']
    ];
    this.setColour(MATH_COLOR);
    this.setOutput(true);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(false);
  }
};

Blockly.Blocks['LOAD'] = {
  init: function () {
    var dropdown = [
      ['save slot', 'sload'],
      ['temp slot', 'mload']
    ];
    this.setColour(VAR_COLOR);
    this.appendValueInput('SPOT')
      .appendField('data at')
      .appendField(new Blockly.FieldDropdown(dropdown), 'POOL')
      .setCheck('Number');
    this.setOutput(true);
    this.setInputsInline(false);
  }
};

Blockly.Blocks['STORE'] = {
  init: function () {
    var dropdown = [
      ['save slot', 'sstore'],
      ['temp slot', 'mstore']
    ];
    this.setColour(VAR_COLOR);
    this.appendValueInput('SPOT')
      .appendField('in')
      .appendField(new Blockly.FieldDropdown(dropdown), 'POOL')
      .setCheck('Number');
    this.appendValueInput('VAL')
      .appendField('put');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['SPEND'] = {
  init: function () {
    this.setColour(STATEMENT_COLOR);
    this.appendValueInput('AMOUNT')
      .appendField('spend')
      .setCheck('Number');
    this.appendValueInput('TO').appendField('to');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['STOP'] = {
  init: function () {
    this.setColour(STATEMENT_COLOR);
    this.appendDummyInput().appendField('stop');
    this.setPreviousStatement(true);
  }
};

Blockly.Blocks['WHEN'] = {
  init: function () {
    var dropdown = [
      ['when', 'when'],
      ['unless', 'unless']
    ];

    this.setColour(FLOW_COLOR);
    this.appendValueInput('COND')
      .setCheck('Boolean')
      .appendField(new Blockly.FieldDropdown(dropdown), 'WORD');
    this.appendStatementInput('THEN')
      .appendField('then');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['IF'] = {
  init: function () {
    this.setColour(FLOW_COLOR);
    this.appendValueInput('COND')
      .setCheck('Boolean')
      .appendField('if');
    this.appendStatementInput('THEN').appendField('then');
    this.appendStatementInput('ELSE').appendField('else');
    this.setPreviousStatement(true);
    this.setNextStatement(true)
  }
};

Blockly.Blocks['WHILE'] = {
  init: function () {
    var e = [
      ['while', 'WHILE'],
      ['until', 'UNTIL']
    ];
    this.setColour(LOOP_COLOR);
    this.appendValueInput('COND')
      .setCheck('Boolean')
      .appendField(new Blockly.FieldDropdown(e), 'WORD');
    this.appendStatementInput('DO')
      .appendField('repeat');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['INIT'] = {
  init: function () {
    this.setColour(LOOP_COLOR);
    this.appendStatementInput('INIT')
      .appendField('init');
    this.appendStatementInput('BODY').appendField('body');
    this.setInputsInline(false);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};

Blockly.Blocks['CURRENCY'] = {
  init: function () {
    var currencies = [
      ['wei', 'wei'],
      ['Kwei', 'Kwei'],
      ['Mwei', 'Mwei'],
      ['Gwei', 'Gwei'],
      ['szabo', 'szabo'],
      ['finney', 'finney'],
      ['ether', 'ether'],
      ['Kether', 'Kether'],
      ['Mether', 'Mether'],
      ['Gether', 'Gether'],
      ['Tether', 'Tether'],
      ['Pether', 'Pether'],
      ['Eether', 'Eether'],
      ['Zether', 'Zether'],
      ['Yether', 'Yether'],
      ['Nether', 'Nether'],
      ['Dether', 'Dether'],
      ['Vether', 'Vether'],
      ['Uether', 'Uether']
    ];
    this.setColour(VALUE_COLOR);
    this.appendValueInput('AMT')
      .setCheck('Number');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(currencies), "DENOM");
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['INPUT'] = {
  init: function () {
    var ordinals = [
      ['1st', '0'],
      ['2nd', '1'],
      ['3rd', '2'],
      ['4th', '3'],
      ['5th', '4'],
      ['6th', '5'],
      ['7th', '6'],
      ['8th', '7'],
      ['9th', '8'],
      ['10th', '9'],
      ['11th', '10'],
      ['12th', '11'],
      ['13th', '12'],
      ['14th', '13'],
      ['15th', '14'],
      ['16th', '15'],
      ['17th', '16'],
      ['18th', '17'],
      ['19th', '18'],
      ['20th', '19']
    ];
    this.setColour(VALUE_COLOR);
    this.setOutput(true);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(ordinals), 'INDEX').appendField('input');
    this.setInputsInline(true)
  }
};

Blockly.Blocks['THINPUT'] = {
  init: function () {
    this.setColour(VALUE_COLOR);
    this.setOutput(true);
    this.appendValueInput('ORDINAL');
    this.appendDummyInput()
      .appendField("th input");
    this.setInputsInline(true);
  }
};

Blockly.Blocks['MSTORE'] = {
  init: function () {
    this.setColour(VAR_COLOR);
    this.appendValueInput('VAL')
      .appendField(new Blockly.FieldTextInput('x', varValidator), 'SPOT')
      .appendField('=');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['MVAL'] = {
  init: function () {
    this.setColour(VAR_COLOR);
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('', varValidator), 'SPOT');
    this.setOutput(true);
  }
};

Blockly.Blocks['RESERVE'] = {
  init: function () {
    this.setColour(VAR_COLOR);
    this.appendValueInput('LEN')
      .appendField('reserve');
    this.appendDummyInput().appendField('temp slots');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};