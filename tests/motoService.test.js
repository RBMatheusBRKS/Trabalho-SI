jest.mock("../backend/src/repositories/motoRepository", () => ({}));

const motoService = require("../backend/src/services/motoService");

describe("Regras de negócio das motos", () => {

    test("Não deve permitir cadastrar uma moto com status inválido", async () => {

        const motoInvalida = {
            modelo: "CG 160",
            marca: "Honda",
            placa: "ABC1234",
            ano: 2024,
            status: "VENDIDA"
        };

        await expect(
            motoService.registerBike(motoInvalida)
        ).rejects.toMatchObject({
            status: 400
        });

    });

});