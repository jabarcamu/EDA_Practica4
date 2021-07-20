
$(document).ready(function(){
    $("#texto_buscar_1").hide();
    $("#texto_buscar_2").hide();
    $("#texto_buscar_3").hide();
    $("#texto_buscar_4").hide();
    $("#texto_buscar_5").hide();
    
    $("#panel_ejemplo_1").hide();
    $("#panel_ejemplo_2").hide();
    //cargar_json();
});

var data_nom = [];
var data_dur = [];
var data_yea = [];
var data_gen = [];
var data_dir = [];
var data_act = [];
var data_cou = [];
var data_rat = [];
var data_ent = [];

var data_nom_selex = [];
var data_dur_selex = [];
var data_yea_selex = [];
var data_gen_selex = [];
var data_dir_selex = [];
var data_act_selex = [];
var data_cou_selex = [];
var data_rat_selex = [];
var data_ent_selex = [];

var limite = 5;
var rango = 5;
var cont = 0;

function cargar_json(){
    cont = 0;
    $.getJSON("lib_netflix/training.json", function(data){
        //console.log(data.data);
        for(var i=0; i<data.data.length; i++){
            data_nom.push(data.data[i].obj.movie_name);
            data_dur.push(data.data[i].obj.Duration);
            data_yea.push(data.data[i].obj.year);
            data_gen.push(data.data[i].obj.genre);
            data_dir.push(data.data[i].obj.director);
            data_act.push(data.data[i].obj.actors);
            data_cou.push(data.data[i].obj.country);
            data_rat.push(data.data[i].obj.rating);
            data_ent.push(data.data[i].obj.enter_in_netflix);
            
            if(cont<limite){
                data_nom_selex.push(data.data[i].obj.movie_name);
                data_dur_selex.push(data.data[i].obj.Duration);
                data_yea_selex.push(data.data[i].obj.year);
                data_gen_selex.push(data.data[i].obj.genre);
                data_dir_selex.push(data.data[i].obj.director);
                data_act_selex.push(data.data[i].obj.actors);
                data_cou_selex.push(data.data[i].obj.country);
                data_rat_selex.push(data.data[i].obj.rating);
                data_ent_selex.push(data.data[i].obj.enter_in_netflix);
                cont++;
            }
            //console.log("****> "+data.data[0].obj.movie_name);
            //console.log("****> "+data.data[1].obj.movie_name);
            //console.log("****> "+data.data[2].obj.movie_name);
            //console.log("****> "+data.data[3].obj.movie_name);
        }
        
        //*** Cargar los primeros paneles
        var codigo = "";
        var valoracion = 0;
        for(var i=0; i<data_nom_selex.length; i++){
            console.log("("+i+")"+data_nom_selex[i]);
            valoracion = parseFloat(data_rat_selex[i])*10;
            codigo +=
                "   <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "        <div class=\"col-md-3 col-sm-3 col-sm-12\">\n" +
                "            <div class=\"x_panel\">\n" +
                "                <div class=\"x_title\">\n" +
                "                    Parametros de Valoracion\n" +
                "                </div>\n" +
                
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: red;\">Valoracion</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-danger\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: green;\">Distancia</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-success\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: blue;\">Promedio</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-info\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                
                "            </div>\n" +
                "        </div>    \n" +
                "        <div class=\"col-md-9 col-sm-9 col-sm-12\">\n" +
                "        <div class=\"x_panel\">\n" +
                "            <div class=\"x_title\">\n" +
                "                <div class=\"panel-title pull-left\"><b>"+data_nom_selex[i]+"</b></div>\n" +
                "                <div class=\"panel-title pull-right\"><b>Valoracion:&nbsp;&nbsp;<font color=\"red\">"+data_rat_selex[i]+"</font></b></div>\n" +
                "                <div class=\"clearfix\"></div>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-5 col-sm-5 col-sm-12\">\n" +
                "                <!-- Estreno -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Duracion:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_dur_selex[i]+"</label>\n" +
                "                <!-- Genero -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Year:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_yea_selex[i]+"</label>\n" +
                "                <!-- Actores -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Genero:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_gen_selex[i]+"</label>\n" +
                "                <!-- Descripcion -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Director:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_dir_selex[i]+"</label>\n" +
                "                <!-- Director -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Pais:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_cou_selex[i]+"</label>\n" +
                "                <!-- Rating -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Rating:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_rat_selex[i]+"</label>\n" +
                "                <!-- Enter -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Enter:</label>\n" +
                "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_ent_selex[i]+"</label>\n" +
               
                "                <!-- Trailer -->\n" +
                "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Trailer:</label>\n" +
                "                <div class=\"col-md-3 col-sm-3 col-xs-12\">\n" +
                "                    <form action=\"http://www.youtube.com/results\" method=\"get\" target=\"_blank\" class=\"form-inline\">\n" +
                "                        <input name=\"search_query\" type=\"text\" maxlength=\"128\" value=\""+data_nom_selex[i]+" Trailer Netflix\" id=\"texto_buscar_"+i+"\"/>\n" +
                "                        <input class=\"btn btn-success btn-xs\" type=\"submit\" value=\"Buscar\" />\n" +
                "                    </form>\n" +
                "                </div>\n" +
                "                <div class=\"col-md-6 col-sm-6 col-xs-12\">\n" +
                "                        <button class=\"btn btn-primary btn-xs\" data-toggle=\"modal\" data-target=\"#modal_url\" data-whatever=\"@mdo\" onclick=\"abrir_modal('iframe_"+i+"');\">Agregar</button>\n" +
                "                </div>\n" +
                
                "            </div>\n" +
                "            <div class=\"col-md-7 col-sm-7 col-xs-12\">\n" +
                "                <iframe src=\"https://www.youtube.com/embed/c5Py8ocxPok\" id=\"iframe_"+i+"\" \n" +
                "                        frameborder=\"0\"\n" +
                "                        style=\"width: 100%; height: 250px;\">\n" +
                "                </iframe>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        </div>    \n" +
                "    </div>";
        }
        //*** Agregar Paneles
        $("#codigo_paneles").html(codigo);
        //*** Imrpimir todo
        for(var i=0; i<data_nom_selex.length; i++){
            //console.log("("+i+")"+data_nom_selex[i]+" TEX: "+"#texto_buscar_"+i);
            $("#texto_buscar_"+i).hide();
        }
        
    }).fail(function(){
        console.log("An error has occurred.");
    });
}

function agregar_selex(){
    limite += rango;
    var codigo = "";
    var valoracion = 0;
    for(var i=cont; i<limite; i++){
        data_nom_selex.push(data_nom[i]);
        data_dur_selex.push(data_dur[i]);
        data_yea_selex.push(data_yea[i]);
        data_gen_selex.push(data_gen[i]);
        data_dir_selex.push(data_dir[i]);
        data_act_selex.push(data_act[i]);
        data_cou_selex.push(data_cou[i]);
        data_rat_selex.push(data_rat[i]);
        data_ent_selex.push(data_ent[i]);
        cont++;
        //*** Agregar paneles
        valoracion = parseFloat(data_rat_selex[i])*10;
        codigo +=
            "   <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
            "        <div class=\"col-md-3 col-sm-3 col-sm-12\">\n" +
            "            <div class=\"x_panel\">\n" +
            "                <div class=\"x_title\">\n" +
            "                    Parametros de Valoracion\n" +
            "                </div>\n" +
            
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: red;\">Valoracion</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-danger\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: green;\">Distancia</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-success\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"col-md-12 col-sm-12 col-sm-12\">\n" +
                "               <div class=\"form-group\">\n"+
                "                   <label class=\"control-label col-md-4 col-sm-4 col-xs-12\" style=\"text-align:left; color: blue;\">Promedio</label>\n" +
                "                   <div class=\"col-md-8 col-sm-8 col-sm-12\">\n" +
                "                       <div class=\"progress\">\n" +
                "                           <div class=\"progress-bar progress-bar-striped progress-bar-info\" role=\"progressbar\" style=\"width: "+valoracion+"%\" aria-valuenow=\""+valoracion+"\" aria-valuemin=\"0\" aria-valuemax=\"10\">"+valoracion+" / 100</div>\n" +
                "                       </div>\n"+
                "                   </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
            
            "             </div>\n" +
            "        </div>    \n" +
            "        <div class=\"col-md-9 col-sm-9 col-sm-12\">\n" +
            "        <div class=\"x_panel\">\n" +
            "            <div class=\"x_title\">\n" +
            "                <div class=\"panel-title pull-left\"><b>"+data_nom_selex[i]+"</b></div>\n" +
            "                <div class=\"panel-title pull-right\"><b>Valoracion:&nbsp;&nbsp;<font color=\"red\">"+data_rat_selex[i]+"</font></b></div>\n" +
            "                <div class=\"clearfix\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"col-md-5 col-sm-5 col-sm-12\">\n" +
            "                <!-- Estreno -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Duracion:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_dur_selex[i]+"</label>\n" +
            "                <!-- Genero -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Year:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_yea_selex[i]+"</label>\n" +
            "                <!-- Actores -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Genero:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_gen_selex[i]+"</label>\n" +
            "                <!-- Descripcion -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Director:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_dir_selex[i]+"</label>\n" +
            "                <!-- Director -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Pais:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_cou_selex[i]+"</label>\n" +
            "                <!-- Rating -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Rating:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_rat_selex[i]+"</label>\n" +
            "                <!-- Enter -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Enter:</label>\n" +
            "                <label class=\"control-label col-md-9 col-sm-9 col-xs-12\" style=\"text-align:left; font-style: italic; color: black;\">"+data_ent_selex[i]+"</label>\n" +
            
            "                <!-- Trailer -->\n" +
            "                <label class=\"control-label col-md-3 col-sm-3 col-xs-12\" style=\"text-align:left; color: blue;\">Trailer:</label>\n" +
            "                <div class=\"col-md-3 col-sm-3 col-xs-12\">\n" +
            "                    <form action=\"http://www.youtube.com/results\" method=\"get\" target=\"_blank\" class=\"form-inline\">\n" +
            "                        <input name=\"search_query\" type=\"text\" maxlength=\"128\" value=\""+data_nom_selex[i]+" Trailer Netflix\" id=\"texto_buscar_"+i+"\"/>\n" +
            "                        <input class=\"btn btn-success btn-xs\" type=\"submit\" value=\"Buscar\" />\n" +
            "                    </form>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-6 col-sm-6 col-xs-12\">\n" +
            "                        <button class=\"btn btn-primary btn-xs\" data-toggle=\"modal\" data-target=\"#modal_url\" data-whatever=\"@mdo\" onclick=\"abrir_modal('iframe_"+i+"');\">Agregar</button>\n" +
            "                </div>\n" +
            
            "            </div>\n" +
            "            <div class=\"col-md-7 col-sm-7 col-xs-12\">\n" +
            "                <iframe src=\"https://www.youtube.com/embed/c5Py8ocxPok\" id=\"iframe_"+i+"\" \n" +
            "                        frameborder=\"0\"\n" +
            "                        style=\"width: 100%; height: 250px;\">\n" +
            "                </iframe>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        </div>    \n" +
            "    </div>";
    }
    //*** Agregar Paneles
    $("#codigo_paneles").append(codigo);
    
    
    
    //*** Imrpimir todo
    for(var i=0; i<data_nom_selex.length; i++){
        //console.log("("+i+")"+data_nom_selex[i]+" TEX: "+"#texto_buscar_"+i);
        $("#texto_buscar_"+i).hide();
    }
    
}


function abrir_modal(codigo){
    $("#mod_cod").val(codigo);
    $("#mod_url").val("");
}

function guardar_url(){
    var url = $("#mod_url").val();
    if(url.indexOf("v=")>=0){
        url = url.substring(url.indexOf("v=")+2, url.length);
        $("#"+$("#mod_cod").val()).attr('src', "https://www.youtube.com/embed/"+url);
    }
    else{
        alert("Error en la URL");
    }
}

