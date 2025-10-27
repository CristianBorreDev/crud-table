import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ModalForm({ isOpen, onClose, onSubmit, formData, setFormData }) {
  if (!isOpen) return null;

  const [error, setError] = useState("");

  // Cierre al hacer clic fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Validaciones previas antes de enviar
  const handleSubmit = () => {
    const { nombre, email, rol } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1️⃣ Validar si los campos están vacíos
    if (!nombre || !email || !rol) {
      Swal.fire({
        title: "Campos obligatorios",
        text: "Por favor completa todos los campos antes de continuar.",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
        background: "#1a1a1a",
        color: "#e5e5e5",
      });
      return;
    }

    // 2️⃣ Validar formato de email
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }

    // ✅ Si todo es válido
    setError("");
    onSubmit();

    // 🔔 Feedback visual
    Swal.fire({
      title: "Guardado correctamente",
      text: "El registro fue actualizado con éxito.",
      icon: "success",
      confirmButtonColor: "#14b8a6",
      background: "#1a1a1a",
      color: "#e5e5e5",
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative bg-[var(--color-surface)] rounded-2xl p-6 w-full max-w-md border border-[var(--color-border)] shadow-[var(--shadow-strong)]"
      >
        <h3 className="text-lg font-semibold mb-5 text-[var(--color-text)] text-center">
          {formData?.id ? "Editar Registro" : "Nuevo Registro"}
        </h3>

        <div className="flex flex-col gap-4">
          <InputField
            label="Nombre"
            type="text"
            value={formData.nombre || ""}
            onChange={(e) => {
              setFormData({ ...formData, nombre: e.target.value });
              if (error) setError("");
            }}
          />
          <InputField
            label="Email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (error) setError("");
            }}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-[-4px]"
            >
              {error}
            </motion.p>
          )}
          <InputField
            label="Rol"
            type="text"
            value={formData.rol || ""}
            onChange={(e) => {
              setFormData({ ...formData, rol: e.target.value });
              if (error) setError("");
            }}
          />
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[var(--color-border)] text-neutral-300 
                       hover:bg-neutral-700/80 transition-colors cursor-pointer"
          >
            Cancelar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[var(--color-accent)]/20 text-[var(--color-accent)]
                       hover:bg-[var(--color-accent)]/30 transition-colors cursor-pointer font-medium"
          >
            Guardar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* 🧩 Subcomponente de input con animación */
function InputField({ label, type, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-neutral-400">{label}</label>
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="p-2.5 bg-[var(--color-bg)] border border-[var(--color-border)] 
                   rounded-lg focus:outline-none focus:border-[var(--color-accent)] 
                   text-[var(--color-text)] placeholder-neutral-600 transition-all duration-200"
        placeholder={label}
      />
    </div>
  );
}
