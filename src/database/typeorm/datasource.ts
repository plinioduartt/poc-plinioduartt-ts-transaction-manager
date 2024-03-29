import { DataSource } from "typeorm"

export const Datasource = new DataSource({
    type: "sqlite",
    database: "./src/database/data/data.sqlite",
    entities: ["src/database/typeorm/entities/*.ts"],
    logging: false,
    synchronize: true,
})

export const InitDatabase = () => {
    Datasource
    .initialize()
    .then(() => {
        console.log("Typeorm DataSource has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Typeorm DataSource initialization:", err)
    })
}