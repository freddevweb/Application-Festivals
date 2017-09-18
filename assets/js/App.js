class App {

    constructor(){
        //  ######### dom variables
        this.$map = $("#map")[0];
        // button menu
        this.$chercher = $( "#chercherBtn" );
        this.$ajouter = $( "#ajouterBtn" );
        this.$chercherGroup = $( "#chercherGroup" );
        this.$ajouterGroup = $( "#ajouterGroup" );
        // form add
        this.$addForm = $( "#formAjouter" );
        this.$nom = $( "#nom" );
        this.$dateDebut = $( "#dateDebut" );
        this.$dateFin = $( "#dateFin" );
        this.$position = $( "#position");
        this.$urlLogo = $( "#urlLogo" );
        this.$checkboxes = $( "#ajouterGroup :checkbox" );
        
        // form filter
        this.$nomSearch = $( "#nomSearch" );
        this.$searchElts = $( ".search" );
        this.$dateDebutSearch = $( "#dateDebutSearch" );
        this.$dateFinSearch = $( "#dateFinSearch" );

        this.$variete = $( "#variete" );
        this.$pop = $( "#pop" );
        this.$rock = $( "#rock" );
        this.$punk = $( "#punk" );
        this.$electro = $( "#electro" );
        this.$house = $( "#house" );
        this.$divError = $( ".error" );
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
        // search
        this.selection = {
            "name" : "",
            "dates" : {
                "debut" :"",
                "fin" : ""
            },
            "types" : {
                "variete" : false,
                "rock" : false,
                "pop" :false,
                "punk" : false,
                "electro" : false,
                "house" : false
            }
        };
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
        this.$dateDebutSearch.datepicker( options );
        this.$dateFinSearch.datepicker( options );
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
        
        var image = {
            url : logo,
            scaledSize: new google.maps.Size(100, 20)
        }
        var festival = new google.maps.Marker({
            position: position,
            map: this.map,
            title: titre,
            icon : image
        });

        festival.type = type;
        festival.debut = debut;
        festival.fin = fin;

        var infowindow = this.addInfoWindow( festival, titre, type, debut, fin);
        
        this.festivals.push( festival );
        var that = this;
        festival.addListener('click', function() {
            infowindow.open(that.map, festival);
        });

        return festival;
    };

    addInfoWindow( marker, titre, type, debut, fin ){
        var newDebut = new Date(debut);
        var dateDebut = newDebut.getDate() + "/" + newDebut.getMonth() + "/" + newDebut.getFullYear();
        var newFin = new Date(fin);
        var dateFin = newFin.getDate() + "/" + newFin.getMonth() + "/" + newFin.getFullYear();
        
        var contentInfo = "<div id=" + titre.replace(/\s/g,'') + ">";
        contentInfo += '<h1 id="firstHeading" class="firstHeading">' + titre + '</h1>';
        contentInfo += '<div id="bodyContent">';
        contentInfo += '<p>Du : ' + dateDebut + ', au : ' + dateFin + '</p>';
        contentInfo += '<ul>Styles de musiques du festival :'
        for( var a of type){
            contentInfo += '<li>' + a + '</li>';
        }
        contentInfo += '</ul></div></div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentInfo
          });
        return infowindow;
    }

    showError(){
        var pError = "";
        for( var error of this.errors ){
            pError += "<p>" + error + "</p>";
        }

        this.$divError.append( pError );
        var that = this;
        this.$divError.fadeIn( 300, function(){
            setTimeout(function() {
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
                titre : festival.title,
                type : festival.type,
                logo : festival.icon.url,
                debut : festival.debut,
                fin : festival.fin
            };

            arrayFestivals.push(objectFestivals);
        }
        var festivalsString = JSON.stringify(arrayFestivals);
        localStorage.setItem("festivals", festivalsString );
        
    }


    readFestivals(){

        var festivalsString = localStorage.getItem( "festivals" );
        
        if( !festivalsString ){
            var arrayFestivals = contentsFestivals;
        }
        else {
            var arrayFestivals = JSON.parse( festivalsString ); 
        }

        for( var festivalObjet of arrayFestivals ){
            
            this.addFestival(

                festivalObjet.position,
                festivalObjet.titre,
                festivalObjet.type,
                festivalObjet.logo,
                festivalObjet.debut,
                festivalObjet.fin
            );

            this.addOptions( festivalObjet.titre );
        }

    }

    addOptions( titre ){
        var option = "<option value=" + titre.replace(/\s/g,'_') + ">" + titre + "</option>";
        this.$nomSearch.append(option);

    }
    

    filterElts(){

        for(var festival of this.festivals){

            festival.setVisible(false);

            if( festival.title.replace(/\s/g,'_') == this.selection.name ) {

                festival.setVisible(true);
            }

            if( festival.debut <= this.selection.dates.debut && festival.fin >= this.selection.dates.fin ) {

                festival.setVisible(true);
            }
            
            for( var typ of festival.type ){

                if( this.selection.types[typ] == true ){

                    festival.setVisible(true);
                }
            }
        }
    }

    










}