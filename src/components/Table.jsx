import { motion } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Table({ data, onEdit, onDelete, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-[var(--color-surface)] rounded-2xl p-6 shadow-[var(--shadow-soft)] border border-[var(--color-border)]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--color-text)] tracking-tight">
          Tabla de Datos
        </h2>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
                     bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-medium 
                     hover:bg-[var(--color-accent)]/25 active:scale-[0.97]
                     transition-all duration-200 ease-out cursor-pointer"
        >
          <Plus size={18} />
          <span>Nuevo</span>
        </button>
      </div>

      {/* Tabla */}
      {data.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[var(--color-bg)]/40">
              <tr className="text-neutral-400 text-sm border-b border-[var(--color-border)]">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Rol</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg)]/60 transition-colors"
                >
                  <td className="p-3 text-neutral-400 text-sm">{item.id}</td>
                  <td className="p-3">{item.nombre}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.rol}</td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition cursor-pointer"
                    >
                      <Pencil size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded-lg text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-neutral-500 py-12"
        >
          <p className="text-sm">No hay registros aún.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
