'use strict';
var BaseDao = require("./BaseDao.js");
var db = require("./db.js");

class TaskDao extends BaseDao{
	constructor(){
		super({entity: "task",
					key: "id"});
	}
}

class UserDao extends BaseDao{
	constructor(){
		super({entity: "user",
					key: "id"});
	}
}

module.exports = {
	BaseDao: BaseDao,
	task: new TaskDao(),
	user: new UserDao()
};
