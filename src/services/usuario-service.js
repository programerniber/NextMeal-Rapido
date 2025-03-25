import { UsuarioRepository } from "../repositories/usuario-repository.js";

const usuarioRepository = new UsuarioRepository();

export default class UsuarioService {
  async obtenerTodosLosUsuarios() {
    return await usuarioRepository.obtenerTodos();
  }

  async obtenerUsuarioPorId(id) {
    const usuario = await usuarioRepository.obtenerPorId(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  }

  async obtenerUsuarioPorEmail(email) {
    return await usuarioRepository.obtenerPorEmail(email) || null;
  }

  async crearUsuario(usuarioData) {
    return await usuarioRepository.crear(usuarioData);
  }

  async actualizarUsuario(id, usuarioData) {
    const usuario = await usuarioRepository.obtenerPorId(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return await usuarioRepository.actualizar(id, usuarioData);
  }

  async eliminarUsuario(id) {
    const eliminado = await usuarioRepository.eliminar(id);
    if (!eliminado) throw new Error("Usuario no encontrado");
    return { mensaje: "Usuario eliminado exitosamente" };
  }

  async cambiarRolUsuario(id, id_rol) {
    const usuario = await usuarioRepository.obtenerPorId(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return await usuarioRepository.cambiarRol(id, id_rol);
  }

  async obtenerPermisosPorUsuario(idUsuario) {
    const usuario = await usuarioRepository.obtenerPorId(idUsuario);
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario; // Devuelve el usuario con su rol si la relación está bien definida en Sequelize
  }
}
