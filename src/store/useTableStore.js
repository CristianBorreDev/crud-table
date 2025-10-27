import { create } from "zustand";

export const useTableStore = create((set, get) => {
  // 🔹 Datos iniciales por defecto (solo si localStorage está vacío)
  const defaultItems = [
    { id: 1, nombre: "Ariadna Vega", email: "ariadna@correo.dev", rol: "Diseñadora UI" },
    { id: 2, nombre: "Lucas Monteverde", email: "lucas@correo.io", rol: "Desarrollador Frontend" },
    { id: 3, nombre: "Noa Ramírez", email: "noa@correo.dev", rol: "Analista UX" },
  ];

  // 🔹 Cargar desde localStorage o usar por defecto
  const storedData = JSON.parse(localStorage.getItem("tableData")) || defaultItems;

  // Si no hay nada almacenado, guardar los iniciales
  if (!localStorage.getItem("tableData")) {
    localStorage.setItem("tableData", JSON.stringify(defaultItems));
  }

  return {
    items: storedData,

    addItem: (item) => {
      const newItems = [...get().items, { ...item, id: Date.now() }];
      set({ items: newItems });
      localStorage.setItem("tableData", JSON.stringify(newItems));
    },

    updateItem: (updatedItem) => {
      const newItems = get().items.map((i) =>
        i.id === updatedItem.id ? updatedItem : i
      );
      set({ items: newItems });
      localStorage.setItem("tableData", JSON.stringify(newItems));
    },

    deleteItem: (id) => {
      const newItems = get().items.filter((i) => i.id !== id);
      set({ items: newItems });
      localStorage.setItem("tableData", JSON.stringify(newItems));
    },
  };
});
