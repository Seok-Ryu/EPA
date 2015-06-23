define(function() {
	var PortalMenu = function(jsonObject) {
		this.jsonObject = jsonObject;
	}
	 
	PortalMenu.prototype.getMenuId = function(){
		return this.jsonObject.menuId;
	}
	 
	PortalMenu.prototype.getName = function() {
		return this.jsonObject.name;
	}

	PortalMenu.prototype.getType = function() {
		return this.jsonObject.type;
	}

    PortalMenu.prototype.getListSize = function() {
        return this.jsonObject.listSize;
    }

	return PortalMenu;
});