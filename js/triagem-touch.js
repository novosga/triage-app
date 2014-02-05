/**
 * SGA TriagemTouch Web
 * @author rogeriolino
 */
;(function() {
    "use strict";

    var app = angular.module('TriagemTouch', []);

    app.controller('TriagemCtrl', function($scope, $http) {

        $scope.url = Storage.get('url');
        $scope.unidade = Storage.get('unidade');
        $scope.usuario = Storage.get('usuario');
        $scope.senha = Storage.get('senha');
        $scope.unidades = [];
        $scope.servicos = [];
        $scope.prioridades = [];
        $scope.senha = [];

        $scope.loadUnidades = function() {
            $scope.unidades = [];
            if ($scope.url) {
                $http({ method: 'GET', url: $scope.url + '/api/unidades' }).
                success(function(data, status, headers, config) {
                    $scope.unidades = data;
                });
            }
        }

        $scope.loadServicos = function() {
            $scope.servicos = [];
            if ($scope.url && $scope.unidade > 0) {
                $http({ method: 'GET', url: $scope.url + '/api/servicos/' + $scope.unidade }).
                success(function(data, status, headers, config) {
                    $scope.servicos = data;
                });
            }
        }

        $scope.loadPrioridades = function() {
            $scope.prioridades = [];
            if ($scope.url) {
                $http({ method: 'GET', url: $scope.url + '/api/prioridades' }).
                success(function(data, status, headers, config) {
                    $scope.prioridades = data;
                });
            }
        }

        $scope.save = function() {
            Storage.set('url', $scope.url);
            Storage.set('unidade', $scope.unidade);
            $scope.load();
            $('#config').modal('hide');
        }

        $scope.load = function() {
            $scope.loadUnidades();
            $scope.loadServicos();
            $scope.loadPrioridades();
            if ($scope.url && $scope.usuario && $scope.senha) {
                OAuth2.url = $scope.url + '/api/token';
                OAuth2.clientId = 'triagem';
                OAuth2.request($scope.usuario, $scope.senha);
            }
        }

        $scope.tipoAtendimento = function(servico) {
            $scope.servico = servico;
            gotoPage('#tipo-atendimento');
        }

        $scope.tipoPrioridade = function() {
            gotoPage('#prioridades');
        }

        $scope.distribuiNormal = function() {
            $scope.distribuiSenha(1);
        }

        $scope.distribuiSenha = function(prioridade) {
            $.ajax({
                type: 'post', 
                url: $scope.url + '/api/distribui?access_token=' + OAuth2.accessToken,
                data: {
                    unidade: $scope.unidade,
                    servico: $scope.servico
                },
                error: function(xhr, textStatus) {
                    var response = $.parseJSON(xhr.responseText)
                    alert(response.error);
                },
                success: function(response) {
                    if (response.error) {
                        alert(response.error);
                    } else {
                        alert(response.id + " - " + response.atendimento.numero);
                    }
                },
                complete: function() {
                    gotoIndex();
                }
            });
        }

        $scope.fullscreen = function() {
            var elem = document.body;
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            }
            if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen();
            }
            if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            }
            if (elem.msRequestFullScreen) {
                elem.msRequestFullScreen();
            }
        }

        $scope.load();
    });

    var OAuth2 = {

        accessToken: '',
        refreshToken: '',
        expires: null,
        startTime: 0,
        intervalId: 0,
        url: '',
        user: '',
        pass: '',
        clientId: '',

        ajax: function(data, fn) {
            $.ajax({
                url: OAuth2.url,
                type: 'post',
                data: data,
                success: function(response) {
                    OAuth2.accessToken = response.access_token;
                    OAuth2.expires = response.expires_in;
                    if (response.refresh_token) {
                        OAuth2.refreshToken = response.refresh_token;
                    }
                    if (typeof(fn) === 'function') {
                        fn(response);
                    }
                }
            });
        },

        request: function(user, pass) {
            var data = {
                grant_type: "password",
                username: user,
                password: pass,
                client_id: OAuth2.clientId,
                refresh_token: OAuth2.refreshToken
            }
            OAuth2.ajax(data, function() {
                console.log('[REQUEST] token: ' + OAuth2.accessToken);
                // auto refresh
                OAuth2.listen();
            });
        },

        refresh: function() {
            console.log('[REFRESH] atualizando o token');
            var data = {
                grant_type: "refresh_token",
                client_id: OAuth2.clientId,
                refresh_token: OAuth2.refreshToken
            }
            OAuth2.ajax(data, function() {
                console.log('[REFRESH] novo token: ' + OAuth2.accessToken);
            });
        },

        listen: function() {
            clearInterval(OAuth2.intervalId);
            OAuth2.startTime = new Date().getTime();
            OAuth2.intervalId = setInterval(function() {
                var now = new Date().getTime();
                var diff = (now - OAuth2.startTime) / 1000;
                var expires = OAuth2.expires - 120;
                console.log('[LISTEN] tempo passado: ' + diff + '. Expira em: ' + expires);
                if (diff >= expires) {
                    clearInterval(OAuth2.intervalId);
                    OAuth2.refresh();
                }
            }, 60 * 1000);
        }
    }

    var Storage = {

        set: function(name, value) {
            if (localStorage) {
                localStorage.setItem(name, value);
            } else {
                // cookie
                document.cookie = name + "=" + value + "; path=/";
            }
        },
                
        get: function(name) {
            if (localStorage) {
                return localStorage.getItem(name);
            } else {
                // cookie
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1,c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
            }
            return null;
        }

    };

    var gotoIndex = function() {
        $('.page').hide();
        $('#servicos').show();
    }

    var resetInterval = 0;
    var gotoPage = function(page) {
        $('.page').hide();
        $(page).show();
        clearInterval(resetInterval);
        // volta para a tela de serviços quando ocioso
        resetInterval = setTimeout(gotoIndex, 15 * 1000);
    }

    // ocultando e adicionando animacao ao menu
    setTimeout(function() {
        $('#menu').fadeTo("slow", 0, function() {
            $('#menu').hover(
                function() {
                    $('#menu').fadeTo("fast", 1);
                }, 
                function() {
                    $('#menu').fadeTo("slow", 0);
                }
            );
        });
    }, 3000);


})();
