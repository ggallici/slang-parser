{
	const path = require('path')
	const {Booleano, IsZero, If, Constante, Succ, Prev} = require(path.resolve('src/modelo.js'))
}


slang = valor
valor = sentenciaIf / valorBooleano / valorNumerico

sentenciaIf = 'if' __ condicion:valor __ 'then' __ sThen:valor __ 'else' __ sElse:valor 	{ return new If(condicion, sThen, sElse) }

valorBooleano = funcionBooleana / booleano
booleano = valor:('true' / 'false') 														{ return new Booleano(valor === 'true') }
funcionBooleana = 'isZero' __ valor:valorNumerico 											{ return new IsZero(valor) }

valorNumerico = funcionNumerica / numero
numero = '0' 																				{ return new Constante(0) }
funcionNumerica = 'succ' __ valor:valorNumerico 											{ return new Succ(valor) }
				/ 'prev' __ valor:valorNumerico 											{ return new Prev(valor) }

_ = __?
__ = [ \t\r\n]+