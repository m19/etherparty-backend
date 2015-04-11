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
  return line + ';\n';
};

Blockly.Serpent.quote_ = function (string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\\n')
    .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

Blockly.Serpent.scrub_ = function (block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Serpent.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Serpent.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Serpent.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Serpent.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};