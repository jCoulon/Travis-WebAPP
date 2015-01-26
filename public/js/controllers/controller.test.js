

'use strict'


describe("dashboardIndicateur",function() {
    beforeEach(module("TravisAPP"));
    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('Dashboard Ctrl', function () {
        it('controller setup', function () {
            var $scope = {};
            var controller = $controller('dashboardIndicateur');
            expect(controller).toBeDefined();
            expect(controller.dashboardOptions.indicateurs).toEqual([{titre : "radar"},{titre:"time"}]);
        });

    });

});

