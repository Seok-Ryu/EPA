/**
 * element 를 조작 하거나 그리는 부분이 중복되는 경우 사용
 */
define(["cca/model/PortalMenu", "cca/model/Event", "cca/model/SubscriberEnrollInfo", "cca/model/SubscriberEnrollDetail", "cca/model/SubscriberWinInfo", "cca/model/RelatedEvent", "cca/model/Winner",
        "cca/model/EnrollReservationInfo", "cca/model/EventActionTarget"],
    function ( PortalMenu, Event, SubscriberEnrollInfo, SubscriberEnrollDetail, SubscriberWinInfo, RelatedEvent, Winner, EnrollReservationInfo, EventActionTarget ) {

        var StructureHelper = {};

        StructureHelper.createGenericStructure = function (jsonData, model, fieldName) {
            if(jsonData) {
                if(jsonData[fieldName]) {
                    if(jsonData[fieldName] instanceof Array) {
                        var tempList = new Array(jsonData[fieldName].length);
                        for (var i = 0; i < jsonData[fieldName].length; i++) {
                            tempList[i] = new model(jsonData[fieldName][i]);
                        };
                        jsonData[fieldName] = tempList;
                    } else {
                        jsonData[fieldName] = new model(jsonData[fieldName]);
                    }
                } else {
                    jsonData[fieldName] = null;
                }
            } else {

            }

            return jsonData;
        }

        StructureHelper.createportalMenuListStructure = function (response) {
            return this.createGenericStructure(response, PortalMenu, 'portalMenuList');
        }

        StructureHelper.createEventStructure = function (response) {
            if(response.portalEventList) {
                for(var i = 0 ; i < response.portalEventList.length; i++) {
                    response.portalEventList[i] = this.createGenericStructure(response.portalEventList[i], SubscriberEnrollInfo, 'subscriberEnrollInfo');
                    response.portalEventList[i] = this.createGenericStructure(response.portalEventList[i], SubscriberEnrollDetail, 'subscriberEnrollDetailList');
                }
                return this.createGenericStructure(response, Event, 'portalEventList');
            } else if(response.portalEvent) {
                response.portalEvent = this.createGenericStructure(response.portalEvent, SubscriberEnrollInfo, 'subscriberEnrollInfo');
                response.portalEvent = this.createGenericStructure(response.portalEvent, SubscriberWinInfo, 'subscriberWinInfo');

                response = this.createGenericStructure(response, SubscriberEnrollDetail, 'subscriberEnrollDetailList');

                return this.createGenericStructure(response, Event, 'portalEvent');
            } else {
                return response;
            }
        }

        StructureHelper.createRelatedEventListStructure = function (response) {
            return this.createGenericStructure(response, RelatedEvent, 'relatedPortalEventList');
        }

        StructureHelper.createSubscriberEnrollDetailStructure = function(response) {
            return this.createGenericStructure(response, SubscriberEnrollDetail, 'subscriberEnrollDetailList');
        }

        StructureHelper.createWinnerListStructure = function(response) {
            return this.createGenericStructure(response, Winner, 'winnerList');
        }

        StructureHelper.createEnrollReservationInfoStructure = function(response) {
            return this.createGenericStructure(response, EnrollReservationInfo, 'enrollReservationInfo');
        }

        StructureHelper.createEventActionTargetStructure = function(response) {
            return this.createGenericStructure(response, EventActionTarget, 'portalEventActionTargetList');
        }


        return StructureHelper;
    });

