import { mode } from '/imports/ui/body.js';

FlowRouter.route('/print', {
    action: (params, queryParams) => {
        mode.set("print");
    }
});
