/**
 * Created by chaber_e on 10/10/2017.
 */

module.exports.dateUpdate = function(next) {
    let currentDate = new Date();

    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
};
