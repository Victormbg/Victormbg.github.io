var context_tela;

export function CriarTela(id, parent, width, height) {
    let divWrapper = document.createElement('div');
    let canvasElem = document.createElement('canvas');
    parent.appendChild(divWrapper);
    divWrapper.appendChild(canvasElem);

    divWrapper.id = id;
    canvasElem.width = width;
    canvasElem.height = height;

    let context = canvasElem.getContext('2d');

    context_tela = context;

    return {
        context: context,
        id: id
    };
}
