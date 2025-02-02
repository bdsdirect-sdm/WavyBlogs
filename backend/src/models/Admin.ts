import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as UUID } from 'uuid';

class Admin extends Model{
    public uuid!: string;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public status!: boolean;
    public is_login!: boolean
    public isDeleted!: boolean;
    public deletedAt!: Date;
}

Admin.init({
    uuid:{
        type: DataTypes.UUID,
        defaultValue: UUID,
        primaryKey: true,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: false
        },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    is_login:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},{
    modelName: 'Admin',
    sequelize,
    paranoid: true,
    deletedAt: 'deletedAt'
})

export default Admin;