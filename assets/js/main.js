var app = new App();

// ########################### datepicker

app.$dateDebut.change(function(){ // ne fonctionne pas !

    var dateSelectedDebut = app.$dateDebut.datepicker( "getDate" );
    app.dateMin2 = dateSelectedDebut;
    var refresh = app.$dateFin.datepicker( "refresh" );
    
});


// ########################### maps

app.main = function(){

    // click sur map ajoute la position a la position temporaire
    google.maps.event.addListener(app.map, 'click', function(event) {

        app.positionTemp.lat = event.latLng.lat();
        app.positionTemp.lng = event.latLng.lng();
        app.$position.val( event.latLng.lat() + " / " + event.latLng.lng() );
    });
    
    app.$addForm.submit(function(event){

        event.preventDefault();
        
        if( !app.$nom.val() ){
            app.errors = "Veuillez saisir le nom du festival";
        }
        if( app.regexDate.test( app.$dateDebut.val() ) ){
            app.errors = "Veuillez ressaisir la date du début dans le bon format (ex:01/12/2017)";
        }
        if( !app.$dateDebut.val() ){
            app.errors = "Veuillez saisir une date du début";
        }
        if( app.regexDate.test( app.$dateFin.val() ) ){
            app.errors = "Veuillez ressaisir la date du début dans le bon format (ex:01/12/2017)";
        }
        if( !app.$dateFin.val() ){
            app.errors = "Veuillez saisir une date du début";
        }
        if( !app.$dateFin.val() ){
            app.errors = "Veuillez saisir une date du début";
        }
        if( !app.$checkboxes.is(":checked") ){
            app.errors = "Veuillez renseigner au moins un type de musique";
        }
        
        if( !app.errors ){

        }
        else {
            
        }
        
    });






























}