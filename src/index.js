
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formEnviarFoto').addEventListener('submit', function(event) {
        event.preventDefault();
        const photo = document.getElementById('inputEnviarFoto').value;
        console.log('Enviar Foto: ', photo);
        document.getElementById('divFoto').textContent = "Foto enviada. Muito obrigado Carioca Green!";
    });

    document.getElementById('formVerificarCredito').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputVerificarCredito').value;
        console.log('Verifica Credito:', address);
        document.getElementById('divCredito').textContent = "Parabéns! Continue sendo um carioca consciente!";
    });

    document.getElementById('formTransferirCredito').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputTransferirCredito').value;
        console.log('Transferir Credito:', address);
        document.getElementById('divTransferencia').textContent = "Crédito enviado! Seu amigo deve estar feliz!";
    });

    document.getElementById('formMinhasArvores').addEventListener('submit', function(event) {
        event.preventDefault();
        const address = document.getElementById('inputMinhasArvores').value;
        console.log('Minhas Arvores:', address);
        document.getElementById('divArvores').textContent = "Parabéns! Continue sendo um carioca consciente!";

    });
});



