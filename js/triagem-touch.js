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
        $scope.clientId = Storage.get('clientId');
        $scope.clientSecret = Storage.get('clientSecret');
        $scope.unidades = [];
        $scope.servicos = [];
        $scope.prioridades = [];

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
            if ($scope.url && $scope.unidade > 0) {
                $http({ method: 'GET', url: $scope.url + '/api/servicos/' + $scope.unidade }).
                success(function(data, status, headers, config) {
                    $scope.servicos = data;
                });
            }
        }

        $scope.loadPrioridades = function() {
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
            Storage.set('usuario', $scope.usuario);
            Storage.set('senha', $scope.senha);
            Storage.set('clientId', $scope.clientId);
            Storage.set('clientSecret', $scope.clientSecret);
            $scope.load();
            $('#config').modal('hide');
        }

        $scope.load = function() {
            $scope.loadUnidades();
            $scope.loadServicos();
            $scope.loadPrioridades();
            if ($scope.url && $scope.usuario && $scope.senha && $scope.clientId) {
                // primeiro verifica se ja possui um token valido para evitar criar token atoa
                OAuth2.url = $scope.url + '/api/token';
                OAuth2.accessToken = Storage.get('access_token');
                OAuth2.refreshToken = Storage.get('refresh_token');
                OAuth2.expireTime = Storage.get('expire_time');
                OAuth2.clientId = $scope.clientId;
                OAuth2.clientSecret = $scope.clientSecret;
                $.ajax({
                    url: $scope.url + '/api/check?access_token=' + OAuth2.accessToken,
                    success: function(response) {
                        if (response.error) {
                            $('#error').modal('show').find('.modal-body').html(response.error_description);
                        } else {
                            // monitora o token atual
                            OAuth2.listen();
                        }
                    },
                    error: function() {
                        // solicita um novo token
                        OAuth2.request($scope.usuario, $scope.senha, function() {
                            Storage.set('access_token', OAuth2.accessToken);
                            Storage.set('refresh_token', OAuth2.refreshToken);
                            Storage.set('expire_time', OAuth2.expireTime);
                        });
                    }
                });
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
                    servico: $scope.servico,
                    prioridade: prioridade
                },
                error: function(xhr, textStatus) {
                    var response = $.parseJSON(xhr.responseText)
                    showError(response.error);
                },
                success: function(response) {
                    if (response.error) {
                        showError(response.error);
                    } else {
                        // TODO imprimir
                        showError(response.id + " - <strong>" + response.atendimento.numero + '</strong>');
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
        expireTime: null,
        intervalId: 0,
        url: '',
        user: '',
        pass: '',
        clientId: '',
        clientSecret: '',

        ajax: function(data, fn) {
            $.ajax({
                url: OAuth2.url,
                type: 'post',
                data: data,
                success: function(response) {
                    if (response.error) {
                        $('#error').modal('show').find('.modal-body').html(response.error_description);
                    } else {
                        OAuth2.accessToken = response.access_token;
                        var now = new Date().getTime();
                        OAuth2.expireTime = now + response.expires_in * 1000;
                        if (response.refresh_token) {
                            OAuth2.refreshToken = response.refresh_token;
                        }
                        if (typeof(fn) === 'function') {
                            fn(response);
                        }
                    }
                }
            });
        },

        request: function(user, pass, fn) {
            var data = {
                grant_type: "password",
                username: user,
                password: pass,
                client_id: OAuth2.clientId,
                client_secret: OAuth2.clientSecret
            }
            OAuth2.ajax(data, function() {
                if (typeof(fn) === 'function') {
                    fn();
                }
                // auto refresh
                OAuth2.listen();
            });
        },

        refresh: function() {
            var data = {
                grant_type: "refresh_token",
                client_id: OAuth2.clientId,
                refresh_token: OAuth2.refreshToken
            }
            OAuth2.ajax(data);
        },

        listen: function() {
            clearInterval(OAuth2.intervalId);
            OAuth2.intervalId = setInterval(function() {
                // pega um token novo 2 minutos antes de expirar
                var now = new Date().getTime() - 120 * 1000;
                if (now >= OAuth2.expireTime) {
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

    var showError = function(msg) {
        $('#error').modal('show').find('.modal-body').html('<p>' + msg + '</p>');
    }

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
