import Vue from 'vue'
import {Time} from './time'
import _ from 'lodash'

require('style-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');


new Vue({
    el: '#app',
    data: {
        filter: '',
        order: {
            keys: ['pontos', 'gm', 'gs', 'saldo'],
            sort: ['desc', 'desc', 'asc', 'asc']
        },
        colunas: ['nome', 'pontos', 'gm', 'gs', 'saldo'],
        times: [
            new Time('Palmeiras', require('./assets/palmeiras_60x60.png')),
            new Time('Flamengo', require('./assets/flamengo_60x60.png')),
            new Time('Atlético-MG', require('./assets/atletico_mg_60x60.png')),
            new Time('Santos', require('./assets/santos_60x60.png')),
            new Time('Botafogo', require('./assets/botafogo_60x60.png')),
            new Time('Atlético-PR', require('./assets/atletico-pr_60x60.png')),
            new Time('Corinthians', require('./assets/corinthians_60x60.png')),
            new Time('Grêmio', require('./assets/gremio_60x60.png')),
            new Time('Fluminense', require('./assets/fluminense_60x60.png')),
            new Time('Ponte Preta', require('./assets/ponte_preta_60x60.png')),
            new Time('Chapecoense', require('./assets/chapecoense_60x60.png')),
            new Time('São Paulo', require('./assets/sao_paulo_60x60.png')),
            new Time('Cruzeiro', require('./assets/cruzeiro_60x60.png')),
            new Time('Sport', require('./assets/sport_60x60.png')),
            new Time('Coritiba', require('./assets/coritiba_60x60.png')),
            new Time('Internacional', require('./assets/internacional_60x60.png')),
            new Time('Vitória', require('./assets/vitoria_60x60.png')),
            new Time('Figueirense', require('./assets/figueirense_60x60.png')),
            new Time('Santa Cruz', require('./assets/santa_cruz_60x60.png')),
            new Time('América-MG', require('./assets/america_mg_60x60.png'))
        ],
        novojogo: {
            casa: {
                time: null,
                gols: 0
            },
            fora: {
                time: null,
                gols: 0
            }
        },
        view: 'tabela'
    },

    methods: {

        clicouMe() {
            alert('a');
        },
        fimJogo() {
            let timeAdversario = this.novojogo.fora.time;
            let gols = +this.novojogo.casa.gols;
            let golsAdversario = +this.novojogo.fora.gols;
            this.novojogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
            this.showView('tabela');
        },
        createNovoJogo() {
            let indexCasa = Math.floor(Math.random() * 20);
            let indexFora = Math.floor(Math.random() * 20);

            this.novojogo.casa.time = this.times[indexCasa];
            this.novojogo.casa.gols = 0;

            this.novojogo.fora.time = this.times[indexFora];
            this.novojogo.fora.gols = 0;

            this.showView('novojogo');
        },
        showView(view) {
            this.view = view;
        },
        sortBy(coluna) {
            this.order.keys = coluna;
            this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
        }

    },
    computed: {
        timesFiltered() {
            let colecao = _.orderBy(this.times, this.order.keys, this.order.sort)

            return _.filter(colecao, item => {
                return item.nome.indexOf(this.filter)>=0;
            });
        }
    },
    filters: {
        saldo(time) {
            return time.gm - time.gs;
        },
        ucwords(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }

});
