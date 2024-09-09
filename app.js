document.addEventListener('DOMContentLoaded', function() {
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function() {
    validarCPF(this);
  });

  iniciarTimer();
});

function validarCPF(input) {
  let cpf = input.value;
  cpf = cpf.replace(/\D/g, ""); // Remove tudo que não é dígito

  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  input.value = cpf; // Atualiza o valor no campo de texto

  const btnCadastrar = document.getElementById("btnCadastrar");
  if (cpf.length === 14) { // CPF completo com máscara tem 14 caracteres
    btnCadastrar.disabled = false;
    btnCadastrar.classList.remove('btn-secondary'); // Remove a classe de botão desabilitado do Bootstrap
    btnCadastrar.classList.add('btn-primary'); // Adiciona a classe do botão habilitado
  } else {
    btnCadastrar.disabled = true;
    btnCadastrar.classList.remove('btn-primary');
    btnCadastrar.classList.add('btn-secondary'); // Adiciona classe Bootstrap de botão desabilitado
  }
}

function iniciarTimer() {
  // Altere a data e hora de fim para a nova data desejada
  const fim = new Date("2024-12-31T23:59:59").getTime(); // Exemplo: 31 de dezembro de 2024

  setInterval(function () {
    const agora = new Date().getTime();
    const distancia = fim - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para o término do cadastramento.`;

    if (distancia < 0) {
      document.getElementById("timer").innerHTML = "Período de cadastramento encerrado.";
      document.getElementById("btnCadastrar").disabled = true;
      document.getElementById("btnCadastrar").classList.remove('btn-primary');
      document.getElementById("btnCadastrar").classList.add('btn-secondary');
    }
  }, 1000);
}
