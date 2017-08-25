import { describe, it } from 'mocha'
import { expect } from 'chai'
import parser from '../src/parser'

import { Booleano, IsZero, If, Constante, Succ, Prev } from '../src/modelo'

describe('Simple languaje', () => {

  const parse = text => parser(text, { startRule: 'slang' })

  describe('Parseo de estructuras', () => {

    it('parsear un true/false, devuelve una estructura booleana con valor true/false', () => {
      expect(parse('true')).to.deep.equal(new Booleano(true))
      expect(parse('false')).to.deep.equal(new Booleano(false))
    })

    it('parsear un 0, devuelve una estructura Constante con valor 0', () => {
      expect(parse('0')).to.deep.equal(new Constante(0))
    })

    it('los numeros distintos de 0 no estan contemplados en la gramatica', () => {
      expect(() => parse('1')).to.throw()
    })

    it('parsear un isZero 0, devuelve una estructura IsZero con Constante de valor 0', () => {
      expect(parse('isZero 0')).to.deep.equal(new IsZero(new Constante(0)))
    })

    it('parsear un isZero true/false no esta contemplado en la gramatica', () => {
      expect(() => parse('isZero true')).to.throw()
    })

    it('parsear un succ/prev 0, devuelve una estructura Succ/Prev con Constante de valor 0', () => {
      expect(parse('succ 0')).to.deep.equal(new Succ(new Constante(0)))
       expect(parse('prev 0')).to.deep.equal(new Prev(new Constante(0)))
    })

    it('parsear un isZero succ 0 (funciones anidadas), devuelve una estructura IsZero con Succ con Constante de valor 0', () => {
      expect(parse('isZero succ 0')).to.deep.equal(new IsZero(new Succ(new Constante(0))))
    })

    it('parsear un if true then true else true, devuelve una estructura if correcta', () => {
      let cadena = 'if true then false else true'
      let esperado = new If(new Booleano(true), new Booleano(false), new Booleano(true))
      expect(parse(cadena)).to.deep.equal(esperado)
    })

    it('parsear un if 0 then true else true (condicion no booleana), devuelve una estructura if correcta', () => {
      let cadena = 'if 0 then false else true'
      let esperado = new If(new Constante(0), new Booleano(false), new Booleano(true))
      expect(parse(cadena)).to.deep.equal(esperado)
    })

    it('parsear un ifs anidados, devuelve una estructura if correcta', () => {
      let cadena = 'if if true then true else true then if true then true else true else if true then true else true'
      let condicionEsperada = new If(new Booleano(true), new Booleano(true), new Booleano(true))
      let thenEsperado = new If(new Booleano(true), new Booleano(true), new Booleano(true))
      let elseEsperado = new If(new Booleano(true), new Booleano(true), new Booleano(true))
      let esperado = new If(condicionEsperada,thenEsperado,elseEsperado)
      expect(parse(cadena)).to.deep.equal(esperado)
    })
  })


  
  describe('Evaluacion de estructuras', () => {

    it('evaluar una estructura Booleano(true), devuelve un booleano true', () => {
      expect(new Booleano(true).evaluate()).to.deep.equal(true)
    })

    it('evaluar una estructura Constante(0), devuelve un booleano true', () => {
      expect(new Constante(0).evaluate()).to.deep.equal(0)
    })

    it('evaluar una estructura IsZero(0), devuelve un booleano true', () => {
      expect(new IsZero(new Constante(0)).evaluate()).to.deep.equal(true)
    })

    it('evaluar una estructura IsZero(1), devuelve un booleano false', () => {
      expect(new IsZero(new Constante(1)).evaluate()).to.deep.equal(false)
    })

    it('evaluar una estructura Succ(0), devuelve 1', () => {
      expect(new Succ(new Constante(0)).evaluate()).to.deep.equal(1)
    })

    it('evaluar una estructura Prev(1), devuelve 0', () => {
      expect(new Prev(new Constante(1)).evaluate()).to.deep.equal(0)
    })

    it('evaluar una estructura if, devuelve el valor del then si la condicion es true', () => {
      expect(new If(new Booleano(true), new Succ(new Constante(0)), new Succ(new Constante(1))).evaluate()).to.deep.equal(1)
    })

    it('(bug???) evaluar una estructura if con dos retornos distintos', () => {
      expect(new If(new Booleano(true), new IsZero(new Constante(0)), new Succ(new Constante(1))).evaluate()).to.deep.equal(true)
    })
  })
})