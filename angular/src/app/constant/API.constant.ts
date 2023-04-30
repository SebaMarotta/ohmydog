export const API_MASCOTAS = {
    URL: "http://localhost:4200",
    
    REGISTRO_MASCOTA: function() {
        return `${this.URL}/mascota/registro`
    },

    MASCOTA_BY_ID: function(id){
        return `${this.URL}/mascota/${id}`;
    }
}