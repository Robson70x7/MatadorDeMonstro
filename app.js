new Vue({
    el: '#app',
    data: {
        novoJogo: false,
        logs: [
            // {msg: 'JOGADOR ATINGIU MONSTRO COM 9.', jodador:true }
        ],
        jogador: { life: 100, },
        monstro: { life: 100, },
        resultado: {
            msg: '',
            win: false,
            exibir: false
        }
    },
    computed: {
        corProgressoJ() {
            return {
                'bg-red': this.jogador.life < 20,
                'bg-green': this.jogador.life > 19
            }
        },
        corProgressoM() {
            return {
                'bg-red': this.monstro.life < 20,
                'bg-green': this.monstro.life > 19
            }
        },
        corResultado() {
            return {
                'text-red': !this.resultado.win,
                'text-green': this.resultado.win
            }
        },
        widthJ() {
            if (this.jogador.life < 0) {
                this.jogador.life = 0;
                this.end(false);
            }

            return `${this.jogador.life}%`;
        },
        widthM() {
            if (this.monstro.life < 0) {
                this.monstro.life = 0;
                this.end(true);
            }

            return `${this.monstro.life}%`;
        }
    },
    methods: {
        end(jogador) {
            this.novoJogo = !this.novoJogo;

            this.resultado = {
                msg: jogador ? 'Você Venceu !!' : 'Você Perdeu',
                win: jogador,
                exibir: true
            }
        },
        start() {
            this.logs = [];
            this.novoJogo = true;
            this.jogador.life = 100;
            this.monstro.life = 100;
            this.resultado.exibir = false;
        },
        atacar(especial = false) {
            //jogador ataca desvantagem
            let ataqueJ = Math.floor(Math.random() * 11);

            let ataqueM = Math.floor(Math.random() * (12 - 5)) + 5;


            this.jogador.life -= ataqueM;
            this.monstro.life -= ataqueJ;

            this.logs.splice(0, 0, { msg: 'Jogador atingiu o monstro com ' + ataqueJ, jogador: true })
            this.logs.splice(0, 0, { msg: 'Monstro atingiu o jogador com ' + ataqueM, jogador: false })
        },
        atacarEspecial() {
            let ataqueJ = Math.floor(Math.random() * (11 - 5)) + 5;

            let ataqueM = Math.floor(Math.random() * 12);

            this.jogador.life -= ataqueM;
            this.monstro.life -= ataqueJ;

            this.logs.splice(0, 0, { msg: 'Jogador atingiu o monstro com ' + ataqueJ, jogador: true })
            this.logs.splice(0, 0, { msg: 'Monstro atingiu o jogador com ' + ataqueM, jogador: false })

        },
        desistir() {
            this.novoJogo = !this.novoJogo
            this.logs.splice(0, this.logs.length)
            this.logs.splice(0, 0, { msg: 'Você desistiu!!', jogador: true });
            this.resultado = { msg: 'Você desistiu!!', win: false, exibir: true }
        },
        curar() {
            //jogador ganha vida
            let vidaJ =  Math.floor(Math.random() * 12);
            //monstro ataca jogador
            let ataqueM = Math.floor(Math.random() * 12);

            this.jogador.life += vidaJ - ataqueM;

            this.logs.splice(0, 0, { msg: 'Jogador Ganhou força de ' + vidaJ, jogador: true })
            this.logs.splice(0, 0, { msg: 'Monstro atingiu o jogador com ' + ataqueM, jogador: false })
            
        },
    }
})