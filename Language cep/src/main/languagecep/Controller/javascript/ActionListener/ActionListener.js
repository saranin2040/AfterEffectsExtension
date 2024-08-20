 class ActionListener {

    constructor(bc)
    {
        this.#bc=bc;
    }

    actionPerformed() {
        console.log("You have catched me, Creeper 228");
    }

    getBc() {
        return this.#bc;
    }

    #bc;

}

module.exports = ActionListener;