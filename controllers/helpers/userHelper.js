/**
 * Created by chaber_e on 11/10/2017.
 */

module.exports.userFormat = function(user) {
    return {
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    }
};