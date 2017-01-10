
### Pre-requisite

1. Postgres 9.6+ in localhost port 5432 (default dev configuration in the /server/server.js)

2. Install node.js/npm ([node.js install/download](https://nodejs.org/en/download/))
    - On mac, you can [intall node with brew](http://blog.teamtreehouse.com/install-node-js-npm-mac)
    - __IMPORTANT:__ Make sure you do not have a folder ```~/node_modules/``` otherwise local packages will be installed there which is not what we want. If you have such folder, delete it (then, local modules will be install per project folder).

3. Upgrade npm with: 

    ```
    npm -v
    sudo npm install npm -g
    ```

4. Upgrade node with (this way might not work on windows, google the correct way to update node to the latest): 

    ```
    # Clear NPM's cache:
    sudo npm cache clean -f 
    # Install a little helper called 'n'
    sudo npm install -g n   
    # Update node to the latest stable
    sudo n stable
    ```

5. Install gulp. 

    ```
    npm install gulp -g
    ```

    - Make sure to install gulp globally first (with -g) to have access to the "gulp" command.


### Dev Setup

Once postgresql, git, npm/node, and gulp are installed do the following steps: 

1. Create a folder "todoMVC/" in your projects directory. 

2. Clone source 

    ```
    git clone git@github.com:huangbin256/todoMVC.git todoMVC_src
    ```

   - __BEST PRACTICE:__ The "_src" suffix means it is a src directory (typically checked in as it in git), and the parent folder is the project folder for other files such as design, data, output, other project related files that does not need to be checked in)

3. Then, from the the *todoMVC_src* install the node_modules for this project.

    ```
    npm install
    ```

    - __Note:__ This will install all of the modules in the "package.json" in the *projectmvc_mvnsrc/node_modules* directory, enabling gulp to be called.

    - __Important:__ Important when adding modules to the *gulpfile.js* make sure to do it with the ```npm install .... --save``` to make sure it gets added to the *package.json* (such as the next developer can just do a "node install" to install missing modules)

4. Create the database 

  Now that node, gulp, and the node_modules are installed, we can run *gulp* to create the database following the convention. 

    ```
    $ gulp recreateDb
    ```

  - __Note:__ As we can see in the gulpfile.js file, the "recreateDb" task run a psql on postgres/postgres for the "00...sql" file (which will create the "todomvc_user" and "todomvc_db"), and then, run all of the subsequent sql files with the "todomvc_user" on "todomvc_db". This scheme will enable a simple way to do a incremental database update and keep production and development as close as possible.

6. run node server

    ```
    node start
    ```

7. When in development, automatically reprocess the web files when edit with 

    ```
    gulp watch
    ```

Usually, you have one terminal running ```node start``` and another one (typically another terminal tab on mac) with ```gulp watch```

8. Go to [http://localhost:8080/](http://localhost:8080/)

