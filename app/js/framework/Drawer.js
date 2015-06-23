define(function() {
	var Drawer = function(id, model) {
		this.id = id;
		this.model = model;
		this.container = null;
		this.active = false;
        this.visible = false;

		//proto value
		Drawer.prototype.rootElement = $("#vod_container");
		//proto method
		Drawer.prototype.onInitialize = function(param) {

		};
		Drawer.prototype.start = function() {
			this.initialize();
			this.onCreateLayout();
			this.onPaint();
			this.onAfterPaint();
            //this.onShow();
			//TODO show 할지 말지 고민해보자
		};
		Drawer.prototype.onCreateLayout = function() {
			//@Comment 한번 만들어질 레이아웃을 만듬
		};
		Drawer.prototype.onPaint = function() {
			//@Comment list 를 비롯한 변동이 있는 요소를 템플릿을 이용해 만들고 값을 채움
		};
		Drawer.prototype.onAfterPaint = function() {
			//@Comment CSS 를 적용 
		};
		Drawer.prototype.initialize = function() {
			this.container = null;
			this.timerContainer = null;
		}
		Drawer.prototype.onUpdate = function() {
		}
        Drawer.prototype.update = function() {
            this.onUpdate();
            this.onPaint();
            this.onAfterPaint();
        }
		Drawer.prototype.onRepaint = function() {
		};
        Drawer.prototype.repaint= function() {
            this.onRepaint();
            this.onAfterPaint();
        };
        Drawer.prototype.setInVisibleMode  = function() {
            if(this.container) {
                this.container.css('visibility', 'hidden');
            }
            this.setVisible(false);
        }
        Drawer.prototype.setVisibleMode  = function() {
            if(this.container) {
                this.container.css('visibility', 'visible');
            }
            this.setVisible(true);
        }
		Drawer.prototype.hide = function() {
			if(this.container) {
				this.container.hide();
			}
            this.setVisible(false);
		};
		Drawer.prototype.show = function() {
			if(this.container) {
				this.container.show();
			}
            this.setVisibleMode();
            this.setVisible(true);
		};
		Drawer.prototype.setActive = function(_value) {
			this.active = _value;
			this.onAfterPaint();
		};
        Drawer.prototype.setVisible = function(_value) {
            this.visible = _value;
        };
        Drawer.prototype.isActive = function() {
            return this.active;
        };
        Drawer.prototype.isVisible = function() {
            return this.visible;
        };

		Drawer.prototype.onAfterStop = function() {

		}
        Drawer.prototype.onStop = function() {

        }
        Drawer.prototype.stop = function() {
            this.onStop();
            if(this.container) {
                this.container.html("");
            }
            this.active = false;
            //this.hide(); //TODO 이것도 고민해봐 할지말지
            this.onAfterStop();
        }
		Drawer.prototype.createContainer = function(id) {
			var beforeContainer = $("#" + id);
			if(!beforeContainer[0]) {
				this.container = $("<div>");
				this.container.attr("class", "container");
				this.container.attr("id", id);
				this.container.appendTo(this.rootElement);	
			} else {
				this.container = beforeContainer;
			}
			
		};
        Drawer.prototype.drawForCloud = function() {
            this.onDrawForCloud();
        }
        Drawer.prototype.onDrawForCloud = function() {

        }
        Drawer.prototype.createTempContainer = function() {
            this.createContainer("tempContainer");
            this.container.appendTo(this.rootElement);
        }
        Drawer.prototype.changeContainer = function(newContainer) {
            var tempContainer = $("#tempContainer");
            newContainer.html(tempContainer.html())
            tempContainer.html("");
            this.container = newContainer;
        }
		Drawer.prototype.setContainer = function(container) {
			this.container = container;
		};
		Drawer.prototype.getContainer = function() {
			if(!this.container) {
				this.createContainer(this.id);
			}
			return this.container;
		};
		Drawer.prototype.setFocus = function(obejct) {
			if(obejct) {
				this.removeFocus(obejct);
				obejct.addClass("focus");
			}
		};
		Drawer.prototype.setUnFocus = function(obejct) {
			if(obejct) {
				this.removeFocus(obejct);
				obejct.addClass("unfocus");
			}
		};
        Drawer.prototype.setSelect = function(obejct) {
            if(obejct) {
                this.removeFocus(obejct);
                obejct.addClass("select");
            }
        };

		Drawer.prototype.removeFocus = function(obejct) {
			if(obejct) {
				obejct.removeClass("focus");
				obejct.removeClass("unfocus");
                obejct.removeClass("select");
			}
		}

        Drawer.prototype.sendEvent = function (type, param) {
            $(this).trigger(type, param);
        }
	};
	
	return Drawer;
});