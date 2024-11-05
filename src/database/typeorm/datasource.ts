import { DataSource } from "typeorm"
import { Order } from "./entities/Order"
import { Product } from "./entities/Product"
import { User } from "./entities/User"

const DATABASE_PASSWORD = "H7NB6OtX7S9lhfc7"; // A senha do seu banco de dados

export const Datasource = new DataSource({
    type: "postgres", // Mude para 'postgres'
    url: `postgresql://postgres.gftbjfbtyeestiqrkyxf:${DATABASE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
    // host: DATABASE_HOST,
    // port: DATABASE_PORT,
    // username: DATABASE_USERNAME,
    // password: DATABASE_PASSWORD,
    // database: DATABASE_NAME,
    entities: [User, Product, Order],
    logging: true,
    synchronize: true, // Cuidado com isso em produção, pode causar perda de dados
});


export const InitDatabase = () => {
    Datasource
        .initialize()
        .then(async () => {
            console.log("Typeorm DataSource has been initialized!")
            await Datasource.synchronize()
            console.log("Typeorm tables are syncrhonized!")
        })
        .catch((err) => {
            console.error("Error during Typeorm DataSource initialization:", err)
        })
}