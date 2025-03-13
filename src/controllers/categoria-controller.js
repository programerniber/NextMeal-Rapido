import { CategoriaServices } from "../services/categoria-services.js"

const categoryServices = new CategoriaServices()

export async function obtenerTodasLasCategorias(req, res) {
  try {
    const categoria = await categoryServices.obtenerTodasLasCategorias()
    res.status(200).json({ exito: true, data: categoria })
  } catch (error) {
    console.error("Error al obtener categorias", error)
    res.status(500).json({ exito: false, mensaje: "Error interno en el servidor" })
  }
}

export async function obtenerCategoriaPorId(req, res) {
  try {
    const { id } = req.params
    const categoria = await categoryServices.obtenerCategoriaPorId(id)

    if (!categoria) {
      return res.status(404).json({ exito: false, mensaje: "Categoría no encontrada" })
    }

    res.status(200).json({ exito: true, data: categoria })
  } catch (error) {
    console.error("Error al obtener la categoria por ID", error)
    res.status(500).json({ exito: false, mensaje: "Error interno en el servidor" })
  }
}

export async function crearCategoria(req, res) {
  try {
    const categoriaData = req.body

    // Agregar información del usuario que crea la categoría
    categoriaData.creadoPor = req.usuario.id

    const nuevaCategoria = await categoryServices.crearCategoria(categoriaData)
    res.status(201).json({
      exito: true,
      data: nuevaCategoria,
      mensaje: "Categoria creada con éxito",
    })
  } catch (error) {
    console.error("Error al crear la categoria", error)
    if (error.message && error.message.includes("ya existe una categoria")) {
      return res.status(400).json({ exito: false, mensaje: error.message })
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" })
  }
}

export async function actualizarCategoria(req, res) {
  try {
    const { id } = req.params
    const categoriaData = req.body

    // Agregar información del usuario que actualiza la categoría
    categoriaData.actualizadoPor = req.usuario.id

    const categoriaActualizada = await categoryServices.actualizarCategoria(id, categoriaData)

    if (!categoriaActualizada) {
      return res.status(404).json({ exito: false, mensaje: "Categoría no encontrada" })
    }

    res.status(200).json({ exito: true, data: categoriaActualizada })
  } catch (error) {
    console.error("Error al actualizar la categoria", error)
    if (error.message === "Categoria no encontrada") {
      return res.status(404).json({ exito: false, mensaje: error.message })
    }
    if (error.message && error.message.includes("Ya existe una categoria igual")) {
      return res.status(400).json({ exito: false, mensaje: error.message })
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" })
  }
}

export async function eliminarCategoria(req, res) {
  try {
    const { id } = req.params
    const resultado = await categoryServices.eliminarCategoria(id)

    if (!resultado) {
      return res.status(404).json({ exito: false, mensaje: "Categoría no encontrada" })
    }

    res.status(200).json({
      exito: true,
      data: resultado,
      mensaje: "Categoría eliminada correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar una categoria", error)
    if (error.message === "Categoria no encontrada") {
      return res.status(404).json({ exito: false, mensaje: error.message })
    }
    res.status(500).json({ exito: false, mensaje: "Error interno del servidor" })
  }
}

