var app = new App();
localStorage.clear("festivals");

// ########################### menu
app.$chercher.click(function(){

    if( app.$ajouterGroup.css("display") == "block" ){

        app.$ajouterGroup.css("display", "none");
    }

    app.$chercherGroup.css("display", "block");
});

app.$ajouter.click(function(){
    if( app.$chercherGroup.css("display") == "block" ){

        app.$chercherGroup.css("display", "none");
    }

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

    app.readFestivals();

    // ########################### form ajouter festival

    // click sur map ajoute la position a la position temporaire
    google.maps.event.addListener(app.map, 'click', function(event) {

        app.positionTemp.lat = event.latLng.lat();
        app.positionTemp.lng = event.latLng.lng();
        app.$position.val( event.latLng.lat() + " / " + event.latLng.lng() );
    });
    
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
        }
        else {
            app.showError();
        }
        
    });



    // ########################### form chercher festival
    






















    // window.onbeforeunload = function(){
    //     app.saveFestivals();
    // }




}

// ###################################  A LA FERMETURE

window.onbeforeunload = function(){
    app.saveFestivals();
}


