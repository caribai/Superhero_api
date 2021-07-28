$(document).ready(function(){
    $('button').on("click", function(e){
         e.preventDefault();
        //Se captura la información ingresada mediante eventos del DOM con jQuery
        let heroInput = parseInt($('#heroInput').val())
        //Se valida el dato ingresado al input para verificar si es un numero entre el 1 y el 731
        //Si no es un numero se muestra un alert
        if (isNaN(heroInput) || heroInput <= 0 || heroInput > 731) {
             alert('Ingrese un numero del 1 al 731')
        } else {
        //Se consulta la API mediante AJAX con la sintaxis de jQuery
            $.ajax({
            url: "https://superheroapi.com/api.php/10158496830855945/"+ heroInput,
            beforeSend: function () {
                $("#heroeInfo").html("Procesando, espere por favor...");
            },
            success: function(data){
                //Se imprime la informacion en el documento html mediante la lectura de los arrays u objetos de la API
                $("#heroeInfo").html(`
                 <h3 class="text-center">SuperHero Encontrado</h3>
                 <div class="card mb-3">
                 <div class="row g-0">
                   <div class="col-md-4">
                     <img src="${data.image.url}" class="img-fluid rounded-start" alt="">
                   </div>
                   <div class="col-md-8 pl-md-0">
                     <div class="card-body pl-0">
                       <h5 class="card-title">Nombre: ${data.name}</h5>
                       <p class="card-text">
                           Conexiones: ${data.connections['group-affiliation']}
                       </p>
                       <div class="font-italic p-3">
                           <p class="m-0">Publicado por: ${data.biography.publisher}</p>
                           <hr>
                           <p class="m-0">Ocupación: ${data.work.occupation}</p>
                           <hr>
                           <p class="m-0">Primera Aparición: ${data.biography['first-appearance']}</p>
                           <hr>            
                           <p class="m-0">Altura: ${data.appearance.height.join(' - ')}</p>
                           <hr>  
                           <p class="m-0">Peso: ${data.appearance.weight.join(' - ')}</p>
                           <hr>            
                           <p class="m-0">Alianzas: ${data.biography.aliases.join(' ')}</p>
                       </div>
                     </div>
                   </div>
                 </div>
                 </div>
                 `)
                //Se emplea la librería de gráficos CanvasJS de tipo torta
                var chart = new CanvasJS.Chart("heroStats", {
                    theme: "light2", 
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "ESTADISTICAS DE PODER PARA " + data.name.toUpperCase(),
                        fontSize: 20,
                    },
                    exportEnabled: false,
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        //Se integran los datos al grafico
                        dataPoints: [
                            { y: data.powerstats.intelligence, label: "Inteligencia" },
                            { y: data.powerstats.strength, label: "Fuerza" },
                            { y: data.powerstats.speed, label: "Velocidad" },
                            { y: data.powerstats.durability, label: "Durabilidad" },
                            { y: data.powerstats.power, label: "Poder" },
                            { y: data.powerstats.combat, label: "Combate" },
                            
                        ]
                    }]
                });
                chart.render();
                },
            })
        }
   });
});