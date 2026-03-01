// BuilderForm: Clase que implementa el patrón Builder para generar un formulario dinámico
class BuilderForm {
    constructor() {
        this.fields = "";
    }

    // Método para agregar nombre con label y placeholder
    addFieldName(label, placeholder) {
        this.fields += `
            <div class="mb-3">
                <label class="form-label fw-bold">${label}</label>
                <input type="text" class="form-control" placeholder="${placeholder}">
            </div>`;
        return this;
    }

    // Método para agregar apellido
    addFieldLastName(label, placeholder) {
        this.fields += `
            <div class="mb-3">
                <label class="form-label fw-bold">${label}</label>
                <input type="text" class="form-control" placeholder="${placeholder}">
            </div>`;
        return this;
    }

    // Método para generar la lista (estilo list-group)
    addList(items) {
        let listHtml = '<label class="form-label fw-bold">Lista de Elementos:</label>';
        listHtml += '<ul class="list-group mb-3 shadow-sm">';
        items.forEach(item => {
            listHtml += `<li class="list-group-item list-group-item-action">${item}</li>`;
        });
        listHtml += '</ul>';
        this.fields += listHtml;
        return this;
    }

    // El método final que entrega el "Producto" envuelto en una card
    build() {
        const finalHtml = `
            <div class="card animate__animated animate__fadeIn">
                <div class="card-body">
                    <h5 class="card-title mb-4 text-primary">Formulario Generado</h5>
                    ${this.fields}
                    <button class="btn btn-success w-100 mt-2">Enviar Datos</button>
                </div>
            </div>`;
        
        // Limpiar para futuros usos
        this.fields = ""; 
        return finalHtml;
    }
}

//Lógica del evento: Se ejecuta cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el contenedor según las clases de tu HTML (offset-3 col-6)
    const container = document.querySelector(".offset-3.col-6");
    const btnAction = document.getElementById("btn-action-form");

    // Instancia de builder
    const builder = new BuilderForm();
    const strLista = ["elemento 1", "elemento 2", "elemento 3"];

    // Evento de creación al presionar el botón
    if (btnAction) {
        btnAction.addEventListener("click", () => {
            // Ejecución de la cadena (Fluent Interface)
            const html = builder
                .addFieldName("Nombre(s)", "Ingresa tu nombre...")
                .addFieldLastName("Apellidos", "Ingresa tus apellidos...")
                .addList(strLista)
                .build();

            // Reemplazo del contenido en el contenedor principal
            container.innerHTML = html;
        });
    }
});