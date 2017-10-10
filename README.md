**Start test :**
mocha tests/1-User.js
mocha tests/2-Module.js

**Todo list for tonight**

"Module errors case"
   * it("Should handle create module for user 404");
   * it("Should handle a publish update for an unautorized user");
   * it("Should handle a get on a module 404");
   * it("SHould handle a download on a module 404");
   * it("Should handle a download of an existing module but for a version 404")

Create the CLI
   * Should be able to register / auth a user
   * Should be able to create / update a module (by uploading a folder containing a package.json)
   * Should be able to get / download an existing module uploaded by an other user