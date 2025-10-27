import { useState } from "react";
import { useTableStore } from "./store/useTableStore";
import Swal from "sweetalert2";
import Table from "./components/Table";
import ModalForm from "./components/Modal";

function App() {
  const { items, addItem, updateItem, deleteItem } = useTableStore();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    setFormData({});
    setIsOpen(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#666",
      confirmButtonText: "Sí, eliminar",
      background: "#111",
      color: "#ddd",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
        Swal.fire({
          title: "Eliminado",
          text: "El registro fue eliminado correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#111",
          color: "#ddd",
        });
      }
    });
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.email || !formData.rol) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor llena todos los campos.",
        icon: "error",
        background: "#111",
        color: "#ddd",
      });
      return;
    }

    if (formData.id) {
      updateItem(formData);
    } else {
      addItem(formData);
    }

    setIsOpen(false);
    setFormData({});
  };

  return (
    <>
      <div className="min-h-screen bg-base flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <section className="text-center mb-8 max-w-3xl mx-auto relative">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3 leading-snug">
              La estructura también puede tener alma.
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Sistema funcional · Exploración de datos y acciones locales
            </p>
          </section>

          <Table
            data={items}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <ModalForm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}

export default App;
