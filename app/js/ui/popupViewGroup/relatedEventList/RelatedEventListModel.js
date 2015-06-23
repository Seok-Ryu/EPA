define(["framework/Model"],
    function(Model) {
        var RelatedEventListModel = function() {

            Model.call(this);
            this.initialize();
        };

        RelatedEventListModel.prototype = Object.create(Model.prototype);

        RelatedEventListModel.prototype.initialize = function () {
            Model.prototype.initialize.apply(this);
            this.buttonGroup = null;
            this.currentPageIndex = null;
            this.totalPage = null;
            this.eventId = null;
            this.relatedEventList = null;
        }

        RelatedEventListModel.prototype.setButtonGroup = function(buttonGroup) {
            this.buttonGroup = buttonGroup;
        };
        RelatedEventListModel.prototype.getButtonGroup = function() {
            return this.buttonGroup;
        };

        RelatedEventListModel.prototype.setCurrentFocusedStatement = function(statement){
            this.currentFocusedStatement = statement;
        };
        RelatedEventListModel.prototype.getCurrentFocusedStatement = function() {
            return this.currentFocusedStatement;
        };

        RelatedEventListModel.prototype.setTotalPage = function(totalPage){
            this.totalPage = totalPage;
        };
        RelatedEventListModel.prototype.getTotalPage = function() {
            return this.totalPage;
        };

        RelatedEventListModel.prototype.setCurrentPageIndex = function(currentPageIndex){
            this.currentPageIndex = currentPageIndex;
        };
        RelatedEventListModel.prototype.getCurrentPageIndex = function() {
            return this.currentPageIndex;
        };

        RelatedEventListModel.prototype.setRelatedEventList = function(relatedEventList){
            this.relatedEventList = relatedEventList;
        };
        RelatedEventListModel.prototype.getRelatedEventList = function() {
            return this.relatedEventList;
        };

        return RelatedEventListModel;
    });
