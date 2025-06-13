import Permiso from "../src/models/permiso-model.js";
import Rol from "../src/models/rol-model.js";
import PermisoRol from "../src/models/permiso-rol-model.js";
import { crearUsuarioController } from "../src/controllers/autenticador-controller.js";

export const initSettings = async () => {
  const rolAdmin = await Rol.findOrCreate({
    where: { nombre: "administrador" },
  }).then(([rol]) => rol);

  const permisoCrear = await Permiso.create({
    recurso: "ventas",
    accion: "crear",
  });
  const permisoEditar = await Permiso.create({
    recurso: "ventas",
    accion: "editar",
  });

  await PermisoRol.create({ rol_id: rolAdmin.id, permiso_id: permisoCrear.id });
  await PermisoRol.create({
    rol_id: rolAdmin.id,
    permiso_id: permisoEditar.id,
  });

  // Simular req y res
  const mockReq = {
    body: {
      password: "admin",
      id_rol: rolAdmin.id,
      nombre: "Administrador",
      email: "a@b.com",
    },
  };

  const mockRes = {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log("Usuario creado:", data);
    },
  };

  await crearUsuarioController(mockReq, mockRes);
};
