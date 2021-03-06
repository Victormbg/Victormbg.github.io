export function TecladoListener(jogador) {

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            console.log('Teclado: ', command)
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {

        const keyPressed = event.keyCode;

        const command = {
            playerId: jogador,
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}