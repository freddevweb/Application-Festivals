class App {

    constructor(){
        //  ######### dom variables
        this.$map = $("#map")[0];

        this.$addForm = $( "#formAjouter" );
        this.$nom = $( "#nom" );
        this.$dateDebut = $( "#dateDebut" );
        this.$dateFin = $( "#dateFin" );
        this.$position = $( "#position");        
        this.$urlLogo = $( "#urlLogo" );
        this.$variete = $( "#variete" );
        this.$pop = $( "#pop" );
        this.$rock = $( "#rock" );
        this.$punk = $( "#punk" );
        this.$electro = $( "#electro" );
        this.$house = $( "#house" );
        this.$checkboxes = $( ":checkbox" );
        this.$divError = $( "#error" );
        // form filter

        // ######### standard variables
        // datepicker
        this.dateMin = new Date( Date.now() );
        this.dateMin2 = null;
        this.dateMax = "";
        // maps
        this.main = null;
        this.map = null;
        this.festivals = [];
        this.positionTemp = {
            lat : "",
            lng : ""
        };
        this.initCoords = {
            LatLng : {lat: 46.52863469527167, lng: 2.43896484375},
            zoom : 6
        }
        // global
        this.errors = [];

        // regex variables
        this.regexDate = /^([0-3][0-9])\-[0-1][0-9]\-[0-9]{4}$/;
        
        //  ######### function
        
        this.initDatepicker();
    }

    // ########################### datepicker
    initDatepicker( startDate ){
        var options = {
            dayNames: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
            dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
            monthNames: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aout", "Sep", "Oct", "Nov", "Dec" ],
            firstDay: 1,
            dateFormat : "dd-mm-yy"
        };

        if( this.dateMin2 ){
            var datemin = this.dateMin2;
        }
        else{
            var datemin = this.dateMin;
        }
        options.minDate = datemin;

        if( !this.dateMax ){
            options.maxDate = this.dateMax;
        };

        this.$dateDebut.datepicker( options );
        this.$dateFin.datepicker( options );
    }


    // ########################### maps

    initMap() {

        this.map = new google.maps.Map( this.$map, {
            center : this.initCoords.LatLng,
            zoom : this.initCoords.zoom
        });

        this.main();

    };

    addFestival( position, titre, type, logo, debut, fin ){
        
        var festival = new google.maps.Marker({
            position: position,
            map: this.map,
            title: titre,
            icon : logo
        });

        
        festival.type = type;
        festival.debut = debut;
        festival.fin = fin;

        this.festivals.push( festival );

        return festival;
    };

    showError(){
        var pError = "";
        for( var error of this.errors ){
            pError += "<p>" + error + "</p>";
        }

        this.$divError.append( pError );
        var that = this;
        this.$divError.fadeIn( 300, function(){
            setTimeout(function() {
                console.log( this );
                that.$divError.fadeOut( 300 );
                that.$divError.html("");
                that.errors = [];
            }, 4000 );
        })


    }

    // demander a pierre
    saveFestivals(){
        var arrayFestivals = [];

        for( var festival of this.festivals ){
            var objectFestivals = {
                position : festival.position,
                titre : festival.titre,
                type : festival.type,
                logo : festival.logo,
                debut : festival.debut,
                fin : festival.fin
            };
            arrayFestivals.push(objectFestivals);
        }
        var festivalsString = JSON.stringify(arrayFestivals);
        localStorage.setItem("festivals", festivalsString );
        
    }


    // readFestivals(){

    //     var festivalsString = localStorage.getItem( "festivals" );
        
    //     if( !festivalsString ){
    //         return;
    //     }

    //     var arrayFestivals = JSON.parse( festivalsString ); // reviens a la structure de tableau et pas d'objet

    //     for( var festivalObjet of arrayFestivals ){
            
    //         this.addFestival(
    //             festivalObjet.position,
    //             festivalObjet.titre,
    //             festivalObjet.type,
    //             festivalObjet.logo,
    //             festivalObjet.debut,
    //             festivalObjet.fin
    //         );
    //     }
    // }













}