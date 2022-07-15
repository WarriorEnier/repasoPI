const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    species:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'Human'
    },
    origin:{
      type: DataTypes.STRING,
      allowNull:false
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false
    },
    created:{
      type: DataTypes.STRING,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
  },
  {
    timestamps:false
  }
  );
};

