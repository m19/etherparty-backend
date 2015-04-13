Blockly.Serpent = new Blockly.Generator('Serpent');

Blockly.Serpent.addReservedWords('');

Blockly.Serpent.init = function (workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Serpent.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Serpent.functionNames_ = Object.create(null);

  if (!Blockly.Serpent.variableDB_) {
    Blockly.Serpent.variableDB_ =
      new Blockly.Names(Blockly.Serpent.RESERVED_WORDS_);
  } else {
    Blockly.Serpent.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = 'var ' +
    Blockly.Serpent.variableDB_.getName(variables[x],
      Blockly.Variables.NAME_TYPE) + ';';
  }
  Blockly.Serpent.definitions_['variables'] = defvars.join('\n');
};

Blockly.Serpent.finish = function (code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Serpent.definitions_) {
    definitions.push(Blockly.Serpent.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

Blockly.Serpent.scrubNakedValue = function (line) {
  return line + '\n';
};

Blockly.Serpent.quote_ = function (string) {
  return '"' + string + '"';
};

Blockly.Serpent.scrub_ = function (block, code) {
  if (null === code) return '';
  var o = '';
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    var l = block.getCommentText();
    l && (o += this.prefixLines(l, '// ') + '\n');
    for (var n = 0; n < block.inputList.length; n++)
      if (block.inputList[n].type == Blockly.INPUT_VALUE) {
        var i = block.inputList[n].connection.targetBlock();
        if (i) {
          var l = this.allNestedComments(i);
          l && (o += this.prefixLines(l, '// '))
        }
      }
  }
  var s = block.nextConnection && block.nextConnection.targetBlock(),
    a = this.blockToCode(s);
  return o + code + a
};

/**
 * Order of operations
 */
Blockly.Serpent.ORDER_ATOMIC = 0;
Blockly.Serpent.ORDER_MULTIPLICATION = 5; // *
Blockly.Serpent.ORDER_DIVISION = 5;       // /
Blockly.Serpent.ORDER_MODULUS = 5;        // %
Blockly.Serpent.ORDER_ADDITION = 6;       // +
Blockly.Serpent.ORDER_SUBTRACTION = 6;    // -
Blockly.Serpent.ORDER_NONE = 99;

Blockly.Serpent.MAX_GAS = '(tx.gas - 100)';

Blockly.Serpent.INIT = function (block) {
  var init = Blockly.Serpent.statementToCode(block, 'INIT');
  var body = Blockly.Serpent.statementToCode(block, 'BODY');
  return 'init:\n' + init + 'code:\n' + body + '\n';
};

Blockly.Serpent.SPEND = function (block) {
  var to = Blockly.Serpent.valueToCode(block, 'TO', Blockly.Serpent.ORDER_NONE) || 0;
  var amount = Blockly.Serpent.valueToCode(block, 'AMOUNT', Blockly.Serpent.ORDER_NONE) || '0wei';
  return 'send(' + to + ', ' + amount + ', ' + Blockly.Serpent.MAX_GAS + ')\n';
};

Blockly.Serpent.VAL = function (block) {
  var code = parseFloat(block.getFieldValue("VAL") || 0);
  return [code, Blockly.Serpent.ORDER_ATOMIC]
};

Blockly.Serpent.STOP = function () {
  return 'stop\n';
};

Blockly.Serpent.TX = function (e) {
  var value = e.getFieldValue('PROP');

  var code;

  if (value == 'callvalue') {
    code = 'msg.value';
  } else {
    code = 'tx.' + value;
  }

  return [code, Blockly.Serpent.ORDER_ATOMIC]
};

Blockly.Serpent.INPUT = function (block) {
  var index = block.getFieldValue('INDEX') || 0;
  var code = 'msg.data[' + index + ']';
  return [code, Blockly.Serpent.ORDER_ATOMIC]
};

Blockly.Serpent.THINPUT = function (block) {
  var index = Blockly.Serpent.valueToCode(block, 'ORDINAL', Blockly.Serpent.ORDER_NONE) || 1;
  index--;
  var code = "msg.data[" + index + "]";
  return [code, Blockly.Serpent.ORDER_ATOMIC]
};

Blockly.Serpent.CONTRACT = function (block) {
  var field = block.getFieldValue('PROP');

  var code;

  switch (field) {
    case 'caller':
      code = 'msg.sender';
      break;
    case 'address':
      code = 'contract.address';
      break;
    case 'balance':
      code = 'contract.balance';
      break;
    case '1st_input':
      code = 'msg.data[0]';
      break;
    case 'input_count':
      code = 'msg.datasize';
      break;
  }

  return [code, Blockly.Serpent.ORDER_ATOMIC];
};

Blockly.Serpent.BLOCKINFO = function (block) {
  var field = block.getFieldValue('PROP');
  var code = 'block.' + field;

  return [code, Blockly.Serpent.ORDER_ATOMIC];
};

Blockly.Serpent.MATH = function (block) {
  var op = block.getFieldValue('OP');
  var order = Blockly.Serpent.ORDER_NONE;
  var a = Blockly.Serpent.valueToCode(block, 'A', order) || 0;
  var b = Blockly.Serpent.valueToCode(block, 'B', order) || 0;

  switch (op) {
    case '+':
      order = Blockly.Serpent.ORDER_ADDITION;
      break;
    case '*':
      order = Blockly.Serpent.ORDER_MULTIPLICATION;
      break;
    case '-':
      order = Blockly.Serpent.ORDER_SUBTRACTION;
      break;
    case '%':
      order = Blockly.Serpent.ORDER_MODULUS;
      break;
  }

  var code = '(' + a + ' ' + op + ' ' + b + ')';

  return [code, order];
};

Blockly.Serpent.COMPARE = function (block) {
  var compare = block.getFieldValue('OP');
  var order = Blockly.Serpent.ORDER_NONE;
  var a = Blockly.Serpent.valueToCode(block, 'A', order) || 0;
  var b = Blockly.Serpent.valueToCode(block, 'B', order) || 0;

  var code = '';
  if (compare === '!=') {
    code = 'not (' + a + ' == ' + b + ')';
  } else {
    code = '(' + a + ' ' + compare + ' ' + b + ')';
  }

  return [code, Blockly.Serpent.ORDER_ATOMIC];
};

Blockly.Serpent.LOGIC = function (block) {
  var logic = block.getFieldValue('OP');
  var order = Blockly.Serpent.ORDER_NONE;
  var a = Blockly.Serpent.valueToCode(block, 'A', order) || 0;
  var b = Blockly.Serpent.valueToCode(block, 'B', order) || 0;

  var code = '(' + a + ' ' + logic + ' ' + b + ')';

  return [code, Blockly.Serpent.ORDER_ATOMIC];
};

Blockly.Serpent.MSTORE = function (block) {
  var spot = block.getFieldValue('SPOT') || 0;
  var order = Blockly.Serpent.ORDER_NONE;
  var val = Blockly.Serpent.valueToCode(block, 'VAL', order) || 0;

  return spot + ' = ' + val + '\n';
};