export function cargarFavoritos() {
  const fav = localStorage.getItem("favoritosAnalisis");
  return fav ? JSON.parse(fav) : [];
}

export function guardarFavorito(item: any) {
  const fav = cargarFavoritos();
  const actualizado = [item, ...fav];
  localStorage.setItem("favoritosAnalisis", JSON.stringify(actualizado));
}

export function eliminarFavorito(id: number) {
  const fav = cargarFavoritos();
  const filtrado = fav.filter((f: any) => f.id !== id);
  localStorage.setItem("favoritosAnalisis", JSON.stringify(filtrado));
}
