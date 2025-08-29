const calculadora = require("../../models/calculadora.js");

test("somar 2 + 9 deve retornar 11", () => {expect(calculadora.somar(2,9)).toBe(11)})

test("banana + 100 tem q dar erro", () => {expect(calculadora.somar('banana',100)).toBe('Erro')})