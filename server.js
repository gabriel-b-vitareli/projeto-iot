const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let historicoSensores = [
    {id:1, temperatura:20, umidade:60, hora:"10:00"},
    {id:2, temperatura:25, umidade:50, hora:"11:00"},
    {id:3, temperatura:30, umidade:40, hora:"12:00"},
];

app.get('/api/dados', (req,res) => {
    res.json(historicoSensores);
});

app.get('/api/dados/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const dado = historicoSensores.find(s => s.id === id);

    if (!dado){
        return res.status(404).json({mensagem:"ID não encontrado, verifique e tente novamente."});
    }
    res.json(dado);
}); 

app.post('/api/dados', (req,res) => {
    const{temperatura, umidade, hora} = req.body;
    if(!temperatura || !umidade || !hora){
        return res.status(400).json({mensagem:"Dados incompletos."});
    }

    let novosDados = {
        id: historicoSensores.length + 1,
        temperatura,
        umidade,
        hora
    }

    historicoSensores.push(novosDados);

    res.status(201).json({dados:novosDados, mensagem:"Dados enviados com sucesso!"});

});

app.delete('/api/dados/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const index = historicoSensores.findIndex (s => s.id === id);

    if (index === -1){
        return res.status(404).json({mensagem:"Não é possível deletar um dado inexistente."});
    }

    historicoSensores.splice(index,1);

    res.json({mensagem:"Dados apagados com sucesso."});

});

app.put('/api/dados/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const index = historicoSensores.findIndex(s => s.id === id);

    if (index === -1){
        return res.status(404).json({mensagem:"Não é possível atualizar um dado inexistente."});
    }

    const{temperatura,umidade,hora} = req.body;
    historicoSensores[index] = {id,temperatura,umidade,hora};
    res.json({mensagem:"Dados atualizados com sucesso."});
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
