'use strict';

angular.module('etherparty')
  .controller('SandboxController', function ($scope) {
    angular.element(document).ready(function () {
      Blockly.inject(document.getElementById('blockly'), {toolbox: document.getElementById('toolbox')});
    });

  });