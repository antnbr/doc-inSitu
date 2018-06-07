import { mode } from '/imports/ui/body.js'; 

FlowRouter.route('/print', {
    action: function(params, queryParams) {
        mode.set("print");
    }
});
