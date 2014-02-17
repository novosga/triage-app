/**
 * SGA TriagemTouch (print)
 * @author rogeriolino
 */
;(function() {
    "use strict";
    
    var app = angular.module('TriagemTouch', []);
    app.controller('ImpressaoCtrl', function($scope) {
        $scope.atendimento = {};
        $scope.unidade = {};

        $scope.print = function(atendimento) {
            $scope.$apply(function() {
                $scope.atendimento = atendimento;
                window.print();
            });
        };
    });

    window.postLoad = function(atendimento) {
        var scope = angular.element(document.body).scope();
        scope.print(atendimento);
    };
    
})();