const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "Users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
    },
})
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @Column()
//     age: number
// }