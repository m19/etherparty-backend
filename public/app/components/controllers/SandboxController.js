'use strict';

angular.module('etherparty')
  .controller('SandboxController', function ($scope) {
    angular.element(document).ready(function () {
      Blockly.inject(document.getElementById('blockly'), {toolbox: document.getElementById('toolbox')});
      Blockly.addChangeListener(myUpdateFunction);
    });

    function myUpdateFunction () {
      var code = Blockly.Serpent.workspaceToCode();
      document.getElementById('result').value = code;
      localStorage.setItem('code', code);
    }
  });