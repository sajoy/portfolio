(function(){
    // define classes
    var Collection = function ( projects ) {
        this.projects = projects;
    };

    Collection.prototype.filter = function ( filter ) {
        return this.projects.filter( function( project ) {
            return project.category == filter || project.status == filter || project.category == 'key';
        });
    };

    Collection.prototype.show = function ( filter ) {
        var projectsToShow = filter ? this.filter( filter ) : this.projects;
        for(var i = 0; i < projectsToShow.length; i ++ ) {
            projectsToShow[i].ele.classList.add('show');
        }
    };

    Collection.prototype.hide = function ( filter ) {
        var projectsToHide = filter ? this.filter( filter ) : this.projects;
        for(var i = 0; i < projectsToHide.length; i ++ ) {
            projectsToHide[i].ele.classList.remove('show');
        }
    };

    var Project = function ( element ) {
        this.ele = element;
        this.category = element.dataset.category;
        this.status = element.dataset.status;
    };

    var Toggles = function ( toggles ) {
        this.toggles = [];
    };

    Toggles.prototype.clear = function () {
        for( var i = 0; i < this.toggles.length; i ++ ) {
            this.toggles[i].off();
        }
    };

    var Toggle = function ( eleId, filter ) {
        this.element = document.getElementById(eleId);
        this.filter = eleId == 'op' ? 'and' : eleId;
        this.element.addEventListener( 'click', on.bind(this) );

        function on () {
            toggles.clear();
            collection.hide();
            collection.show( this.filter );

            this.element.classList.add('selected');
        }
    };

    Toggle.prototype.off = function () {
        collection.hide( this.filter );
        this.element.classList.remove('selected');
    }



    // instantiate collection, projects, toggles
    var projectEles = document.getElementsByTagName('article');
    var projects = [];
    Object.keys( projectEles ).forEach( function( index ) {
        projects.push( new Project( projectEles[index] ) );
    });

    var collection = new Collection( projects );
    collection.show('and');

    var toggles = new Toggles();
    toggles.toggles = [
        new Toggle ( 'creative' ),
        new Toggle ( 'code' ),
        new Toggle ( 'op' )
    ];

    window.projects = projects;
    window.collection = collection;
})(window);
