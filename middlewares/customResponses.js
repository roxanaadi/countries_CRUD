
const customResponses = {

    success( payload ) {
        return this.status( 200 ).json( {
            success: true,
            payload,
        } );
    },
    notFound( payload ) {
        return this.status( 404 ).json( {
            success: false,
            error: "not_found",
            details: `We couldn't find '${payload}' in our database.`,
        } );
    },
    customedError( payload ) {
        return this.status( 400 ).json( {
            success: false,
            error: "bad_request",
            details: payload,
        } );
    }

}


module.exports = ( req, res, next ) => {
        Object.assign( res, customResponses );
        next( );
};
        
