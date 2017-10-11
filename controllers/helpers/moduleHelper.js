/**
 * Created by chaber_e on 11/10/2017.
 */

module.exports.moduleFormat = function (module) {
    return {
        name: module.name,
        updated_at: module.updated_at,
        created_at: module.created_at,
        user_email: module.current_version.package.author,
        package: JSON.parse(module.current_version.package),
        current_version: {
            version: module.current_version.version,
            checkSum: module.current_version.checkSum,
            created_at: module.current_version.created_at
        },
        precedent_versions: module.precedent_versions.map((e) => {
            return {
                version: e.version,
                checkSum: e.checkSum,
                created_at: e.created_at
            }
        })
    };
};

module.exports.notFoundError = function (moduleName) {
    return {notFound: moduleName}
};

module.exports.notFoundVersionError = function (module, expectedVersion) {
    return {
        notFoundVersionError: {
            expectedVersion: expectedVersion,
            availableVersions: (module.precedent_versions.map((e) => { return e.version})).push(module.current_version.version)
        }
    }
};