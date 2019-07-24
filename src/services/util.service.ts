import * as _ from "lodash";

class UtilService {

    public isEmpty(value: any): boolean {
        return _.isEmpty(value);
    }

}

export const utilService = new UtilService(); 