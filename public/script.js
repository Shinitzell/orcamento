const selectProduto = document.getElementById('select_produto');
const formContainer = document.getElementById('divMedidas');
const canvasContainer = document.getElementById('canvas-container');

selectProduto.addEventListener('change', () => {
    const product = Number(selectProduto.value);

    // Limpar o container do formulário antes de criar um novo
    formContainer.innerHTML = '';

    createForm(product);
});

function createForm(model) {
    const labelsAndInputs = [];

    const form = document.createElement('form');
    form.className = 'form-orcamento';
    form.id = 'orcamento-form';

    // Definição dos elementos do formulário
    if (model === 1) {
        labelsAndInputs.push({ label: 'Largura Total (cm):', id: 'largura_total', name: 'largura_total' });
        labelsAndInputs.push({ label: 'Profundidade Total (cm):', id: 'profundidade_total', name: 'profundidade_total' });
        labelsAndInputs.push({ label: 'Altura Total (cm):', id: 'altura_total', name: 'altura_total' });
        labelsAndInputs.push({ label: 'Largura da Cuba 1 (cm):', id: 'largura_cuba1', name: 'largura_cuba1' });
        labelsAndInputs.push({ label: 'Profundidade da Cuba 1 (cm):', id: 'profundidade_cuba1', name: 'profundidade_cuba1' });
        labelsAndInputs.push({ label: 'Largura da Cuba 2 (cm):', id: 'largura_cuba2', name: 'largura_cuba2' });
        labelsAndInputs.push({ label: 'Profundidade da Cuba 2 (cm):', id: 'profundidade_cuba2', name: 'profundidade_cuba2' });
        labelsAndInputs.push({ label: 'Largura do Escorredor (cm):', id: 'largura_escorredor', name: 'largura_escorredor' });
        labelsAndInputs.push({ label: 'Profundidade do Escorredor (cm):', id: 'profundidade_escorredor', name: 'profundidade_escorredor' });
    }

    labelsAndInputs.forEach(item => {
        const label = document.createElement('label');
        label.setAttribute('for', item.id);
        label.textContent = item.label;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = item.id;
        input.name = item.name;
        input.required = true;

        form.appendChild(label);
        form.appendChild(input);
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Gerar Desenho';
    form.appendChild(button);

    // Adiciona o formulário ao container
    formContainer.appendChild(form);

    // Limpar o container do canvas antes de criar um novo
    canvasContainer.innerHTML = '';

    // Criação do canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 800;
    canvas.height = 600;

    // Adiciona o canvas ao container
    canvasContainer.appendChild(canvas);

    draw(form, canvas);
}

function draw(form, canvas) {
    const ctx = canvas.getContext('2d');
    const scaleFactor = 4;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const larguraTotal = document.getElementById('largura_total').value * scaleFactor;
        const profundidadeTotal = document.getElementById('profundidade_total').value * scaleFactor;
        const alturaTotal = document.getElementById('altura_total').value * scaleFactor;
        const larguraCuba1 = document.getElementById('largura_cuba1').value * scaleFactor;
        const profundidadeCuba1 = document.getElementById('profundidade_cuba1').value * scaleFactor;
        const larguraCuba2 = document.getElementById('largura_cuba2').value * scaleFactor;
        const profundidadeCuba2 = document.getElementById('profundidade_cuba2').value * scaleFactor;
        const larguraEscorredor = document.getElementById('largura_escorredor').value * scaleFactor;
        const profundidadeEscorredor = document.getElementById('profundidade_escorredor').value * scaleFactor;

        // Limpa o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha a pia com base nas medidas inseridas
        ctx.beginPath();
        ctx.rect(50, 50, larguraTotal, profundidadeTotal);
        ctx.stroke();

        // Desenhar outros componentes como as cubas e o escorredor
        ctx.beginPath();
        ctx.rect(50, 50, larguraCuba1, profundidadeCuba1);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(50 + parseInt(larguraCuba1), 50, larguraCuba2, profundidadeCuba2);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(50, 50 + parseInt(profundidadeCuba1), larguraEscorredor, profundidadeEscorredor);
        ctx.stroke();

        // Adiciona anotações de medidas
        ctx.font = '16px Arial';
        ctx.fillText(`${larguraTotal / scaleFactor} cm`, 50 + larguraTotal / 2, 45);
        ctx.fillText(`${profundidadeTotal / scaleFactor} cm`, 55, 50 + profundidadeTotal / 2);
    });
}
