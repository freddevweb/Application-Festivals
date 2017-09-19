var app = new App();
// localStorage.clear("festivals");

// ########################### menu
app.$chercher.click(function(){

    if( app.$ajouterGroup.css("display") == "block" ){

        app.$ajouterGroup.css("display", "none");
        
    }

    app.$chercherGroup.css( "display", "block" );
    app.$mesParticipations.css( "display", "block" );
});

app.$ajouter.click(function(){
    if( app.$chercherGroup.css( "display" ) == "block" ){

        app.$chercherGroup.css( "display", "none" );    
    }

    app.$mesParticipations.css( "display", "none" );
    app.$ajouterGroup.css("display", "block");
});
// ########################### datepicker

app.$dateDebut.change(function(){ // ne fonctionne pas !

    var dateSelectedDebut = app.$dateDebut.datepicker( "getDate" );
    app.dateMin2 = dateSelectedDebut;
    var refresh = app.$dateFin.datepicker( "refresh" );
    
});

// ########################### maps

app.main = function(){

    // when maps is ready execute this
    app.readParticipation();
    app.readFestivals();
    app.addToLegend();


    // ########################### form ajouter festival

    // click sur map ajoute la position a la position temporaire
    google.maps.event.addListener(app.map, 'click', function(event) {

        app.positionTemp.lat = event.latLng.lat();
        app.positionTemp.lng = event.latLng.lng();
        app.$position.val( event.latLng.lat() + " / " + event.latLng.lng() );
    });
    
    // form add new festival
    app.$addForm.submit(function(event){

        event.preventDefault();
        
        if( !app.$nom.val() ){
            app.errors.push("Veuillez saisir le nom du festival");
        }
        if( !app.regexDate.test( app.$dateDebut.val() ) ){
            app.errors.push("Veuillez ressaisir la date du début dans le bon format (ex:01-12-2017)");
        }
        if( !app.$dateDebut.val() ){
            app.errors.push("Veuillez saisir une date du début");
        }
        if( !app.regexDate.test( app.$dateFin.val() ) ){
            app.errors.push("Veuillez ressaisir la date du début dans le bon format (ex:01-12-2017)");
        }
        if( !app.$dateFin.val() ){
            app.errors.push("Veuillez saisir une date du début");
        }
        if( !app.$dateFin.val() ){
            app.errors.push("Veuillez saisir une date du début");
        }
        if( !app.$checkboxes.is(":checked") ){
            app.errors.push("Veuillez renseigner au moins un type de musique");
        }
        
        if( app.errors == "" ){

            var type = [];
            app.$checkboxes.each(function(element) {
                if( $( this ).is(":checked") ){
                    type.push( $( this ).attr("id") );
                }
            });

            var image = {
                url: app.$urlLogo.val()
            };

            app.addFestival( 
                app.positionTemp, 
                app.$nom.val(), 
                type, 
                app.$urlLogo.val(), 
                app.$dateDebut.datepicker('getDate'), 
                app.$dateFin.datepicker('getDate')
            );

            addToLegend();
        }
        else {

            app.showError();
        }
        
    });



    // ########################### form search festival
    app.$searchElts.change(function(){

        if( app.$nomSearch.val() != "Choisissez un festival" ){

            app.selection.name = app.$nomSearch.val();
        }
        else {
            app.selection.name = "";
        }

        if( app.$nomSearch.val() != "" ){

            if( app.$dateDebutSearch.datepicker( "getDate" ) != "" && app.$dateFinSearch.datepicker( "getDate" ) != "" ){
                app.selection.dates.debut = app.$dateDebutSearch.datepicker( "getDate" );
                app.selection.dates.fin = app.$dateFinSearch.datepicker( "getDate" );
            }
            else {
                app.selection.dates.debut = "";
                app.selection.dates.fin = "";
            }
        };

        if( $( this ).attr("class") == "search check" ){
            
            if( $( this ).is(":checked") ){
                
                app.selection.types[$( this ).attr("id")] = true;
                
            }
            else {

                app.selection.types[$( this ).attr("id")] = false;
            }
        }

        app.filterElts();
    });


    // ########################### click participation
    $(document).on("click", ".participation", function(){
        
        if( $( this ).attr( "class" ).indexOf( "green" ) != -1){

            $( this ).removeClass( "green" );
            $( this ).addClass( "red" );
            $( this ).text( "Ne plus participer" );
            var id = $( this ).attr( "id" ).replace("_btn", "");
            var title = id.replace(/_/g,' ')
            app.addParticipation( title );
            console.log( title );


            return;
        }


        if( $( this ).attr( "class" ).indexOf( "red" ) != -1){

            $( this ).removeClass( "red" );
            $( this ).addClass( "green" );
            $( this ).text( "Je participe" );

            app.removeParticipation( $( this ).attr( "id" ) );

            return;
        }
    });

    // ########################### click on localiser
    $(document).on("click", ".localiser", function(){
        
        var id = $(this).parent().parent().attr("id");
        var name = id.replace("participation_",'');
        var title = name.replace(/_/g,' ');
        app.mapCenter( title );
    });


}

// ###################################  A LA FERMETURE

window.onbeforeunload = function(){
    app.saveFestivals();
    app.saveParticipation();
}


