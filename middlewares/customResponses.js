
const customResponses = {
    badRequest( ) {
        return this.status( 400 ).json( {
            success: false,
            error: "bad_request",
            details: "The server couldn't understand the request.",
        } );
    },

    success( payload ) {
        return this.status( 200 ).json( {
            success: true,
            payload,
        } );
    }
}


module.exports = ( req, res, next ) => {
        Object.assign( res, customResponses );
        next( );
};
        
