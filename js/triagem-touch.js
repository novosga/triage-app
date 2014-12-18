/**
 * SGA TriagemTouch
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
                success(function(data) {
                    $scope.unidades = data;
                });
            }
        };

        $scope.loadServicos = function() {
            if ($scope.url && $scope.unidade > 0) {
                $http({ method: 'GET', url: $scope.url + '/api/servicos/' + $scope.unidade }).
                success(function(data) {
                    $scope.servicos = data;
                });
            }
        };

        $scope.loadPrioridades = function() {
            if ($scope.url) {
                $http({ method: 'GET', url: $scope.url + '/api/prioridades' }).
                success(function(data) {
                    $scope.prioridades = data;
                });
            }
        };

        $scope.save = function() {
            Storage.set('url', $scope.url);
            Storage.set('unidade', $scope.unidade);
            Storage.set('usuario', $scope.usuario);
            Storage.set('senha', $scope.senha);
            Storage.set('clientId', $scope.clientId);
            Storage.set('clientSecret', $scope.clientSecret);
            $scope.load();
            $('#config').modal('hide');
        };

        $scope.load = function() {
            $scope.loadUnidades();
            $scope.loadServicos();
            $scope.loadPrioridades();
            if ($scope.url && $scope.usuario && $scope.senha && $scope.clientId) {
                // primeiro verifica se ja possui um token valido para evitar criar token atoa
                OAuth2.url = $scope.url + '/api';
                OAuth2.accessToken = Storage.get('access_token');
                OAuth2.refreshToken = Storage.get('refresh_token');
                OAuth2.expireTime = Storage.get('expire_time');
                OAuth2.clientId = $scope.clientId;
                OAuth2.clientSecret = $scope.clientSecret;
                OAuth2.user = $scope.usuario;
                OAuth2.pass = $scope.senha;
                OAuth2.check();
            }
        };

        $scope.tipoAtendimento = function(servico) {
            $scope.servico = servico;
            gotoPage('#tipo-atendimento');
        };

        $scope.tipoPrioridade = function() {
            gotoPage('#prioridades');
        };

        $scope.distribuiNormal = function() {
            $scope.distribuiSenha(1);
        };

        $scope.distribuiSenha = function(prioridade) {
            $.ajax({
                type: 'post', 
		dataType: 'json',
                url: $scope.url + '/api/distribui?access_token=' + OAuth2.accessToken,
                data: {
                    unidade: $scope.unidade,
                    servico: $scope.servico,
                    prioridade: prioridade
                },
                error: function(xhr) {
                    var response = $.parseJSON(xhr.responseText);
                    showError(response.error);
                },
                success: function(response) {
                    if (response.error) {
                        showError(response.error);
                    } else {
                        Impressao.imprimir(response);
                    }
                },
                complete: function() {
                    gotoIndex();
                }
            });
        };

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
        };

        $scope.load();
    });

    var OAuth2 = {

        debug: false,
        accessToken: '',
        refreshToken: '',
        expireTime: null,
        intervalId: 0,
        url: '',
        user: '',
        pass: '',
        clientId: '',
        clientSecret: '',
        
        check: function() {
            $.ajax({
                url: OAuth2.url + '/check',
                data: {
                    access_token: OAuth2.accessToken
                },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {
                        showError(response.error_description);
                    } else {
                        // monitora o token atual
                        OAuth2.listen();
                    }
                },
                error: function() {
                    // solicita um novo token
                    OAuth2.request();
                }
            });
        },
        
        token: function(data, fn) {
            data = data || {};
            data.client_id = OAuth2.clientId;
            data.client_secret = OAuth2.clientSecret;
            $.ajax({
                url: OAuth2.url + '/token',
                type: 'post',
                data: data,
                success: function(response) {
                    if (response.error) {
                        showError(response.error_description);
                    } else {
                        OAuth2.accessToken = response.access_token;
                        var now = new Date().getTime() / 1000;
                        OAuth2.expireTime = now + response.expires_in;
                        if (response.refresh_token) {
                            OAuth2.refreshToken = response.refresh_token;
                        }
                        if (typeof(fn) === 'function') {
                            fn(response);
                        }
                        Storage.set('access_token', OAuth2.accessToken);
                        Storage.set('refresh_token', OAuth2.refreshToken);
                        Storage.set('expire_time', OAuth2.expireTime);
                    }
                },
                error: function(xhr) {
                    var response = $.parseJSON(xhr.responseText);
                    showError(response.error);
                }
            });
        },
        
        request: function() {
            OAuth2.token({
                grant_type: "password",
                username: OAuth2.user,
                password: OAuth2.pass
            }, OAuth2.listen);
        },

        refresh: function() {
            OAuth2.token({
                grant_type: "refresh_token",
                refresh_token: OAuth2.refreshToken
            });
        },

        listen: function() {
            clearInterval(OAuth2.intervalId);
            OAuth2.intervalId = setInterval(function() {
                // pega um token novo 5 minutos antes de expirar
                var now = new Date().getTime() / 1000 + (5 * 60);
                if (now >= OAuth2.expireTime) {
                    OAuth2.refresh();
                }
            }, 60 * 1000);
        }
    };

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
    
    var Impressao = {
        
        iframeId: 'frame-impressao',
        
        imprimir: function(atendimento) {
            var iframe = document.getElementById(this.iframeId);
            iframe.src = Storage.get('url') + '/print/' + atendimento.id + '/' + atendimento.hash;
            iframe.onload = function() {
                var win = this.contentWindow;
                win.postLoad(atendimento);
            };
        }
        
    };

    var showError = function(msg) {
        $('#error').modal('show').find('.modal-body').html('<p>' + msg + '</p>');
    };

    var gotoIndex = function() {
        $('.page').hide();
        $('#servicos').show();
    };

    var resetInterval = 0;
    var gotoPage = function(page) {
        $('.page').hide();
        $(page).show();
        clearInterval(resetInterval);
        // volta para a tela de serviços quando ocioso
        resetInterval = setTimeout(gotoIndex, 15 * 1000);
    };

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
