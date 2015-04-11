var INFO_COLOR = 0,
  OUTPUT_COLOR = 100,
  MATH_COLOR = 150,
  VALUE_COLOR = 200,
  STATEMENT_COLOR = 250,
  FLOW_COLOR = 300,
  LOOP_COLOR = 350;

Blockly.Blocks['COMMENT'] = {
  init: function () {
    this.setColour(INFO_COLOR);
    this.appendDummyInput()
      .appendField('note:')
      .appendField(new Blockly.FieldTextInput(''), 'COMMENT');
    this.setNextStatement(true);
  }
};

Blockly.Blocks['VALUE'] = {
  init: function () {
    this.setColour(OUTPUT_COLOR);
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'VALUE');
    this.setOutput(true);
  }
};

Blockly.Blocks['TX'] = {
  init: function () {
    this.setColour(OUTPUT_COLOR);
    this.appendDummyInput()
      .appendField('tx')
      .appendField(new Blockly.FieldDropdown([['amount', 'AMOUNT'], ['origin', 'ORIGIN'], ['gas left', 'GAS LEFT'],
        ['gas price', 'GAS PRICE']]), 'TX');
    this.setOutput(true);
  }
};

Blockly.Blocks['CONTRACT'] = {
  init: function () {
    this.setColour(OUTPUT_COLOR);
    this.appendDummyInput()
      .appendField('contract')
      .appendField(new Blockly.FieldDropdown([['caller', 'CALLER'], ['address', 'ADDRESS'], ['balance', 'BALANCE'],
        ['1st input', '1ST INPUT'], ['input count', 'INPUT COUNT']]), 'CONTRACT');
    this.setOutput(true);
  }
};

Blockly.Blocks['BLOCKINFO'] = {
  init: function () {
    this.setColour(OUTPUT_COLOR);
    this.appendDummyInput()
      .appendField('block')
      .appendField(new Blockly.FieldDropdown([['timestamp', 'TIMESTAMP'], ['number', 'NUMBER'],
        ['previous hash', 'PREVIOUS HASH'], ['coinbase', 'COINBASE'], ['difficulty', 'DIFFICULTY'],
        ['total gas', 'TOTAL GAS']]), 'BLOCKINFO');
    this.setOutput(true);
  }
};

Blockly.Blocks['MATH'] = {
  init: function () {
    var dropdown = [
      ['+', '+'],
      ['*', '*'],
      ['-', '-'],
      ['/', 'div'],
      ['raised to', 'exp'],
      ['modulo', 'mod']
    ];

    this.setColour(MATH_COLOR);
    this.setOutput(!0);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(!0);
  }
};

Blockly.Blocks['COMPARE'] = {
  init: function () {
    var dropdown = [
      ['=', '='],
      ['>', '>'],
      ['<', '<'],
      ['!=', '!='],
      ['<=', '<='],
      ['>=', '>=']
    ];
    this.setColour(MATH_COLOR);
    this.setOutput(!0);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(!0);
  }
};

Blockly.Blocks['CONDITION'] = {
  init: function () {
    var dropdown = [
      ['or', '||'],
      ['and', '&&']
    ];
    this.setColour(MATH_COLOR);
    this.setOutput(!0);
    this.appendValueInput('A').setCheck('Number');
    this.appendValueInput('B').setCheck('Number')
      .appendField(new Blockly.FieldDropdown(dropdown), 'OP');
    this.setInputsInline(!1);
  }
};

Blockly.Blocks['LOAD'] = {
  init: function () {
    var dropdown = [
      ['save slot', 'sload'],
      ['temp slot', 'mload']
    ];
    this.setColour(VALUE_COLOR);
    this.appendValueInput('SPOT')
      .appendField('data at')
      .appendField(new Blockly.FieldDropdown(dropdown), 'POOL')
      .setCheck('Number');
    this.setOutput(!0);
    this.setInputsInline(!1);
  }
};

Blockly.Blocks['STORE'] = {
  init: function () {
    var dropdown = [
      ['save slot', 'sstore'],
      ['temp slot', 'mstore']
    ];
    this.setColour(VALUE_COLOR);
    this.appendValueInput('SPOT')
      .appendField('in')
      .appendField(new Blockly.FieldDropdown(dropdown), 'POOL')
      .setCheck('Number');
    this.appendValueInput('VAL')
      .appendField('put');
    this.setInputsInline(!1);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
  }
};

Blockly.Blocks['SPEND'] = {
  init: function () {
    this.setColour(STATEMENT_COLOR);
    this.appendValueInput('AMOUNT')
      .appendField('spend')
      .setCheck('Number');
    this.appendValueInput('TO').appendField('to');
    this.setInputsInline(!0);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
  }
};

Blockly.Blocks['STOP'] = {
  init: function () {
    this.setColour(STATEMENT_COLOR);
    this.appendDummyInput().appendField('stop');
    this.setPreviousStatement(!0);
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
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
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
    this.setPreviousStatement(!0);
    this.setNextStatement(!0)
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
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
  }
};

Blockly.Blocks['INIT'] = {
  init: function () {
    this.setColour(LOOP_COLOR);
    this.appendStatementInput('INIT')
      .appendField('init');
    this.appendStatementInput('BODY').appendField('body');
    this.setInputsInline(!1);
    this.setPreviousStatement(!1);
    this.setNextStatement(!1);
  }
};