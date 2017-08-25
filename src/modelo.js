class Expresion {
    constructor(valor) {
        this.valor = valor
    }

    evaluate() {
        return this.valor
    }
}


class Booleano extends Expresion { }

class IsZero extends Expresion {

    evaluate() {
        return this.valor.evaluate() === 0
    }
}

class If {
    constructor(condicion, sThen, sElse) {
        this.condicion = condicion
        this.sThen = sThen
        this.sElse = sElse
    }

    evaluate() {
        if(this.condicion.evaluate())
            return this.sThen.evaluate()
        else
            return this.sElse.evaluate()
    }
}

class Constante extends Expresion { }

class Succ extends Expresion {

    evaluate() {
        return this.valor.evaluate() + 1
    }
}

class Prev extends Expresion {
    
    evaluate() {
        return this.valor.evaluate() - 1
    }
}

export {Booleano, IsZero, If, Constante, Succ, Prev}